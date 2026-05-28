// ─── IM JS ───────────────────────────────────────────────────────────────────
// ============================================================
// DATA
// ============================================================
const mExecTeam=[
  {id:1,name:'Nisa Pradhan',position:'President'},
  {id:2,name:'Carine Chan',position:'Vice President'},
  {id:3,name:'Arya Somu',position:'VP of Strategy and Development'},
  {id:4,name:'George Huang',position:'VP of Finance'},
  {id:5,name:'Addy Hu',position:'VP of Operations'},
  {id:6,name:'Nhi Tran',position:'VP of Marketing'},
  {id:7,name:'Christina Tran',position:'VP of Club Affairs'},
  {id:8,name:'Anna Huynh',position:'Director of Finance'},
  {id:9,name:'Iker Jimenez',position:'Director of Strategy and Development'},
  {id:10,name:'Jordan Nguyen',position:'Director of Marketing'},
  {id:11,name:'Dianne Johnson',position:'Director of Operations'},
];

const memberCount=89;

let mBootcamps=[
  {id:1,name:'Session 1',date:'Mar 5',topic:'Case Intro & Framework',att:28,tot:89,notes:'Covered the 4-step case framework: Identify, Analyze, Recommend, Present. Students practiced with a sample hospitality case.\n\nKey gap identified: financial ratio interpretation.\n\nSlide highlights:\n- What is a case competition?\n- FBLA judging rubric\n- The 4-step framework\n- Sample case walkthrough'},
  {id:2,name:'Session 2',date:'Mar 19',topic:'Financial Analysis',att:33,tot:89,notes:'Income statements, balance sheets, key ratios (ROA, ROE, profit margin). Pairs worked on mock financial case.\n\nKey formulas:\n- ROA = Net Income / Total Assets\n- ROE = Net Income / Shareholders Equity\n- Profit Margin = Net Income / Revenue\n\nGroup exercise: Sunrise Hotels Inc.'},
  {id:3,name:'Session 3',date:'Apr 16',topic:'Presentation Skills',att:31,tot:89,notes:'Delivery, slide design, judge Q&A. 5-min mock presentations with peer feedback.\n\nKey takeaways:\n- Eye contact and pacing matter most\n- Avoid reading slides verbatim\n- Anticipate judge questions\n- Hook judges in first 30 seconds'},
  {id:4,name:'Session 4',date:'Apr 30',topic:'Mock Competition',att:40,tot:89,notes:'Full format: 30 min prep, 10 min presentation, 5 min Q&A. 8 groups, 3 mock judges.\n\nAction items: All groups practice 10-min hard stop before Session 5.'},
  {id:5,name:'Session 5',date:'May 21',topic:'Advanced Case Strategies',att:0,tot:89,notes:'Upcoming — Topics: complex financials, multi-stakeholder scenarios, advanced Q&A prep.\n\nAll NLC competitors should attend.'},
  {id:6,name:'Session 6',date:'Jun 4',topic:'Final Mock Competition',att:0,tot:89,notes:'Upcoming — Full NLC-format mock. Required for all NLC competitors.'},
];

let eventSlides=[
  {id:1,name:'SBLC 2026 Kickoff',date:'Feb 2026',event:'SBLC Prep',link:'https://docs.google.com/presentation/d/example1',desc:'Opening presentation covering SBLC format, event categories, and registration deadlines.'},
  {id:2,name:'Spring General Meeting',date:'Apr 14, 2026',event:'General Meeting',link:'https://docs.google.com/presentation/d/example2',desc:'Spring quarter kickoff: officer reports, bootcamp schedule, NLC prep timeline, and recruitment.'},
  {id:3,name:'NLC Kickoff Slides',date:'Apr 30, 2026',event:'NLC Prep',link:'https://docs.google.com/presentation/d/example3',desc:'National Leadership Conference overview: travel logistics, event rules, and preparation strategy.'},
  {id:4,name:'DAIS 2026 Info Session',date:'May 6, 2026',event:'DAIS',link:'https://docs.google.com/presentation/d/example4',desc:'Overview of DAIS 2026: case format, judge panel, schedule, and team assignments.'},
];

let lectureSlides=[
  {id:1,session:'Session 1',topic:'Case Intro & Framework',date:'Mar 5',link:'https://docs.google.com/presentation/d/lec1',desc:'Intro to FBLA case competitions, the 4-step framework, judging rubric, and a sample walkthrough.'},
  {id:2,session:'Session 2',topic:'Financial Analysis',date:'Mar 19',link:'https://docs.google.com/presentation/d/lec2',desc:'Income statements, balance sheets, key ratios (ROA, ROE, profit margin). Includes Sunrise Hotels case.'},
  {id:3,session:'Session 3',topic:'Presentation Skills',date:'Apr 16',link:'https://docs.google.com/presentation/d/lec3',desc:'Slide design, delivery technique, judge Q&A prep, and peer feedback rubric.'},
  {id:4,session:'Session 4',topic:'Mock Competition',date:'Apr 30',link:'https://docs.google.com/presentation/d/lec4',desc:'Debrief slides from mock competition — judge feedback summary and common mistakes.'},
];

let mEventsData={
  upcoming:[
    {id:2,name:'Spring General Meeting',date:'May 14, 2026',loc:'MLC 105',att:35,desc:'End-of-quarter all-hands meeting.\n\nAgenda:\n- Officer reports\n- DAIS preview\n- NLC prep update\n- Recruitment\n- Open floor\n\nAll members welcome.'},
    {id:4,name:'IM Meeting — Nationals/Consulting Prep',date:'May 12, 2026',loc:'MLC 105',att:35,desc:'Intermediate Member meeting.\nFocus: Nationals prep and consulting track overview.\nTime: 5–7 PM, business casual.'},
    {id:9,name:'CSP Planting Event',date:'May 16, 2026',loc:'De Anza Campus',att:20,desc:'Community service planting event with CSP.\nTime: 9:00 AM–12:00 PM.\nService hours available for all volunteers.'},
    {id:7,name:'IM Meeting — Run Throughs',date:'May 19, 2026',loc:'MLC 105',att:35,desc:'Intermediate Member meeting.\nFocus: Run throughs with leaderboard.\nTime: 5–7 PM, business casual.'},
    {id:8,name:'IM Meeting — Run Throughs',date:'May 21, 2026',loc:'MLC 105',att:35,desc:'Intermediate Member meeting.\nFocus: Final run throughs and NLC logistics.\nTime: 5–7 PM, business casual.'},
    {id:1,name:'DAIS 2026',date:'Jun 3, 2026',loc:'TBD',att:60,desc:'Annual De Anza Case & Investment Competition.\n\nWhat to expect:\n- Case competition with external judges\n- Keynote speaker\n- Awards for top 3 teams\n- Networking with sponsors\n\n60+ expected attendees. More details coming soon.'},
  ],
  past:[
    {id:5,name:'Group Pics / Headshots',date:'May 8, 2026',loc:'Communications Hill Grand Staircase',att:47,desc:'Official chapter group photos and individual headshots.\nTime: 2:30–4:00 PM, business formal.'},
    {id:6,name:"BJ's Fundraiser Night",date:'May 7, 2026',loc:"BJ's — 10690 N De Anza Blvd",att:30,desc:"CSP fundraiser night at BJ's Restaurant.\nTime: 7:00–11:00 PM.\nCode: MAY411 at checkout."},
    {id:3,name:'SBLC 2026',date:'Mar 2026',loc:'Emeryville, CA',att:23,desc:'State Business Leadership Conference 2026.\n\nResults:\n- 17 entries total\n- 1st Place: Community Service Project\n- 1st Place: Entrepreneurship Pitch\n\nGreat showing by everyone who competed!'},
  ]
};

const mCompEvents=[
  {id:1,name:'Business Plan',members:'Arya Somu, Iker Jimenez',competition:'NLC 2026',type:'Team',notes:'Top 10 nationally last year'},
  {id:2,name:'Entrepreneurship',members:'Jordan Nguyen, Nhi Tran',competition:'NLC 2026',type:'Team',notes:''},
  {id:3,name:'Financial Analysis',members:'George Huang, Anna Huynh',competition:'NLC 2026',type:'Team',notes:''},
  {id:4,name:'Management Decision Making',members:'Addy Hu',competition:'NLC 2026',type:'Individual',notes:''},
  {id:5,name:'Public Speaking',members:'Nisa Pradhan',competition:'NLC 2026',type:'Individual',notes:''},
  {id:6,name:'Community Service Project',members:'Christina Tran, Carine Chan',competition:'NLC 2026',type:'Team',notes:'1st place SBLC 2026'},
];

