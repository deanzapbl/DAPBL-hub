// ── HOMEWORK GRADING (EBOD) ──────────────────────────────────────────────────
let hwAssignments=JSON.parse(localStorage.getItem('pblhub_hw_assignments')||'[]');

function saveHWAssignments(){localStorage.setItem('pblhub_hw_assignments',JSON.stringify(hwAssignments));}

function renderEBODHomework(){
  // populate session filter
  const sel=document.getElementById('hw-filter-session');
  if(sel&&sel.options.length<=1){
    mBootcamps.forEach(b=>{const o=document.createElement('option');o.value=b.id;o.textContent='Session '+b.id+' — '+b.topic;sel.appendChild(o);});
  }
  const filterSession=document.getElementById('hw-filter-session')?document.getElementById('hw-filter-session').value:'';
  const filterStatus=document.getElementById('hw-filter-status')?document.getElementById('hw-filter-status').value:'';

  // If Firestore data is available, use it; otherwise show a load button
  const rows=[];
  const hasFirestoreData=Object.keys(_ebodAllMembersHW).length>0;
  if(hasFirestoreData){
    Object.entries(_ebodAllMembersHW).forEach(([uid,mdata])=>{
      Object.entries(mdata.hw||{}).forEach(([sid,sub])=>{
        if(!sub.link)return;
        if(filterSession&&String(sid)!==String(filterSession))return;
        const isGraded=!!(sub.grade);
        if(filterStatus==='graded'&&!isGraded)return;
        if(filterStatus==='ungraded'&&isGraded)return;
        const session=mBootcamps.find(b=>String(b.id)===String(sid));
        rows.push({uid,name:mdata.name||mdata.email||uid,sid,sub,session,isGraded});
      });
    });
  }

  // update badge
  const ungraded=rows.filter(r=>!r.isGraded).length;
  const badge=document.getElementById('hw-badge');
  if(badge){badge.textContent=ungraded;badge.style.display=ungraded>0?'':'none';}

  const el=document.getElementById('ebod-hw-table');
  if(!el)return;
  if(!hasFirestoreData){
    el.innerHTML='<div style="text-align:center;padding:20px 0"><button onclick="loadEBODHWFromFirestore()" style="padding:8px 18px;background:var(--cr);color:#fff;border:none;border-radius:6px;font-size:12px;cursor:pointer">Load Submissions from Firestore</button><div style="font-size:10px;color:var(--t4);margin-top:8px">Submissions are stored per-member in Firebase. Click to load all.</div></div>';
    return;
  }
  if(!rows.length){
    el.innerHTML='<div style="font-size:11px;color:var(--t4);padding:14px 0;text-align:center">No submissions match the current filters.</div>';
    renderHWAssignments();return;
  }
  el.innerHTML=`<table><thead><tr><th>Member</th><th>Session</th><th>Submitted</th><th>Note</th><th>Grade</th><th>Status</th><th></th></tr></thead><tbody>${
    rows.map(r=>{
      const statusColor=r.sub.gradeStatus==='Resubmit'?'var(--gold)':r.sub.gradeStatus==='Late'?'#E57373':r.isGraded?'var(--grn)':'var(--t4)';
      return`<tr class="cr" onclick="openHWGrade('${r.uid}','${r.sid}')">
        <td><strong>${r.name}</strong></td>
        <td style="font-size:10px;color:var(--t3)">${r.session?'S'+r.session.id+' — '+r.session.topic:'Session '+r.sid}</td>
        <td style="font-size:10px;color:var(--t3)">${r.sub.submittedAt||'—'}</td>
        <td style="font-size:10px;color:var(--t2);max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.sub.note||'—'}</td>
        <td style="font-weight:600;color:var(--t1)">${r.sub.grade||'—'}</td>
        <td><span style="font-size:9px;font-weight:600;padding:2px 7px;border-radius:10px;background:rgba(0,0,0,.06);color:${statusColor}">${r.sub.gradeStatus||(r.isGraded?'Graded':'Pending')}</span></td>
        <td><a href="${r.sub.link}" target="_blank" onclick="event.stopPropagation()" style="font-size:10px;color:var(--cr2);text-decoration:none;font-weight:600">View →</a></td>
      </tr>`;
    }).join('')
  }</tbody></table>`;

  // assignments tab
  renderHWAssignments();
}

function openHWGrade(uid,sid){
  // uid is now the Firestore doc id (was email in old localStorage approach)
  const mdata=_ebodAllMembersHW[uid]||{};
  const sub=(mdata.hw||{})[sid]||{};
  const session=mBootcamps.find(b=>String(b.id)===String(sid));
  document.getElementById('hw-grade-email').value=uid; // repurposed: stores uid
  document.getElementById('hw-grade-session').value=sid;
  document.getElementById('hw-grade-score').value=sub.grade||'';
  document.getElementById('hw-grade-status').value=sub.gradeStatus||'Graded';
  document.getElementById('hw-grade-feedback').value=sub.feedback||'';
  document.getElementById('hw-grade-preview').innerHTML=
    `<strong>${mdata.name||uid}</strong> &nbsp;·&nbsp; ${session?'Session '+session.id+' — '+session.topic:'Session '+sid}<br>`+
    `<span style="color:var(--t3);font-size:10px">Submitted: ${sub.submittedAt||'unknown'}</span><br>`+
    `<a href="${sub.link||''}" target="_blank" style="font-size:11px;color:var(--cr2);word-break:break-all">${sub.link||'(no link)'}</a>`+
    (sub.note?`<div style="margin-top:4px;font-size:10px;color:var(--t2)">Note: ${sub.note}</div>`:'');
  openModal('hw-grade-modal');
}

function saveHWGrade(){
  const uid=document.getElementById('hw-grade-email').value; // field repurposed to store uid
  const sid=document.getElementById('hw-grade-session').value;
  const grade=document.getElementById('hw-grade-score').value.trim();
  const gradeStatus=document.getElementById('hw-grade-status').value;
  const feedback=document.getElementById('hw-grade-feedback').value.trim();
  if(!grade){alert('Please enter a grade.');return;}
  const gradedAt=new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
  // Write to Firestore
  if(window._db&&uid){
    const update={};
    update[`homework.${sid}.grade`]=grade;
    update[`homework.${sid}.gradeStatus`]=gradeStatus;
    update[`homework.${sid}.feedback`]=feedback;
    update[`homework.${sid}.gradedAt`]=gradedAt;
    _db.collection('members').doc(uid).update(update).catch(e=>console.warn('saveHWGrade:',e));
    // Update local cache immediately
    if(_ebodAllMembersHW[uid]&&_ebodAllMembersHW[uid].hw[sid]){
      _ebodAllMembersHW[uid].hw[sid].grade=grade;
      _ebodAllMembersHW[uid].hw[sid].gradeStatus=gradeStatus;
      _ebodAllMembersHW[uid].hw[sid].feedback=feedback;
      _ebodAllMembersHW[uid].hw[sid].gradedAt=gradedAt;
    }
  }
  closeModals();
  renderEBODHomework();
}

function renderHWAssignments(){
  const el=document.getElementById('ebod-hw-assignments');
  if(!el)return;
  if(!hwAssignments.length){
    el.innerHTML='<div style="font-size:11px;color:var(--t4);padding:14px 0;text-align:center">No assignments created yet. Click + New Assignment to create one.</div>';
    return;
  }
  el.innerHTML=hwAssignments.map((a,i)=>`
    <div style="border-bottom:1px solid var(--bd);padding:13px 0;display:flex;align-items:flex-start;gap:12px">
      <div style="width:32px;height:32px;border-radius:6px;background:var(--cr);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">S${a.session||'?'}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:600;color:var(--t1)">${a.title}</div>
        <div style="font-size:10px;color:var(--t3);margin-top:2px">Due: ${a.due||'—'} &nbsp;·&nbsp; Session ${a.session||'—'}</div>
        ${a.desc?`<div style="font-size:11px;color:var(--t2);margin-top:5px;line-height:1.5">${a.desc}</div>`:''}
      </div>
      <button onclick="deleteHWAssignment(${i})" style="background:none;border:none;color:#E57373;cursor:pointer;font-size:13px;padding:0 4px;flex-shrink:0">&times;</button>
    </div>`).join('');
}

function openHWAssignModal(){openModal('hw-assign-modal');}

