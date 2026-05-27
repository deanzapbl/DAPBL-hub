// ── STATEMENT OF ACTIVITIES BUILDER ──────────────────────────────────────────

function renderStatementBuilder(){
  const ci=document.getElementById('stmt-chapter');
  const pi=document.getElementById('stmt-period');
  const ni=document.getElementById('stmt-net-start');
  if(ci&&_statementData.chapterName)ci.value=_statementData.chapterName;
  if(pi&&_statementData.period)pi.value=_statementData.period;
  if(ni)ni.value=_statementData.netAssetsStart??225;
  _renderStmtSection('revenue');
  _renderStmtSection('expense');
  renderStmtSummary();
}

function _renderStmtSection(section){
  const listId=section==='revenue'?'stmt-revenue-list':'stmt-expense-list';
  const totalId=section==='revenue'?'stmt-total-revenue':'stmt-total-expense';
  const container=document.getElementById(listId);if(!container)return;
  const clr=section==='revenue'?'var(--grn)':'var(--cr)';
  const items=(_statementData[section]||[]);
  if(!items.length){
    container.innerHTML='<div style="font-size:11px;color:var(--t4);padding:10px 0">No items yet.</div>';
    const te=document.getElementById(totalId);if(te)te.textContent='$0';return;
  }
  // Bucket into groups and ungrouped
  const groupMap={};const ungrouped=[];
  items.forEach((item,idx)=>{
    const g=(item.group||'').trim();
    if(g){if(!groupMap[g])groupMap[g]=[];groupMap[g].push({...item,_idx:idx});}
    else ungrouped.push({...item,_idx:idx});
  });
  let html='';let grand=0;
  const fmtAmt=n=>'$'+Number(n||0).toLocaleString();
  const delBtn=(sec,idx)=>`<button onclick="deleteStmtLine('${sec}',${idx})" title="Remove" style="background:none;border:none;color:var(--t4);cursor:pointer;font-size:10px;padding:0 2px;line-height:1;margin-left:4px">✕</button>`;
  // Groups first
  Object.entries(groupMap).forEach(([gName,gItems])=>{
    const gTotal=gItems.reduce((s,i)=>s+Number(i.amount||0),0);grand+=gTotal;
    html+=`<div style="margin-bottom:8px">
      <div style="font-size:10px;font-weight:700;color:var(--t2);text-transform:uppercase;letter-spacing:.04em;padding:3px 0 2px;border-bottom:1px solid var(--bd);margin-bottom:3px">${gName}</div>`;
    gItems.forEach(item=>{html+=`<div style="display:flex;justify-content:space-between;align-items:center;padding:2px 0 2px 10px"><span style="font-size:11px;color:var(--t1)">${item.name}</span><span style="display:flex;align-items:center"><span style="font-size:11px">${fmtAmt(item.amount)}</span>${delBtn(section,item._idx)}</span></div>`;});
    html+=`<div style="display:flex;justify-content:space-between;padding:2px 0 2px 6px;border-top:1px dashed var(--bd);margin-top:2px"><span style="font-size:10px;font-weight:700;color:var(--t2)">Total ${gName}</span><span style="font-size:10px;font-weight:700;color:${clr}">${fmtAmt(gTotal)}</span></div></div>`;
  });
  // Ungrouped
  ungrouped.forEach(item=>{grand+=Number(item.amount||0);html+=`<div style="display:flex;justify-content:space-between;align-items:center;padding:2px 0"><span style="font-size:11px;color:var(--t1)">${item.name}</span><span style="display:flex;align-items:center"><span style="font-size:11px">${fmtAmt(item.amount)}</span>${delBtn(section,item._idx)}</span></div>`;});
  container.innerHTML=html;
  const te=document.getElementById(totalId);if(te)te.textContent='$'+grand.toLocaleString();
}