const mCompResults=[
  {id:1,member:'Christina Tran',event:'Community Service Project',competition:'SBLC',placement:'1st',year:'2026'},
  {id:2,member:'Carine Chan',event:'Community Service Project',competition:'SBLC',placement:'1st',year:'2026'},
  {id:3,member:'Jordan Nguyen',event:'Entrepreneurship Pitch',competition:'SBLC',placement:'1st',year:'2026'},
  {id:4,member:'Arya Somu',event:'Business Plan',competition:'SBLC',placement:'3rd',year:'2026'},
  {id:5,member:'George Huang',event:'Financial Analysis',competition:'SBLC',placement:'4th',year:'2026'},
  {id:6,member:'Nisa Pradhan',event:'Public Speaking',competition:'SBLC',placement:'5th',year:'2026'},
];

const mCompHistory=[
  {id:1,year:'2026',competition:'SBLC — Emeryville',entries:17,first:2,top5:6,notes:'Best SBLC performance in chapter history'},
  {id:2,year:'2025',competition:'SBLC — Anaheim',entries:12,first:1,top5:3,notes:''},
  {id:3,year:'2024',competition:'SBLC — San Diego',entries:9,first:0,top5:2,notes:''},
];

let mAnnouncements=[
  {id:1,title:'DAIS 2026 Save the Date',channel:'GroupMe + Instagram',date:'May 10',content:'DAIS 2026 is coming up June 3rd! Mark your calendars. More details coming soon. This is our biggest event of the year — bring a friend.'},
  {id:2,title:'NLC Prep Bootcamp Reminder',channel:'GroupMe',date:'May 12',content:'Reminder: Bootcamp Session 5 is this Wednesday. All NLC competitors must attend. Session covers advanced case strategies. See you at 6pm in MLC 105.'},
  {id:3,title:'SBLC 2026 Results',channel:'GroupMe + Instagram',date:'Mar 20',content:'We are incredibly proud to share that De Anza PBL placed in 17 events at SBLC 2026, including TWO first-place finishes. Thank you to every member who competed.'},
  {id:4,title:'Spring Quarter Kickoff',channel:'GroupMe',date:'Apr 1',content:"Welcome back everyone! Spring quarter is here. First general meeting is April 14th. Bootcamps start April 16th. Let's have our best quarter yet."},
];

let resources={
  guides:[
    {name:'Case Study Prep Guide',desc:'4-step framework for FBLA case competitions',content:'FBLA CASE COMPETITION PREP GUIDE\n\nTHE 4-STEP FRAMEWORK\n\n1. IDENTIFY (5 min)\n   - What is the core problem?\n   - Who are the stakeholders?\n   - What constraints exist?\n\n2. ANALYZE (15 min)\n   - Quantify the problem\n   - SWOT or PESTLE if applicable\n   - Financial analysis: margins, ROI\n\n3. RECOMMEND (5 min)\n   - 2-3 specific, actionable recommendations\n   - Prioritize by impact and feasibility\n   - Include implementation timeline\n\n4. PRESENT (10 min)\n   - Hook in first 30 seconds\n   - Data behind every claim\n   - Prepare for 3-5 judge questions\n\nCOMMON JUDGE QUESTIONS\n- "What would you do differently?"\n- "How did you arrive at that number?"\n- "What\'s the biggest risk?"\n\nTIMING\n30-min prep · 10-min presentation · 5-min Q&A\nPractice to the hard stop.'},
    {name:'Financial Analysis Cheat Sheet',desc:'Key ratios and formulas for case competitions',content:'FINANCIAL ANALYSIS CHEAT SHEET\n\nPROFITABILITY\nGross Margin    = Gross Profit / Revenue\nNet Margin      = Net Income / Revenue\nROA             = Net Income / Total Assets\nROE             = Net Income / Shareholders Equity\nEBITDA Margin   = EBITDA / Revenue\n\nLIQUIDITY\nCurrent Ratio   = Current Assets / Current Liabilities\nQuick Ratio     = (Cash + Receivables) / Current Liabilities\n\nEFFICIENCY\nAsset Turnover  = Revenue / Total Assets\nInventory T/O   = COGS / Avg Inventory\n\nLEVERAGE\nDebt-to-Equity  = Total Debt / Shareholders Equity\nInterest Cover  = EBIT / Interest Expense\n\nVALUATION\nP/E Ratio       = Market Price / EPS\nEV/EBITDA       = Enterprise Value / EBITDA'},
    {name:'Bootcamp Facilitator Guide',desc:'Session structure and tips for session leads',content:'BOOTCAMP FACILITATOR GUIDE\n\nBEFORE THE SESSION\n- Review slide deck in Drive\n- Prepare 2-3 discussion questions\n- Assign a note-taker\n- Set up room 10 min early\n\nSESSION STRUCTURE (60 min)\n0:00-0:05   Welcome + Attendance\n0:05-0:15   Warm-up / recap quiz\n0:15-0:40   Main content delivery\n0:40-0:55   Group exercise / case practice\n0:55-1:00   Wrap-up and action items\n\nFACILITATION TIPS\n- Cold call to keep engagement up\n- Use whiteboard for live calculations\n- Flag members who seem lost for mentorship'},
  ],
  templates:[
    {name:'New Member Onboarding Packet',desc:'Overview for incoming PBL members',content:"WELCOME TO DE ANZA PBL\n\nWhat is PBL?\nPhi Beta Lambda is the nation's largest collegiate business organization. We compete at SBLC (State) and NLC (National).\n\nFirst 2 Weeks\n[ ] Join the member GroupMe\n[ ] Follow @DeAnzaPBL on Instagram\n[ ] Sign up for a competition event\n[ ] Attend your first bootcamp\n[ ] Meet your mentor (if assigned)\n\nKey Dates\n- May 14: Spring General Meeting\n- Jun 3: DAIS 2026\n- Jun 20: NLC Debrief\n\nQuestions? Message any exec member."},
    {name:'Competition Day Timeline',desc:'SLC/NLC competition day structure',content:'COMPETITION DAY\n[Competition] - [Date] - [Location]\n\nMEMBER CHECKLIST\n[ ] Print registration confirmation\n[ ] Official ID\n[ ] Business professional attire\n[ ] Presentation materials / USB\n\nDAY OF\n[X:00]  Group meet-up\n[X:30]  Registration / Check-In\n[X:00]  Opening Session\n[X:00]  Event slots begin\n[XX:00] Lunch\n[X:00]  Awards ceremony\n\nEVENT ROSTER\nEvent               Member(s)        Time\n\nEMERGENCY CONTACTS\nPresident: [Phone]\nAdvisor: [Phone]'},
    {name:'Post-Event Debrief Template',desc:'What went well, what to improve',content:'POST-EVENT DEBRIEF\nEvent: [Event Name]\nDate: [Date]\n\nWHAT WENT WELL\n-\n-\n\nWHAT TO IMPROVE\n-\n-\n\nACTION ITEMS FOR NEXT TIME\nItem                   Owner       Deadline\n\nMETRICS\nAttendance:\nFeedback Score (1-5):\nBudget vs. Actual:'},
    {name:'Sponsor Outreach Email',desc:'Cold outreach template for sponsorship asks',content:"Subject: Partnership Opportunity - De Anza PBL [Event Name]\n\nDear [Name],\n\nMy name is [Your Name] and I'm reaching out on behalf of De Anza College's Phi Beta Lambda chapter.\n\nWe are hosting [Event Name] on [Date] and are seeking sponsors. With [X]+ expected attendees, this is a great opportunity to connect with emerging professionals.\n\nOur [Tier] sponsorship ($[Amount]) includes:\n- [Benefit 1]\n- [Benefit 2]\n- [Benefit 3]\n\nWould you be open to a brief call this week?\n\nWarm regards,\n[Your Name], [Title]\nDe Anza PBL"},
  ]
};

const checklistItems=[
  'Attend at least 4 of 6 bootcamp sessions',
  'Sign up for a competition event',
  'Practice the 4-step case framework',
  'Complete one full mock presentation (10 min)',
  'Review financial analysis slides (Session 2)',
  'Meet with your mentor before NLC prep',
];

const _defaultHighlights=[
  {label:'SBLC 2026',value:'17',sub:'Total entries at state',color:'var(--cr)'},
  {label:'1st Place',value:'2',sub:'Community Service & Entrepreneurship',color:'var(--grn)'},
  {label:'Top 5 Finishes',value:'6',sub:'Members placed in top 5',color:'var(--gold2)'},
  {label:'NLC Bound',value:'8',sub:'Members competing nationally',color:'var(--blu)'},
];
let highlights=JSON.parse(localStorage.getItem('pbl_highlights')||'null')||_defaultHighlights;