function saveHWAssignment(){
  const title=document.getElementById('hwa-title').value.trim();
  const session=document.getElementById('hwa-session').value;
  const due=document.getElementById('hwa-due').value;
  const desc=document.getElementById('hwa-desc').value.trim();
  if(!title){alert('Please enter a title.');return;}
  hwAssignments.push({title,session,due,desc,createdAt:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'})});
  saveHWAssignments();
  document.getElementById('hwa-title').value='';
  document.getElementById('hwa-session').value='';
  document.getElementById('hwa-due').value='';
  document.getElementById('hwa-desc').value='';
  closeModals();
  renderHWAssignments();
}

function deleteHWAssignment(i){
  hwAssignments.splice(i,1);
  saveHWAssignments();
  renderHWAssignments();
}
// ────────────────────────────────────────────────────────────────────────────

function _enterEBOD(){
  currentApp='ebod';
  localStorage.setItem('_lastPortal','ebod');
  document.getElementById('landing').style.display='none';
  document.getElementById('app-ebod').style.display='block';
  loadData();
  renderMembers();renderExec();renderBootcamps();renderTasks();renderAgendas();renderEvents();renderRos();renderTemplates();renderSponsors();renderEmailList();renderConsulting();renderCompetition();renderBudget();renderMinutes();renderRecruitment();renderGoals();renderTransition();renderAnnouncements();renderMentorship();renderDashboard();renderPortals();renderEcSelect();renderReimbursements();renderVenues();renderVolSlots();renderCompPrep();renderCurriculum();renderBrandKit();renderContentCalendar();renderCaMentors();renderMemberCheckIns();renderCalendar();renderEBODHomework();renderMemberContent();loadBKEdits();
  if(typeof updateMemberDisplay==='function')updateMemberDisplay();
  initExtraListeners();
  loadEBODHWFromFirestore();
}
function loginEBOD(){
  const email=document.getElementById('land-ebod-email').value.trim();
  const pass=document.getElementById('land-ebod-pass').value.trim();
  const err=document.getElementById('land-ebod-err');
  if(!email||!pass){err.textContent='Please enter your email and password.';return;}
  err.textContent='Signing in…';
  firebase.auth().signInWithEmailAndPassword(email,pass)
    .then(()=>{err.textContent='';_enterEBOD();})
    .catch(e=>{
      err.textContent=e.code==='auth/invalid-credential'||e.code==='auth/wrong-password'||e.code==='auth/user-not-found'
        ?'Incorrect email or password.'
        :'Sign-in failed: '+e.message;
    });
}
function logoutEBOD(){
  firebase.auth().signOut().then(()=>{
    currentApp=null;
    document.getElementById('app-ebod').style.display='none';
    document.getElementById('landing').style.display='flex';
  });
}
// Auto-restore session on page refresh — check which portal was last used
firebase.auth().onAuthStateChanged(user=>{
  if(user&&currentApp!=='ebod'&&currentApp!=='im'){
    const last=localStorage.getItem('_lastPortal');
    if(last==='ebod'){
      _enterEBOD();
    } else if(last==='im'){
      syncFromEBOD();
      const match=ebodMembers.find(m=>m.email&&m.email.toLowerCase()===user.email.toLowerCase());
      selectedMember=match
        ?{name:match.first+' '+match.last,email:user.email,firstName:match.first,lastName:match.last,role:match.role||'Member'}
        :{name:user.email.split('@')[0],email:user.email,firstName:user.email.split('@')[0],lastName:'',role:'Member'};
      currentApp='im';
      document.getElementById('landing').style.display='none';
      document.getElementById('app-im').style.display='block';
      initExtraListeners();
      initIM();
      _loadMemberData(user.uid);
    }
  }
});

function findEBODMember(name){
  syncFromEBOD();
  const q=name.toLowerCase().trim();
  return ebodMembers.find(m=>(m.first+' '+m.last).toLowerCase().trim()===q);
}
// ── BULK ADD MEMBERS (Refund Tab) ─────────────────────────────────────────
function openBulkAddModal(){
  const id=document.getElementById('ec-select').value;
  if(!id){alert('Select an event first.');return;}
  document.getElementById('bulk-count').value='';
  document.getElementById('bulk-paid').value='';
  document.getElementById('bulk-prefix').value='';
  openModal('bulk-add-modal');
}
function executeBulkAdd(){
  const count=parseInt(document.getElementById('bulk-count').value)||0;
  const paid=parseFloat(document.getElementById('bulk-paid').value)||0;
  const prefix=document.getElementById('bulk-prefix').value.trim();
  const id=document.getElementById('ec-select').value;
  const e=eventCosts.find(x=>x.id==id);
  if(!e||count<=0)return;
  const startIdx=e.members.length+1;
  for(let i=0;i<count;i++){
    e.members.push({name:prefix?prefix+' '+(startIdx+i):'',phone:'',email:'',paid,aid:0});
  }
  closeModals();calcEventCost();
}
function ecCheckChange(){
  const checked=document.querySelectorAll('.ec-chk:checked').length;
  const total=document.querySelectorAll('.ec-chk').length;
  const bar=document.getElementById('ec-bulk-bar');
  if(bar)bar.style.display=checked?'flex':'none';
  const cnt=document.getElementById('ec-sel-count');
  if(cnt)cnt.textContent=checked+' of '+total+' selected';
  const sa=document.getElementById('ec-select-all');
  if(sa)sa.checked=checked>0&&checked===total;
  sa.indeterminate=checked>0&&checked<total;
}
function toggleAllEc(cb){
  document.querySelectorAll('.ec-chk').forEach(c=>c.checked=cb.checked);
  ecCheckChange();
}
function applyBulkPaid(){
  const val=parseFloat(document.getElementById('ec-bulk-paid-val').value);
  if(isNaN(val))return;
  const id=document.getElementById('ec-select').value;
  const e=eventCosts.find(x=>x.id==id);if(!e)return;
  document.querySelectorAll('.ec-chk:checked').forEach(cb=>{
    const idx=parseInt(cb.dataset.idx);
    if(e.members[idx])e.members[idx].paid=val;
  });
  calcEventCost();
}
function applyBulkAid(){
  const val=parseFloat(document.getElementById('ec-bulk-aid-val').value);
  if(isNaN(val))return;
  const id=document.getElementById('ec-select').value;
  const e=eventCosts.find(x=>x.id==id);if(!e)return;
  document.querySelectorAll('.ec-chk:checked').forEach(cb=>{
    const idx=parseInt(cb.dataset.idx);
    if(e.members[idx])e.members[idx].aid=val;
  });
  calcEventCost();
}
function deleteSelectedEc(){
  const id=document.getElementById('ec-select').value;
  const e=eventCosts.find(x=>x.id==id);if(!e)return;
  const toDelete=new Set();
  document.querySelectorAll('.ec-chk:checked').forEach(cb=>toDelete.add(parseInt(cb.dataset.idx)));
  if(!toDelete.size)return;
  if(!confirm('Delete '+toDelete.size+' member(s)?'))return;
  e.members=e.members.filter((_,i)=>!toDelete.has(i));
  calcEventCost();
}
function deleteEventCost(){
  const id=document.getElementById('ec-select').value;
  if(!id){alert('Select an event first.');return;}
  const e=eventCosts.find(x=>x.id==id);if(!e)return;
  if(!confirm('Delete event "'+e.name+'" and all its members? This cannot be undone.'))return;
  eventCosts=eventCosts.filter(x=>x.id!=id);
  renderEcSelect();loadEventCost('');saveData();
}

// ── IMPORT FROM SHEETS (Paste / URL / Excel / CSV) ────────────────────────
let _importCtx='';let _importRows=[];
const _IMP_LABELS={
  members:'Member Roster',exec:'Executive Board',mentors:'Mentor Pairs',
  bootcamps:'Bootcamp Sessions',ebod:'EBOD Tasks',general:'General Tasks',
  agendas:'Meeting Agendas',sponsors:'Confirmed Sponsors',pipeline:'Sponsor Pipeline',
  consulting:'Consulting Projects',clients:'Client Directory',compresults:'Competition Results',
  income:'Income Log',expense:'Expense Log',minutes:'Meeting Minutes',
  prospects:'Prospect Pipeline','ec-members':'Event Members',reimbursements:'Reimbursements'
};
function openImportDataModal(ctx){
  _importCtx=ctx;_importRows=[];
  const pa=document.getElementById('imp-paste-area');if(pa)pa.value='';
  const ui=document.getElementById('imp-url-input');if(ui)ui.value='';
  ['imp-url-status','imp-excel-status','imp-csv-status'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent='';});
  ['imp-excel-file','imp-csv-file'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  const pv=document.getElementById('imp-preview');if(pv)pv.style.display='none';
  const eb=document.getElementById('imp-execute-btn');if(eb)eb.style.display='none';
  const sub=document.getElementById('imp-subtitle');
  if(sub)sub.textContent='Importing into: '+(_IMP_LABELS[ctx]||ctx)+'. First row must be column headers.';
  switchImportTab('paste');
  openModal('import-data-modal');
}
function switchImportTab(tab){
  ['paste','url','excel','csv'].forEach(t=>{
    const p=document.getElementById('imp-'+t+'-panel');if(p)p.style.display=t===tab?'':'none';
  });
  document.querySelectorAll('.imp-tab').forEach((btn,i)=>btn.classList.toggle('active',['paste','url','excel','csv'][i]===tab));
}
function _splitCsvLine(line){
  const out=[];let cur='',q=false;
  for(let i=0;i<line.length;i++){
    if(line[i]==='"'){q=!q;}
    else if(line[i]===','&&!q){out.push(cur.trim());cur='';}
    else cur+=line[i];
  }
  out.push(cur.trim());return out;
}
function _normalizeKey(k){return k.toLowerCase().replace(/[^a-z0-9]/g,'');}
function _parseTextToRows(text){
  const lines=text.trim().split(/\r?\n/).filter(l=>l.trim());
  if(lines.length<2)return[];
  const isTsv=lines[0].includes('\t');
  const split=l=>isTsv?l.split('\t').map(c=>c.trim()):_splitCsvLine(l);
  const headers=split(lines[0]).map(_normalizeKey);
  return lines.slice(1).map(line=>{
    const cells=split(line);const row={};
    headers.forEach((h,i)=>row[h]=(cells[i]||'').trim());
    return row;
  });
}
function _getField(row,...aliases){
  for(const a of aliases){if(row[a]!==undefined&&row[a]!=='')return row[a];}return'';
}
// Smarter column lookup: exact → suffix/prefix → substring contains
// Rule: the ROW KEY is the compound form (e.g. "studentname" for alias "name")
//       OR the ALIAS is the compound form (e.g. alias "studentname" for key "student")
//       NEVER: alias-ends-with-key — that causes "firstname" to match a "name" column
function _impCol(row,...aliases){
  const exact=col(row,...aliases);
  if(exact!=='')return exact;
  const norms=aliases.map(a=>a.toLowerCase().replace(/[^a-z0-9]/g,''));
  // Pass 1: rk ends/starts with alias, OR alias starts with rk (alias is more specific version of short key)
  for(const[rk,rv]of Object.entries(row)){
    if(!rv&&rv!==0)continue;
    for(const na of norms){
      if(na.length>=3&&(rk.endsWith(na)||rk.startsWith(na)||na.startsWith(rk)))return String(rv);
    }
  }
  // Pass 2: row key contains alias as substring (e.g. "studentfirstname" contains "first")
  for(const[rk,rv]of Object.entries(row)){
    if(!rv&&rv!==0)continue;
    for(const na of norms){
      if(na.length>=4&&rk.includes(na))return String(rv);
    }
  }
  return'';
}
function _showImportPreview(rows){
  _importRows=rows;
  const pv=document.getElementById('imp-preview');if(pv)pv.style.display='';
  const info=document.getElementById('imp-preview-info');
  if(info)info.textContent='✓ '+rows.length+' row'+(rows.length===1?'':'s')+' ready to import';
  const cols=document.getElementById('imp-preview-cols');
  if(cols&&rows.length){
    const keys=Object.keys(rows[0]);
    cols.textContent='Columns found ('+keys.length+'): '+keys.join(' · ');
  }
  const eb=document.getElementById('imp-execute-btn');if(eb)eb.style.display='';
}
function importPasteData(){
  const text=document.getElementById('imp-paste-area').value;
  if(!text.trim()){alert('Paste your data first.');return;}
  const rows=_parseTextToRows(text);
  if(!rows.length){alert('No data found. Make sure the first row contains column headers.');return;}
  _showImportPreview(rows);
}
async function _proxyFetch(targetUrl){
  const enc=encodeURIComponent(targetUrl);
  const proxies=[
    'https://corsproxy.io/?'+enc,
    'https://api.allorigins.win/raw?url='+enc,
    'https://api.codetabs.com/v1/proxy?quest='+targetUrl
  ];
  for(const p of proxies){
    try{
      const r=await fetch(p);
      if(!r.ok)continue;
      const t=await r.text();
      if(t&&t.trim()&&!t.includes('"error"'))return t;
    }catch(e){/* try next */}
  }
  throw new Error('All proxies failed — make sure the sheet is shared as "Anyone with the link can view"');
}
async function fetchSheetsUrl(){
  const raw=(document.getElementById('imp-url-input').value||'').trim();
  const status=document.getElementById('imp-url-status');
  status.textContent='Fetching…';
  try{
    const idMatch=raw.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
    if(!idMatch)throw new Error('Not a valid Google Sheets URL — paste the link from File → Share');
    const gidMatch=raw.match(/[#&?]gid=(\d+)/);
    const exportUrl='https://docs.google.com/spreadsheets/d/'+idMatch[1]+'/export?format=csv'+(gidMatch?'&gid='+gidMatch[1]:'');
    const text=await _proxyFetch(exportUrl);
    const rows=_parseTextToRows(text);
    if(!rows.length)throw new Error('Sheet fetched but no data rows found — does the sheet have a header row?');
    status.textContent='✓ '+rows.length+' rows fetched';
    _showImportPreview(rows);
  }catch(err){status.textContent='✗ '+err.message;}
}
function readExcelFile(){
  const file=(document.getElementById('imp-excel-file').files||[])[0];
  if(!file){alert('Select a file first.');return;}
  const status=document.getElementById('imp-excel-status');
  if(typeof XLSX==='undefined'){
    status.textContent='Loading library…';
    const s=document.createElement('script');
    s.src='https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js';
    s.onload=()=>{status.textContent='';readExcelFile();};
    s.onerror=()=>{status.textContent='Failed to load SheetJS library.';};
    document.head.appendChild(s);return;
  }
  const reader=new FileReader();
  reader.onload=ev=>{
    try{
      const wb=XLSX.read(new Uint8Array(ev.target.result),{type:'array'});
      const ws=wb.Sheets[wb.SheetNames[0]];
      const data=XLSX.utils.sheet_to_json(ws,{defval:''});
      if(!data.length){alert('No data found in the file.');return;}
      const rows=data.map(r=>{
        const norm={};
        Object.entries(r).forEach(([k,v])=>norm[_normalizeKey(k)]=String(v).trim());
        return norm;
      });
      status.textContent='✓ Read '+rows.length+' rows from "'+wb.SheetNames[0]+'"';
      _showImportPreview(rows);
    }catch(err){alert('Could not read file: '+err.message);}
  };
  reader.readAsArrayBuffer(file);
}
function readCsvFile(){
  const file=(document.getElementById('imp-csv-file').files||[])[0];
  if(!file){alert('Select a file first.');return;}
  const status=document.getElementById('imp-csv-status');
  const reader=new FileReader();
  reader.onload=ev=>{
    try{
      const rows=parseCsv(ev.target.result);
      if(!rows.length){alert('No data found in the file.');return;}
      status.textContent='✓ '+rows.length+' rows read';
      _showImportPreview(rows);
    }catch(err){status.textContent='✗ '+err.message;}
  };
  reader.readAsText(file);
}
function executeImportData(){
  if(!_importRows.length){alert('No data loaded yet.');return;}
  const t=_importCtx;
  if(!t){alert('Import context lost — close and reopen the modal.');return;}
  let added=0;
  const r=_importRows;
  const c=_impCol;
  try{
    if(t==='members'){r.forEach(row=>{let nm=c(row,'name','fullname','studentname','membername','student','member','person','attendee','participant','preferredname');if(!nm){const nk=Object.keys(row).find(k=>k.includes('name'));if(nk)nm=String(row[nk]);}if(!nm){const vals=Object.values(row).filter(v=>v&&String(v).trim()&&!/^\d+$/.test(String(v)));nm=vals[0]?String(vals[0]).trim():'';}let first=c(row,'first','firstname','fname','givenname','preferredfirst')||(nm?nm.split(' ')[0]:'');let last=c(row,'last','lastname','lname','surname','familyname')||(nm?nm.split(' ').slice(1).join(' '):'');// Safety: if full name ended up in first field, split it
if(first&&first.includes(' ')&&!last){last=first.split(' ').slice(1).join(' ');first=first.split(' ')[0];}members.push({id:nM++,first:first||nm||'',last,role:c(row,'role','type','position','title')||'Member',email:c(row,'email','emailaddress','mail')||'',phone:c(row,'phone','phonenumber','cell','mobile','tel')||'',att:[0,0,0,0,0,0]});added++;});renderMembers();}
    else if(t==='exec'){r.forEach(row=>{let nm=c(row,'name','fullname','membername','studentname','student','member','person');if(!nm){const nk=Object.keys(row).find(k=>k.includes('name'));if(nk)nm=String(row[nk]);}execTeam.push({id:nE++,name:nm||Object.values(row).find(v=>v&&!/^\d+$/.test(String(v)))||'',position:c(row,'position','title','role','pos')||'Member'});added++;});renderExec();}
    else if(t==='mentors'){r.forEach(row=>{mentorPairs.push({id:nMP++,mentor:c(row,'mentor','mentorname'),mentee:c(row,'mentee','menteename'),checkins:parseInt(c(row,'checkins','checkindone','done'))||0,goal:parseInt(c(row,'goal','checkinsgoal','total'))||4,status:c(row,'status')||'In Progress',notes:c(row,'notes','note')});added++;});renderMentorship();}
    else if(t==='bootcamps'){r.forEach(row=>{bootcamps.push({id:nB++,name:c(row,'name','session','sessionname'),date:c(row,'date'),topic:c(row,'topic','subject'),att:parseInt(c(row,'attended','attendance','att','present'))||0,tot:parseInt(c(row,'total','totalmembers','capacity'))||47,notes:c(row,'notes','note'),files:[]});added++;});renderBootcamps();}
    else if(t==='ebod'||t==='general'){r.forEach(row=>{tasks[t].push({id:nT++,text:c(row,'task','text','name','title','description'),owner:c(row,'owner','assignedto','assigned')||'President',due:c(row,'due','duedate','deadline','date')||'TBD',cat:c(row,'category','cat','type')||'General',done:(c(row,'status','done','complete')||'').toLowerCase()==='complete',notes:c(row,'notes','note'),files:[]});added++;});renderTasks();}
    else if(t==='agendas'){r.forEach(row=>{agendas.push({id:nA++,name:c(row,'name','meeting','title'),date:c(row,'date'),items:c(row,'items','agenda','agendaitems'),notes:c(row,'notes','note'),status:c(row,'status')||'Draft',files:[]});added++;});renderAgendas();}
    else if(t==='sponsors'){r.forEach(row=>{sponsors.push({id:nSp++,abbr:(c(row,'name','company')||'??').slice(0,2).toUpperCase(),name:c(row,'name','company','organization'),tier:c(row,'tier','level','type')||'Bronze',contact:c(row,'contact','contactname'),email:c(row,'email','contactemail'),amount:c(row,'amount','donation')||''});added++;});renderSponsors();}
    else if(t==='pipeline'){r.forEach(row=>{pipeline.push({id:nPl++,name:c(row,'name','company','organization'),ask:c(row,'ask','amount','target')||'',stage:c(row,'stage','status')||'Identified',next:c(row,'next','nextstep')||''});added++;});renderSponsors();}
    else if(t==='consulting'){r.forEach(row=>{consultingProjects.push({id:nCon++,name:c(row,'name','project','projectname'),client:c(row,'client','company','clientname'),lead:c(row,'lead','owner','projectlead'),start:c(row,'start','startdate','date')||'',status:c(row,'status')||'Active',notes:c(row,'notes','note'),files:[]});added++;});renderConsulting();}
    else if(t==='clients'){r.forEach(row=>{clients.push({id:nCli++,name:c(row,'name','company','organization'),contact:c(row,'contact','contactname'),email:c(row,'email'),industry:c(row,'industry','sector','type')||'',status:c(row,'status')||'Active',notes:c(row,'notes','note')});added++;});renderConsulting();}
    else if(t==='compresults'){r.forEach(row=>{compResults.push({id:nCR++,member:c(row,'member','name','student','membername'),event:c(row,'event','eventname'),competition:c(row,'competition','comp'),placement:c(row,'placement','place','result')||'Participated',year:c(row,'year')||'2026'});added++;});renderCompetition();}
    else if(t==='income'||t==='expense'){r.forEach(row=>{transactions[t].push({id:nTr++,desc:c(row,'description','desc','name','item'),cat:c(row,'category','cat','type')||'Other',date:c(row,'date')||'',amount:parseFloat(c(row,'amount','total','cost','value','revenue'))||0});added++;});renderBudget();}
    else if(t==='minutes'){r.forEach(row=>{meetingMinutes.push({id:nMin++,name:c(row,'name','meeting','title'),date:c(row,'date')||'',recorder:c(row,'recorder','recordedby','secretary')||'',actions:c(row,'actions','actionitems'),notes:c(row,'notes','note'),files:[]});added++;});renderMinutes();}
    else if(t==='prospects'){r.forEach(row=>{prospects.push({id:nPr++,name:c(row,'name','fullname','studentname','membername'),contact:c(row,'contact','email','phone'),source:c(row,'source','referral','channel')||'Other',stage:c(row,'stage','status')||'Interested',followup:c(row,'followup','followupdate')||'',notes:c(row,'notes','note')});added++;});renderRecruitment();}
    else if(t==='ec-members'){const id=document.getElementById('ec-select').value;const e=eventCosts.find(x=>x.id==id);if(!e){alert('Select an event first, then re-open this modal.');return;}r.forEach(row=>{let nm=c(row,'name','member','membername','fullname','studentname','student','person','attendee');if(!nm){const nk=Object.keys(row).find(k=>k.includes('name'));if(nk)nm=String(row[nk]);}if(!nm){const vals=Object.values(row).filter(v=>v&&String(v).trim()&&!/^\d+$/.test(String(v)));nm=vals[0]?String(vals[0]).trim():'';}e.members.push({name:nm,phone:c(row,'phone','phonenumber','cell','mobile','contact','tel')||'',email:c(row,'email','emailaddress','mail')||'',paid:parseFloat(c(row,'paid','amount','payment','amountpaid','totalpaid','cost'))||0,aid:parseFloat(c(row,'aid','financialaid','scholarship','grant'))||0});added++;});calcEventCost();}
    else if(t==='reimbursements'){r.forEach(row=>{reimbursements.push({id:nReim++,member:c(row,'member','name','submittedby','studentname'),item:c(row,'item','description','desc'),amount:parseFloat(c(row,'amount','cost','total'))||0,date:c(row,'date')||'',receipt:c(row,'receipt','receiptlink','link')||'',notes:c(row,'notes','note')||'',status:c(row,'status')||'Pending'});added++;});renderReimbursements();}
    else{alert('Unknown import type: "'+t+'". Try closing and reopening the modal.');return;}
  }catch(err){
    alert('Import error: '+err.message+'\n\nColumns detected: '+(_importRows.length?Object.keys(_importRows[0]).join(', '):'none'));
    return;
  }
  if(!added){
    const detectedCols=_importRows.length?Object.keys(_importRows[0]).join(', '):'none';
    alert('⚠️ 0 rows were imported.\n\nColumns detected in your data:\n'+detectedCols+'\n\nTip: Make sure your sheet has a header row with column names the app can recognize (e.g. Name, Email, Phone, Paid).');
    return; // keep modal open so they can try again
  }
  renderDashboard();saveData();
  closeModals();
  alert('✓ Imported '+added+' row'+(added!==1?'s':'')+' into '+(_IMP_LABELS[t]||t)+'.');
}

// ── MERCH SALES ──────────────────────────────────────────────────────────
function renderMerch(){
  const totalRev=merchSales.reduce((s,m)=>s+m.price*m.qty,0);
  const totalQty=merchSales.reduce((s,m)=>s+m.qty,0);
  const top=merchSales.length?[...merchSales].sort((a,b)=>b.price*b.qty-a.price*a.qty)[0]:null;
  const ss=document.getElementById('merch-stats');
  if(ss)ss.innerHTML=[
    {l:'Total Revenue',v:'$'+totalRev.toFixed(2),s:'All items'},
    {l:'Units Sold',v:totalQty,s:'Across all items'},
    {l:'Items Listed',v:merchSales.length,s:'SKUs'},
    {l:'Top Item',v:top?top.item:'—',s:top?'$'+(top.price*top.qty).toFixed(2)+' revenue':''},
  ].map(s=>`<div class="sc"><div class="sl">${s.l}</div><div class="sv">${s.v}</div><div class="sm">${s.s}</div></div>`).join('');
  const t=document.getElementById('merch-table');if(!t)return;
  if(!merchSales.length){t.innerHTML=`<tr><td colspan="6" style="font-size:11px;color:var(--t4);padding:12px">No merch items yet. Click + Add Item to start.</td></tr>`;return;}
  t.innerHTML=merchSales.map(m=>`<tr class="cr" onclick="openMerchDetail(${m.id})"><td class="nm">${m.item}</td><td>$${parseFloat(m.price).toFixed(2)}</td><td>${m.qty}</td><td style="color:var(--gold2);font-weight:600">$${(m.price*m.qty).toFixed(2)}</td><td style="color:var(--t3);font-size:10px">${m.notes||'—'}</td><td><button class="rb" onclick="event.stopPropagation();merchSales=merchSales.filter(x=>x.id!==${m.id});renderMerch()">&times;</button></td></tr>`).join('');
}
function addMerchItem(){
  merchSales.push({id:nMerch++,item:'New Item',price:0,qty:0,notes:''});
  renderMerch();openMerchDetail(merchSales[merchSales.length-1].id);
}
function openMerchDetail(id){
  const m=merchSales.find(x=>x.id===id);if(!m)return;
  openDetail(m.item,'Merch Item',
    row2(fld('Item Name',inp('ed-mitem',m.item)),fld('Price / Unit ($)',inp('ed-mprice',m.price,'number')))+
    row2(fld('Qty Sold',inp('ed-mqty',m.qty,'number')),fld('Notes',inp('ed-mnotes',m.notes)))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveMerchItem(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="merchSales=merchSales.filter(x=>x.id!==${id});renderMerch();closeDetail()">Delete</button></div>`,m);
}
function saveMerchItem(id,btn){
  const m=merchSales.find(x=>x.id===id);if(!m)return;
  m.item=g('ed-mitem');m.price=parseFloat(g('ed-mprice'))||0;m.qty=parseInt(g('ed-mqty'))||0;m.notes=g('ed-mnotes');
  renderMerch();saved(btn);
  document.getElementById('d-title').textContent=m.item;
}
function exportMerchCSV(){
  const rows=[['Item','Price','Qty','Revenue','Notes'],...merchSales.map(m=>[m.item,m.price,m.qty,(m.price*m.qty).toFixed(2),m.notes])];
  const csv=rows.map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\n');
  const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);a.download='merch-sales.csv';a.click();
}

// ── FINANCE PORTAL BUDGET ─────────────────────────────────────────────────
function saveBudgetTarget(val){
  budgetTarget=parseFloat(val)||0;
  localStorage.setItem('dapbl_budget_target',budgetTarget);
}
function initFinBudget(){
  const inp=document.getElementById('fin-budget-target');
  if(inp)inp.value=budgetTarget;
  renderFinBudget();
}
function showBudgetAcct(acct){
  document.querySelectorAll('#portal-finance-budget .bud-acct-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('#portal-finance-budget .bud-acct-tab').forEach(t=>t.classList.remove('active'));
  const panel=document.getElementById('bud-acct-'+acct);if(panel)panel.classList.add('active');
  document.querySelectorAll('#portal-finance-budget .bud-acct-tab').forEach(t=>{
    if(t.getAttribute('onclick')&&t.getAttribute('onclick').includes("'"+acct+"'"))t.classList.add('active');
  });
  if(acct==='personal')renderFinBudget();else renderPblBudget();
}
function showBudgetSubTab(acct,tab){
  const container=document.getElementById('bud-acct-'+acct);if(!container)return;
  container.querySelectorAll('.bud-sub-panel').forEach(p=>p.classList.remove('active'));
  container.querySelectorAll('.bud-sub-tab').forEach(t=>t.classList.remove('active'));
  const panel=document.getElementById('bud-'+acct+'-'+tab);if(panel)panel.classList.add('active');
  container.querySelectorAll('.bud-sub-tab').forEach(t=>{
    if(t.dataset.acct===acct&&t.dataset.tab===tab)t.classList.add('active');
  });
  if(acct==='personal')renderFinBudget();else renderPblBudget();
}
function renderFinBudget(){
  const totalInc=transactions.income.reduce((s,t)=>s+t.amount,0);
  const totalExp=transactions.expense.reduce((s,t)=>s+t.amount,0);
  const pblInc=pblTransactions.income.reduce((s,t)=>s+t.amount,0);
  const pblExp=pblTransactions.expense.reduce((s,t)=>s+t.amount,0);
  const totalAll=(totalInc+pblInc)-(totalExp+pblExp);
  const el=id=>document.getElementById(id);
  if(el('fin-bud-income'))el('fin-bud-income').innerHTML=`<span class="sa">$${(totalInc+pblInc).toLocaleString()}</span>`;
  if(el('fin-bud-expense'))el('fin-bud-expense').textContent='$'+(totalExp+pblExp).toLocaleString();
  if(el('fin-bud-balance')){el('fin-bud-balance').textContent='$'+totalAll.toLocaleString();el('fin-bud-balance').style.color=totalAll>=0?'var(--gold2)':'#E57373';}
  // Personal account tables
  const it=el('fin-income-table');
  if(it)it.innerHTML=transactions.income.map(t=>`<tr class="cr" onclick="openFinTransactionDetail(${t.id},'income')"><td class="nm">${t.desc}</td><td><span class="badge bg">${t.cat}</span></td><td>${t.date}</td><td style="color:var(--gold2);font-weight:600">+$${t.amount}</td></tr>`).join('');
  const et=el('fin-expense-table');
  if(et)et.innerHTML=transactions.expense.map(t=>`<tr class="cr" onclick="openFinTransactionDetail(${t.id},'expense')"><td class="nm">${t.desc}</td><td><span class="badge br">${t.cat}</span></td><td>${t.date}</td><td style="color:#E57373;font-weight:600">-$${t.amount}</td></tr>`).join('');
  // Personal summary by category
  const cats={};
  transactions.income.forEach(t=>{cats[t.cat]=(cats[t.cat]||{inc:0,exp:0});cats[t.cat].inc+=t.amount;});
  transactions.expense.forEach(t=>{cats[t.cat]=(cats[t.cat]||{inc:0,exp:0});cats[t.cat].exp+=t.amount;});
  const bc=el('fin-budget-by-cat');
  if(bc)bc.innerHTML=Object.entries(cats).map(([cat,v])=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--bd)"><span style="font-size:12px">${cat}</span><div style="display:flex;gap:12px"><span style="font-size:11px;color:var(--gold2)">${v.inc?'+$'+v.inc:''}</span><span style="font-size:11px;color:#E57373">${v.exp?'-$'+v.exp:''}</span></div></div>`).join('');
}
function renderPblBudget(){
  const pblInc=pblTransactions.income.reduce((s,t)=>s+t.amount,0);
  const pblExp=pblTransactions.expense.reduce((s,t)=>s+t.amount,0);
  const bal=pblInc-pblExp;
  const el=id=>document.getElementById(id);
  if(el('pbl-bal-display'))el('pbl-bal-display').textContent='$'+bal.toFixed(2);
  if(el('pbl-income-display'))el('pbl-income-display').textContent='Income: $'+pblInc.toLocaleString();
  if(el('pbl-expense-display'))el('pbl-expense-display').textContent='Expenses: $'+pblExp.toLocaleString();
  // PBL income table
  const pit=el('pbl-income-table');
  if(pit)pit.innerHTML=pblTransactions.income.length?pblTransactions.income.map(t=>`<tr class="cr" onclick="openPblTransactionDetail(${t.id},'income')"><td class="nm">${t.desc}</td><td><span class="badge bg">${t.cat}</span></td><td>${t.date}</td><td style="color:var(--gold2);font-weight:600">+$${t.amount}</td></tr>`).join(''):`<tr><td colspan="4" style="font-size:11px;color:var(--t4);padding:12px">No PBL income entries yet.</td></tr>`;
  // PBL expense table
  const pet=el('pbl-expense-table');
  if(pet)pet.innerHTML=pblTransactions.expense.length?pblTransactions.expense.map(t=>`<tr class="cr" onclick="openPblTransactionDetail(${t.id},'expense')"><td class="nm">${t.desc}</td><td><span class="badge br">${t.cat}</span></td><td>${t.date}</td><td style="color:#E57373;font-weight:600">-$${t.amount}</td></tr>`).join(''):`<tr><td colspan="4" style="font-size:11px;color:var(--t4);padding:12px">No PBL expense entries yet.</td></tr>`;
  // PBL category summary
  const cats={};
  pblTransactions.income.forEach(t=>{cats[t.cat]=(cats[t.cat]||{inc:0,exp:0});cats[t.cat].inc+=t.amount;});
  pblTransactions.expense.forEach(t=>{cats[t.cat]=(cats[t.cat]||{inc:0,exp:0});cats[t.cat].exp+=t.amount;});
  const bc=el('pbl-budget-by-cat');
  if(bc)bc.innerHTML=Object.keys(cats).length?Object.entries(cats).map(([cat,v])=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--bd)"><span style="font-size:12px">${cat}</span><div style="display:flex;gap:12px"><span style="font-size:11px;color:var(--gold2)">${v.inc?'+$'+v.inc:''}</span><span style="font-size:11px;color:#E57373">${v.exp?'-$'+v.exp:''}</span></div></div>`).join(''):'<div style="font-size:11px;color:var(--t4);padding:12px">No transactions yet.</div>';
  // Transaction log (chronological)
  renderPblLog(bal);
}
function renderPblLog(runningStart){
  const lt=document.getElementById('pbl-log-table');if(!lt)return;
  const all=[
    ...pblTransactions.income.map(t=>({...t,type:'income'})),
    ...pblTransactions.expense.map(t=>({...t,type:'expense'}))
  ].sort((a,b)=>{const da=new Date('2026/'+a.date),db=new Date('2026/'+b.date);return isNaN(da)||isNaN(db)?0:da-db;});
  let running=0;
  if(!all.length){lt.innerHTML=`<tr><td colspan="6" style="font-size:11px;color:var(--t4);padding:12px">No transactions yet.</td></tr>`;return;}
  lt.innerHTML=all.map(t=>{
    running+=t.type==='income'?t.amount:-t.amount;
    return`<tr class="cr" onclick="openPblTransactionDetail(${t.id},'${t.type}')">
      <td>${t.date}</td><td class="nm">${t.desc}</td><td><span class="badge ${t.type==='income'?'bg':'br'}">${t.cat}</span></td>
      <td style="font-size:10px;color:${t.type==='income'?'var(--grn)':'#E57373'}">${t.type}</td>
      <td style="font-weight:600;color:${t.type==='income'?'var(--gold2)':'#E57373'}">${t.type==='income'?'+':'-'}$${t.amount}</td>
      <td style="font-weight:600;color:${running>=0?'var(--grn)':'#E57373'}">$${running.toFixed(2)}</td>
    </tr>`;
  }).join('');
}
function addFinTransaction(type){
  const newT={id:nTr++,desc:'New Entry',cat:'Other',date:'',amount:0};
  transactions[type].push(newT);
  renderFinBudget();openFinTransactionDetail(newT.id,type);
}
function openFinTransactionDetail(id,type){
  const t=transactions[type].find(x=>x.id===id);if(!t)return;
  const incCats=['Sponsorship','Dues','Event','Fundraiser','Other'];
  const expCats=['Travel','Competition','Education','Events','Marketing','Design','Operations','Other'];
  openDetail(t.desc,type==='income'?'Personal Income':'Personal Expense',
    fld('Description',inp('ed-trdesc',t.desc))+
    row2(fld('Category',sel('ed-trcat',type==='income'?incCats:expCats,t.cat)),fld('Date',inp('ed-trdate',t.date)))+
    fld('Amount ($)',inp('ed-tramt',t.amount,'number'))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveFinTransaction(${id},'${type}',this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="transactions['${type}']=transactions['${type}'].filter(x=>x.id!==${id});renderFinBudget();renderBudget();closeDetail()">Delete</button></div>`,t);
}
function saveFinTransaction(id,type,btn){
  const t=transactions[type].find(x=>x.id===id);if(!t)return;
  t.desc=g('ed-trdesc');t.cat=g('ed-trcat');t.date=g('ed-trdate');t.amount=parseFloat(g('ed-tramt'))||0;
  renderFinBudget();renderBudget();saved(btn);
  document.getElementById('d-title').textContent=t.desc;
}
function addPblTransaction(type){
  const newT={id:nPblTr++,desc:'New Entry',cat:'Other',date:'',amount:0};
  pblTransactions[type].push(newT);
  renderPblBudget();openPblTransactionDetail(newT.id,type);
}
function openPblTransactionDetail(id,type){
  const t=pblTransactions[type].find(x=>x.id===id);if(!t)return;
  const incCats=['Sponsorship','Dues','Event','Fundraiser','Grant','Other'];
  const expCats=['Travel','Competition','Education','Events','Marketing','Design','Operations','Admin','Other'];
  openDetail(t.desc,'PBL Bank — '+(type==='income'?'Income':'Expense'),
    fld('Description',inp('ed-ptrdesc',t.desc))+
    row2(fld('Category',sel('ed-ptrcat',type==='income'?incCats:expCats,t.cat)),fld('Date',inp('ed-ptrdate',t.date)))+
    fld('Amount ($)',inp('ed-ptramt',t.amount,'number'))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="savePblTransaction(${id},'${type}',this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="pblTransactions['${type}']=pblTransactions['${type}'].filter(x=>x.id!==${id});renderPblBudget();closeDetail()">Delete</button></div>`,t);
}
function savePblTransaction(id,type,btn){
  const t=pblTransactions[type].find(x=>x.id===id);if(!t)return;
  t.desc=g('ed-ptrdesc');t.cat=g('ed-ptrcat');t.date=g('ed-ptrdate');t.amount=parseFloat(g('ed-ptramt'))||0;
  renderPblBudget();saved(btn);
  document.getElementById('d-title').textContent=t.desc;
}
function generatePblStatement(){
  const q=document.getElementById('stmt-quarter').value;
  alert('Statement format not yet configured. Send your example format and it will be built for '+q+' quarter.');
}
function exportFinBudgetCSV(){
  const rows=[['Type','Description','Category','Date','Amount'],
    ...transactions.income.map(t=>['Income',t.desc,t.cat,t.date,t.amount]),
    ...transactions.expense.map(t=>['Expense',t.desc,t.cat,t.date,-t.amount])];
  const csv=rows.map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\n');
  const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);a.download='personal-budget.csv';a.click();
}

// ── GOOGLE CALENDAR iCAL IMPORT ────────────────────────────────────────────
async function importIcal(){
  const url=document.getElementById('ical-url').value.trim();
  if(!url){alert('Please paste an iCal URL first.');return;}
  const status=document.getElementById('ical-status');
  if(status)status.textContent='Importing...';
  try{
    const proxy='https://api.allorigins.win/raw?url='+encodeURIComponent(url);
    const resp=await fetch(proxy);
    if(!resp.ok)throw new Error('Could not fetch calendar (status '+resp.status+'). Make sure the calendar is public.');
    const text=await resp.text();
    if(!text.includes('BEGIN:VCALENDAR'))throw new Error('URL does not appear to be a valid iCal feed. Check the URL and that the calendar is public.');
    parseIcalText(text);
  }catch(e){
    if(status)status.textContent='';
    alert('Import failed: '+e.message);
  }
}
function parseIcalText(text){
  const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const unfolded=text.replace(/\r\n/g,'\n').replace(/\r/g,'\n').replace(/\n[ \t]/g,'');
  const blocks=unfolded.split('BEGIN:VEVENT').slice(1);
  const events=[];
  blocks.forEach(block=>{
    const get=key=>{const m=block.match(new RegExp(key+'[^:\\n]*:([^\\n]+)'));return m?m[1].trim():''};
    const summary=get('SUMMARY');
    const dtstart=get('DTSTART');
    const location=get('LOCATION');
    const desc=get('DESCRIPTION');
    if(!summary||!dtstart)return;
    const dm=dtstart.match(/^(\d{4})(\d{2})(\d{2})/);
    if(!dm)return;
    const dateStr=MONTHS[parseInt(dm[2])-1]+' '+parseInt(dm[3])+', '+dm[1];
    events.push({name:summary.replace(/\\n/g,' ').replace(/\\,/g,','),date:dateStr,loc:location.replace(/\\,/g,',')||'',desc:desc.replace(/\\n/g,'\n').replace(/\\,/g,',')||''});
  });
  importedCalEvents=events;
  renderCalendar();
  const status=document.getElementById('ical-status');
  if(status)status.textContent='✓ '+events.length+' events imported';
  saveData();
}
function clearImportedCal(){
  importedCalEvents=[];
  const status=document.getElementById('ical-status');
  if(status)status.textContent='Cleared';
  setTimeout(()=>{if(status)status.textContent='';},1500);
  renderCalendar();saveData();
}

// loginIM() is now defined in the IM AUTH section above (Firebase Auth)

// ============================================================
// ── IM REIMBURSEMENTS ────────────────────────────────────────
// ============================================================
function submitImReimb(){
  const uid=firebase.auth().currentUser?.uid;
  const errEl=document.getElementById('imr-err');
  if(!uid){if(errEl){errEl.style.color='#E57373';errEl.textContent='Please sign in first.';}showSignIn();return;}
  const item=(document.getElementById('imr-item')||{}).value?.trim();
  const amount=parseFloat((document.getElementById('imr-amount')||{}).value)||0;
  const receipt=(document.getElementById('imr-receipt')||{}).value?.trim()||'';
  const notes=(document.getElementById('imr-notes')||{}).value?.trim()||'';
  if(!item){if(errEl){errEl.style.color='#E57373';errEl.textContent='Item description is required.';}return;}
  if(!amount){if(errEl){errEl.style.color='#E57373';errEl.textContent='Amount is required.';}return;}
  if(errEl)errEl.textContent='Submitting…';
  _db.collection('im-reimbursements').add({
    uid,memberName:selectedMember?.name||'',memberEmail:selectedMember?.email||'',
    item,amount,receipt,notes,
    submittedAt:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),
    status:'Pending'
  }).then(()=>{
    if(errEl){errEl.style.color='var(--grn)';errEl.textContent='✓ Request submitted!';}
    ['imr-item','imr-amount','imr-receipt','imr-notes'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
    setTimeout(()=>{if(errEl){errEl.textContent='';errEl.style.color='#E57373';}},3000);
  }).catch(e=>{if(errEl){errEl.style.color='#E57373';errEl.textContent='Error: '+e.message;}});
}
function renderIMMyReimbs(){
  const el=document.getElementById('im-reimb-list');if(!el)return;
  const uid=firebase.auth().currentUser?.uid;
  if(!uid){el.innerHTML='<div class="empty">Sign in to see your requests.</div>';return;}
  const mine=_imReimbs.filter(r=>r.uid===uid);
  if(!mine.length){el.innerHTML='<div style="font-size:11px;color:var(--t4);padding:10px 0">No requests submitted yet.</div>';return;}
  el.innerHTML=mine.map(r=>{
    const sc=r.status==='Approved'||r.status==='Reimbursed'?'bg':r.status==='Denied'?'br':'bo';
    return`<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--bd)">
      <div style="flex:1"><div style="font-size:12px;font-weight:600">${r.item}</div>
      <div style="font-size:10px;color:var(--t3);margin-top:2px">$${(r.amount||0).toFixed(2)} &nbsp;·&nbsp; ${r.submittedAt||'—'}</div>
      ${r.notes?`<div style="font-size:10px;color:var(--t4);margin-top:2px">${r.notes}</div>`:''}</div>
      ${r.receipt?`<a href="${r.receipt}" target="_blank" style="font-size:10px;color:var(--grn);font-weight:600;flex-shrink:0">Receipt ↗</a>`:''}
      <span class="badge ${sc}" style="flex-shrink:0">${r.status}</span></div>`;
  }).join('');
}
function renderEBODImReimbs(){
  const el=document.getElementById('ebod-im-reimb-list');
  const badge=document.getElementById('im-reimb-badge');
  const pending=_imReimbs.filter(r=>r.status==='Pending').length;
  if(badge){badge.textContent=pending;badge.style.display=pending>0?'':'none';}
  if(!el)return;
  if(!_imReimbs.length){el.innerHTML='<div style="font-size:11px;color:var(--t4);padding:10px 0">No member requests yet.</div>';return;}
  el.innerHTML=`<table><thead><tr><th>Member</th><th>Item</th><th>Amount</th><th>Submitted</th><th>Receipt</th><th>Status</th><th></th></tr></thead><tbody>${
    _imReimbs.map(r=>{
      const sc=r.status==='Approved'||r.status==='Reimbursed'?'bg':r.status==='Denied'?'br':'bo';
      return`<tr><td class="nm">${r.memberName||r.memberEmail||'—'}</td><td>${r.item}</td><td>$${(r.amount||0).toFixed(2)}</td>
      <td style="font-size:10px;color:var(--t3)">${r.submittedAt||'—'}</td>
      <td>${r.receipt?`<a href="${r.receipt}" target="_blank" style="font-size:10px;color:var(--grn);font-weight:600">View ↗</a>`:'<span style="color:var(--t4);font-size:10px">None</span>'}</td>
      <td><span class="badge ${sc}">${r.status}</span></td>
      <td style="white-space:nowrap">${r.status==='Pending'
        ?`<button onclick="updateImReimb('${r._id}','Approved')" style="font-size:9px;padding:3px 7px;background:var(--grn);color:#fff;border:none;border-radius:4px;cursor:pointer;margin-right:3px">Approve</button><button onclick="updateImReimb('${r._id}','Denied')" style="font-size:9px;padding:3px 7px;background:#E57373;color:#fff;border:none;border-radius:4px;cursor:pointer">Deny</button>`
        :`<button onclick="updateImReimb('${r._id}','Pending')" style="font-size:9px;padding:3px 7px;background:var(--s3);color:var(--t2);border:none;border-radius:4px;cursor:pointer">Reset</button>`}
      </td></tr>`;
    }).join('')
  }</tbody></table>`;
}
function updateImReimb(id,status){
  if(!window._db)return;
  _db.collection('im-reimbursements').doc(id).update({status}).catch(e=>console.warn('updateImReimb:',e));
}

// ============================================================
// ── OFFICE HOURS ─────────────────────────────────────────────
// ============================================================
function renderIMConsulting(){
  const el=document.getElementById('im-consult-list');if(!el)return;
  const uid=firebase.auth().currentUser?.uid;
  if(!uid){el.innerHTML='<div class="empty">Sign in to request a session.</div>';return;}
  const myReqs=_officeHourReqs.filter(r=>r.uid===uid);
  el.innerHTML=`<div style="padding:0 4px">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
      <div><div style="font-size:10px;color:var(--t3);margin-bottom:4px">Exec Officer</div>
        <select id="oh-exec" style="width:100%;box-sizing:border-box;padding:7px 10px;border:1px solid var(--bd);border-radius:6px;background:var(--s2);color:var(--t1);font-size:11px;outline:none">
          ${mExecTeam.map(e=>`<option value="${e.name}">${e.name} — ${e.position}</option>`).join('')}
        </select></div>
      <div><div style="font-size:10px;color:var(--t3);margin-bottom:4px">Topic *</div>
        <input id="oh-topic" type="text" placeholder="e.g. NLC competition prep" style="width:100%;box-sizing:border-box;padding:7px 10px;border:1px solid var(--bd);border-radius:6px;background:var(--s2);color:var(--t1);font-size:11px;outline:none"></div>
    </div>
    <div style="margin-bottom:10px"><div style="font-size:10px;color:var(--t3);margin-bottom:4px">Preferred Time / Days</div>
      <input id="oh-time" type="text" placeholder="e.g. Mon/Wed after 4pm, or anytime Friday" style="width:100%;box-sizing:border-box;padding:7px 10px;border:1px solid var(--bd);border-radius:6px;background:var(--s2);color:var(--t1);font-size:11px;outline:none"></div>
    <div id="oh-err" style="font-size:10px;min-height:14px;margin-bottom:8px"></div>
    <button onclick="submitOfficeHour()" style="padding:7px 16px;background:var(--cr);color:#fff;border:none;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer">Request Session</button>
  </div>
  ${myReqs.length?`<div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--bd)">
    <div style="font-size:10px;font-weight:600;color:var(--t3);letter-spacing:1px;text-transform:uppercase;margin-bottom:8px">My Requests</div>
    ${myReqs.map(r=>{
      const sc=r.status==='Confirmed'?'bg':r.status==='Denied'?'br':'bo';
      return`<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--bd)">
        <div style="flex:1"><div style="font-size:11px;font-weight:600">${r.exec}</div>
        <div style="font-size:10px;color:var(--t3)">${r.topic} · ${r.submittedAt}</div>
        ${r.preferredTime?`<div style="font-size:10px;color:var(--t4)">${r.preferredTime}</div>`:''}</div>
        <span class="badge ${sc}">${r.status}</span></div>`;
    }).join('')}
  </div>`:''}`;
}
function submitOfficeHour(){
  const uid=firebase.auth().currentUser?.uid;
  const errEl=document.getElementById('oh-err');
  if(!uid){showSignIn();return;}
  const exec=(document.getElementById('oh-exec')||{}).value||'';
  const topic=(document.getElementById('oh-topic')||{}).value?.trim()||'';
  const time=(document.getElementById('oh-time')||{}).value?.trim()||'';
  if(!topic){if(errEl){errEl.style.color='#E57373';errEl.textContent='Please describe the topic.';}return;}
  if(errEl)errEl.textContent='Submitting…';
  _db.collection('office-hours').add({
    uid,memberName:selectedMember?.name||'',memberEmail:selectedMember?.email||'',
    exec,topic,preferredTime:time,
    submittedAt:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),
    status:'Pending'
  }).then(()=>{
    if(errEl){errEl.style.color='var(--grn)';errEl.textContent='✓ Request sent!';}
    const t=document.getElementById('oh-topic');if(t)t.value='';
    const ti=document.getElementById('oh-time');if(ti)ti.value='';
    setTimeout(()=>{if(errEl){errEl.textContent='';errEl.style.color='#E57373';}},3000);
  }).catch(e=>{if(errEl){errEl.style.color='#E57373';errEl.textContent='Error: '+e.message;}});
}
function renderEBODOfficeHours(){
  const el=document.getElementById('ebod-office-hours-list');
  const badge=document.getElementById('oh-badge');
  const pending=_officeHourReqs.filter(r=>r.status==='Pending').length;
  if(badge){badge.textContent=pending;badge.style.display=pending>0?'':'none';}
  if(!el)return;
  if(!_officeHourReqs.length){el.innerHTML='<div style="font-size:11px;color:var(--t4);padding:10px 0">No session requests yet.</div>';return;}
  el.innerHTML=`<table><thead><tr><th>Member</th><th>Exec</th><th>Topic</th><th>Preferred Time</th><th>Submitted</th><th>Status</th><th></th></tr></thead><tbody>${
    _officeHourReqs.map(r=>{
      const sc=r.status==='Confirmed'?'bg':r.status==='Denied'?'br':'bo';
      return`<tr><td class="nm">${r.memberName||r.memberEmail||'—'}</td><td>${r.exec}</td><td>${r.topic}</td>
      <td style="font-size:10px;color:var(--t3)">${r.preferredTime||'—'}</td>
      <td style="font-size:10px;color:var(--t3)">${r.submittedAt||'—'}</td>
      <td><span class="badge ${sc}">${r.status}</span></td>
      <td style="white-space:nowrap">${r.status==='Pending'
        ?`<button onclick="updateOfficeHour('${r._id}','Confirmed')" style="font-size:9px;padding:3px 7px;background:var(--grn);color:#fff;border:none;border-radius:4px;cursor:pointer;margin-right:3px">Confirm</button><button onclick="updateOfficeHour('${r._id}','Denied')" style="font-size:9px;padding:3px 7px;background:#E57373;color:#fff;border:none;border-radius:4px;cursor:pointer">Deny</button>`
        :`<button onclick="updateOfficeHour('${r._id}','Pending')" style="font-size:9px;padding:3px 7px;background:var(--s3);color:var(--t2);border:none;border-radius:4px;cursor:pointer">Reset</button>`}
      </td></tr>`;
    }).join('')
  }</tbody></table>`;
}
function updateOfficeHour(id,status){
  if(!window._db)return;
  _db.collection('office-hours').doc(id).update({status}).catch(e=>console.warn('updateOfficeHour:',e));
}

// ============================================================
// ── COMPETITION SIGN-UPS ─────────────────────────────────────
// ============================================================
function toggleSignup(eventId){
  const uid=firebase.auth().currentUser?.uid;
  if(!uid){showSignIn();return;}
  if(_mySignups.has(eventId))_mySignups.delete(eventId);
  else _mySignups.add(eventId);
  _db.collection('signups').doc(uid).set({
    name:selectedMember?.name||'',
    email:selectedMember?.email||'',
    interests:Array.from(_mySignups)
  },{merge:true}).catch(e=>console.warn('toggleSignup:',e));
  mRenderCompetition();
}

// ============================================================
// ── MENTOR CHECK-INS ─────────────────────────────────────────
// ============================================================
function renderIMMyMentorship(){
  const el=document.getElementById('im-mentor-content');if(!el)return;
  if(!selectedMember){el.innerHTML='<div class="empty">Sign in to view your mentorship details.</div>';return;}
  const fullName=selectedMember.name;
  const myMentor=mMentorPairs.find(p=>p.mentee===fullName);
  const myMentees=mMentorPairs.filter(p=>p.mentor===fullName);
  let html='';
  if(myMentor){
    const exec=mExecTeam.find(e=>e.name===myMentor.mentor);
    html+=`<div class="card" style="margin-bottom:14px">
      <div class="ch"><div class="ct">My Mentor</div></div>
      <div style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--s2);border:1px solid var(--bd);border-radius:7px">
        <div style="width:42px;height:42px;border-radius:50%;background:var(--blu);color:#fff;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${myMentor.mentor.slice(0,2).toUpperCase()}</div>
        <div><div style="font-weight:700;font-size:13px">${myMentor.mentor}</div>
          <div style="font-size:10px;color:var(--t3);margin-top:2px">${exec?exec.position:'Exec Team'}</div>
          <div style="font-size:10px;color:var(--t4);margin-top:2px">Reach out via GroupMe or Instagram DM</div></div>
      </div></div>`;
  }
  if(myMentees.length){
    html+=`<div class="card" style="margin-bottom:14px">
      <div class="ch"><div class="ct">My Mentees</div><span class="badge bb">${myMentees.length}</span></div>
      ${myMentees.map(p=>{
        const pairKey=p.mentor+'→'+p.mentee;
        const ci=_mentorCheckins[pairKey]||0;
        return`<div style="display:flex;align-items:center;gap:10px;padding:11px 0;border-bottom:1px solid var(--bd)">
          <div style="width:34px;height:34px;border-radius:50%;background:var(--cr3);color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${p.mentee.slice(0,2).toUpperCase()}</div>
          <div style="flex:1"><div style="font-weight:600;font-size:12px">${p.mentee}</div>
            <div style="font-size:10px;color:var(--t3);margin-top:2px">${ci} check-in${ci!==1?'s':''} logged</div></div>
          <button onclick="logCheckin('${p.mentor.replace(/'/g,"\\'")}','${p.mentee.replace(/'/g,"\\'")}',this)" style="padding:5px 12px;background:var(--cr);color:#fff;border:none;border-radius:6px;font-size:11px;cursor:pointer;flex-shrink:0">+ Log Check-in</button>
        </div>`;
      }).join('')}
    </div>
    <div class="card"><div class="ch"><div class="ct">Recent Check-ins</div></div><div id="im-checkin-log"></div></div>`;
  }
  if(!myMentor&&!myMentees.length){
    html='<div class="card"><div style="padding:20px;text-align:center"><div style="font-size:24px;margin-bottom:8px">👥</div><div style="font-size:13px;font-weight:600;margin-bottom:4px">Not in mentorship program</div><div style="font-size:11px;color:var(--t3)">Talk to your VP of Club Affairs to get matched with a mentor.</div></div></div>';
  }
  el.innerHTML=html;
  renderIMCheckinLog();
}
function renderIMCheckinLog(){
  const el=document.getElementById('im-checkin-log');if(!el||!selectedMember)return;
  const fullName=selectedMember.name;
  const logs=_mentorCheckinsList.filter(c=>c.mentorName===fullName||c.menteeName===fullName).slice(0,10);
  if(!logs.length){el.innerHTML='<div style="font-size:11px;color:var(--t4);padding:10px 0">No check-ins logged yet.</div>';return;}
  el.innerHTML=logs.map(c=>`<div style="padding:9px 0;border-bottom:1px solid var(--bd)">
    <div style="font-size:11px;font-weight:600">${c.mentorName} → ${c.menteeName}</div>
    <div style="font-size:10px;color:var(--t3);margin-top:2px">${c.date||'—'}${c.notes?' · '+c.notes:''}</div>
  </div>`).join('');
}
function logCheckin(mentorName,menteeName,btn){
  const uid=firebase.auth().currentUser?.uid;
  if(!uid){showSignIn();return;}
  const notes=prompt('Add a note for this check-in (optional):')||'';
  const date=new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
  const pairKey=mentorName+'→'+menteeName;
  if(btn){btn.textContent='Saving…';btn.disabled=true;}
  _db.collection('mentorCheckins').add({
    mentorName,menteeName,pairKey,date,notes,loggedBy:uid,loggedAt:Date.now()
  }).then(()=>{
    // optimistic local update
    _mentorCheckins[pairKey]=(_mentorCheckins[pairKey]||0)+1;
    _mentorCheckinsList.unshift({mentorName,menteeName,pairKey,date,notes,loggedAt:Date.now()});
    renderIMMyMentorship();renderMentorship();renderCaMentors();
  }).catch(e=>{alert('Error: '+e.message);if(btn){btn.textContent='+ Log Check-in';btn.disabled=false;}});
}

function switchToLanding(){
  // Sign out of Firebase Auth if leaving EBOD
  if(currentApp==='ebod')firebase.auth().signOut();
  currentApp=null;
  document.getElementById('app-ebod').style.display='none';
  document.getElementById('app-im').style.display='none';
  document.getElementById('landing').style.display='flex';
  resetLanding();
}

function saveRoleData(key,val){localStorage.setItem('pbl_'+key,JSON.stringify(val));}

// ── HELPERS ──
function roleRow(cells,delFn){
  return`<tr>${cells.map(c=>`<td>${c}</td>`).join('')}<td><button class="btn btn-g btn-sm" style="color:var(--cr)" onclick="${delFn}">✕</button></td></tr>`;
}
function statusBadge(s){
  const map={Pending:'var(--gold)',Active:'var(--blu)',Confirmed:'var(--grn)',Completed:'var(--grn)',Denied:'var(--cr)',Draft:'var(--t4)',Sent:'var(--grn)',Approved:'var(--grn)',Done:'var(--grn)','In Progress':'var(--blu)',Open:'var(--gold)',Resolved:'var(--grn)'};
  const c=map[s]||'var(--t3)';
  return`<span style="display:inline-block;padding:2px 8px;border-radius:10px;background:${c}22;color:${c};font-size:9.5px;font-weight:700">${s}</span>`;
}
function priorityBadge(p){const map={High:'var(--cr)',Medium:'var(--gold)',Low:'var(--grn)'};const c=map[p]||'var(--t3)';return`<span style="display:inline-block;padding:2px 8px;border-radius:10px;background:${c}22;color:${c};font-size:9.5px;font-weight:700">${p}</span>`;}

// ── VP OF FINANCE: ROI ──
function calcROIPreview(){
  const rev=parseFloat(document.getElementById('roi-rev').value)||0;
  const exp=parseFloat(document.getElementById('roi-exp').value)||0;
  const att=parseInt(document.getElementById('roi-att').value)||0;
  const net=rev-exp;
  const roi=exp>0?((net/exp)*100).toFixed(1):0;
  const cpa=att>0?(exp/att).toFixed(2):0;
  const el=document.getElementById('roi-preview');
  if(!el)return;
  el.style.display='flex';
  el.innerHTML=[
    {l:'Net',v:(net>=0?'+':'')+`$${net.toFixed(2)}`,c:net>=0?'var(--grn)':'var(--cr)'},
    {l:'ROI',v:roi+'%',c:parseFloat(roi)>=0?'var(--grn)':'var(--cr)'},
    {l:'Cost / Attendee',v:'$'+cpa,c:'var(--blu)'},
  ].map(s=>`<div style="flex:1;padding:10px 14px;background:${s.c}11;border-radius:8px;border:1px solid ${s.c}33"><div style="font-size:9.5px;color:var(--t3);margin-bottom:2px">${s.l}</div><div style="font-size:16px;font-weight:700;color:${s.c}">${s.v}</div></div>`).join('');
}
function addROIEntry(){
  const name=document.getElementById('roi-name').value.trim();
  if(!name)return alert('Enter an event name');
  const rev=parseFloat(document.getElementById('roi-rev').value)||0;
  const exp=parseFloat(document.getElementById('roi-exp').value)||0;
  const att=parseInt(document.getElementById('roi-att').value)||0;
  _roiEntries.push({name,rev,exp,att,date:new Date().toLocaleDateString()});
  saveRoleData('roi',_roiEntries);
  ['roi-name','roi-rev','roi-exp','roi-att'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  document.getElementById('roi-preview').style.display='none';
  renderROITable();
}
function renderROITable(){
  const t=document.getElementById('roi-table');
  if(!t)return;
  if(!_roiEntries.length){t.innerHTML='<tr><td colspan="8" style="text-align:center;color:var(--t4);padding:20px;font-size:11px">No ROI entries yet — add your first event above.</td></tr>';return;}
  t.innerHTML=_roiEntries.map((e,i)=>{
    const net=e.rev-e.exp;
    const roi=e.exp>0?((net/e.exp)*100).toFixed(1):'—';
    const cpa=e.att>0?(e.exp/e.att).toFixed(2):'—';
    const rating=parseFloat(roi)>=50?'🟢 Excellent':parseFloat(roi)>=0?'🟡 Positive':'🔴 Loss';
    return roleRow([e.name,`$${e.rev.toFixed(2)}`,`$${e.exp.toFixed(2)}`,`<span style="color:${net>=0?'var(--grn)':'var(--cr)'}">${net>=0?'+':''}$${net.toFixed(2)}</span>`,roi==='—'?'—':roi+'%',cpa==='—'?'—':'$'+cpa,rating],`deleteROI(${i})`);
  }).join('');
}
function deleteROI(i){_roiEntries.splice(i,1);saveRoleData('roi',_roiEntries);renderROITable();}

// ── ICC FORMS ──
function addICCForm(){openModal('iccform-modal');}
function submitICCForm(){
  const type=document.getElementById('iccf-type').value;
  const amount=parseFloat(document.getElementById('iccf-amount').value)||0;
  const purpose=document.getElementById('iccf-purpose').value.trim();
  const status=document.getElementById('iccf-status').value;
  const notes=document.getElementById('iccf-notes').value.trim();
  _iccForms.push({type,amount,purpose,status,notes,submitted:new Date().toLocaleDateString()});
  saveRoleData('iccforms',_iccForms);renderICCForms();closeModals();
  ['iccf-amount','iccf-purpose','iccf-notes'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}
function renderICCForms(){
  const t=document.getElementById('icc-forms-table');if(!t)return;
  if(!_iccForms.length){t.innerHTML='<tr><td colspan="7" style="text-align:center;color:var(--t4);padding:20px;font-size:11px">No ICC forms logged yet.</td></tr>';return;}
  t.innerHTML=_iccForms.map((f,i)=>roleRow([f.type,'$'+f.amount.toFixed(2),f.purpose,f.submitted,statusBadge(f.status),f.notes||'—'],`deleteICCForm(${i})`)).join('');
}
function deleteICCForm(i){_iccForms.splice(i,1);saveRoleData('iccforms',_iccForms);renderICCForms();}

// ── FINANCIAL REPORTS ──
function addFinReport(){openModal('finreport-modal');}
function submitFinReport(){
  const quarter=document.getElementById('fr-quarter').value.trim();if(!quarter)return;
  const summary=document.getElementById('fr-summary').value.trim();
  _finReports.unshift({quarter,summary,created:new Date().toLocaleDateString()});
  saveRoleData('finreports',_finReports);renderFinReports();closeModals();
  document.getElementById('fr-quarter').value='';document.getElementById('fr-summary').value='';
}
function renderFinReports(){
  const el=document.getElementById('fin-reports-list');if(!el)return;
  if(!_finReports.length){el.innerHTML='<div style="padding:20px;text-align:center;color:var(--t4);font-size:11px">No reports yet.</div>';return;}
  el.innerHTML=_finReports.map((r,i)=>`
    <div style="padding:12px 0;border-bottom:1px solid var(--bd);display:flex;justify-content:space-between;align-items:flex-start">
      <div><div style="font-size:12px;font-weight:700;color:var(--t1);margin-bottom:3px">${r.quarter}</div><div style="font-size:11px;color:var(--t3)">${r.summary||'No summary.'}</div><div style="font-size:10px;color:var(--t4);margin-top:3px">Created ${r.created}</div></div>
      <button class="btn btn-g btn-sm" style="color:var(--cr);flex-shrink:0" onclick="deleteFinReport(${i})">✕</button>
    </div>`).join('');
}
function deleteFinReport(i){_finReports.splice(i,1);saveRoleData('finreports',_finReports);renderFinReports();}

// ── VP OF OPERATIONS: CONFERENCE LOGISTICS ──
function addConfLogistic(){openModal('conflogistic-modal');}
function submitConfLogistic(){
  const name=document.getElementById('cl-name').value.trim();if(!name)return;
  const date=document.getElementById('cl-date').value;
  const hotel=document.getElementById('cl-hotel').value.trim();
  const catering=document.getElementById('cl-catering').value.trim();
  const transport=document.getElementById('cl-transport').value.trim();
  const regStatus=document.getElementById('cl-regstatus').value;
  const members=document.getElementById('cl-members').value.trim();
  _confLogistics.push({name,date,hotel,catering,transport,regStatus,members});
  saveRoleData('conflogistics',_confLogistics);renderConfLogistics();closeModals();
  ['cl-name','cl-date','cl-hotel','cl-catering','cl-transport','cl-members'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}
function renderConfLogistics(){
  const t=document.getElementById('conf-logistics-table');if(!t)return;
  if(!_confLogistics.length){t.innerHTML='<tr><td colspan="8" style="text-align:center;color:var(--t4);padding:20px;font-size:11px">No conferences logged yet.</td></tr>';return;}
  t.innerHTML=_confLogistics.map((c,i)=>roleRow([c.name,c.date||'—',c.hotel||'—',c.catering||'—',c.transport||'—',statusBadge(c.regStatus),c.members||'—'],`deleteConfLogistic(${i})`)).join('');
}
function deleteConfLogistic(i){_confLogistics.splice(i,1);saveRoleData('conflogistics',_confLogistics);renderConfLogistics();}

// ── KPI DASHBOARD ──
function addKPIEntry(){openModal('kpi-modal');}
function submitKPI(){
  const period=document.getElementById('kpi-period').value.trim();if(!period)return;
  const budEff=parseFloat(document.getElementById('kpi-budeff').value)||0;
  const attRate=parseFloat(document.getElementById('kpi-attrate').value)||0;
  const vendorScore=parseFloat(document.getElementById('kpi-vendor').value)||0;
  const events=parseInt(document.getElementById('kpi-events').value)||0;
  const notes=document.getElementById('kpi-notes').value.trim();
  _kpiEntries.unshift({period,budEff,attRate,vendorScore,events,notes});
  saveRoleData('kpis',_kpiEntries);renderKPIs();closeModals();
  ['kpi-period','kpi-budeff','kpi-attrate','kpi-vendor','kpi-events','kpi-notes'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}
function renderKPIs(){
  const statsRow=document.getElementById('kpi-stats-row');
  if(statsRow&&_kpiEntries.length){
    const latest=_kpiEntries[0];
    statsRow.innerHTML=[
      {l:'Budget Efficiency',v:latest.budEff+'%',c:'var(--grn)'},
      {l:'Attendance Rate',v:latest.attRate+'%',c:'var(--blu)'},
      {l:'Vendor Score',v:latest.vendorScore+'/10',c:'var(--gold)'},
      {l:'Events Run',v:latest.events,c:'var(--cr)'},
    ].map(s=>`<div class="stat-card"><div class="stat-val" style="color:${s.c}">${s.v}</div><div class="stat-lbl">${s.l}</div></div>`).join('');
  }else if(statsRow){statsRow.innerHTML='';}
  const t=document.getElementById('kpi-table');if(!t)return;
  if(!_kpiEntries.length){t.innerHTML='<tr><td colspan="7" style="text-align:center;color:var(--t4);padding:20px;font-size:11px">No KPI entries yet.</td></tr>';return;}
  t.innerHTML=_kpiEntries.map((k,i)=>roleRow([k.period,k.budEff+'%',k.attRate+'%',k.vendorScore+'/10',k.events,k.notes||'—'],`deleteKPI(${i})`)).join('');
}
function deleteKPI(i){_kpiEntries.splice(i,1);saveRoleData('kpis',_kpiEntries);renderKPIs();}

// ── ICC EXCURSIONS ──
function addICCExcursion(){openModal('iccexcursion-modal');}
function submitICCExcursion(){
  const trip=document.getElementById('iccex-trip').value.trim();if(!trip)return;
  const date=document.getElementById('iccex-date').value;
  const dest=document.getElementById('iccex-dest').value.trim();
  const mems=document.getElementById('iccex-mems').value.trim();
  const form=document.getElementById('iccex-formstatus').value;
  const approval=document.getElementById('iccex-approval').value;
  const notes=document.getElementById('iccex-notes').value.trim();
  _iccExcursions.push({trip,date,dest,mems,form,approval,notes});
  saveRoleData('iccexcursions',_iccExcursions);renderICCExcursions();closeModals();
  ['iccex-trip','iccex-date','iccex-dest','iccex-mems','iccex-notes'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}
function renderICCExcursions(){
  const t=document.getElementById('icc-excursions-table');if(!t)return;
  if(!_iccExcursions.length){t.innerHTML='<tr><td colspan="8" style="text-align:center;color:var(--t4);padding:20px;font-size:11px">No ICC excursions logged yet.</td></tr>';return;}
  t.innerHTML=_iccExcursions.map((e,i)=>roleRow([e.trip,e.date||'—',e.dest||'—',e.mems||'—',statusBadge(e.form),statusBadge(e.approval),e.notes||'—'],`deleteICCExcursion(${i})`)).join('');
}
function deleteICCExcursion(i){_iccExcursions.splice(i,1);saveRoleData('iccexcursions',_iccExcursions);renderICCExcursions();}

// ── VP OF STRATEGY: PRG ──
function addPRGMember(){openModal('prgmember-modal');}
function submitPRGMember(){
  const name=document.getElementById('prg-mname').value.trim();if(!name)return;
  const focus=document.getElementById('prg-mfocus').value.trim();
  const status=document.getElementById('prg-mstatus').value;
  const joined=document.getElementById('prg-mjoined').value.trim();
  _prgRoster.push({name,focus,status,joined});
  saveRoleData('prg_roster',_prgRoster);renderPRG();closeModals();
  ['prg-mname','prg-mfocus','prg-mjoined'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}
function addPRGInitiative(){openModal('prginitiative-modal');}
function submitPRGInitiative(){
  const name=document.getElementById('prgi-name').value.trim();if(!name)return;
  const lead=document.getElementById('prgi-lead').value.trim();
  const target=document.getElementById('prgi-target').value;
  const status=document.getElementById('prgi-status').value;
  _prgInitiatives.push({name,lead,target,status});
  saveRoleData('prg_initiatives',_prgInitiatives);renderPRG();closeModals();
  ['prgi-name','prgi-lead','prgi-target'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}
function renderPRG(){
  const rt=document.getElementById('prg-roster-table');
  if(rt){
    if(!_prgRoster.length){rt.innerHTML='<tr><td colspan="5" style="text-align:center;color:var(--t4);padding:16px;font-size:11px">No PRG members yet.</td></tr>';}
    else rt.innerHTML=_prgRoster.map((m,i)=>roleRow([m.name,m.focus||'—',statusBadge(m.status),m.joined||'—'],`deletePRGMember(${i})`)).join('');
  }
  const it=document.getElementById('prg-initiatives-table');
  if(it){
    if(!_prgInitiatives.length){it.innerHTML='<tr><td colspan="5" style="text-align:center;color:var(--t4);padding:16px;font-size:11px">No initiatives yet.</td></tr>';}
    else it.innerHTML=_prgInitiatives.map((p,i)=>roleRow([p.name,p.lead||'—',p.target||'—',statusBadge(p.status)],`deletePRGInitiative(${i})`)).join('');
  }
}
function deletePRGMember(i){_prgRoster.splice(i,1);saveRoleData('prg_roster',_prgRoster);renderPRG();}
function deletePRGInitiative(i){_prgInitiatives.splice(i,1);saveRoleData('prg_initiatives',_prgInitiatives);renderPRG();}

// ── ONBOARDING PIPELINE ──
function addOnboardee(){openModal('onboardee-modal');}
function submitOnboardee(){
  const name=document.getElementById('ob-name').value.trim();if(!name)return;
  const stage=document.getElementById('ob-stage').value;
  const email=document.getElementById('ob-email').value.trim();
  const notes=document.getElementById('ob-notes').value.trim();
  _onboardees.push({name,stage,email,notes});
  saveRoleData('onboardees',_onboardees);renderOnboarding();closeModals();
  ['ob-name','ob-email','ob-notes'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}
function renderOnboarding(){
  const stages=['Interested','Invited','Onboarded','Active'];
  stages.forEach(stage=>{
    const col=document.getElementById('ob-col-'+stage.toLowerCase());
    if(!col)return;
    const people=_onboardees.filter(o=>o.stage===stage);
    if(!people.length){col.innerHTML='<div style="font-size:10px;color:var(--t4);padding:6px 0;font-style:italic">Empty</div>';return;}
    col.innerHTML=people.map((p,i)=>`
      <div style="background:var(--s2);border:1px solid var(--bd);border-radius:6px;padding:8px 10px;margin-bottom:6px">
        <div style="font-size:11px;font-weight:600;color:var(--t1)">${p.name}</div>
        ${p.email?`<div style="font-size:10px;color:var(--t3)">${p.email}</div>`:''}
        <div style="display:flex;gap:4px;margin-top:6px;flex-wrap:wrap">
          ${stage!=='Active'?`<button class="btn btn-p btn-sm" style="font-size:9px;padding:2px 6px" onclick="advanceOnboardee(${_onboardees.indexOf(p)})">→ Next</button>`:''}
          <button class="btn btn-g btn-sm" style="color:var(--cr);font-size:9px;padding:2px 6px" onclick="deleteOnboardee(${_onboardees.indexOf(p)})">✕</button>
        </div>
      </div>`).join('');
  });
}
function advanceOnboardee(i){
  const stages=['Interested','Invited','Onboarded','Active'];
  const cur=stages.indexOf(_onboardees[i].stage);
  if(cur<stages.length-1){_onboardees[i].stage=stages[cur+1];saveRoleData('onboardees',_onboardees);renderOnboarding();}
}
function deleteOnboardee(i){_onboardees.splice(i,1);saveRoleData('onboardees',_onboardees);renderOnboarding();}

// ── DEV GOALS ──
function addDevGoal(){openModal('devgoal-modal');}
function submitDevGoal(){
  const member=document.getElementById('dg-member').value.trim();if(!member)return;
  const goal=document.getElementById('dg-goal').value.trim();
  const category=document.getElementById('dg-cat').value;
  const target=document.getElementById('dg-target').value;
  const progress=parseInt(document.getElementById('dg-progress').value)||0;
  const status=document.getElementById('dg-status').value;
  _devGoals.push({member,goal,category,target,progress,status});
  saveRoleData('devgoals',_devGoals);renderDevGoals();closeModals();
  ['dg-member','dg-goal','dg-target','dg-progress'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}
function renderDevGoals(){
  const t=document.getElementById('dev-goals-table');if(!t)return;
  if(!_devGoals.length){t.innerHTML='<tr><td colspan="7" style="text-align:center;color:var(--t4);padding:20px;font-size:11px">No development goals yet.</td></tr>';return;}
  t.innerHTML=_devGoals.map((g,i)=>{
    const bar=`<div style="height:6px;background:var(--bd);border-radius:3px;width:80px;display:inline-block;vertical-align:middle"><div style="height:6px;background:var(--grn);border-radius:3px;width:${g.progress}%"></div></div> ${g.progress}%`;
    return roleRow([g.member,g.goal,g.category,g.target||'—',bar,statusBadge(g.status)],`deleteDevGoal(${i})`);
  }).join('');
}
function deleteDevGoal(i){_devGoals.splice(i,1);saveRoleData('devgoals',_devGoals);renderDevGoals();}

// ── VP OF MARKETING: CAMPAIGNS ──
function addCampaign(){openModal('campaign-modal');}
function submitCampaign(){
  const name=document.getElementById('camp-name').value.trim();if(!name)return;
  const platforms=document.getElementById('camp-platforms').value.trim();
  const goal=document.getElementById('camp-goal').value.trim();
  const start=document.getElementById('camp-start').value;
  const end=document.getElementById('camp-end').value;
  const reach=parseInt(document.getElementById('camp-reach').value)||0;
  const eng=parseInt(document.getElementById('camp-eng').value)||0;
  const status=document.getElementById('camp-status').value;
  _campaigns.push({name,platforms,goal,start,end,reach,eng,status});
  saveRoleData('campaigns',_campaigns);renderCampaigns();closeModals();
  ['camp-name','camp-platforms','camp-goal','camp-start','camp-end','camp-reach','camp-eng'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}
function renderCampaigns(){
  const t=document.getElementById('campaigns-table');if(!t)return;
  if(!_campaigns.length){t.innerHTML='<tr><td colspan="9" style="text-align:center;color:var(--t4);padding:20px;font-size:11px">No campaigns yet.</td></tr>';return;}
  t.innerHTML=_campaigns.map((c,i)=>roleRow([c.name,c.platforms||'—',c.goal||'—',c.start||'—',c.end||'—',c.reach.toLocaleString(),c.eng.toLocaleString(),statusBadge(c.status)],`deleteCampaign(${i})`)).join('');
}
function deleteCampaign(i){_campaigns.splice(i,1);saveRoleData('campaigns',_campaigns);renderCampaigns();}

// ── ANALYTICS ──
function addAnalyticsEntry(){openModal('analytics-modal');}
function submitAnalytics(){
  const platform=document.getElementById('an-platform').value;
  const followers=parseInt(document.getElementById('an-followers').value)||0;
  const engRate=parseFloat(document.getElementById('an-engrate').value)||0;
  const reach=parseInt(document.getElementById('an-reach').value)||0;
  const topPost=document.getElementById('an-toppost').value.trim();
  _analyticsLog.push({platform,followers,engRate,reach,topPost,logged:new Date().toLocaleDateString()});
  saveRoleData('analytics',_analyticsLog);renderAnalytics();closeModals();
  ['an-followers','an-engrate','an-reach','an-toppost'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}
function renderAnalytics(){
  const statsRow=document.getElementById('analytics-stats-row');
  if(statsRow&&_analyticsLog.length){
    const totFollowers=_analyticsLog.reduce((s,a)=>s+a.followers,0);
    const avgEng=(_analyticsLog.reduce((s,a)=>s+a.engRate,0)/_analyticsLog.length).toFixed(1);
    statsRow.innerHTML=[
      {l:'Total Followers',v:totFollowers.toLocaleString(),c:'var(--blu)'},
      {l:'Avg Engagement',v:avgEng+'%',c:'var(--grn)'},
      {l:'Platforms Tracked',v:_analyticsLog.length,c:'var(--gold)'},
    ].map(s=>`<div class="stat-card"><div class="stat-val" style="color:${s.c}">${s.v}</div><div class="stat-lbl">${s.l}</div></div>`).join('');
  }else if(statsRow)statsRow.innerHTML='';
  const t=document.getElementById('analytics-table');if(!t)return;
  if(!_analyticsLog.length){t.innerHTML='<tr><td colspan="7" style="text-align:center;color:var(--t4);padding:20px;font-size:11px">No analytics logged yet.</td></tr>';return;}
  t.innerHTML=_analyticsLog.map((a,i)=>roleRow([a.platform,a.followers.toLocaleString(),a.engRate+'%',a.reach.toLocaleString(),a.topPost||'—',a.logged],`deleteAnalytics(${i})`)).join('');
}
function deleteAnalytics(i){_analyticsLog.splice(i,1);saveRoleData('analytics',_analyticsLog);renderAnalytics();}

// ── OUTREACH LOG ──
function addOutreach(){openModal('outreach-modal');}
function submitOutreach(){
  const name=document.getElementById('or-name').value.trim();if(!name)return;
  const date=document.getElementById('or-date').value;
  const location=document.getElementById('or-location').value.trim();
  const lead=document.getElementById('or-lead').value.trim();
  const contacts=parseInt(document.getElementById('or-contacts').value)||0;
  const followup=document.getElementById('or-followup').value.trim();
  const notes=document.getElementById('or-notes').value.trim();
  _outreachLog.push({name,date,location,lead,contacts,followup,notes});
  saveRoleData('outreach',_outreachLog);renderOutreach();closeModals();
  ['or-name','or-date','or-location','or-lead','or-contacts','or-followup','or-notes'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}
function renderOutreach(){
  const t=document.getElementById('outreach-table');if(!t)return;
  if(!_outreachLog.length){t.innerHTML='<tr><td colspan="8" style="text-align:center;color:var(--t4);padding:20px;font-size:11px">No outreach initiatives logged yet.</td></tr>';return;}
  t.innerHTML=_outreachLog.map((o,i)=>roleRow([o.name,o.date||'—',o.location||'—',o.lead||'—',o.contacts,o.followup||'—',o.notes||'—'],`deleteOutreach(${i})`)).join('');
}
function deleteOutreach(i){_outreachLog.splice(i,1);saveRoleData('outreach',_outreachLog);renderOutreach();}

// ── VP OF CLUB AFFAIRS: PARTNERSHIPS ──
function addPartner(){openModal('partner-modal');}
function submitPartner(){
  const name=document.getElementById('part-name').value.trim();if(!name)return;
  const type=document.getElementById('part-type').value;
  const contact=document.getElementById('part-contact').value.trim();
  const since=document.getElementById('part-since').value.trim();
  const lastTouch=document.getElementById('part-lasttouch').value;
  const notes=document.getElementById('part-notes').value.trim();
  _partners.push({name,type,contact,since,lastTouch,notes});
  saveRoleData('partners',_partners);renderPartners();closeModals();
  ['part-name','part-contact','part-since','part-lasttouch','part-notes'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}
function renderPartners(){
  const t=document.getElementById('partners-table');if(!t)return;
  if(!_partners.length){t.innerHTML='<tr><td colspan="7" style="text-align:center;color:var(--t4);padding:20px;font-size:11px">No partners logged yet.</td></tr>';return;}
  t.innerHTML=_partners.map((p,i)=>roleRow([p.name,p.type||'—',p.contact||'—',p.since||'—',p.lastTouch||'—',p.notes||'—'],`deletePartner(${i})`)).join('');
}
function deletePartner(i){_partners.splice(i,1);saveRoleData('partners',_partners);renderPartners();}

// ── COMPLIANCE / HR ──
function addComplianceTicket(){openModal('compliance-modal');}
function submitCompliance(){
  const type=document.getElementById('comp-type').value;
  const severity=document.getElementById('comp-severity').value;
  const members=document.getElementById('comp-members').value.trim();
  const desc=document.getElementById('comp-desc').value.trim();
  const status=document.getElementById('comp-status').value;
  const resolution=document.getElementById('comp-resolution').value.trim();
  _complianceLog.push({type,members,desc,logged:new Date().toLocaleDateString(),severity,status,resolution});
  saveRoleData('compliance',_complianceLog);renderCompliance();closeModals();
  ['comp-members','comp-desc','comp-resolution'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}
function renderCompliance(){
  const t=document.getElementById('compliance-table');if(!t)return;
  if(!_complianceLog.length){t.innerHTML='<tr><td colspan="8" style="text-align:center;color:var(--t4);padding:20px;font-size:11px">No compliance issues logged. That\'s a good sign!</td></tr>';return;}
  t.innerHTML=_complianceLog.map((c,i)=>roleRow([c.type,c.members||'—',c.desc||'—',c.logged,priorityBadge(c.severity),statusBadge(c.status),c.resolution||'Pending'],`deleteCompliance(${i})`)).join('');
}
function deleteCompliance(i){_complianceLog.splice(i,1);saveRoleData('compliance',_complianceLog);renderCompliance();}

// ── ROOM BOOKINGS ──
function addRoomBooking(){openModal('roombooking-modal');}
function submitRoomBooking(){
  const room=document.getElementById('rb-room').value.trim();if(!room)return;
  const date=document.getElementById('rb-date').value;
  const time=document.getElementById('rb-time').value.trim();
  const status=document.getElementById('rb-status').value;
  const purpose=document.getElementById('rb-purpose').value.trim();
  const reqBy=document.getElementById('rb-reqby').value.trim();
  _roomBookings.push({room,date,time,purpose,reqBy,status});
  saveRoleData('roombookings',_roomBookings);renderRoomBookings();closeModals();
  ['rb-room','rb-date','rb-time','rb-purpose','rb-reqby'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}
function renderRoomBookings(){
  const t=document.getElementById('room-bookings-table');if(!t)return;
  if(!_roomBookings.length){t.innerHTML='<tr><td colspan="7" style="text-align:center;color:var(--t4);padding:20px;font-size:11px">No room bookings yet.</td></tr>';return;}
  t.innerHTML=_roomBookings.map((b,i)=>roleRow([b.room,b.date||'—',b.time||'—',b.purpose||'—',b.reqBy||'—',statusBadge(b.status)],`deleteRoomBooking(${i})`)).join('');
}
function deleteRoomBooking(i){_roomBookings.splice(i,1);saveRoleData('roombookings',_roomBookings);renderRoomBookings();}

// ── ICC MINUTES & BLUE PANDA ──
function addICCMinutes(){openModal('iccminute-modal');}
function submitICCMinute(){
  const date=document.getElementById('iccm-date').value;if(!date)return;
  const summary=document.getElementById('iccm-summary').value.trim();
  const actions=document.getElementById('iccm-actions').value.trim();
  _iccMinutes.unshift({date,summary,actions});
  saveRoleData('iccminutes',_iccMinutes);renderICCBluePanda();closeModals();
  ['iccm-date','iccm-summary','iccm-actions'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}
function addBluePandaReg(){openModal('bluepanda-modal');}
function submitBluePanda(){
  const member=document.getElementById('bp-member').value.trim();if(!member)return;
  const conf=document.getElementById('bp-conf').value;
  const event=document.getElementById('bp-event').value.trim();
  const registered=document.getElementById('bp-registered').value||new Date().toLocaleDateString();
  const status=document.getElementById('bp-status').value;
  _bluePandaRegs.push({member,event,conf,registered,status});
  saveRoleData('bluepanda',_bluePandaRegs);renderICCBluePanda();closeModals();
  ['bp-member','bp-event','bp-registered'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}
function renderICCBluePanda(){
  const ml=document.getElementById('icc-minutes-list');
  if(ml){
    if(!_iccMinutes.length){ml.innerHTML='<div style="padding:20px;text-align:center;color:var(--t4);font-size:11px">No ICC minutes logged yet.</div>';}
    else ml.innerHTML=_iccMinutes.map((m,i)=>`
      <div style="padding:12px 0;border-bottom:1px solid var(--bd);display:flex;justify-content:space-between;align-items:flex-start">
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--t1)">${m.date} — ICC Meeting</div>
          <div style="font-size:10.5px;color:var(--t2);margin-top:3px">${m.summary||'No summary.'}</div>
          ${m.actions?`<div style="font-size:10px;color:var(--t4);margin-top:3px">Action items: ${m.actions}</div>`:''}
        </div>
        <button class="btn btn-g btn-sm" style="color:var(--cr);flex-shrink:0" onclick="deleteICCMinutes(${i})">✕</button>
      </div>`).join('');
  }
  const t=document.getElementById('blue-panda-table');if(!t)return;
  if(!_bluePandaRegs.length){t.innerHTML='<tr><td colspan="6" style="text-align:center;color:var(--t4);padding:16px;font-size:11px">No Blue Panda registrations yet.</td></tr>';return;}
  t.innerHTML=_bluePandaRegs.map((r,i)=>roleRow([r.member,r.event||'—',r.conf||'—',r.registered,statusBadge(r.status)],`deleteBluePanda(${i})`)).join('');
}
function deleteICCMinutes(i){_iccMinutes.splice(i,1);saveRoleData('iccminutes',_iccMinutes);renderICCBluePanda();}
function deleteBluePanda(i){_bluePandaRegs.splice(i,1);saveRoleData('bluepanda',_bluePandaRegs);renderICCBluePanda();}

// ── PRESIDENT'S HUB ──
function renderConfDues(){
  const el=document.getElementById('conf-dues-list');if(!el)return;
  if(!_confEvents.length){el.innerHTML='<div style="padding:20px;text-align:center;color:var(--t4);font-size:11px">No conferences set up yet.</div>';return;}
  el.innerHTML=_confEvents.map((c,ci)=>{
    const allMembers=(typeof members!=='undefined'?members:[]);
    const paid=c.paid||[];const unpaid=c.unpaid||[];
    const total=paid.length+unpaid.length;
    const pct=total>0?Math.round((paid.length/total)*100):0;
    return`<div class="card" style="margin-bottom:12px">
      <div class="ch">
        <div>
          <div class="ct">${c.name}</div>
          <div style="font-size:10px;color:var(--t3)">${c.date||''} · $${c.dues} per member</div>
        </div>
        <div style="display:flex;gap:6px">
          <button class="btn btn-p btn-sm" onclick="markDuesPaid(${ci})">+ Mark Paid</button>
          <button class="btn btn-g btn-sm" onclick="deleteConfEvent(${ci})">✕ Remove</button>
        </div>
      </div>
      <div style="padding:0 16px 14px">
        <div style="display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap">
          <div style="flex:1;min-width:120px;padding:8px 12px;background:var(--grn)11;border:1px solid var(--grn)33;border-radius:6px">
            <div style="font-size:18px;font-weight:700;color:var(--grn)">${paid.length}</div>
            <div style="font-size:10px;color:var(--t3)">Paid</div>
          </div>
          <div style="flex:1;min-width:120px;padding:8px 12px;background:var(--cr)11;border:1px solid var(--cr)33;border-radius:6px">
            <div style="font-size:18px;font-weight:700;color:var(--cr)">${unpaid.length}</div>
            <div style="font-size:10px;color:var(--t3)">Unpaid</div>
          </div>
          <div style="flex:1;min-width:120px;padding:8px 12px;background:var(--blu)11;border:1px solid var(--blu)33;border-radius:6px">
            <div style="font-size:18px;font-weight:700;color:var(--blu)">$${(paid.length*c.dues).toFixed(0)}</div>
            <div style="font-size:10px;color:var(--t3)">Collected</div>
          </div>
        </div>
        <div style="height:6px;background:var(--bd);border-radius:3px;margin-bottom:6px">
          <div style="height:6px;background:var(--grn);border-radius:3px;width:${pct}%;transition:width .3s"></div>
        </div>
        <div style="font-size:10px;color:var(--t3)">${pct}% collection rate · ${paid.join(', ')||'No paid members yet'}</div>
      </div>
    </div>`;
  }).join('');
}
function addConfEvent(){openModal('confpres-modal');}
function submitConfPres(){
  const name=document.getElementById('cp-name').value.trim();if(!name)return;
  const date=document.getElementById('cp-date').value.trim();
  const dues=parseFloat(document.getElementById('cp-dues').value)||0;
  _confEvents.push({name,date,dues,paid:[],unpaid:[]});
  saveRoleData('confevents',_confEvents);renderConfDues();closeModals();
  ['cp-name','cp-date','cp-dues'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
}
function markDuesPaid(ci){
  document.getElementById('duespaid-idx').value=ci;
  openModal('duespaid-modal');
}
function submitDuesPaid(){
  const ci=parseInt(document.getElementById('duespaid-idx').value);
  const name=document.getElementById('duespaid-member').value.trim();if(!name)return;
  if(!_confEvents[ci].paid.includes(name)){_confEvents[ci].paid.push(name);}
  const ui=_confEvents[ci].unpaid.indexOf(name);if(ui>-1)_confEvents[ci].unpaid.splice(ui,1);
  saveRoleData('confevents',_confEvents);renderConfDues();closeModals();
  document.getElementById('duespaid-member').value='';
}
function deleteConfEvent(ci){_confEvents.splice(ci,1);saveRoleData('confevents',_confEvents);renderConfDues();}

function renderPresAgendas(){
  const el=document.getElementById('pres-agendas-list');if(!el)return;
  if(!_presAgendas.length){el.innerHTML='<div style="padding:20px;text-align:center;color:var(--t4);font-size:11px">No agendas yet. Use "New Agenda" to build one.</div>';return;}
  el.innerHTML=_presAgendas.map((a,i)=>`
    <div style="border:1px solid var(--bd);border-radius:8px;margin-bottom:10px;overflow:hidden">
      <div style="padding:10px 14px;background:var(--s2);display:flex;justify-content:space-between;align-items:center">
        <div>
          <span style="font-size:9px;font-weight:700;text-transform:uppercase;padding:2px 8px;border-radius:10px;background:var(--cr)22;color:var(--cr);margin-right:6px">${a.type}</span>
          <span style="font-size:12px;font-weight:700;color:var(--t1)">${a.date}</span>
        </div>
        <button class="btn btn-g btn-sm" style="color:var(--cr)" onclick="deletePresAgenda(${i})">✕</button>
      </div>
      <div style="padding:10px 14px;font-size:11px;white-space:pre-wrap;color:var(--t2);line-height:1.6">${a.items||'(No items)'}</div>
    </div>`).join('');
}
function newPresAgenda(){openModal('agendapres-modal');}
function submitPresAgenda(){
  const type=document.getElementById('ap-type').value;
  const date=document.getElementById('ap-date').value;if(!date)return;
  const items=document.getElementById('ap-items').value.trim();
  _presAgendas.unshift({type,date,items});
  saveRoleData('agendas',_presAgendas);renderPresAgendas();closeModals();
  document.getElementById('ap-date').value='';document.getElementById('ap-items').value='';
}
function deletePresAgenda(i){_presAgendas.splice(i,1);saveRoleData('agendas',_presAgendas);renderPresAgendas();}

function renderDelegation(){
  const t=document.getElementById('delegation-table');if(!t)return;
  if(!_delegations.length){t.innerHTML='<tr><td colspan="7" style="text-align:center;color:var(--t4);padding:20px;font-size:11px">No deliverables assigned yet.</td></tr>';return;}
  t.innerHTML=_delegations.map((d,i)=>roleRow([d.task,d.assignee,d.portal||'—',d.due||'—',priorityBadge(d.priority),statusBadge(d.status)],`deleteDelegation(${i})`)).join('');
}
function addDelegation(){openModal('delegation-modal');}
function submitDelegation(){
  const task=document.getElementById('del-task').value.trim();if(!task)return;
  const assignee=document.getElementById('del-assignee').value;
  const portal=document.getElementById('del-portal').value;
  const due=document.getElementById('del-due').value;
  const priority=document.getElementById('del-priority').value;
  const status=document.getElementById('del-status').value;
  _delegations.push({task,assignee,portal,due,priority,status});
  saveRoleData('delegation',_delegations);renderDelegation();closeModals();
  document.getElementById('del-task').value='';document.getElementById('del-due').value='';
}
function deleteDelegation(i){_delegations.splice(i,1);saveRoleData('delegation',_delegations);renderDelegation();}

function toggleMobSidebar(sbId,ovId){
  document.getElementById(sbId).classList.toggle('mob-open');
  document.getElementById(ovId).classList.toggle('open');
}
function closeMobSidebar(sbId,ovId){
  document.getElementById(sbId).classList.remove('mob-open');
  document.getElementById(ovId).classList.remove('open');
}
document.addEventListener('click',function(e){
  if(e.target.closest('.ni')&&window.innerWidth<=768){
    document.querySelectorAll('.sb').forEach(function(sb){sb.classList.remove('mob-open');});
    document.querySelectorAll('.sb-overlay').forEach(function(o){o.classList.remove('open');});
  }
});

// ── VP DASHBOARD ─────────────────────────────────────────────────────────────
function renderVPDash(){
  // gather all outstanding + refund-pending members across all conferences
  let outstanding=[];let refundPending=[];
  _confPayLedger.forEach(conf=>{
    (conf.members||[]).forEach(m=>{
      const fullyPaid=m.deposit!=='Not Yet'&&m.fee1!=='Not Yet'&&m.fee2!=='Not Yet';
      if(!fullyPaid)outstanding.push({...m,conf:conf.name});
      if(m.refund==='Pending'||m.refund==='Not Yet')refundPending.push({...m,conf:conf.name});
    });
  });
  const totalMembers=_confPayLedger.reduce((s,c)=>s+(c.members||[]).length,0);
  const totalCollected=_confPayLedger.reduce((s,c)=>(c.members||[]).reduce((s2,m)=>s2+(m.totalReceived||0),s),0);
  // Stats
  const sl=document.getElementById('vp-dash-stats');
  if(sl)sl.innerHTML=[
    {l:'Conferences',v:_confPayLedger.length,s:'Tracked'},
    {l:'Total Collected',v:'$'+totalCollected.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}),s:'All conferences'},
    {l:'Outstanding',v:outstanding.length,s:'Members w/ unpaid phases'},
    {l:'Refunds Pending',v:refundPending.length,s:'Awaiting refund'}
  ].map(s=>`<div class="sc"><div class="sl">${s.l}</div><div class="sv">${s.v}</div><div class="sm">${s.s}</div></div>`).join('');
  // Outstanding badge
  const ob=document.getElementById('vp-outstanding-badge');
  if(ob){ob.style.display=outstanding.length?'':'none';ob.textContent=outstanding.length;}
  const rb=document.getElementById('vp-refunds-badge');
  if(rb){rb.style.display=refundPending.length?'':'none';rb.textContent=refundPending.length;}
  // Outstanding list
  const ol=document.getElementById('vp-outstanding-list');
  if(ol){
    if(!outstanding.length){ol.innerHTML='<div style="font-size:11px;color:var(--t4);padding:10px 16px">All members fully paid ✓</div>';}
    else{ol.innerHTML='<div style="padding:0 16px 10px">'+outstanding.map(m=>{
      const missing=[];
      if(m.deposit==='Not Yet')missing.push('$250 Deposit');
      if(m.fee1==='Not Yet')missing.push('$15 Fee');
      if(m.fee2==='Not Yet')missing.push('$235 Final');
      return`<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--bd)">
        <div><div style="font-size:11px;font-weight:600;color:var(--t1)">${m.name}</div><div style="font-size:10px;color:var(--t3)">${m.conf}</div></div>
        <div style="text-align:right"><span class="badge br">${missing.join(' + ')}</span></div>
      </div>`;
    }).join('')+'</div>';}
  }
  // Refunds pending list
  const rl=document.getElementById('vp-refunds-list');
  if(rl){
    if(!refundPending.length){rl.innerHTML='<div style="font-size:11px;color:var(--t4);padding:10px 16px">No pending refunds ✓</div>';}
    else{rl.innerHTML='<div style="padding:0 16px 10px">'+refundPending.map(m=>`
      <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--bd)">
        <div><div style="font-size:11px;font-weight:600;color:var(--t1)">${m.name}</div><div style="font-size:10px;color:var(--t3)">${m.conf}</div></div>
        <span class="badge bo">${m.refund}</span>
      </div>`).join('')+'</div>';}
  }
  // Checklist
  const cl=document.getElementById('vp-checklist-items');
  if(cl){
    const items=[
      {done:outstanding.length===0,text:'All conference payments collected'},
      {done:refundPending.length===0,text:'All refunds issued'},
      {done:_iccForms.length>0,text:'ICC forms submitted for all reimbursements'},
      {done:_finReports.length>0,text:'Financial report filed'},
      {done:transactions.income.length>3,text:'Budget ledger up to date'},
      {done:_roiEntries.length>0,text:'ROI analysis completed for each event'},
    ];
    cl.innerHTML=items.map(item=>`
      <div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid var(--bd)">
        <div style="width:18px;height:18px;border-radius:4px;background:${item.done?'var(--grn)':'var(--s3)'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
          <span style="font-size:11px;color:${item.done?'#fff':'var(--t4)'}">${item.done?'✓':''}</span>
        </div>
        <span style="font-size:11px;color:${item.done?'var(--t2)':'var(--t1)'}${item.done?';text-decoration:line-through':''}">${item.text}</span>
      </div>`).join('');
  }
}

// ── CONF. PAYMENT LEDGER ──────────────────────────────────────────────────────
function renderConfPayLedger(){
  const conf=_confPayLedger[_cplActiveConf];
  // populate select
  const sel=document.getElementById('cpl-conf-select');
  if(sel){sel.innerHTML=_confPayLedger.map((c,i)=>`<option value="${i}"${i===_cplActiveConf?' selected':''}>${c.name}</option>`).join('');}
  if(!conf)return;
  document.getElementById('cpl-conf-subtitle')&&(document.getElementById('cpl-conf-subtitle').textContent=
    `$${conf.depositAmt} deposit + $${conf.fee1Amt} fee + $${conf.fee2Amt} final = $${conf.depositAmt+conf.fee1Amt+conf.fee2Amt} total · Refund: $${conf.refundPerPerson}/person`);
  const members=conf.members||[];
  // filter
  const filter=(document.getElementById('cpl-filter')||{}).value||'';
  const filtered=members.filter(m=>{
    if(!filter)return true;
    if(filter==='outstanding')return m.deposit==='Not Yet'||m.fee1==='Not Yet'||m.fee2==='Not Yet';
    if(filter==='refund-pending')return m.refund==='Pending'||m.refund==='Not Yet';
    return m.gender===filter;
  });
  // stats
  const totalRcvd=members.reduce((s,m)=>s+(m.totalReceived||0),0);
  const totalDue=(conf.depositAmt+conf.fee1Amt+conf.fee2Amt)*members.filter(m=>m.deposit!=='N/A').length+
    members.filter(m=>m.deposit==='N/A').reduce((s,m)=>s+(m.totalReceived||0),0);
  const outstanding=members.filter(m=>m.deposit==='Not Yet'||m.fee1==='Not Yet'||m.fee2==='Not Yet').length;
  const males=members.filter(m=>m.gender==='Male').length;
  const females=members.filter(m=>m.gender==='Female').length;
  const refundTotal=(conf.refundPerPerson||0)*members.filter(m=>m.refund==='Refunded').length;
  const sl=document.getElementById('cpl-stats');
  if(sl)sl.innerHTML=[
    {l:'Members',v:members.length,s:`${males}M / ${females}F`},
    {l:'Total Received',v:'$'+totalRcvd.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,','),s:'All phases'},
    {l:'Outstanding',v:outstanding,s:'Not fully paid'},
    {l:'Refunds Issued',v:'$'+refundTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,','),s:`@ $${conf.refundPerPerson}/person`},
  ].map(s=>`<div class="sc"><div class="sl">${s.l}</div><div class="sv">${s.v}</div><div class="sm">${s.s}</div></div>`).join('');
  // table
  const t=document.getElementById('cpl-table');if(!t)return;
  const mc={Paid:'bg',Cash:'bo',['Not Yet']:'br','N/A':'bo'};
  const rc={Refunded:'bg',Pending:'bo',['Not Yet']:'br','N/A':'bo'};
  t.innerHTML=filtered.map((m,i)=>{
    const realIdx=members.indexOf(m);
    return`<tr>
      <td style="font-weight:600;min-width:140px">${m.name}</td>
      <td><span class="badge ${m.gender==='Male'?'bo':'br'}">${m.gender==='Male'?'M':'F'}</span></td>
      <td style="text-align:center"><span class="badge ${mc[m.deposit]||'bo'}">${m.deposit}</span></td>
      <td style="text-align:center"><span class="badge ${mc[m.fee1]||'bo'}">${m.fee1}</span></td>
      <td style="text-align:center"><span class="badge ${mc[m.fee2]||'bo'}">${m.fee2}</span></td>
      <td style="font-size:10px">${m.method||'—'}</td>
      <td style="font-weight:600;color:var(--grn)">$${(m.totalReceived||0).toFixed(2)}</td>
      <td><span class="badge ${rc[m.refund]||'bo'}">${m.refund}</span></td>
      <td style="font-size:10px;color:var(--t3);max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${m.notes||'—'}</td>
      <td style="display:flex;gap:4px">
        <button class="btn btn-g btn-sm" onclick="editConfPayMember(${realIdx})">Edit</button>
        <button class="btn btn-g btn-sm" style="color:var(--cr)" onclick="deleteConfPayMember(${realIdx})">✕</button>
      </td>
    </tr>`;
  }).join('');
}
function switchConfPayConf(val){_cplActiveConf=parseInt(val)||0;renderConfPayLedger();}
function openCplBulkModal(){
  // Populate the in-modal conference dropdown
  const sel=document.getElementById('bulk-conf-idx');
  const msg=document.getElementById('bulk-no-conf-msg');
  sel.innerHTML=_confPayLedger.map((c,i)=>`<option value="${i}">${c.name}</option>`).join('');
  // Pre-select the currently active conference
  sel.value=String(_cplActiveConf);
  const hasConf=_confPayLedger.length>0;
  if(msg)msg.style.display=hasConf?'none':'';
  // Reset all fields
  document.getElementById('bulk-names').value='';
  document.getElementById('bulk-gender').value='';
  document.getElementById('bulk-method').value='Online';
  document.getElementById('bulk-deposit').value='Not Yet';
  document.getElementById('bulk-fee1').value='Not Yet';
  document.getElementById('bulk-fee2').value='Not Yet';
  document.getElementById('bulk-refund').value='Pending';
  document.getElementById('bulk-total').value='0';
  document.getElementById('bulk-notes').value='';
  document.getElementById('bulk-preview-count').textContent='';
  // Live count as user types
  const ta=document.getElementById('bulk-names');
  ta.oninput=()=>{
    const n=ta.value.split('\n').map(s=>s.trim()).filter(Boolean).length;
    document.getElementById('bulk-preview-count').textContent=n?`Ready to add ${n} member${n>1?'s':''}.`:'';
  };
  openModal('cpl-bulk-modal');
}
function submitBulkConfPayMembers(){
  const idx=parseInt(document.getElementById('bulk-conf-idx').value);
  const conf=_confPayLedger[isNaN(idx)?_cplActiveConf:idx];
  if(!conf){alert('No conference found. Please create one first.');return;}
  if(!conf.members)conf.members=[];
  const rawNames=document.getElementById('bulk-names').value;
  const names=rawNames.split('\n').map(s=>s.trim()).filter(Boolean);
  if(!names.length){alert('Please enter at least one name.');return;}
  const gender=document.getElementById('bulk-gender').value;
  const method=document.getElementById('bulk-method').value;
  const deposit=document.getElementById('bulk-deposit').value;
  const fee1=document.getElementById('bulk-fee1').value;
  const fee2=document.getElementById('bulk-fee2').value;
  const refund=document.getElementById('bulk-refund').value;
  const total=parseFloat(document.getElementById('bulk-total').value)||0;
  const notes=document.getElementById('bulk-notes').value.trim();
  names.forEach(name=>{
    conf.members.push({name,gender,deposit,fee1,fee2,method,totalReceived:total,refund,notes});
  });
  _cplActiveConf=isNaN(idx)?_cplActiveConf:idx;
  saveRoleData('confpayledger',_confPayLedger);renderConfPayLedger();closeModals();
}

function addConfPayMember(){
  document.getElementById('cpl-member-modal-title').textContent='Add Payment Member';
  document.getElementById('cpl-edit-index').value='-1';
  ['cpl-name','cpl-notes'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('cpl-total').value='';
  document.getElementById('cpl-deposit').value='Paid';
  document.getElementById('cpl-fee1').value='Paid';
  document.getElementById('cpl-fee2').value='Paid';
  document.getElementById('cpl-method').value='Online';
  document.getElementById('cpl-refund').value='Refunded';
  openModal('cpl-member-modal');
}
function editConfPayMember(idx){
  const conf=_confPayLedger[_cplActiveConf];if(!conf)return;
  const m=conf.members[idx];if(!m)return;
  document.getElementById('cpl-member-modal-title').textContent='Edit Payment Member';
  document.getElementById('cpl-edit-index').value=idx;
  document.getElementById('cpl-name').value=m.name||'';
  document.getElementById('cpl-gender').value=m.gender||'Male';
  document.getElementById('cpl-deposit').value=m.deposit||'Paid';
  document.getElementById('cpl-fee1').value=m.fee1||'Paid';
  document.getElementById('cpl-fee2').value=m.fee2||'Paid';
  document.getElementById('cpl-method').value=m.method||'Online';
  document.getElementById('cpl-total').value=m.totalReceived||'';
  document.getElementById('cpl-refund').value=m.refund||'Pending';
  document.getElementById('cpl-notes').value=m.notes||'';
  openModal('cpl-member-modal');
}
function submitConfPayMember(){
  const name=document.getElementById('cpl-name').value.trim();if(!name)return;
  const conf=_confPayLedger[_cplActiveConf];if(!conf)return;
  const entry={
    name,
    gender:document.getElementById('cpl-gender').value,
    deposit:document.getElementById('cpl-deposit').value,
    fee1:document.getElementById('cpl-fee1').value,
    fee2:document.getElementById('cpl-fee2').value,
    method:document.getElementById('cpl-method').value,
    totalReceived:parseFloat(document.getElementById('cpl-total').value)||0,
    refund:document.getElementById('cpl-refund').value,
    notes:document.getElementById('cpl-notes').value.trim()
  };
  const editIdx=parseInt(document.getElementById('cpl-edit-index').value);
  if(editIdx>=0){conf.members[editIdx]=entry;}else{conf.members.push(entry);}
  saveRoleData('confpayledger',_confPayLedger);renderConfPayLedger();closeModals();
}
function deleteConfPayMember(idx){
  const conf=_confPayLedger[_cplActiveConf];if(!conf)return;
  conf.members.splice(idx,1);saveRoleData('confpayledger',_confPayLedger);renderConfPayLedger();
}
function newConfPayConf(){openModal('cpl-conf-modal');}
function submitConfPayConf(){
  const name=document.getElementById('cpl-conf-name').value.trim();if(!name)return;
  const depositAmt=parseFloat(document.getElementById('cpl-conf-deposit').value)||250;
  const fee1Amt=parseFloat(document.getElementById('cpl-conf-fee1').value)||15;
  const fee2Amt=parseFloat(document.getElementById('cpl-conf-fee2').value)||235;
  const refundPerPerson=parseFloat(document.getElementById('cpl-conf-refund').value)||0;
  const id='conf'+Date.now();
  _confPayLedger.push({id,name,depositAmt,fee1Amt,fee2Amt,refundPerPerson,members:[]});
  _cplActiveConf=_confPayLedger.length-1;
  saveRoleData('confpayledger',_confPayLedger);renderConfPayLedger();closeModals();
  document.getElementById('cpl-conf-name').value='';
}
function exportConfPayCSV(){
  const conf=_confPayLedger[_cplActiveConf];if(!conf)return;
  const rows=[['Name','Gender','$'+conf.depositAmt+' Deposit','$'+conf.fee1Amt+' Fee','$'+conf.fee2Amt+' Final','Method','Total Received','Refund','Notes']];
  (conf.members||[]).forEach(m=>rows.push([m.name,m.gender,m.deposit,m.fee1,m.fee2,m.method,m.totalReceived,m.refund,m.notes||'']));
  const csv=rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);
  a.download=(conf.name||'payments').replace(/[^a-z0-9]/gi,'_')+'.csv';a.click();
}

// ── OFFICER CHECK-INS ────────────────────────────────────────────────────────
function addOfficerCheckin(){openModal('officer-checkin-modal');document.getElementById('oc-date').value=new Date().toISOString().slice(0,10);}
function renderOfficerCheckins(){
  const t=document.getElementById('officer-checkins-table');if(!t)return;
  if(!_officerCheckins.length){t.innerHTML='<tr><td colspan="7" style="font-size:11px;color:var(--t4);padding:12px">No check-ins logged yet.</td></tr>';return;}
  const ac={Present:'bg',Late:'bo',['Absent - Excused']:'bo',['Absent - Unexcused']:'br'};
  t.innerHTML=_officerCheckins.map((c,i)=>`<tr>
    <td>${c.officer}</td><td>${c.role}</td><td>${c.date||'—'}</td><td>${c.type}</td>
    <td><span class="badge ${ac[c.attendance]||'bo'}">${c.attendance}</span></td>
    <td style="max-width:200px;font-size:10px;color:var(--t3)">${c.notes||'—'}</td>
    <td><button class="btn btn-g btn-sm" style="color:var(--cr)" onclick="deleteOfficerCheckin(${i})">✕</button></td>
  </tr>`).join('');
}
function submitOfficerCheckin(){
  const officer=document.getElementById('oc-officer').value;
  const role=document.getElementById('oc-role').value;
  const date=document.getElementById('oc-date').value;
  const type=document.getElementById('oc-type').value;
  const attendance=document.getElementById('oc-attendance').value;
  const notes=document.getElementById('oc-notes').value.trim();
  _officerCheckins.push({officer,role,date,type,attendance,notes});
  saveRoleData('officercheckins',_officerCheckins);renderOfficerCheckins();closeModals();
  document.getElementById('oc-notes').value='';
}
function deleteOfficerCheckin(i){_officerCheckins.splice(i,1);saveRoleData('officercheckins',_officerCheckins);renderOfficerCheckins();}

// ── DECISION LOG ─────────────────────────────────────────────────────────────
function addDecision(){openModal('decision-log-modal');document.getElementById('dec-date').value=new Date().toISOString().slice(0,10);}
function renderDecisionLog(){
  const t=document.getElementById('decision-log-table');if(!t)return;
  if(!_decisionLog.length){t.innerHTML='<tr><td colspan="7" style="font-size:11px;color:var(--t4);padding:12px">No decisions logged yet.</td></tr>';return;}
  const ic={High:'br',Medium:'bo',Low:'bg'};
  const sc={Active:'bg',['Under Review']:'bo',Reversed:'br',Completed:'bg'};
  t.innerHTML=_decisionLog.map((d,i)=>`<tr>
    <td style="font-weight:600">${d.decision}</td><td>${d.by}</td><td>${d.date||'—'}</td>
    <td style="max-width:160px;font-size:10px;color:var(--t3)">${d.rationale||'—'}</td>
    <td><span class="badge ${ic[d.impact]||'bo'}">${d.impact}</span></td>
    <td><span class="badge ${sc[d.status]||'bo'}">${d.status}</span></td>
    <td><button class="btn btn-g btn-sm" style="color:var(--cr)" onclick="deleteDecision(${i})">✕</button></td>
  </tr>`).join('');
}
function submitDecision(){
  const decision=document.getElementById('dec-decision').value.trim();if(!decision)return;
  const by=document.getElementById('dec-by').value;
  const date=document.getElementById('dec-date').value;
  const rationale=document.getElementById('dec-rationale').value.trim();
  const impact=document.getElementById('dec-impact').value;
  const status=document.getElementById('dec-status').value;
  _decisionLog.push({decision,by,date,rationale,impact,status});
  saveRoleData('decisionlog',_decisionLog);renderDecisionLog();closeModals();
  document.getElementById('dec-decision').value='';document.getElementById('dec-rationale').value='';
}
function deleteDecision(i){_decisionLog.splice(i,1);saveRoleData('decisionlog',_decisionLog);renderDecisionLog();}

// ── MEMBER POINTS ─────────────────────────────────────────────────────────────
function addMemberPointsEntry(){openModal('member-points-modal');document.getElementById('mp-lastactive').value=new Date().toISOString().slice(0,10);}
function renderMemberPoints(){
  const t=document.getElementById('member-points-table');if(!t)return;
  if(!_memberPoints.length){t.innerHTML='<tr><td colspan="7" style="font-size:11px;color:var(--t4);padding:12px">No members tracked yet.</td></tr>';return;}
  const tc={Bronze:'bo',Silver:'bo',Gold:'bo',Platinum:'bg'};
  const sorted=[..._memberPoints].sort((a,b)=>b.points-a.points);
  t.innerHTML=sorted.map((m,i)=>`<tr>
    <td><span style="font-size:10px;color:var(--t4);margin-right:6px">#${i+1}</span><b>${m.name}</b></td>
    <td style="font-weight:700;color:var(--grn)">${m.points}</td>
    <td>${m.events||0}</td><td>${m.lastactive||'—'}</td>
    <td><span class="badge ${tc[m.tier]||'bo'}">${m.tier}</span></td>
    <td style="font-size:10px;color:var(--t3)">${m.notes||'—'}</td>
    <td><button class="btn btn-g btn-sm" style="color:var(--cr)" onclick="deleteMemberPoints('${m.name}')">✕</button></td>
  </tr>`).join('');
}
function submitMemberPoints(){
  const name=document.getElementById('mp-name').value.trim();if(!name)return;
  const points=parseInt(document.getElementById('mp-points').value)||0;
  const events=parseInt(document.getElementById('mp-events').value)||0;
  const lastactive=document.getElementById('mp-lastactive').value;
  const tier=document.getElementById('mp-tier').value;
  const notes=document.getElementById('mp-notes').value.trim();
  const existing=_memberPoints.findIndex(m=>m.name.toLowerCase()===name.toLowerCase());
  if(existing>=0){_memberPoints[existing]={name,points,events,lastactive,tier,notes};}
  else{_memberPoints.push({name,points,events,lastactive,tier,notes});}
  saveRoleData('memberpoints',_memberPoints);renderMemberPoints();closeModals();
  document.getElementById('mp-name').value='';document.getElementById('mp-points').value='';document.getElementById('mp-events').value='';document.getElementById('mp-notes').value='';
}
function deleteMemberPoints(name){const i=_memberPoints.findIndex(m=>m.name===name);if(i>=0){_memberPoints.splice(i,1);saveRoleData('memberpoints',_memberPoints);renderMemberPoints();}}

// ── EVENT CHECKLISTS ──────────────────────────────────────────────────────────
function addEventChecklist(){openModal('event-checklist-modal');document.getElementById('ec-date').value=new Date().toISOString().slice(0,10);}
function renderEventChecklists(){
  const t=document.getElementById('event-checklist-table');if(!t)return;
  if(!_eventChecklists.length){t.innerHTML='<tr><td colspan="7" style="font-size:11px;color:var(--t4);padding:12px">No event checklists yet.</td></tr>';return;}
  const sc={['Pre-Event']:'bo',['In Progress']:'bo',['Post-Event']:'bo',Completed:'bg'};
  t.innerHTML=_eventChecklists.map((e,i)=>`<tr>
    <td style="font-weight:600">${e.event}</td><td>${e.date||'—'}</td>
    <td style="font-size:10px;color:var(--t3);max-width:140px">${e.pre||'—'}</td>
    <td style="font-size:10px;color:var(--t3);max-width:140px">${e.post||'—'}</td>
    <td>${e.owner||'—'}</td>
    <td><span class="badge ${sc[e.status]||'bo'}">${e.status}</span></td>
    <td><button class="btn btn-g btn-sm" style="color:var(--cr)" onclick="deleteEventChecklist(${i})">✕</button></td>
  </tr>`).join('');
}
function submitEventChecklist(){
  const event=document.getElementById('ec-event').value.trim();if(!event)return;
  const date=document.getElementById('ec-date').value;
  const pre=document.getElementById('ec-pre').value.trim();
  const post=document.getElementById('ec-post').value.trim();
  const owner=document.getElementById('ec-owner').value.trim();
  const status=document.getElementById('ec-status').value;
  _eventChecklists.push({event,date,pre,post,owner,status});
  saveRoleData('eventchecklists',_eventChecklists);renderEventChecklists();closeModals();
  ['ec-event','ec-pre','ec-post','ec-owner'].forEach(id=>document.getElementById(id).value='');
}
function deleteEventChecklist(i){_eventChecklists.splice(i,1);saveRoleData('eventchecklists',_eventChecklists);renderEventChecklists();}

// ── VENDOR DIRECTORY ──────────────────────────────────────────────────────────
function addVendorEntry(){openModal('vendor-modal');}
function renderVendors(){
  const t=document.getElementById('vendors-directory-table');if(!t)return;
  if(!_vendors.length){t.innerHTML='<tr><td colspan="8" style="font-size:11px;color:var(--t4);padding:12px">No vendors added yet.</td></tr>';return;}
  t.innerHTML=_vendors.map((v,i)=>`<tr>
    <td style="font-weight:600">${v.name}</td>
    <td><span class="badge bo">${v.category}</span></td>
    <td>${v.contact||'—'}</td>
    <td style="font-size:10px;color:var(--t3)">${v.reach||'—'}</td>
    <td>${v.lastused||'—'}</td>
    <td>${v.rating||'—'}</td>
    <td style="font-size:10px;color:var(--t3);max-width:140px">${v.notes||'—'}</td>
    <td><button class="btn btn-g btn-sm" style="color:var(--cr)" onclick="deleteVendor(${i})">✕</button></td>
  </tr>`).join('');
}
function submitVendor(){
  const name=document.getElementById('vnd-name').value.trim();if(!name)return;
  const category=document.getElementById('vnd-category').value;
  const contact=document.getElementById('vnd-contact').value.trim();
  const reach=document.getElementById('vnd-reach').value.trim();
  const lastused=document.getElementById('vnd-lastused').value;
  const rating=document.getElementById('vnd-rating').value;
  const notes=document.getElementById('vnd-notes').value.trim();
  _vendors.push({name,category,contact,reach,lastused,rating,notes});
  saveRoleData('vendors',_vendors);renderVendors();closeModals();
  ['vnd-name','vnd-contact','vnd-reach','vnd-notes'].forEach(id=>document.getElementById(id).value='');
}
function deleteVendor(i){_vendors.splice(i,1);saveRoleData('vendors',_vendors);renderVendors();}

// ── COMMS LOG ─────────────────────────────────────────────────────────────────
function addCommsEntry(){openModal('comms-log-modal');document.getElementById('comms-date').value=new Date().toISOString().slice(0,10);}
function renderCommsLog(){
  const t=document.getElementById('comms-log-table');if(!t)return;
  if(!_commsLog.length){t.innerHTML='<tr><td colspan="7" style="font-size:11px;color:var(--t4);padding:12px">No communications logged yet.</td></tr>';return;}
  t.innerHTML=_commsLog.map((c,i)=>`<tr>
    <td style="font-weight:600">${c.subject}</td>
    <td><span class="badge bo">${c.type}</span></td>
    <td>${c.sentto||'—'}</td>
    <td>${c.date||'—'}</td>
    <td style="font-weight:600;color:var(--grn)">${c.openrate||'—'}</td>
    <td style="font-size:10px;color:var(--t3);max-width:160px">${c.notes||'—'}</td>
    <td><button class="btn btn-g btn-sm" style="color:var(--cr)" onclick="deleteCommsLog(${i})">✕</button></td>
  </tr>`).join('');
}
function submitCommsLog(){
  const subject=document.getElementById('comms-subject').value.trim();if(!subject)return;
  const type=document.getElementById('comms-type').value;
  const sentto=document.getElementById('comms-sentto').value.trim();
  const date=document.getElementById('comms-date').value;
  const openrate=document.getElementById('comms-openrate').value.trim();
  const notes=document.getElementById('comms-notes').value.trim();
  _commsLog.push({subject,type,sentto,date,openrate,notes});
  saveRoleData('commslog',_commsLog);renderCommsLog();closeModals();
  ['comms-subject','comms-sentto','comms-openrate','comms-notes'].forEach(id=>document.getElementById(id).value='');
}
function deleteCommsLog(i){_commsLog.splice(i,1);saveRoleData('commslog',_commsLog);renderCommsLog();}

// ── GRAPHIC REQUESTS ──────────────────────────────────────────────────────────
function addGraphicRequest(){openModal('graphic-request-modal');document.getElementById('gr-due').value='';}
function renderGraphicRequests(){
  const t=document.getElementById('graphic-requests-table');if(!t)return;
  if(!_graphicRequests.length){t.innerHTML='<tr><td colspan="8" style="font-size:11px;color:var(--t4);padding:12px">No graphic requests yet.</td></tr>';return;}
  const sc={Requested:'bo',['In Progress']:'bo',Review:'bo',Approved:'bg',Delivered:'bg'};
  t.innerHTML=_graphicRequests.map((r,i)=>`<tr>
    <td style="font-weight:600">${r.project}</td>
    <td>${r.requestedby||'—'}</td>
    <td><span class="badge bo">${r.type}</span></td>
    <td>${r.due||'—'}</td>
    <td>${r.designer||'—'}</td>
    <td><span class="badge ${sc[r.status]||'bo'}">${r.status}</span></td>
    <td>${r.link?`<a href="${r.link}" target="_blank" style="color:var(--blu);font-size:10px">Open ↗</a>`:'—'}</td>
    <td><button class="btn btn-g btn-sm" style="color:var(--cr)" onclick="deleteGraphicRequest(${i})">✕</button></td>
  </tr>`).join('');
}
function submitGraphicRequest(){
  const project=document.getElementById('gr-project').value.trim();if(!project)return;
  const requestedby=document.getElementById('gr-requestedby').value.trim();
  const type=document.getElementById('gr-type').value;
  const due=document.getElementById('gr-due').value;
  const designer=document.getElementById('gr-designer').value.trim();
  const status=document.getElementById('gr-status').value;
  const link=document.getElementById('gr-link').value.trim();
  _graphicRequests.push({project,requestedby,type,due,designer,status,link});
  saveRoleData('graphicrequests',_graphicRequests);renderGraphicRequests();closeModals();
  ['gr-project','gr-requestedby','gr-designer','gr-link'].forEach(id=>document.getElementById(id).value='');
}
function deleteGraphicRequest(i){_graphicRequests.splice(i,1);saveRoleData('graphicrequests',_graphicRequests);renderGraphicRequests();}

// ── COMPETITION HISTORY ───────────────────────────────────────────────────────
function logCompResult(){openModal('comp-history-modal');document.getElementById('ch-date').value=new Date().toISOString().slice(0,10);}
function renderCompHistory(){
  const t=document.getElementById('portal-comp-log-table');if(!t)return;
  if(!_compResults.length){t.innerHTML='<tr><td colspan="7" style="font-size:11px;color:var(--t4);padding:12px">No competition results logged yet.</td></tr>';return;}
  const medal=(p)=>{const l=p.toLowerCase();return l.includes('1st')||l.includes('first')?'🥇':l.includes('2nd')||l.includes('second')?'🥈':l.includes('3rd')||l.includes('third')?'🥉':'';};
  t.innerHTML=_compResults.map((r,i)=>`<tr>
    <td style="font-weight:600">${r.member}</td>
    <td>${r.event}</td>
    <td>${r.conf||'—'}</td>
    <td style="font-weight:600">${medal(r.placement||'')} ${r.placement||'—'}</td>
    <td>${r.date||'—'}</td>
    <td style="font-size:10px;color:var(--t3);max-width:160px">${r.notes||'—'}</td>
    <td><button class="btn btn-g btn-sm" style="color:var(--cr)" onclick="deleteCompResult(${i})">✕</button></td>
  </tr>`).join('');
}
function submitCompResult(){
  const member=document.getElementById('ch-member').value.trim();if(!member)return;
  const event=document.getElementById('ch-event').value.trim();
  const conf=document.getElementById('ch-conf').value.trim();
  const date=document.getElementById('ch-date').value;
  const placement=document.getElementById('ch-placement').value.trim();
  const notes=document.getElementById('ch-notes').value.trim();
  _compResults.push({member,event,conf,date,placement,notes});
  saveRoleData('compresults',_compResults);renderCompHistory();closeModals();
  ['ch-member','ch-event','ch-conf','ch-placement','ch-notes'].forEach(id=>document.getElementById(id).value='');
}
function deleteCompResult(i){_compResults.splice(i,1);saveRoleData('compresults',_compResults);renderCompHistory();}