function renderStmtSummary(){
  const ni=document.getElementById('stmt-net-start');
  const netStart=Number(ni?ni.value:(_statementData.netAssetsStart||0));
  const totalRev=(_statementData.revenue||[]).reduce((s,i)=>s+Number(i.amount||0),0);
  const totalExp=(_statementData.expense||[]).reduce((s,i)=>s+Number(i.amount||0),0);
  const change=totalRev-totalExp;const netEnd=netStart+change;
  const fmt=n=>(n<0?'-$':'$')+Math.abs(n).toLocaleString();
  const s=id=>document.getElementById(id);
  if(s('stmt-change-net'))s('stmt-change-net').textContent=fmt(change);
  if(s('stmt-net-begin'))s('stmt-net-begin').textContent='$'+netStart.toLocaleString();
  if(s('stmt-net-end'))s('stmt-net-end').textContent='$'+netEnd.toLocaleString();
}

function saveStmtMeta(){
  const v=id=>(document.getElementById(id)||{}).value;
  _statementData.chapterName=v('stmt-chapter')||_statementData.chapterName;
  _statementData.period=v('stmt-period')||_statementData.period;
  _statementData.netAssetsStart=Number(v('stmt-net-start')||_statementData.netAssetsStart||0);
  localStorage.setItem('pbl_statementdata',JSON.stringify(_statementData));
}

function addStmtLine(section){
  document.getElementById('stmt-line-section').value=section||'revenue';
  ['stmt-line-group','stmt-line-name','stmt-line-amount'].forEach(id=>document.getElementById(id).value='');
  openModal('stmt-line-modal');
}

function submitStmtLine(){
  const section=document.getElementById('stmt-line-section').value;
  const group=document.getElementById('stmt-line-group').value.trim();
  const name=document.getElementById('stmt-line-name').value.trim();
  const amount=parseFloat(document.getElementById('stmt-line-amount').value)||0;
  if(!name)return;
  if(!_statementData[section])_statementData[section]=[];
  _statementData[section].push({group,name,amount});
  localStorage.setItem('pbl_statementdata',JSON.stringify(_statementData));
  _renderStmtSection(section);renderStmtSummary();closeModals();
}

function deleteStmtLine(section,idx){
  _statementData[section].splice(idx,1);
  localStorage.setItem('pbl_statementdata',JSON.stringify(_statementData));
  _renderStmtSection(section);renderStmtSummary();
}