const _defaultQuickLinks=[
  {label:'Member GroupMe',desc:'Main chapter chat — join here',icon:'G',bg:'rgba(0,186,52,.15)',ic:'#00BA34',url:'#'},
  {label:'@DeAnzaPBL',desc:'Follow us on Instagram',icon:'I',bg:'rgba(193,53,132,.12)',ic:'#C13584',url:'#'},
  {label:'FBLA-PBL.org',desc:'National organization website',icon:'F',bg:'rgba(139,26,26,.12)',ic:'var(--cr)',url:'https://www.fbla-pbl.org'},
  {label:'NLC Info Hub',desc:'National Leadership Conference details',icon:'N',bg:'rgba(21,88,160,.12)',ic:'var(--blu)',url:'https://www.fbla-pbl.org/pbl/conferences/nlc/'},
];
let quickLinks=JSON.parse(localStorage.getItem('pbl_quicklinks')||'null')||_defaultQuickLinks;

const mMentorPairs=[
  {mentor:'Christina Tran',mentee:'Amy Tran'},
  {mentor:'Christina Tran',mentee:'Ananya Sharma'},
  {mentor:'Carine Chan',mentee:'Angelo Maniraho'},
  {mentor:'Carine Chan',mentee:'Anirudh Ahluwalia'},
  {mentor:'Arya Somu',mentee:'Bryant Vo'},
  {mentor:'Arya Somu',mentee:'Caleb Man'},
  {mentor:'George Huang',mentee:'Eric Zhao'},
  {mentor:'George Huang',mentee:'Gabriel Heiss'},
  {mentor:'Addy Hu',mentee:'Haley Truong'},
  {mentor:'Addy Hu',mentee:'Helen Nguyen'},
  {mentor:'Nhi Tran',mentee:'Ella Yang'},
  {mentor:'Nhi Tran',mentee:'Jasmine Perlas'},
  {mentor:'Jordan Nguyen',mentee:'Leo Chao'},
  {mentor:'Jordan Nguyen',mentee:'Mihir Thakar'},
  {mentor:'Anna Huynh',mentee:'Olivia Ma'},
  {mentor:'Anna Huynh',mentee:'Parav Manney'},
  {mentor:'Iker Jimenez',mentee:'Ray Singam'},
  {mentor:'Iker Jimenez',mentee:'Serena Ni'},
  {mentor:'Dianne Johnson',mentee:'Teevra Singh'},
  {mentor:'Dianne Johnson',mentee:'Timothy Nguyen'},
  {mentor:'Nisa Pradhan',mentee:'Jayden Phan'},
  {mentor:'Nisa Pradhan',mentee:'William Devanney'},
];

// ============================================================
// STATE
// ============================================================

let selectedMember=null;
let checklistState=[false,false,false,false,false,false];

const M_META={
  dashboard:{title:'Home',sub:'Spring 2026 · De Anza PBL'},
  announcements:{title:'Announcements',sub:'Chapter updates'},
  events:{title:'Events',sub:'Upcoming & past'},
  bootcamps:{title:'Bootcamps',sub:'Sessions & prep'},
  competition:{title:'Competition',sub:'NLC 2026 · SBLC Results'},
  profile:{title:'My Profile',sub:'Your chapter info'},
  attendance:{title:'My Attendance',sub:'Bootcamp session tracker'},
  resources:{title:'Prep & Templates',sub:'Guides, frameworks, templates'},
  team:{title:'Exec Team',sub:'Spring 2026 leadership'},
  finance:{title:'Dues & Office Hours',sub:'What you owe · Book a session'},
  mentorship:{title:'Mentorship',sub:'Your mentor · Check-in log'},
};

// ============================================================
// NAV
// ============================================================
function mShowPage(id){
  const appIm=document.getElementById('app-im');
  appIm.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  appIm.querySelectorAll('.ni').forEach(n=>n.classList.remove('active'));
  const pg=document.getElementById('m-page-'+id)||appIm.querySelector('#page-'+id);
  if(pg)pg.classList.add('active');
  const meta=M_META[id]||{title:id,sub:''};
  document.getElementById('m-page-title').textContent=meta.title;
  document.getElementById('m-page-sub').textContent=meta.sub;
  appIm.querySelectorAll('.ni').forEach(n=>{
    if(n.getAttribute('onclick')===`mShowPage('${id}')`)n.classList.add('active');
  });
  // Re-sync EBOD data and re-render the target page so changes are always live
  syncFromEBOD();
  if(id==='bootcamps')mRenderBootcamps();
  else if(id==='dashboard')renderHome();
  else if(id==='announcements')mRenderAnnouncements();
  else if(id==='events')mRenderEvents();
  else if(id==='competition')mRenderCompetition();
  else if(id==='resources')renderResources();
  else if(id==='team')renderTeam();
  else if(id==='finance'){renderIMDues();renderIMConsulting();}
  else if(id==='mentorship')renderIMMyMentorship();
}

function mShowTab(page,tab){
  const appIm=document.getElementById('app-im');
  const pg=document.getElementById('m-page-'+page)||appIm.querySelector('#page-'+page);
  if(!pg)return;
  pg.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  pg.querySelectorAll('.sub').forEach(s=>s.classList.remove('active'));
  const tabEl=pg.querySelector(`[onclick="mShowTab('${page}','${tab}')"]`);
  if(tabEl)tabEl.classList.add('active');
  const subId=page+'-'+tab;
  const conflicting=['events-upcoming','events-past','competition-history'];
  const prefix=conflicting.includes(subId)?'m-':'';
  const subEl=document.getElementById(prefix+subId);
  if(subEl)subEl.classList.add('active');
  // Re-sync so EBOD changes are always reflected immediately
  syncFromEBOD();
  if(page==='bootcamps'){
    if(tab==='eventslides')renderEventSlides();
    else if(tab==='lectureslides')renderLectureSlides();
    else if(tab==='sessions')mRenderBootcamps();
    else if(tab==='homework')renderHomework();
  }
}

// ============================================================
// SIDEBAR RESIZE
// ============================================================
(function(){
  const resizer=document.getElementById('m-sb-resizer');
  const sb=document.getElementById('m-sidebar');
  let dragging=false,startX=0,startW=0;
  resizer.addEventListener('mousedown',e=>{dragging=true;startX=e.clientX;startW=sb.offsetWidth;resizer.classList.add('dragging');e.preventDefault();});
  document.addEventListener('mousemove',e=>{if(!dragging)return;const w=Math.min(360,Math.max(160,startW+(e.clientX-startX)));sb.style.setProperty('--sb-width',w+'px');sb.style.width=w+'px';});
  document.addEventListener('mouseup',()=>{if(dragging){dragging=false;resizer.classList.remove('dragging');}});
})();

// ============================================================
// SIGN IN / OUT
// ============================================================
// ── IM AUTH ──────────────────────────────────────────────────────────────────
let _imSignupMode=false;
let _hwData={};

function _matchMemberByEmail(email){
  syncFromEBOD();
  return ebodMembers.find(m=>m.email&&m.email.toLowerCase()===email.toLowerCase());
}
function _onIMAuthSuccess(user){
  const match=_matchMemberByEmail(user.email);
  selectedMember=match
    ?{name:match.first+' '+match.last,email:user.email,firstName:match.first,lastName:match.last,role:match.role||'Member'}
    :{name:user.displayName||user.email.split('@')[0],email:user.email,firstName:user.email.split('@')[0],lastName:'',role:'Member'};
  localStorage.setItem('_lastPortal','im');
  document.getElementById('signin-overlay').style.display='none';
  document.getElementById('landing').style.display='none';
  document.getElementById('app-im').style.display='block';
  currentApp='im';
  initExtraListeners();
  initIM();
  _loadMemberData(user.uid);
}
function _loadMemberData(uid){
  if(!window._db||!uid)return;
  window._db.collection('members').doc(uid).get().then(snap=>{
    if(!snap.exists)return;
    const d=snap.data();
    if(d.homework)_hwData=d.homework;
    if(d.checklist&&d.checklist.length)checklistState=d.checklist;
    renderHomework();renderChecklist();
  }).catch(e=>console.warn('Member data load failed:',e));
  // Load this member's competition sign-ups
  window._db.collection('signups').doc(uid).get().then(snap=>{
    if(!snap.exists)return;
    const d=snap.data();
    if(d.interests)_mySignups=new Set(d.interests);
    mRenderCompetition();
  }).catch(()=>{});
}
function _saveMemberData(){
  const uid=firebase.auth().currentUser?.uid;
  if(!window._db||!uid)return;
  window._db.collection('members').doc(uid).set(
    {homework:_hwData,checklist:checklistState,email:selectedMember?.email||'',name:selectedMember?.name||''},
    {merge:true}
  ).catch(e=>console.warn('Member data save failed:',e));
}
// Landing page IM login
function toggleLandIMMode(){
  _imSignupMode=!_imSignupMode;
  document.getElementById('land-im-title').textContent=_imSignupMode?'Create Member Account':'Member Sign In';
  document.getElementById('land-im-btn').textContent=_imSignupMode?'Create Account →':'Sign In →';
  document.getElementById('land-im-toggle').textContent=_imSignupMode?'Already have an account? Sign in':'New member? Create account';
  document.getElementById('land-im-err').textContent='';
}
function landIMForgot(){
  const email=document.getElementById('land-im-email').value.trim();
  const err=document.getElementById('land-im-err');
  if(!email){err.textContent='Enter your email above first.';return;}
  firebase.auth().sendPasswordResetEmail(email)
    .then(()=>{err.style.color='var(--grn)';err.textContent='✓ Reset email sent — check your inbox.';})
    .catch(e=>{err.style.color='#E57373';err.textContent=e.message;});
}
function loginIM(){
  const email=document.getElementById('land-im-email').value.trim();
  const pass=document.getElementById('land-im-pass').value.trim();
  const err=document.getElementById('land-im-err');
  err.style.color='#E57373';
  if(!email||!pass){err.textContent='Please enter your email and password.';return;}
  err.textContent=_imSignupMode?'Creating account…':'Signing in…';
  const action=_imSignupMode
    ?firebase.auth().createUserWithEmailAndPassword(email,pass)
    :firebase.auth().signInWithEmailAndPassword(email,pass);
  action.then(cred=>_onIMAuthSuccess(cred.user))
    .catch(e=>{
      if(e.code==='auth/email-already-in-use')err.textContent='Account exists — use Sign In instead.';
      else if(e.code==='auth/invalid-credential'||e.code==='auth/wrong-password')err.textContent='Incorrect email or password.';
      else if(e.code==='auth/weak-password')err.textContent='Password must be at least 6 characters.';
      else if(e.code==='auth/invalid-email')err.textContent='Please enter a valid email.';
      else err.textContent=e.message;
    });
}
// In-app overlay sign-in
let _siSignupMode=false;
function toggleSIMode(){
  _siSignupMode=!_siSignupMode;
  document.getElementById('si-btn').textContent=_siSignupMode?'Create Account':'Sign In';
  document.getElementById('si-toggle').textContent=_siSignupMode?'Already have an account? Sign in':'New member? Create account';
  document.getElementById('si-error').textContent='';
}
function siForgot(){
  const email=document.getElementById('si-email').value.trim();
  const err=document.getElementById('si-error');
  if(!email){err.textContent='Enter your email above first.';return;}
  firebase.auth().sendPasswordResetEmail(email)
    .then(()=>{err.style.color='var(--grn)';err.textContent='✓ Reset email sent!';})
    .catch(e=>{err.style.color='#E57373';err.textContent=e.message;});
}
function showSignIn(){
  document.getElementById('signin-overlay').style.display='flex';
  setTimeout(()=>document.getElementById('si-email').focus(),100);
}
function doSignIn(){
  const email=document.getElementById('si-email').value.trim();
  const pass=document.getElementById('si-pass').value.trim();
  const err=document.getElementById('si-error');
  err.style.color='#E57373';
  if(!email||!pass){err.textContent='Please enter your email and password.';return;}
  err.textContent=_siSignupMode?'Creating account…':'Signing in…';
  const action=_siSignupMode
    ?firebase.auth().createUserWithEmailAndPassword(email,pass)
    :firebase.auth().signInWithEmailAndPassword(email,pass);
  action.then(cred=>_onIMAuthSuccess(cred.user))
    .catch(e=>{
      if(e.code==='auth/email-already-in-use')err.textContent='Account exists — use Sign In instead.';
      else if(e.code==='auth/invalid-credential'||e.code==='auth/wrong-password')err.textContent='Incorrect email or password.';
      else err.textContent=e.message;
    });
}
function signOut(){
  firebase.auth().signOut().then(()=>{
    selectedMember=null;_hwData={};_mySignups=new Set();
    localStorage.removeItem('_lastPortal');
    updateMemberUI();renderProfile();renderAttendance();showSignIn();
    renderIMDues();renderIMConsulting();renderIMMyMentorship();
  });
}
function updateMemberUI(){
  if(!selectedMember){
    document.getElementById('sb-member-info').style.display='none';
    document.getElementById('sb-pick-prompt').style.display='block';
    document.getElementById('tb-member-name').textContent='';
    return;
  }
  const initials=(selectedMember.firstName[0]||'')+(selectedMember.lastName[0]||'');
  document.getElementById('sb-av').textContent=initials.toUpperCase();
  document.getElementById('sb-name').textContent=selectedMember.name;
  document.getElementById('sb-member-info').style.display='flex';
  document.getElementById('sb-pick-prompt').style.display='none';
  document.getElementById('tb-member-name').textContent=selectedMember.name;
}

// ============================================================
// HOME
// ============================================================
function renderHome(){
  // Next event hero
  const sorted=mEventsData.upcoming.slice().sort((a,b)=>new Date(a.date)-new Date(b.date));
  const next=sorted[0];
  const hero=document.getElementById('next-hero-wrap');
  if(next){
    const d=new Date(next.date);
    const mo=isNaN(d)?'—':d.toLocaleString('default',{month:'short'}).toUpperCase();
    const dy=isNaN(d)?'—':d.getDate();
    hero.innerHTML=`<div class="next-hero">
      <div class="nh-date"><div class="nh-mo">${mo}</div><div class="nh-dy">${dy}</div></div>
      <div class="nh-info">
        <div class="nh-label">Next Event</div>
        <div class="nh-name">${next.name}</div>
        <div class="nh-meta">${next.loc} &nbsp;·&nbsp; ~${next.att} expected</div>
      </div>
    </div>`;
  }
  // Stats
  const _fblaEvts=JSON.parse(localStorage.getItem('pbl_fblaevents')||'[]');
  document.getElementById('home-stats').innerHTML=`
    <div class="sc"><div class="sl">Upcoming Events</div><div class="sv">${mEventsData.upcoming.length}</div><div class="sm">This quarter</div></div>
    <div class="sc"><div class="sl">Bootcamp Sessions</div><div class="sv">${mBootcamps.length}</div><div class="sm">Scheduled</div></div>
    <div class="sc"><div class="sl">FBLA Events</div><div class="sv">${_fblaEvts.length||mCompEvents.length}</div><div class="sm">Registered 2026</div></div>`;
  // Announcements preview
  const annEl=document.getElementById('home-ann');
  annEl.innerHTML=mAnnouncements.slice(0,3).map(a=>`
    <div class="ann-item">
      <div class="ann-title">${a.title}</div>
      <div class="ann-meta">${a.channel} &middot; ${a.date}</div>
      <div class="ann-body">${a.content}</div>
    </div>`).join('');
  // Schedule
  const sched=document.getElementById('home-schedule');
  sched.innerHTML=sorted.slice(0,5).map(e=>{
    const d=new Date(e.date);
    const mo=isNaN(d)?'':d.toLocaleString('default',{month:'short'}).toUpperCase();
    const dy=isNaN(d)?'':d.getDate();
    return`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--bd)">
      <div class="date-badge" style="width:38px;height:38px"><div class="date-mo" style="font-size:7px">${mo}</div><div class="date-dy" style="font-size:14px">${dy}</div></div>
      <div style="flex:1;min-width:0">
        <div style="font-weight:600;font-size:12px">${e.name}</div>
        <div style="font-size:10px;color:var(--t3)">${e.loc}</div>
      </div>
    </div>`;
  }).join('');

  // Season highlights
  document.getElementById('home-highlights').innerHTML=`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px">
      ${highlights.map(h=>`
        <div style="background:var(--s2);border:1px solid var(--bd);border-radius:6px;padding:12px;border-left:3px solid ${h.color}">
          <div style="font-size:9px;color:var(--t3);letter-spacing:1.2px;text-transform:uppercase;margin-bottom:4px">${h.label}</div>
          <div style="font-size:22px;font-weight:800;color:${h.color}">${h.value}</div>
          <div style="font-size:10px;color:var(--t3);margin-top:2px">${h.sub}</div>
        </div>`).join('')}
    </div>
    <div style="padding:10px 12px;background:rgba(139,26,26,.05);border-radius:6px;border-left:3px solid var(--cr)">
      <div style="font-size:11px;font-weight:600;margin-bottom:3px">NLC 2026 — Next Up</div>
      <div style="font-size:10px;color:var(--t3)">8 members competing nationally. Keep up the momentum from SBLC — best chapter performance in years.</div>
    </div>`;

  // Quick links
  document.getElementById('home-links').innerHTML=quickLinks.map(l=>`
    <a href="${l.url}" target="_blank" style="display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:6px;border:1px solid var(--bd);margin-bottom:8px;text-decoration:none;background:var(--s2);transition:border-color .12s" onmouseover="this.style.borderColor='var(--cr)'" onmouseout="this.style.borderColor='var(--bd)'">
      <div style="width:30px;height:30px;border-radius:6px;background:${l.bg};color:${l.ic};font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'IBM Plex Sans',sans-serif">${l.icon}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:600;color:var(--t1)">${l.label}</div>
        <div style="font-size:10px;color:var(--t3)">${l.desc}</div>
      </div>
      <div style="font-size:10px;color:var(--t4)">→</div>
    </a>`).join('');

  // FBLA roster preview (EBOD-managed)
  const _fblaRoster=JSON.parse(localStorage.getItem('pbl_fblaevents')||'[]');
  const _rosterSrc=_fblaRoster.length?_fblaRoster:mCompEvents;
  document.getElementById('home-nlc').innerHTML=_rosterSrc.length
    ?`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px">
      ${_rosterSrc.map(e=>`
        <div style="padding:10px 12px;background:var(--s2);border:1px solid var(--bd);border-radius:6px">
          <div style="font-weight:600;font-size:11.5px;margin-bottom:3px">${e.name}</div>
          <div style="font-size:10px;color:var(--t3)">${e.members||''}</div>
          <div style="margin-top:5px"><span class="badge bb">${e.type||''}</span>${e.notes?` <span style="font-size:9px;color:var(--gold2);font-weight:600;margin-left:4px">${e.notes}</span>`:''}</div>
        </div>`).join('')}
    </div>`
    :'<div style="padding:16px;font-size:11px;color:var(--t4);text-align:center">No FBLA events added yet — set them up in EBOD → Competition Prep.</div>';
}