function previewStatement(){
  saveStmtMeta();
  const chName=_statementData.chapterName||'De Anza Phi Beta Lambda';
  const period=_statementData.period||'';
  const netStart=Number(_statementData.netAssetsStart||0);
  const revItems=_statementData.revenue||[];
  const expItems=_statementData.expense||[];
  const fmt=n=>'$'+Number(n||0).toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:0});
  const fmtS=n=>(n<0?'-$':'$')+Math.abs(n).toLocaleString();

  function buildRows(items){
    const gMap={};const ung=[];
    items.forEach(item=>{const g=(item.group||'').trim();if(g){if(!gMap[g])gMap[g]=[];gMap[g].push(item);}else ung.push(item);});
    let r='';
    Object.entries(gMap).forEach(([gName,gItems])=>{
      const gTot=gItems.reduce((s,i)=>s+Number(i.amount||0),0);
      r+=`<tr><td colspan="2" style="padding-top:12px;padding-bottom:3px;font-style:italic;font-size:12px;border-bottom:1px solid #bbb">${gName}:</td></tr>`;
      gItems.forEach(item=>{r+=`<tr><td style="padding-left:28px;padding-top:2px;font-size:12px">${item.name}</td><td style="text-align:right;font-size:12px;white-space:nowrap">${fmt(item.amount)}</td></tr>`;});
      r+=`<tr><td style="padding-left:10px;padding-top:3px;padding-bottom:6px;font-size:11.5px;font-weight:700">Total ${gName}</td><td style="text-align:right;font-size:11.5px;font-weight:700;border-top:1px solid #777;padding-top:2px;white-space:nowrap">${fmt(gTot)}</td></tr>`;
    });
    ung.forEach(item=>{r+=`<tr><td style="font-size:12px;padding-top:3px">${item.name}</td><td style="text-align:right;font-size:12px;white-space:nowrap">${fmt(item.amount)}</td></tr>`;});
    return r;
  }

  const totalRev=revItems.reduce((s,i)=>s+Number(i.amount||0),0);
  const totalExp=expItems.reduce((s,i)=>s+Number(i.amount||0),0);
  const change=totalRev-totalExp;
  const netEnd=netStart+change;

  document.getElementById('prev-chapter').textContent=chName;
  document.getElementById('prev-period').textContent=period;
  document.getElementById('prev-body').innerHTML=`
<table style="width:100%;border-collapse:collapse;font-family:'Times New Roman',Times,serif;line-height:1.7">
  <tr><td colspan="2" style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;padding-bottom:4px;border-bottom:2px solid #111">Revenue:</td></tr>
  ${buildRows(revItems)}
  <tr><td style="font-size:13px;font-weight:700;padding-top:6px;border-top:2px solid #111">Total Revenue</td><td style="text-align:right;font-size:13px;font-weight:700;border-top:2px solid #111;white-space:nowrap">${fmt(totalRev)}</td></tr>
  <tr><td colspan="2" style="height:22px"></td></tr>
  <tr><td colspan="2" style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;padding-bottom:4px;border-bottom:2px solid #111">Expenses:</td></tr>
  ${buildRows(expItems)}
  <tr><td style="font-size:13px;font-weight:700;padding-top:6px;border-top:2px solid #111">Total Expenses</td><td style="text-align:right;font-size:13px;font-weight:700;border-top:2px solid #111;white-space:nowrap">${fmt(totalExp)}</td></tr>
  <tr><td colspan="2" style="height:18px"></td></tr>
  <tr style="border-top:3px double #111"><td style="font-size:12px;font-weight:700;padding-top:7px">Change in Net Assets</td><td style="text-align:right;font-size:12px;font-weight:700;padding-top:7px;white-space:nowrap">${fmtS(change)}</td></tr>
  <tr><td style="font-size:12px;padding-top:2px">Net Assets, Beginning of Year</td><td style="text-align:right;font-size:12px;padding-top:2px;white-space:nowrap">${fmt(netStart)}</td></tr>
  <tr style="border-top:2px solid #111;border-bottom:3px double #111"><td style="font-size:13px;font-weight:700;padding:4px 0">Net Assets, End of Year</td><td style="text-align:right;font-size:13px;font-weight:700;padding:4px 0;white-space:nowrap">${fmt(netEnd)}</td></tr>
</table>`;

  document.body.classList.add('stmt-printing');
  document.getElementById('stmt-preview-overlay').style.display='block';
  window.scrollTo(0,0);
}

function closeStmtPreview(){
  document.getElementById('stmt-preview-overlay').style.display='none';
  document.body.classList.remove('stmt-printing');
}

function printStatementPopup(){
  const chName=document.getElementById('prev-chapter').textContent;
  const period=document.getElementById('prev-period').textContent;
  const bodyHtml=document.getElementById('prev-body').innerHTML;
  const w=window.open('','_blank','width=800,height=900');
  w.document.write(`<!DOCTYPE html><html><head><title>${chName} — Statement of Activities</title><style>
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'Times New Roman',Times,serif;color:#111;padding:48px 60px;max-width:700px;margin:0 auto;}
    h1{font-size:18px;font-weight:700;text-align:center;margin-bottom:6px;}
    .sub{font-size:14px;font-weight:600;text-align:center;margin-bottom:4px;}
    .period{font-size:12px;color:#555;text-align:center;margin-bottom:32px;}
    table{width:100%;border-collapse:collapse;line-height:1.75;}
    @media print{
      body{padding:32px 48px;}
      @page{margin:0.6in;}
    }
  </style></head><body>
    <h1>${chName}</h1>
    <div class="sub">Statement of Activities</div>
    <div class="period">${period}</div>
    ${bodyHtml}
  </body></html>`);
  w.document.close();
  w.focus();
  setTimeout(()=>w.print(),350);
}