// ============================================================
// ANNOUNCEMENTS
// ============================================================
function mRenderAnnouncements(){
  document.getElementById('ann-badge').textContent=mAnnouncements.length;
  const RECENT_COUNT=3;
  const recent=mAnnouncements.slice(0,RECENT_COUNT);
  const archive=mAnnouncements.slice(RECENT_COUNT);
  const _annHtml=list=>list.length
    ?list.map(a=>`<div class="ann-item">
      <div class="ann-title">${a.title}</div>
      <div class="ann-meta">${a.channel} &middot; ${a.date}</div>
      <div class="ann-body">${a.content}</div>
    </div>`).join('')
    :'<div class="empty">Nothing here yet.</div>';
  const elR=document.getElementById('ann-list-recent');
  const elA=document.getElementById('ann-list-archive');
  if(elR)elR.innerHTML=_annHtml(recent);
  if(elA)elA.innerHTML=archive.length
    ?_annHtml(archive)
    :'<div class="empty" style="padding:20px 16px">No archived announcements yet.</div>';
}

// ============================================================
// EVENTS
// ============================================================
function mRenderEvents(){
  document.getElementById('events-upcoming-list').innerHTML=mEventsData.upcoming.map(e=>{
    const d=new Date(e.date);
    const mo=isNaN(d)?'?':d.toLocaleString('default',{month:'short'}).toUpperCase();
    const dy=isNaN(d)?'?':d.getDate();
    return`<div class="evc" id="evu-${e.id}" onclick="document.getElementById('evu-${e.id}').classList.toggle('open')">
      <div style="display:flex;align-items:flex-start;gap:12px">
        <div class="date-badge"><div class="date-mo">${mo}</div><div class="date-dy">${dy}</div></div>
        <div style="flex:1">
          <div class="evn">${e.name}</div>
          <div class="evs">
            <div class="evst"><span>${e.loc}</span></div>
            <div class="evst"><span>${e.date}</span></div>
            <div class="evst">~<span>${e.att}</span> expected</div>
          </div>
        </div>
      </div>
      <div class="ev-desc">${e.desc}</div>
    </div>`;
  }).join('');
  document.getElementById('events-past-list').innerHTML=mEventsData.past.map(e=>`
    <div class="evc" id="evp-${e.id}" onclick="document.getElementById('evp-${e.id}').classList.toggle('open')">
      <div style="display:flex;align-items:flex-start;gap:12px">
        <div class="date-badge" style="background:var(--t4)"><div class="date-mo" style="font-size:7px">PAST</div><div class="date-dy" style="font-size:13px">${e.att}</div></div>
        <div style="flex:1">
          <div class="evn">${e.name}</div>
          <div class="evs">
            <div class="evst"><span>${e.loc}</span></div>
            <div class="evst"><span>${e.date}</span></div>
            <div class="evst"><span>${e.att}</span> attended</div>
          </div>
        </div>
      </div>
      <div class="ev-desc">${e.desc}</div>
    </div>`).join('');
}

// ============================================================
// BOOTCAMPS
// ============================================================
function mRenderBootcamps(){
  const done=mBootcamps.filter(b=>b.att>0);
  const avg=done.length?Math.round(done.reduce((s,b)=>s+b.att/b.tot,0)/done.length*100):0;
  document.getElementById('bc-stats').innerHTML=`
    <div class="sc"><div class="sl">Sessions Total</div><div class="sv">${mBootcamps.length}</div><div class="sm">${done.length} completed</div></div>
    <div class="sc"><div class="sl">Avg Attendance</div><div class="sv">${avg?avg+'%':'—'}</div><div class="sm">Across completed sessions</div></div>
    <div class="sc"><div class="sl">Next Session</div><div class="sv" style="font-size:14px">${mBootcamps.find(b=>b.att===0)?.date||'Done'}</div><div class="sm">${mBootcamps.find(b=>b.att===0)?.topic||''}</div></div>
    <div class="sc"><div class="sl">Upcoming</div><div class="sv">${mBootcamps.filter(b=>b.att===0).length}</div><div class="sm">Sessions remaining</div></div>`;
  document.getElementById('bc-list').innerHTML=mBootcamps.map(b=>{
    const r=b.att>0?Math.round(b.att/b.tot*100):null;
    const badge=r===null?`<span class="badge bb">Upcoming</span>`:
      r>=80?`<span class="badge bg">${r}% attended</span>`:
      r>=60?`<span class="badge bo">${r}% attended</span>`:
      `<span class="badge br">${r}% attended</span>`;
    return`<div class="bc-row" id="bcr-${b.id}" onclick="document.getElementById('bcr-${b.id}').classList.toggle('open')">
      <div class="bc-num">${b.id}</div>
      <div class="bc-body">
        <div class="bc-title">${b.name} — ${b.topic}</div>
        <div class="bc-meta">${b.date} &nbsp;·&nbsp; ${badge}</div>
        <div class="bc-notes">${b.notes}</div>
      </div>
    </div>`;
  }).join('');
  renderChecklist();
  renderHomework();
  renderEventSlides();
  renderLectureSlides();
}

function renderHomework(){
  const el=document.getElementById('hw-content');
  if(!el)return;
  const ebodHW=JSON.parse(localStorage.getItem('pblhub_hw_assignments')||'[]');
  const stored=_hwData;

  // ── EBOD Assignments block ────────────────────────────────────────────────
  const ebodBlock=!ebodHW.length?'<div class="empty">No assignments posted yet.</div>':
    ebodHW.map((a,i)=>{
      const key='ebod_'+i;
      const sub=stored[key]||{};
      const completed=sub.link&&sub.link.length>0;
      return`<div style="border-bottom:1px solid var(--bd);padding:14px 0">
        <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:8px">
          <div style="width:28px;height:28px;border-radius:6px;background:var(--cr);color:#fff;font-size:11px;font-weight:700;flex-shrink:0;display:flex;align-items:center;justify-content:center">${i+1}</div>
          <div style="flex:1">
            <div style="font-size:12px;font-weight:600;color:var(--t1)">${a.title}</div>
            <div style="font-size:10px;color:var(--t3);margin-top:2px">${a.type||''}${a.type&&a.session?' · ':''}${a.session?'Session '+a.session:''}${a.due?' &nbsp;·&nbsp; Due '+a.due:''}</div>
            ${a.desc?`<div style="font-size:11px;color:var(--t2);margin-top:4px;line-height:1.5">${a.desc}</div>`:''}
          </div>
          ${completed?`<span class="badge bg" style="flex-shrink:0">Submitted</span>`:`<span class="badge bb" style="flex-shrink:0">Due</span>`}
        </div>
        ${!selectedMember?'':`<div style="display:flex;gap:8px;align-items:flex-start;margin-left:38px">
          <div style="flex:1">
            <input id="ebod-hw-link-${i}" type="url" placeholder="Paste Google Drive link…"
              value="${sub.link||''}"
              style="width:100%;padding:7px 10px;border:1px solid var(--bd);border-radius:6px;background:var(--s2);color:var(--t1);font-family:var(--mono);font-size:11px;box-sizing:border-box">
            <input id="ebod-hw-note-${i}" type="text" placeholder="Optional note"
              value="${sub.note||''}"
              style="width:100%;margin-top:5px;padding:7px 10px;border:1px solid var(--bd);border-radius:6px;background:var(--s2);color:var(--t1);font-size:11px;box-sizing:border-box">
          </div>
          <button onclick="submitEBODHW(${i})"
            style="padding:7px 14px;background:var(--cr);color:#fff;border:none;border-radius:6px;font-size:11px;cursor:pointer;white-space:nowrap;flex-shrink:0">
            ${completed?'Update':'Submit'}
          </button>
        </div>
        ${completed&&sub.submittedAt?`<div style="margin-left:38px;margin-top:4px;font-size:10px;color:var(--t3)">Last saved ${sub.submittedAt}</div>`:''}`}
        ${sub.grade?`<div style="margin-left:38px;margin-top:8px;padding:10px 12px;background:var(--s2);border-left:3px solid var(--grn);border-radius:0 6px 6px 0">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
            <span style="font-size:10px;font-weight:700;color:var(--grn)">GRADED</span>
            <span style="font-size:13px;font-weight:700;color:var(--t1)">${sub.grade}</span>
          </div>
          ${sub.feedback?`<div style="font-size:11px;color:var(--t2);line-height:1.5">${sub.feedback}</div>`:''}
        </div>`:''}
      </div>`;
    }).join('');

  // ── Bootcamp session submissions block ────────────────────────────────────
  const bcBlock=mBootcamps.map(b=>{
    const sub=stored[b.id]||{};
    const completed=sub.link&&sub.link.length>0;
    return`<div style="border-bottom:1px solid var(--bd);padding:14px 0">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <div class="bc-num" style="width:28px;height:28px;font-size:11px;flex-shrink:0">${b.id}</div>
        <div style="flex:1">
          <div style="font-size:12px;font-weight:600;color:var(--t1)">${b.name} — ${b.topic}</div>
          <div style="font-size:10px;color:var(--t3)">${b.date}</div>
        </div>
        ${completed?`<span class="badge bg">Submitted</span>`:`<span class="badge bb">${b.att>0?'Due':'Upcoming'}</span>`}
      </div>
      ${!selectedMember?'':`<div style="display:flex;gap:8px;align-items:flex-start;margin-left:38px">
        <div style="flex:1">
          <input id="hw-link-${b.id}" type="url" placeholder="Paste Google Drive link…"
            value="${sub.link||''}"
            style="width:100%;padding:7px 10px;border:1px solid var(--bd);border-radius:6px;background:var(--s2);color:var(--t1);font-family:var(--mono);font-size:11px;box-sizing:border-box">
          <input id="hw-note-${b.id}" type="text" placeholder="Optional note (e.g. 'Case 2 revised')"
            value="${sub.note||''}"
            style="width:100%;margin-top:5px;padding:7px 10px;border:1px solid var(--bd);border-radius:6px;background:var(--s2);color:var(--t1);font-size:11px;box-sizing:border-box">
        </div>
        <button onclick="submitHW(${b.id})"
          style="padding:7px 14px;background:var(--cr);color:#fff;border:none;border-radius:6px;font-size:11px;cursor:pointer;white-space:nowrap;flex-shrink:0">
          ${completed?'Update':'Submit'}
        </button>
      </div>
      ${completed&&sub.submittedAt?`<div style="margin-left:38px;margin-top:4px;font-size:10px;color:var(--t3)">Last saved ${sub.submittedAt}</div>`:''}`}
      ${sub.grade?`<div style="margin-left:38px;margin-top:8px;padding:10px 12px;background:var(--s2);border-left:3px solid var(--grn);border-radius:0 6px 6px 0">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">
          <span style="font-size:10px;font-weight:700;color:var(--grn)">GRADED</span>
          <span style="font-size:13px;font-weight:700;color:var(--t1)">${sub.grade}</span>
          ${sub.gradeStatus&&sub.gradeStatus!=='Graded'?`<span style="font-size:9px;font-weight:600;padding:2px 7px;border-radius:10px;background:rgba(0,0,0,.08);color:var(--t2)">${sub.gradeStatus}</span>`:''}
        </div>
        ${sub.feedback?`<div style="font-size:11px;color:var(--t2);line-height:1.5">${sub.feedback}</div>`:''}
        ${sub.gradedAt?`<div style="font-size:9px;color:var(--t4);margin-top:4px">Graded ${sub.gradedAt}</div>`:''}
      </div>`:''}
    </div>`;
  }).join('');

  el.innerHTML=`
    ${ebodHW.length?`<div class="card" style="margin-bottom:14px">
      <div class="ch">
        <div class="ct">Assignments</div>
        <div style="font-size:10px;color:var(--t3)">${ebodHW.length} assignment${ebodHW.length!==1?'s':''} posted</div>
      </div>
      <div style="padding:0 16px 4px">
        ${!selectedMember?'<div class="empty">Sign in to submit.</div>':ebodBlock}
      </div>
    </div>`:''}
    <div class="card" style="margin-bottom:14px">
      <div class="ch">
        <div class="ct">Bootcamp Session Submissions</div>
        <div style="font-size:10px;color:var(--t3)">Paste your Google Drive link for each session</div>
      </div>
      <div style="padding:0 16px 4px">
        ${!selectedMember?'<div class="empty">Sign in to submit homework.</div>':bcBlock}
      </div>
    </div>`;
}

function submitHW(sessionId){
  if(!selectedMember){alert('Please sign in first.');return;}
  const link=document.getElementById('hw-link-'+sessionId).value.trim();
  const note=document.getElementById('hw-note-'+sessionId).value.trim();
  if(!link){alert('Please paste a link before submitting.');return;}
  _hwData[sessionId]={link,note,submittedAt:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})};
  _saveMemberData();
  renderHomework();
}
function submitEBODHW(i){
  if(!selectedMember){alert('Please sign in first.');return;}
  const link=document.getElementById('ebod-hw-link-'+i).value.trim();
  const note=document.getElementById('ebod-hw-note-'+i).value.trim();
  if(!link){alert('Please paste a link before submitting.');return;}
  _hwData['ebod_'+i]={link,note,submittedAt:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})};
  _saveMemberData();
  renderHomework();
}

function renderEventSlides(){
  const el=document.getElementById('es-content');
  if(!el)return;
  el.innerHTML=`
    <div class="card">
      <div class="ch">
        <div class="ct">Event Slides</div>
        <div style="font-size:10px;color:var(--t3)">Presentations from chapter events</div>
      </div>
      <div style="padding:0 16px 8px">
        ${eventSlides.map(s=>`
          <div style="display:flex;align-items:center;gap:12px;padding:13px 0;border-bottom:1px solid var(--bd)">
            <div style="width:36px;height:36px;border-radius:8px;background:var(--cr);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:16px">📊</div>
            <div style="flex:1;min-width:0">
              <div style="font-size:12px;font-weight:600;color:var(--t1)">${s.name}</div>
              <div style="font-size:10px;color:var(--t3);margin-top:2px">${s.date} &nbsp;·&nbsp; ${s.event}</div>
              <div style="font-size:11px;color:var(--t2);margin-top:3px">${s.desc}</div>
            </div>
            <a href="${s.link}" target="_blank"
              style="padding:6px 12px;background:var(--s2);border:1px solid var(--bd);border-radius:6px;font-size:11px;color:var(--cr);text-decoration:none;white-space:nowrap;flex-shrink:0">
              View Slides
            </a>
          </div>`).join('')}
      </div>
    </div>`;
}

function renderLectureSlides(){
  const el=document.getElementById('ls-content');
  if(!el)return;
  el.innerHTML=`
    <div class="card">
      <div class="ch">
        <div class="ct">Lecture Slides</div>
        <div style="font-size:10px;color:var(--t3)">Bootcamp session decks — use for review and NLC prep</div>
      </div>
      <div style="padding:0 16px 8px">
        ${lectureSlides.map(s=>{
          const bc=mBootcamps.find(b=>b.id===s.id);
          const completed=bc&&bc.att>0;
          return`<div style="display:flex;align-items:center;gap:12px;padding:13px 0;border-bottom:1px solid var(--bd)">
            <div style="width:36px;height:36px;border-radius:8px;background:${completed?'#d4edda':'var(--s2)'};border:1px solid var(--bd);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:16px">📋</div>
            <div style="flex:1;min-width:0">
              <div style="display:flex;align-items:center;gap:8px">
                <div style="font-size:12px;font-weight:600;color:var(--t1)">${s.session}: ${s.topic}</div>
                ${completed?`<span class="badge bg">Completed</span>`:`<span class="badge bb">Upcoming</span>`}
              </div>
              <div style="font-size:10px;color:var(--t3);margin-top:2px">${s.date}</div>
              <div style="font-size:11px;color:var(--t2);margin-top:3px">${s.desc}</div>
            </div>
            <a href="${s.link}" target="_blank"
              style="padding:6px 12px;background:var(--s2);border:1px solid var(--bd);border-radius:6px;font-size:11px;color:var(--cr);text-decoration:none;white-space:nowrap;flex-shrink:0">
              View Slides
            </a>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

function renderChecklist(){
  document.getElementById('bc-checklist').innerHTML=checklistItems.map((item,i)=>`
    <div class="cl-item">
      <div class="cl-cb ${checklistState[i]?'checked':''}" onclick="toggleCl(${i})">${checklistState[i]?'✓':''}</div>
      <div class="cl-text">${item}</div>
    </div>`).join('');
}
function toggleCl(i){
  checklistState[i]=!checklistState[i];
  _saveMemberData();
  renderChecklist();
}

// ============================================================
// COMPETITION
// ============================================================
function mRenderCompetition(){
  document.getElementById('comp-stats').innerHTML=`
    <div class="sc"><div class="sl">NLC Events</div><div class="sv">${mCompEvents.length}</div><div class="sm">Registered 2026</div></div>
    <div class="sc"><div class="sl">1st Place Wins</div><div class="sv">${mCompResults.filter(r=>r.placement==='1st').length}</div><div class="sm">SBLC 2026</div></div>
    <div class="sc"><div class="sl">Total Entries</div><div class="sv">${mCompResults.length}</div><div class="sm">SBLC 2026</div></div>
    <div class="sc"><div class="sl">Best Result</div><div class="sv" style="font-size:14px">1st Place</div><div class="sm">CSP & Entrepreneurship</div></div>`;
  document.getElementById('m-comp-events-table').innerHTML=mCompEvents.map(e=>{
    const interested=_mySignups.has(e.id);
    const count=(_compSignupsMap[e.id]||[]).length;
    const btnStyle=interested
      ?'padding:4px 10px;background:var(--grn);color:#fff;border:none;border-radius:5px;font-size:10px;font-weight:600;cursor:pointer'
      :'padding:4px 10px;background:var(--s3);color:var(--t2);border:1px solid var(--bd);border-radius:5px;font-size:10px;cursor:pointer';
    return`<tr><td class="nm">${e.name}</td><td>${e.members}</td><td><span class="badge bb">${e.type}</span></td><td style="color:var(--t3);font-size:10px">${e.notes||'—'}</td>
    <td><button onclick="toggleSignup(${e.id})" style="${btnStyle}">${interested?'✓ Interested':'+ Interested'}${count?` (${count})`:''}
    </button></td></tr>`;
  }).join('');
  document.getElementById('m-comp-results-table').innerHTML=mCompResults.map(r=>`
    <tr><td class="nm">${r.member}</td><td>${r.event}</td><td><span class="badge ${r.placement==='1st'?'bg':r.placement==='2nd'||r.placement==='3rd'?'bo':'bx'}">${r.placement}</span></td><td>${r.year}</td></tr>`).join('');
  document.getElementById('m-comp-history-table').innerHTML=mCompHistory.map(h=>`
    <tr><td class="nm">${h.year}</td><td>${h.competition}</td><td>${h.entries}</td><td><span class="badge bg">${h.first}</span></td><td>${h.top5}</td></tr>`).join('');
}

// ============================================================
// PROFILE & ATTENDANCE
// ============================================================
function renderProfile(){
  const el=document.getElementById('profile-content');
  if(!selectedMember){el.innerHTML='<div class="empty">Select your name from the sidebar to view your profile.</div>';return;}
  const fullName=selectedMember.name;
  const initials=(selectedMember.firstName[0]||'')+(selectedMember.lastName[0]||'');
  const myEvents=mCompEvents.filter(e=>e.members.includes(fullName));
  const myResults=mCompResults.filter(r=>r.member===fullName);
  const myMentor=mMentorPairs.find(p=>p.mentee===fullName);
  const myMentees=mMentorPairs.filter(p=>p.mentor===fullName);
  const mentorExec=myMentor?mExecTeam.find(e=>e.name===myMentor.mentor):null;

  el.innerHTML=`
    <div class="prof-header">
      <div class="prof-av">${initials.toUpperCase()}</div>
      <div style="flex:1">
        <div class="prof-name">${fullName}</div>
        <div class="prof-role">Member &nbsp;·&nbsp; De Anza PBL Spring 2026</div>
        <div style="font-size:10px;color:var(--t4);margin-top:2px">${selectedMember.email}</div>
      </div>
    </div>
    <div class="sg">
      <div class="sc"><div class="sl">NLC Events</div><div class="sv">${myEvents.length}</div><div class="sm">Registered</div></div>
      <div class="sc"><div class="sl">SBLC Results</div><div class="sv">${myResults.length}</div><div class="sm">Logged</div></div>
      <div class="sc"><div class="sl">Bootcamps Done</div><div class="sv">${mBootcamps.filter(b=>b.att>0).length}</div><div class="sm">of ${mBootcamps.length} total</div></div>
      <div class="sc"><div class="sl">Quarter</div><div class="sv" style="font-size:14px">Spring</div><div class="sm">2026</div></div>
    </div>

    ${myMentor?`<div class="card" style="margin-bottom:14px">
      <div class="ch"><div class="ct">My Mentor</div></div>
      <div style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--s2);border:1px solid var(--bd);border-radius:7px">
        <div style="width:42px;height:42px;border-radius:50%;background:var(--blu);color:#fff;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">${myMentor.mentor.slice(0,2).toUpperCase()}</div>
        <div style="flex:1">
          <div style="font-weight:700;font-size:13px">${myMentor.mentor}</div>
          <div style="font-size:10px;color:var(--t3);margin-top:2px">${mentorExec?mentorExec.position:'Exec Team'}</div>
          <div style="font-size:10px;color:var(--t3);margin-top:2px">Reach out via GroupMe or Instagram DM</div>
        </div>
      </div>
    </div>`:''}

    ${myMentees.length?`<div class="card" style="margin-bottom:14px">
      <div class="ch"><div class="ct">My Mentees</div><span class="badge bb">${myMentees.length}</span></div>
      ${myMentees.map(p=>`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--s3)">
        <div style="width:28px;height:28px;border-radius:50%;background:var(--cr3);color:#fff;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center">${p.mentee.slice(0,2).toUpperCase()}</div>
        <div style="font-size:12px;font-weight:600">${p.mentee}</div>
        <span class="badge bx" style="margin-left:auto">Member</span>
      </div>`).join('')}
    </div>`:''}

    <div class="card" style="margin-bottom:14px">
      <div class="ch"><div class="ct">My NLC Events</div></div>
      ${myEvents.length?myEvents.map(e=>`<div style="padding:9px 0;border-bottom:1px solid var(--s3)">
        <div style="font-weight:600;font-size:12px">${e.name}</div>
        <div style="font-size:10px;color:var(--t3);margin-top:2px">${e.competition} &nbsp;·&nbsp; <span class="badge bb">${e.type}</span>${e.notes?'  &nbsp;·&nbsp; <span style="color:var(--gold2);font-weight:600">'+e.notes+'</span>':''}</div>
      </div>`).join(''):`<div style="padding:10px 12px;background:var(--s2);border-radius:6px;font-size:11px;color:var(--t3)">Not registered for NLC events yet. Interested? Reach out to <strong>Arya Somu</strong> (VP of Strategy) to sign up.</div>`}
    </div>

    ${myResults.length?`<div class="card" style="margin-bottom:14px">
      <div class="ch"><div class="ct">My Competition Results</div></div>
      ${myResults.map(r=>`<div style="padding:9px 0;border-bottom:1px solid var(--s3);display:flex;align-items:center;gap:10px">
        <div style="flex:1"><div style="font-weight:600;font-size:12px">${r.event}</div><div style="font-size:10px;color:var(--t3)">${r.competition} ${r.year}</div></div>
        <span class="badge ${r.placement==='1st'?'bg':r.placement==='2nd'||r.placement==='3rd'?'bo':'bx'}">${r.placement}</span>
      </div>`).join('')}
    </div>`:''}

    <div class="card">
      <div class="ch"><div class="ct">Get Involved</div></div>
      ${[
        {title:'Compete at NLC 2026',desc:'Sign up for a competition event — individual or team. Contact Arya Somu to register.',badge:'Competition',bc:'br'},
        {title:'Attend Bootcamp Sessions',desc:'Sessions 5 & 6 still coming up. All NLC competitors must attend Session 5 (May 21).',badge:'Education',bc:'bb'},
        {title:'Volunteer at DAIS 2026',desc:'Help run our biggest event of the year on June 3rd. Sign up with Addy Hu (VP of Operations).',badge:'Events',bc:'bo'},
        {title:'Join the Consulting Track',desc:'Work with real clients on business strategy projects. Reach out to Arya Somu for info.',badge:'Consulting',bc:'bg'},
      ].map(i=>`<div style="padding:10px 0;border-bottom:1px solid var(--s3)">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px">
          <div style="font-weight:600;font-size:12px">${i.title}</div>
          <span class="badge ${i.bc}">${i.badge}</span>
        </div>
        <div style="font-size:10.5px;color:var(--t3)">${i.desc}</div>
      </div>`).join('')}
    </div>`;
}

function renderAttendance(){
  const el=document.getElementById('att-content');
  if(!selectedMember){el.innerHTML='<div class="empty">Select your name from the sidebar to view your attendance.</div>';return;}
  // find this member in EBOD's member list by name
  const fullName=(selectedMember.name||'').toLowerCase().trim();
  const src=ebodMembers.length?ebodMembers:mBootcamps; // fallback
  const ebodM=ebodMembers.find(m=>(m.first+' '+m.last).toLowerCase().trim()===fullName);
  const attArr=ebodM&&ebodM.att?ebodM.att:[];
  const past=mBootcamps.filter(b=>b.att>0);
  const attendedCount=past.filter((b,i)=>attArr[mBootcamps.indexOf(b)]===1).length;
  const pct=past.length?Math.round(attendedCount/past.length*100):null;
  el.innerHTML=`
    <div class="card">
      <div class="ch"><div class="ct">Bootcamp Attendance</div>${pct!==null?`<span class="badge ${pct>=80?'bg':pct>=60?'bo':'br'}">${pct}%</span>`:''}</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px">
        ${mBootcamps.map((b,i)=>{
          const isPast=b.att>0;
          const present=attArr[i]===1;
          const bg=!isPast?'var(--s4)':present?'var(--grn)':'#E57373';
          const label=!isPast?'—':present?'✓':'✗';
          const txtColor=!isPast?'var(--t4)':'#fff';
          return`<div style="text-align:center">
            <div style="font-size:9px;color:var(--t4);margin-bottom:5px;font-weight:600">${b.name||'Session '+(i+1)}</div>
            <div class="att-dot" style="background:${bg};color:${txtColor}">${label}</div>
            <div style="font-size:8px;color:var(--t4);margin-top:3px">${b.date}</div>
          </div>`;
        }).join('')}
      </div>
      <div style="padding:10px 12px;background:var(--s2);border-radius:5px;font-size:11px;color:var(--t3)">
        ${ebodM?`You attended <strong>${attendedCount}</strong> of <strong>${past.length}</strong> completed sessions.`:'Your attendance record will appear once the exec team has marked you in the system.'}
      </div>
    </div>`;
}

// ============================================================
// DUES
// ============================================================
function renderIMDues(){
  const el=document.getElementById('im-dues-list');if(!el)return;
  const confEvents=JSON.parse(localStorage.getItem('pbl_confevents')||'[]');
  if(!confEvents.length){
    el.innerHTML='<div class="empty" style="padding:16px">No dues or fees posted yet.</div>';
    return;
  }
  const memberName=selectedMember?selectedMember.name:'';
  let totalOwed=0;
  const rows=confEvents.map(c=>{
    const paid=(c.paid||[]).some(n=>n.toLowerCase()===memberName.toLowerCase());
    const dues=parseFloat(c.dues)||0;
    if(!paid)totalOwed+=dues;
    return`<div style="display:flex;align-items:center;gap:12px;padding:13px 16px;border-bottom:1px solid var(--bd)">
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:600;color:var(--t1)">${c.name}</div>
        <div style="font-size:10px;color:var(--t3);margin-top:2px">${c.date||''} · $${dues.toFixed(2)} per member</div>
      </div>
      ${paid
        ?`<span class="badge bg">Paid</span>`
        :`<span class="badge br">$${dues.toFixed(2)} Due</span>`}
    </div>`;
  }).join('');
  const summary=!selectedMember
    ?'<div class="empty" style="padding:16px">Sign in to view your payment status.</div>'
    :rows+`<div style="padding:13px 16px;display:flex;align-items:center;justify-content:space-between">
        <div style="font-size:11px;font-weight:600;color:var(--t2)">Total Outstanding</div>
        <div style="font-size:14px;font-weight:700;color:${totalOwed>0?'var(--cr)':'var(--grn)'}">${totalOwed>0?'$'+totalOwed.toFixed(2):'All Clear ✓'}</div>
      </div>`;
  el.innerHTML=summary;
}

// ============================================================
// RESOURCES
// ============================================================
function renderResources(){
  document.getElementById('res-guides-list').innerHTML=resources.guides.map((r,i)=>`
    <div class="res-card" id="rg${i}" onclick="document.getElementById('rg${i}').classList.toggle('open')">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
        <div><div class="res-name">${r.name}</div><div class="res-desc">${r.desc}</div></div>
        ${r.link?`<a href="${r.link}" target="_blank" onclick="event.stopPropagation()" style="flex-shrink:0;padding:5px 10px;background:var(--s1);border:1px solid var(--bd);border-radius:5px;font-size:10px;color:var(--cr);text-decoration:none;white-space:nowrap">Open Doc ↗</a>`:''}
      </div>
      ${r.content?`<div class="res-preview">${r.content}</div>`:''}
    </div>`).join('');
}

// ============================================================
// TEAM
// ============================================================
function renderTeam(){
  const _ec=JSON.parse(localStorage.getItem('pbl_execcontacts')||'{}');
  document.getElementById('exec-grid').innerHTML=mExecTeam.map(e=>{
    const ct=_ec[e.name]||{};
    return`<div class="exec-card">
      <div class="exec-av">${e.name.slice(0,2).toUpperCase()}</div>
      <div class="exec-name">${e.name}</div>
      <div class="exec-pos">${e.position}</div>
      ${(ct.email||ct.phone)?`<div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--bd);display:flex;flex-direction:column;gap:5px;align-items:center">
        ${ct.email?`<a href="mailto:${ct.email}" style="display:flex;align-items:center;gap:5px;font-size:10px;color:var(--cr);text-decoration:none;font-weight:500">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="12" height="9" rx="1"/><path d="M2 4l6 5 6-5"/></svg>${ct.email}
        </a>`:''}
        ${ct.phone?`<a href="tel:${ct.phone}" style="display:flex;align-items:center;gap:5px;font-size:10px;color:var(--t3);text-decoration:none">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 2h3l1 3-2 1a9 9 0 0 0 3 3l1-2 3 1v3a1 1 0 0 1-1 1A12 12 0 0 1 3 3a1 1 0 0 1 1-1z"/></svg>${ct.phone}
        </a>`:''}
      </div>`:''}
    </div>`;
  }).join('');
}

// ============================================================
// INIT
// ============================================================
let ebodMembers=[];
function syncFromEBOD(){
  try{
    const raw=localStorage.getItem('pblhub_v1');if(!raw)return;
    const d=JSON.parse(raw);
    if(d.bootcamps&&d.bootcamps.length)mBootcamps=d.bootcamps;
    if(d.eventsData)mEventsData=d.eventsData;
    if(d.members&&d.members.length)ebodMembers=d.members;
    if(d.announcements){
      const all=[...(d.announcements.sent||[]),...(d.announcements.draft||[])].filter(a=>a.published);
      if(all.length)mAnnouncements=all.slice().sort((a,b)=>b.id-a.id);
    }
    if(d.resources)resources=d.resources;
    if(d.eventSlides)eventSlides=d.eventSlides;
    if(d.lectureSlides)lectureSlides=d.lectureSlides;
  }catch(e){}
}
function initIM(){
  syncFromEBOD();
  renderHome();
  mRenderAnnouncements();
  mRenderEvents();
  mRenderBootcamps();
  mRenderCompetition();
  renderResources();
  renderTeam();
  renderProfile();
  renderAttendance();
  renderIMDues();
  renderIMConsulting();
  renderIMMyMentorship();
  updateMemberUI();
  // Show sign-in if Firebase says no one is logged in
  if(!firebase.auth().currentUser)setTimeout(showSignIn,400);
}

// initIM called by landing


// ─── LANDING LOGIC ───────────────────────────────────────────────────────────

function selectSide(side){
  document.getElementById('land-ebod-card').classList.remove('selected');
  document.getElementById('land-im-card').classList.remove('selected');
  document.getElementById('land-ebod-form').classList.remove('show');
  document.getElementById('land-im-form').classList.remove('show');
  document.getElementById('land-'+side+'-card').classList.add('selected');
  document.getElementById('land-'+side+'-form').classList.add('show');
  if(side==='ebod'){
    document.getElementById('land-ebod-email').value='';
  }
  if(side==='im'){
    const saved=localStorage.getItem(IM_SAVE_KEY+'_user');
    if(saved)try{const u=JSON.parse(saved);if(u&&u.name){document.getElementById('land-im-name').value=u.name;document.getElementById('land-im-email').value=u.email||'';}}catch(e){}
  }
}

function resetLanding(){
  document.getElementById('land-ebod-card').classList.remove('selected');
  document.getElementById('land-im-card').classList.remove('selected');
  document.getElementById('land-ebod-form').classList.remove('show');
  document.getElementById('land-im-form').classList.remove('show');
  document.getElementById('land-ebod-email').value='';
  document.getElementById('land-ebod-err').textContent='';
  document.getElementById('land-im-err').textContent='';
}


