// ─── ROLE-BASED PORTAL DATA ──────────────────────────────────────────────────
let _statementData=JSON.parse(localStorage.getItem('pbl_statementdata')||JSON.stringify({
  chapterName:'De Anza Phi Beta Lambda',
  period:'For Year ended 6/29/25',
  netAssetsStart:225,
  revenue:[
    {group:'Conference Payments',name:'Fall Conference Member Payments',amount:6200},
    {group:'Conference Payments',name:'State Conference Member Payments',amount:25814},
    {group:'Conference Payments',name:'National Conference Member Payments',amount:17176},
    {group:'Sponsorship',name:'Key Point (Fall)',amount:2000},
    {group:'Sponsorship',name:'Moss Adams',amount:3000},
    {group:'Sponsorship',name:'Star One',amount:500},
    {group:'Sponsorship',name:'Key Point (Spring)',amount:1500},
    {group:'',name:'Donations',amount:2000},
    {group:'ICC Awards',name:"Spring '25 Club Day Most Decorated",amount:100},
    {group:'ICC Awards',name:'Club of the Year',amount:300},
    {group:'ICC Awards',name:'Most Popular',amount:150},
    {group:'ICC Awards',name:'Perfect Attendance',amount:100},
    {group:'',name:'Merch Sales',amount:1190},
    {group:'',name:'Club Budget Request',amount:444}
  ],
  expense:[
    {group:'',name:'Fall Conference Expense',amount:6200},
    {group:'State Conference Expense',name:'Hotel & Registration',amount:14665},
    {group:'State Conference Expense',name:'Transportation',amount:7408},
    {group:'State Conference Expense',name:'Reimbursements',amount:4427},
    {group:'State Conference Expense',name:'Food',amount:2314},
    {group:'Nationals Expense',name:'Hotel & Registration',amount:14343},
    {group:'Nationals Expense',name:'Financial Aid Refund',amount:2900},
    {group:'Nationals Expense',name:'Scholarship Refund',amount:2145},
    {group:'Nationals Expense',name:'Aquarium Expense',amount:821},
    {group:'Nationals Expense',name:'PayPal Fees',amount:465},
    {group:'De Anza Business Conference',name:'Custodial Fees',amount:444},
    {group:'De Anza Business Conference',name:'Food',amount:180},
    {group:'De Anza Business Conference',name:'Supplies',amount:48},
    {group:'',name:'Merch Expense',amount:678},
    {group:'',name:'Banquet Expense',amount:374},
    {group:'',name:'Advisor Gift',amount:187},
    {group:'',name:'Beach Social Expense',amount:18},
    {group:'',name:'Business Olympics Expense',amount:92}
  ]
}));
let _confPayLedger=JSON.parse(localStorage.getItem('pbl_confpayledger')||JSON.stringify([
  {id:'sblc2025',name:'SBLC 2025 (State Conference)',depositAmt:250,fee1Amt:15,fee2Amt:235,refundPerPerson:85.73,members:[
    {name:'Arthur Poon',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:'$15 cash'},
    {name:'Arya Somu',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Sylvie Nghiem',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Nhi Tran',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Nisa Pradhan',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Allyson Huynh',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Cash',totalReceived:500,refund:'Refunded',notes:'Cash Deposit, $15 cash'},
    {name:'Carine Chan',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Cash',totalReceived:500,refund:'Refunded',notes:'Cash Deposit, $15 cash'},
    {name:'Vincent Shao',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Leo Huang',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Floria Pan',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Allissa Lida',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Anqi Lin',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Alan Tran',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'George Huang',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Cash',totalReceived:500,refund:'Refunded',notes:'Cash Deposit, $15 cash'},
    {name:'Katelyn Nguyen',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Kaung (Kelvin) Htet Shein',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Jared Salazar',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Cash',method:'Mixed',totalReceived:500,refund:'Refunded',notes:'$100 cash, $150 Zelle'},
    {name:'Jordan Nguyen',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Mixed',totalReceived:500,refund:'Refunded',notes:'$150 cash, $100 Zelle'},
    {name:'Minh Le',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Cash',method:'Cash',totalReceived:500,refund:'Refunded',notes:'Cash Deposit, $15 cash'},
    {name:'Rachel Tran',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Yusef Ahmed',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Addy Hu',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Elizabeth Wong',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Jasmine Perlas',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Thu Tran',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Christopher Wu',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Hanspreet Singh',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Tram Lieng',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Teresa Hsu',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Taranjit Kaur',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Cash',totalReceived:500,refund:'Refunded',notes:'Cash Deposit, $15 cash'},
    {name:'Jocelyn Ramirez',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Christina Tran',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Cash',totalReceived:500,refund:'Refunded',notes:'Cash Deposit'},
    {name:'Zinneerah Ahmed',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Anna Huynh',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Cash',totalReceived:500,refund:'Refunded',notes:'$265 cash + $235 cash, cash refund requested'},
    {name:'Philemon Wong',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Not Yet',method:'Online',totalReceived:265,refund:'Pending',notes:'Final $235 not yet received'},
    {name:'Vinh Nguyen',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Cash',totalReceived:500,refund:'Refunded',notes:'$265 cash'},
    {name:'VJ Lukka',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Iker Amox Jimenez',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:'Paid $265 in final deposit — must refund extra'},
    {name:'Jun Kim',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Cyrus Nakar',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Sterling Williams',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Jacob Chen',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Cash',totalReceived:500,refund:'Refunded',notes:'Cash Deposit'},
    {name:'Lucas Ávila',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Rushil Vaswani',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Cash',totalReceived:500,refund:'Refunded',notes:'Cash Deposit, $15 cash'},
    {name:'Chi (Fun) Hsun Lee',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Suyash Jevaria',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Yu (Bella) Jing Chu',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:''},
    {name:'Zhile (Leo) Cui',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:'Deposited $500 directly'},
    {name:'Bochen Tong',gender:'Male',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Online',totalReceived:500,refund:'Refunded',notes:'Public Member'},
    {name:'Dianne Johnson',gender:'Female',deposit:'Paid',fee1:'Paid',fee2:'Paid',method:'Mixed',totalReceived:500,refund:'Refunded',notes:'$260 cash, $5 Zelle'},
    {name:'Javin Ku',gender:'Male',deposit:'N/A',fee1:'N/A',fee2:'N/A',method:'Online',totalReceived:245,refund:'Refunded',notes:'Trio Room'},
    {name:'Zain Darwish',gender:'Male',deposit:'N/A',fee1:'N/A',fee2:'N/A',method:'Online',totalReceived:245,refund:'Refunded',notes:'Trio Room'},
    {name:'Van Loc Nguyen',gender:'Male',deposit:'N/A',fee1:'N/A',fee2:'N/A',method:'Online',totalReceived:120,refund:'Not Yet',notes:'Trio Room — no comp registration'},
    {name:'Alan Dang',gender:'Male',deposit:'N/A',fee1:'N/A',fee2:'N/A',method:'Online',totalReceived:439.44,refund:'Refunded',notes:'Trio Room + Bus Cost'},
  ]}
]));
let _cplActiveConf=0;
let _roiEntries=JSON.parse(localStorage.getItem('pbl_roi')||JSON.stringify([
  {name:'Fall Conference 2024',rev:6200,exp:6200,att:62,date:'10/2024'},
  {name:'State Conference 2025',rev:25814,exp:28814,att:28,date:'2/2025'},
  {name:'National Conference 2025',rev:17176,exp:20674,att:18,date:'6/2025'},
  {name:'De Anza Business Conference (DABC)',rev:444,exp:672,att:25,date:'4/2025'},
  {name:'Merch Sales (Net)',rev:1190,exp:678,att:0,date:'2024-25'},
]));
let _iccForms=JSON.parse(localStorage.getItem('pbl_iccforms')||'[]');
let _finReports=JSON.parse(localStorage.getItem('pbl_finreports')||JSON.stringify([
  {quarter:'Full Year 2024–2025',summary:'Total Revenue: $60,474 | Total Expenses: $57,708 | Net Surplus: $2,766\n\nRevenue breakdown: Fall Conf. Payments $6,200 · State Conf. Payments $25,814 · National Conf. Payments $17,176 · Sponsorships $7,000 (Key Point x2, Moss Adams, Star One) · Donations $2,000 · ICC Awards $650 · Merch Sales $1,190 · Club Budget $444\n\nExpense breakdown: Fall Conf. $6,200 · State Conf. $28,814 (Hotel/Reg, Transport, Reimb, Food) · Nationals $20,674 (Hotel/Reg, Aid Refunds, Aquarium, PayPal Fees) · DABC $672 · Merch $678 · Banquet $374 · Advisor Gift $187 · Beach Social $18 · Business Olympics $92\n\nNet Assets Beginning of Year: $225 → End of Year: $2,991',created:'6/29/2025'}
]));
let _confLogistics=JSON.parse(localStorage.getItem('pbl_conflogistics')||'[]');
let _kpiEntries=JSON.parse(localStorage.getItem('pbl_kpis')||'[]');
let _iccExcursions=JSON.parse(localStorage.getItem('pbl_iccexcursions')||'[]');
let _prgRoster=JSON.parse(localStorage.getItem('pbl_prg_roster')||'[]');
let _prgInitiatives=JSON.parse(localStorage.getItem('pbl_prg_initiatives')||'[]');
let _onboardees=JSON.parse(localStorage.getItem('pbl_onboardees')||'[]');
let _devGoals=JSON.parse(localStorage.getItem('pbl_devgoals')||'[]');
let _campaigns=JSON.parse(localStorage.getItem('pbl_campaigns')||'[]');
let _analyticsLog=JSON.parse(localStorage.getItem('pbl_analytics')||'[]');
let _outreachLog=JSON.parse(localStorage.getItem('pbl_outreach')||'[]');
let _partners=JSON.parse(localStorage.getItem('pbl_partners')||'[]');
let _complianceLog=JSON.parse(localStorage.getItem('pbl_compliance')||'[]');
let _roomBookings=JSON.parse(localStorage.getItem('pbl_roombookings')||'[]');
let _iccMinutes=JSON.parse(localStorage.getItem('pbl_iccminutes')||'[]');
let _bluePandaRegs=JSON.parse(localStorage.getItem('pbl_bluepanda')||'[]');
let _confEvents=JSON.parse(localStorage.getItem('pbl_confevents')||'[{"name":"Fall Conference","date":"Oct 2026","dues":150,"paid":[],"unpaid":[]},{"name":"State Conference","date":"Feb 2027","dues":200,"paid":[],"unpaid":[]},{"name":"National Conference","date":"Jun 2027","dues":350,"paid":[],"unpaid":[]}]');
let _presAgendas=JSON.parse(localStorage.getItem('pbl_agendas')||'[]');
let _delegations=JSON.parse(localStorage.getItem('pbl_delegation')||'[]');
let _officerCheckins=JSON.parse(localStorage.getItem('pbl_officercheckins')||'[]');
let _decisionLog=JSON.parse(localStorage.getItem('pbl_decisionlog')||'[]');
let _memberPoints=JSON.parse(localStorage.getItem('pbl_memberpoints')||'[]');
let _eventChecklists=JSON.parse(localStorage.getItem('pbl_eventchecklists')||'[]');
let _vendors=JSON.parse(localStorage.getItem('pbl_vendors')||'[]');
let _commsLog=JSON.parse(localStorage.getItem('pbl_commslog')||'[]');
let _graphicRequests=JSON.parse(localStorage.getItem('pbl_graphicrequests')||'[]');
let _compResults=JSON.parse(localStorage.getItem('pbl_compresults')||'[]');
let _polarisAssignments=JSON.parse(localStorage.getItem('pbl_polarisassignments')||'[]');
let _polarisLessons=JSON.parse(localStorage.getItem('pbl_polarislessons')||'[]');
let _polarisGuides=JSON.parse(localStorage.getItem('pbl_polarisguides')||JSON.stringify([
  {title:'How to Write a Report',category:'Writing',icon:'📝',pinned:true,open:false,content:`STRUCTURE\n1. Title Page — club name, report title, author, date\n2. Executive Summary — 1–2 paragraphs: what, why, key findings, recommendation (write this LAST)\n3. Introduction — background, purpose, scope of the report\n4. Body — clear sections with headings; each paragraph = one idea + evidence + analysis\n5. Conclusion — summarize findings and restate the recommendation\n6. References — cite all sources (see APA/MLA guide)\n7. Appendix — charts, raw data, supporting documents\n\nTIPS\n• Use headers and subheaders to make the report scannable\n• Aim for concise language — cut filler like "it is important to note that"\n• Number pages and include a table of contents for longer reports\n• Proofread for grammar, consistency, and professional tone\n\nCOMMON MISTAKES\n• Opening with "In this report I will..." — state the purpose directly instead\n• No clear thesis or recommendation anywhere in the report\n• Mixing citation styles without consistency\n• Forgetting an executive summary (judges read it first)`},
  {title:'How to Make a Project Display / Model',category:'Presentation',icon:'🏗️',pinned:true,open:false,content:`PLANNING\n1. Define the purpose — what does your display or model communicate?\n2. Sketch a layout before building — plan sections, visuals, and flow\n3. Gather materials — display board, markers, printed visuals, labels\n\nTRI-FOLD BOARD LAYOUT\nLeft Panel:   Background, Research Question, Hypothesis\nCenter Panel: Procedure/Method, Data, Charts\nRight Panel:  Results, Conclusion, References\n\nPHYSICAL MODEL TIPS\n• Label every component clearly\n• Include a legend or scale notation\n• Test structural integrity before presentation day\n• Provide a 1-page written summary to accompany the model\n\nVISUAL DESIGN RULES\n• 2–3 colors max — use a consistent palette\n• Font hierarchy: Title 24pt+, Headings 16–18pt, Body 11–12pt\n• Leave whitespace — don't crowd every inch with text\n• Print images at high resolution (300 DPI)\n• Use real data charts, not clip art\n\nDAY-OF CHECKLIST\n□ Model is stable and easy to transport\n□ All labels are legible from arm's length\n□ Supporting 1-pager printed\n□ You can explain every component without looking at the board`},
  {title:'How to Cite Sources — APA & MLA',category:'Writing',icon:'📚',pinned:true,open:false,content:`APA 7th EDITION\n\nBook:\n  Author, A. (Year). Title in sentence case. Publisher.\n\nJournal Article:\n  Author, A., & Author, B. (Year). Article title. Journal Name, Volume(Issue), pp–pp. https://doi.org/...\n\nWebsite:\n  Author, A. (Year, Month Day). Page title. Site Name. URL\n\nIn-text: (Author, Year)  |  Direct quote: (Author, Year, p. #)\n\n─────────────────────────────────\nMLA 9th EDITION\n\nBook:\n  Author Last, First. Title of Book. Publisher, Year.\n\nWebsite:\n  Author Last, First. "Page Title." Site Name, Day Mon. Year, URL.\n\nIn-text: (Author Page#)  e.g. (Smith 14)\n\n─────────────────────────────────\nGENERAL RULES\n• Alphabetize your reference list by author's last name\n• Hanging indent on every entry (first line flush, rest indented)\n• Use ONE citation style throughout — don't mix APA and MLA\n• When in doubt, over-cite rather than risk plagiarism\n• Free tools: Zotero, Cite This For Me, Purdue OWL (verify output)`},
  {title:'Business Presentation Tips',category:'Presentation',icon:'🎤',pinned:true,open:false,content:`STRUCTURE — the PREP Formula\n  Point   — state your main point upfront\n  Reason  — explain why it matters\n  Example — support with data, story, or demo\n  Point   — restate and issue a call to action\n\nSLIDE DESIGN RULES\n• 1 idea per slide\n• Max 6 bullets; max 6 words per bullet (the "6×6 rule")\n• High contrast — dark text on light BG or vice versa\n• Images and charts beat text walls\n• Consistent fonts: 1 heading + 1 body font, that's it\n\nDELIVERY TIPS\n• Eye contact — sweep the room; never read the screen\n• Speak slower than feels natural — nerves speed you up\n• Pause after key points — silence is powerful\n• Memorize your opening line; opening nerves are the worst\n• Practice out loud, not just in your head\n\nQ&A HANDLING\n• "Great question" is filler — just answer\n• If you don't know: "I don't have that data on hand; I'll follow up"\n• Restate hostile questions neutrally before answering\n\nPBL COMPETITION-SPECIFIC\n• Know the judge rubric and structure your talk to match it\n• Time yourself — going over costs points\n• Business casual dress minimum\n• Bring printed handouts if the event rules allow`},
  {title:'Business Plan Structure',category:'Strategy',icon:'📋',pinned:true,open:false,content:`1. EXECUTIVE SUMMARY  (write last, present first)\n   Business concept, mission, product/service overview\n   Target market and competitive advantage\n   Financial highlights and funding request\n\n2. COMPANY DESCRIPTION\n   Business name, location, legal structure\n   History/origin, vision, and mission statement\n   Short-term and long-term goals\n\n3. MARKET ANALYSIS\n   Industry overview and trends (cite real data)\n   Target customer profile (demographics, behavior)\n   Competitive analysis — direct and indirect competitors\n   Market size and estimated market share\n\n4. PRODUCTS & SERVICES\n   Description of offerings\n   Unique value proposition\n   Pricing strategy and rationale\n\n5. MARKETING & SALES STRATEGY\n   Channels — social media, partnerships, events\n   Customer acquisition and retention plan\n\n6. OPERATIONS PLAN\n   Location, facilities, key equipment\n   Staffing and management structure\n   Key processes and workflows\n\n7. FINANCIAL PROJECTIONS\n   Startup costs breakdown\n   Revenue forecast — Year 1–3\n   Break-even analysis\n   Cash flow statement\n\nTIPS\n• Judges read the executive summary first and last — make it strong\n• Use real numbers and cite your market research sources\n• Avoid vague buzzwords — be specific and direct\n• Proofread financial tables for consistency`},
]));


// EXEC PORTALS
const PORTALS_CFG={
  'portal-finance':{
    owners:['George Huang','Anna Huynh'],
    stats:()=>{
      const inc=transactions.income.reduce((s,t)=>s+t.amount,0);
      const exp=transactions.expense.reduce((s,t)=>s+t.amount,0);
      return[{l:'Total Income',v:'$'+inc.toLocaleString(),s:'FY 2024–2025'},{l:'Total Expenses',v:'$'+exp.toLocaleString(),s:'FY 2024–2025'},{l:'Net Surplus',v:'$'+(inc-exp).toLocaleString(),s:'End balance $2,991'},{l:'ICC Forms',v:_iccForms.length,s:'Logged this year'}];
    },
    links:[
      {action:"showTab('portal-finance','vpdash');renderVPDash()",label:'VP Dashboard',desc:'Outstanding payments & checklist'},
      {action:"showTab('portal-finance','confpayments');renderConfPayLedger()",label:'Conf. Payments',desc:'Phased member payment tracker'},
      {action:"showTab('portal-finance','budget');initFinBudget()",label:'Budget Ledger',desc:'Full income & expense log'},
      {action:"showTab('portal-finance','roi');renderROITable()",label:'ROI Analysis',desc:'Event profitability & cost-per-member'},
      {action:"showTab('portal-finance','iccforms');renderICCForms()",label:'ICC Forms',desc:'Reimbursements, deposits & invoices'},
      {action:"showTab('portal-finance','finreports');renderFinReports()",label:'Financial Reports',desc:'Quarterly summaries & exports'},
    ]
  },
  'portal-operations':{
    owners:['Addy Hu','Dianne Johnson'],
    stats:()=>{
      const up=eventsData.upcoming.length;
      const open=[...tasks.ebod,...tasks.general].filter(t=>!t.done&&['Addy Hu','Dianne Johnson'].includes(t.owner)).length;
      return[{l:'Upcoming Events',v:up,s:'Scheduled'},{l:'Open Tasks',v:open,s:'Assigned to you'},{l:'Logistics',v:_confLogistics.length,s:'Conferences tracked'},{l:'KPI Periods',v:_kpiEntries.length,s:'Recorded'}];
    },
    links:[
      {action:"showPage('events')",label:'Events',desc:'Upcoming, past & run of show'},
      {action:"showTab('portal-operations','conflogistics');renderConfLogistics()",label:'Conf. Logistics',desc:'Hotel, catering & registration'},
      {action:"showTab('portal-operations','kpis');renderKPIs()",label:'KPI Dashboard',desc:'Budget efficiency & attendance rates'},
      {action:"showTab('portal-operations','iccexcursions');renderICCExcursions()",label:'ICC Excursions',desc:'Field trips & ICC documentation'},
      {action:"showTab('portal-operations','venues')",label:'Venues',desc:'Room & venue tracker'},
      {action:"showTab('portal-operations','eventchecklist');renderEventChecklists()",label:'Event Checklist',desc:'Pre & post event task lists'},
      {action:"showTab('portal-operations','vendors');renderVendors()",label:'Vendors',desc:'Vendor & contact directory'},
    ]
  },
  'portal-strategy':{
    owners:['Arya Somu','Iker Jimenez'],
    stats:()=>{
      const avg=bootcamps.length?Math.round(bootcamps.reduce((s,b)=>s+Math.round(b.att/b.tot*100),0)/bootcamps.length):0;
      return[{l:'Bootcamp Sessions',v:bootcamps.length,s:'Completed'},{l:'Avg Attendance',v:avg+'%',s:'Across sessions'},{l:'PRG Members',v:_prgRoster.length,s:'Active'},{l:'Dev Goals',v:_devGoals.length,s:'Tracked'}];
    },
    links:[
      {action:"showPage('bootcamps')",label:'Bootcamps',desc:'Session notes & attendance'},
      {action:"showPage('goals')",label:'Goals & OKRs',desc:'Quarter targets & progress'},
      {action:"showTab('portal-strategy','prg');renderPRG()",label:'Polaris PRG',desc:'Research group roster & initiatives'},
      {action:"showTab('portal-strategy','onboarding');renderOnboarding()",label:'Onboarding',desc:'New member pipeline & stages'},
      {action:"showTab('portal-strategy','devgoals');renderDevGoals()",label:'Dev Goals',desc:'Personal leadership development'},
      {action:"showTab('portal-strategy','comphistory');renderCompHistory()",label:'Comp History',desc:'Competition placements & results'},
    ]
  },
  'portal-marketing':{
    owners:['Nhi Tran','Jordan Nguyen'],
    stats:()=>{
      const conf=sponsors.length;
      const pip=pipeline.filter(p=>p.stage!=='Closed').length;
      return[{l:'Confirmed Sponsors',v:conf,s:'This cycle'},{l:'Active Pipeline',v:pip,s:'Prospects in progress'},{l:'Campaigns',v:_campaigns.length,s:'This quarter'},{l:'Outreach',v:_outreachLog.length,s:'Initiatives logged'}];
    },
    links:[
      {action:"showPage('sponsors')",label:'Sponsors',desc:'Pipeline & contacts'},
      {action:"showTab('portal-marketing','campaigns');renderCampaigns()",label:'Campaigns',desc:'Social & digital campaign tracker'},
      {action:"showTab('portal-marketing','analytics');renderAnalytics()",label:'Analytics',desc:'Platform metrics & engagement data'},
      {action:"showTab('portal-marketing','outreach');renderOutreach()",label:'Outreach Log',desc:'Club-to-club & community reach'},
      {action:"showPage('templates')",label:'Templates',desc:'Proposals, flyers & resources'},
      {action:"showTab('portal-marketing','commslog');renderCommsLog()",label:'Comms Log',desc:'Email & communications tracker'},
      {action:"showTab('portal-marketing','graphicrequests');renderGraphicRequests()",label:'Graphic Requests',desc:'Design request tracker'},
    ]
  },
  'portal-clubaffairs':{
    owners:['Christina Tran'],
    stats:()=>{
      const tot=prospects.length;
      const conv=prospects.filter(p=>p.stage==='Joined').length;
      return[{l:'Prospects',v:tot,s:'In pipeline'},{l:'Converted',v:conv,s:'Joined this quarter'},{l:'Partnerships',v:_partners.length,s:'Active'},{l:'Bookings',v:_roomBookings.length,s:'Logged'}];
    },
    links:[
      {action:"showPage('recruitment')",label:'Recruitment',desc:'Prospect pipeline & follow-ups'},
      {action:"showTab('portal-clubaffairs','partners');renderPartners()",label:'External Partners',desc:'Alumni, corporate & club liaisons'},
      {action:"showTab('portal-clubaffairs','compliance');renderCompliance()",label:'HR & Compliance',desc:'Conduct log & policy tracking'},
      {action:"showTab('portal-clubaffairs','roombookings');renderRoomBookings()",label:'Room Bookings',desc:'Facility requests & confirmations'},
      {action:"showTab('portal-clubaffairs','iccbluepanda');renderICCBluePanda()",label:'ICC / Blue Panda',desc:'Chapter minutes & competition reg.'},
      {action:"showTab('portal-clubaffairs','points');renderMemberPoints()",label:'Points Tracker',desc:'Member engagement & points log'},
    ]
  },
  'portal-president':{
    owners:['Nisa Pradhan'],
    stats:()=>{
      const pendingDel=_delegations.filter(d=>d.status!=='Done').length;
      return[{l:'Conferences',v:_confEvents.length,s:'Tracked'},{l:'Agendas',v:_presAgendas.length,s:'This year'},{l:'Delegations',v:_delegations.length,s:'Cross-functional'},{l:'Pending',v:pendingDel,s:'Not yet done'}];
    },
    links:[
      {action:"showTab('portal-president','conferences');renderConfDues()",label:'Conf. Dues',desc:'Track payment status per conference'},
      {action:"showTab('portal-president','agendas');renderPresAgendas()",label:'Meeting Agendas',desc:'Parliamentary-order agenda builder'},
      {action:"showTab('portal-president','delegation');renderDelegation()",label:'Board Delegation',desc:'Cross-functional deliverables tracker'},
      {action:"showTab('portal-president','officercheckins');renderOfficerCheckins()",label:'Officer Check-Ins',desc:'Officer attendance & 1-on-1 log'},
      {action:"showTab('portal-president','decisions');renderDecisionLog()",label:'Decision Log',desc:'Board decisions & rationale'},
    ]
  }
};
function renderPortals(){
  Object.entries(PORTALS_CFG).forEach(([id,cfg])=>{
    try{
      const sl=document.getElementById(id+'-stats');
      if(sl){
        try{const stats=cfg.stats();sl.innerHTML=stats.map(s=>`<div class="sc"><div class="sl">${s.l}</div><div class="sv">${s.v}</div><div class="sm">${s.s}</div></div>`).join('');}
        catch(e){console.warn('Portal stats error for',id,e);}
      }
      const tl=document.getElementById(id+'-tasks');
      if(tl){
        const myTasks=[...tasks.ebod,...tasks.general].filter(t=>cfg.owners.includes(t.owner));
        if(!myTasks.length){tl.innerHTML=`<div style="font-size:11px;color:var(--t4);padding:8px 0">No tasks assigned.</div>`;}
        else{tl.innerHTML=myTasks.map(t=>{const board=tasks.ebod.find(x=>x.id===t.id)?'ebod':'general';return`<div class="tr"><div class="tcb ${t.done?'done':''}" onclick="toggleTask(${t.id},'${board}');renderPortals()"></div><div style="flex:1"><div class="tt ${t.done?'dk':''}" onclick="openTaskDetail(${t.id},'${board}')">${t.text}</div><div class="tm">Due ${t.due} &middot; ${t.cat}</div></div><div class="to">${t.owner}</div></div>`;}).join('');}
      }
      const ll=document.getElementById(id+'-links');
      if(ll){
        ll.innerHTML=cfg.links.map(l=>{
          const act=l.action?l.action.replace(/"/g,'&quot;'):`showPage('${l.page||''}')`;
          return`<div class="card" style="cursor:pointer;margin-bottom:0" onclick="${act}"><div class="ct" style="margin-bottom:4px">${l.label}</div><div style="font-size:10px;color:var(--t3)">${l.desc}</div><div style="font-size:9px;color:var(--grn);margin-top:8px;font-weight:600">Open &#8250;</div></div>`;
        }).join('');
      }
    }catch(e){console.warn('Portal render error for',id,e);}
  });
}

// ---- FEATURE 1: localStorage persistence ----
const SAVE_KEY='pblhub_v1';
let _saveTimer=null;
function saveData(){
  const d={
    members,execTeam,bootcamps,tasks,agendas,eventsData,emails,consultingProjects,clients,deliverables,
    compResults,compHistory,transactions,meetingMinutes,prospects,goals,transitionDocs,announcements,
    mentorPairs,sponsors,pipeline,rosData,eventCosts,reimbursements,venues,volunteerSlots,compPrep,
    curriculum,brandKit,contentPosts,memberCheckIns,
    compEvents,resources,eventSlides,lectureSlides,
    pblTransactions,merchSales,importedCalEvents,
    nM,nE,nB,nT,nA,nEv,nEmail,nCon,nCli,nDel,nCR,nCE,nCH,nTr,nMin,nPr,nGoal,nTD,nAnn,nMP,nSp,nPl,nRos,
    nEC,nReim,nVen,nVS,nCP,nCurr,nBKC,nBKF,nPost,nMCI,nPblTr,nMerch,
    // ── pbl_* keys (member portal & shared state) ──
    highlights:typeof highlights!=='undefined'?highlights:[],
    quickLinks:typeof quickLinks!=='undefined'?quickLinks:[],
    confEvents:_confEvents,
    fblaEvents:typeof _fblaEvents!=='undefined'?_fblaEvents:[],
    ohSlots:typeof _ohSlots!=='undefined'?_ohSlots:[],
    contacts:typeof _contacts!=='undefined'?_contacts:[],
    hwAssignments:typeof hwAssignments!=='undefined'?hwAssignments:[],
    execContacts:JSON.parse(localStorage.getItem('pbl_execcontacts')||'{}'),
  };
  try{localStorage.setItem(SAVE_KEY,JSON.stringify(d));}catch(e){}
  // Save to Firestore (async, non-blocking — keeps all devices in sync)
  if(window._db){
    window._db.collection('chapter').doc('main').set(d)
      .catch(err=>console.warn('Firestore write failed:',err));
  }
  const ind=document.getElementById('save-indicator');
  if(ind){ind.classList.add('show');clearTimeout(ind._t);ind._t=setTimeout(()=>ind.classList.remove('show'),1800);}
}
function loadData(){
  try{
    const raw=localStorage.getItem(SAVE_KEY);if(!raw)return;
    const d=JSON.parse(raw);
    if(d.members)members=d.members;
    if(d.execTeam)execTeam=d.execTeam;
    if(d.bootcamps)bootcamps=d.bootcamps;
    if(d.tasks)tasks=d.tasks;
    if(d.agendas)agendas=d.agendas;
    if(d.eventsData)eventsData=d.eventsData;
    if(d.emails)emails=d.emails;
    if(d.consultingProjects)consultingProjects=d.consultingProjects;
    if(d.clients)clients=d.clients;
    if(d.deliverables)deliverables=d.deliverables;
    if(d.compResults)compResults=d.compResults;
    if(d.compEvents)compEvents=d.compEvents;
    if(d.compHistory)compHistory=d.compHistory;
    if(d.transactions)transactions=d.transactions;
    if(d.meetingMinutes)meetingMinutes=d.meetingMinutes;
    if(d.prospects)prospects=d.prospects;
    if(d.goals)goals=d.goals;
    if(d.transitionDocs)transitionDocs=d.transitionDocs;
    if(d.announcements)announcements=d.announcements;
    if(d.mentorPairs)mentorPairs=d.mentorPairs;
    if(d.sponsors)sponsors=d.sponsors;
    if(d.pipeline)pipeline=d.pipeline;
    if(d.rosData)rosData=d.rosData;
    if(d.eventCosts)eventCosts=d.eventCosts;
    if(d.reimbursements)reimbursements=d.reimbursements;
    if(d.venues)venues=d.venues;
    if(d.volunteerSlots)volunteerSlots=d.volunteerSlots;
    if(d.compPrep)compPrep=d.compPrep;
    if(d.curriculum)curriculum=d.curriculum;
    if(d.brandKit)brandKit=d.brandKit;
    if(d.contentPosts)contentPosts=d.contentPosts;
    if(d.memberCheckIns)memberCheckIns=d.memberCheckIns;
    if(d.resources)resources=d.resources;
    if(d.eventSlides)eventSlides=d.eventSlides;
    if(d.lectureSlides)lectureSlides=d.lectureSlides;
    if(d.pblTransactions)pblTransactions=d.pblTransactions;
    if(d.merchSales)merchSales=d.merchSales;
    if(d.importedCalEvents)importedCalEvents=d.importedCalEvents;
    if(d.nPblTr!==undefined)nPblTr=d.nPblTr;
    if(d.nMerch!==undefined)nMerch=d.nMerch;
    if(d.nM!==undefined)nM=d.nM;
    if(d.nE!==undefined)nE=d.nE;
    if(d.nB!==undefined)nB=d.nB;
    if(d.nT!==undefined)nT=d.nT;
    if(d.nA!==undefined)nA=d.nA;
    if(d.nEv!==undefined)nEv=d.nEv;
    if(d.nEmail!==undefined)nEmail=d.nEmail;
    if(d.nCon!==undefined)nCon=d.nCon;
    if(d.nCli!==undefined)nCli=d.nCli;
    if(d.nDel!==undefined)nDel=d.nDel;
    if(d.nCR!==undefined)nCR=d.nCR;
    if(d.nCE!==undefined)nCE=d.nCE;
    if(d.nCH!==undefined)nCH=d.nCH;
    if(d.nTr!==undefined)nTr=d.nTr;
    if(d.nMin!==undefined)nMin=d.nMin;
    if(d.nPr!==undefined)nPr=d.nPr;
    if(d.nGoal!==undefined)nGoal=d.nGoal;
    if(d.nTD!==undefined)nTD=d.nTD;
    if(d.nAnn!==undefined)nAnn=d.nAnn;
    if(d.nMP!==undefined)nMP=d.nMP;
    if(d.nSp!==undefined)nSp=d.nSp;
    if(d.nPl!==undefined)nPl=d.nPl;
    if(d.nRos!==undefined)nRos=d.nRos;
    if(d.nEC!==undefined)nEC=d.nEC;
    if(d.nReim!==undefined)nReim=d.nReim;
    if(d.nVen!==undefined)nVen=d.nVen;
    if(d.nVS!==undefined)nVS=d.nVS;
    if(d.nCP!==undefined)nCP=d.nCP;
    if(d.nCurr!==undefined)nCurr=d.nCurr;
    if(d.nBKC!==undefined)nBKC=d.nBKC;
    if(d.nBKF!==undefined)nBKF=d.nBKF;
    if(d.nPost!==undefined)nPost=d.nPost;
    if(d.nMCI!==undefined)nMCI=d.nMCI;
  }catch(e){}
}
function resetAllData(){
  if(!confirm('Reset ALL data to defaults? This cannot be undone.'))return;
  localStorage.removeItem(SAVE_KEY);location.reload();
}
document.addEventListener('click',()=>{clearTimeout(_saveTimer);_saveTimer=setTimeout(saveData,800);});
document.addEventListener('change',()=>{clearTimeout(_saveTimer);_saveTimer=setTimeout(saveData,800);});

// ---- FEATURE 2: Global search ----
function gsSearch(q){
  const drop=document.getElementById('gs-drop');
  if(!q.trim()){gsClose();return;}
  const lq=q.toLowerCase();
  const sections=[];
  const cap=4;
  const mRes=members.filter(m=>(m.first+' '+m.last).toLowerCase().includes(lq)).slice(0,cap);
  if(mRes.length)sections.push({cat:'Members',items:mRes.map(m=>({label:m.first+' '+m.last,sub:m.role,page:'attendance'}))});
  const tRes=[...tasks.ebod,...tasks.general].filter(t=>t.text.toLowerCase().includes(lq)).slice(0,cap);
  if(tRes.length)sections.push({cat:'Tasks',items:tRes.map(t=>({label:t.text,sub:'Due '+t.due,page:'tasks'}))});
  const spRes=sponsors.filter(s=>s.name.toLowerCase().includes(lq)).slice(0,cap);
  if(spRes.length)sections.push({cat:'Sponsors',items:spRes.map(s=>({label:s.name,sub:s.tier,page:'sponsors'}))});
  const evRes=[...eventsData.upcoming,...(eventsData.past||[])].filter(e=>e.name.toLowerCase().includes(lq)).slice(0,cap);
  if(evRes.length)sections.push({cat:'Events',items:evRes.map(e=>({label:e.name,sub:e.date,page:'events'}))});
  const bcRes=bootcamps.filter(b=>(b.name+' '+b.topic).toLowerCase().includes(lq)).slice(0,cap);
  if(bcRes.length)sections.push({cat:'Bootcamps',items:bcRes.map(b=>({label:b.name,sub:b.topic,page:'bootcamps'}))});
  const gRes=goals.filter(g2=>g2.title.toLowerCase().includes(lq)).slice(0,cap);
  if(gRes.length)sections.push({cat:'Goals',items:gRes.map(g2=>({label:g2.title,sub:g2.metric,page:'goals'}))});
  const vRes=venues.filter(v=>v.name.toLowerCase().includes(lq)).slice(0,cap);
  if(vRes.length)sections.push({cat:'Venues',items:vRes.map(v=>({label:v.name,sub:v.status,page:'portal-operations'}))});
  if(!sections.length){drop.innerHTML='<div class="gs-item" style="color:var(--t4)">No results</div>';drop.classList.add('open');return;}
  drop.innerHTML=sections.map(s=>`<div class="gs-cat">${s.cat}</div>`+s.items.map(it=>`<div class="gs-item" onclick="gsGo('${it.page}')"><span style="font-weight:500">${it.label}</span>${it.sub?`<span style="font-size:10px;color:var(--t3);margin-left:6px">${it.sub}</span>`:''}</div>`).join('')).join('');
  drop.classList.add('open');
}
function gsGo(page){
  showPage(page);
  document.getElementById('gs-input').value='';
  gsClose();
}
function gsClose(){document.getElementById('gs-drop').classList.remove('open');}
document.addEventListener('click',e=>{if(!e.target.closest('.gs-wrap'))gsClose();});

// ---- FEATURE 3: Export / Print ----
function exportCSV(rows,filename){
  const csv=rows.map(r=>r.map(c=>'"'+String(c==null?'':c).replace(/"/g,'""')+'"').join(',')).join('\n');
  const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);a.download=filename;a.click();
}
function exportBudgetCSV(){
  const rows=[['Type','Description','Category','Date','Amount']];
  transactions.income.forEach(t=>rows.push(['Income',t.desc,t.cat,t.date,t.amount]));
  transactions.expense.forEach(t=>rows.push(['Expense',t.desc,t.cat,t.date,t.amount]));
  exportCSV(rows,'budget_export.csv');
}
function exportMembersCSV(){
  const rows=[['First','Last','Role','Email','Attendance %']];
  members.forEach(m=>{
    const r=Math.round(m.att.filter(x=>x).length/m.att.length*100);
    rows.push([m.first,m.last,m.role,m.email,r+'%']);
  });
  exportCSV(rows,'members_export.csv');
}
function printAgenda(id){
  const a=agendas.find(x=>x.id===id);if(!a)return;
  const w=window.open('','_blank','width=700,height=600');
  w.document.write(`<!DOCTYPE html><html><head><title>${a.name}</title><style>body{font-family:'Segoe UI',sans-serif;padding:40px;color:#222;max-width:600px;margin:0 auto}h1{font-size:22px;margin-bottom:4px}h2{font-size:13px;color:#666;font-weight:400;margin-bottom:28px}h3{font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:#999;margin-bottom:8px;margin-top:24px}ol{padding-left:20px;line-height:2}p{font-size:13px;color:#555;line-height:1.6}.status{display:inline-block;padding:2px 10px;border-radius:3px;font-size:10px;font-weight:600;background:#eee;color:#555;margin-bottom:16px}@media print{body{padding:20px}}</style></head><body>`);
  w.document.write(`<h1>${a.name}</h1><h2>${a.date}</h2><span class="status">${a.status}</span><h3>Agenda Items</h3><ol>${a.items.split('\n').filter(x=>x.trim()).map(i=>`<li>${i}</li>`).join('')}</ol>`);
  if(a.notes)w.document.write(`<h3>Notes</h3><p>${a.notes.replace(/\n/g,'<br>')}</p>`);
  w.document.write('</body></html>');
  w.document.close();w.focus();setTimeout(()=>w.print(),400);
}

// ---- FEATURE 4: Calendar ----
let calYear=2026,calMonth=4; // 0-indexed, 4=May
const MONTH_NAMES=['January','February','March','April','May','June','July','August','September','October','November','December'];
const SHORT_MONTHS={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
function parseItemDate(str,year){
  if(!str)return null;
  // Skip month-only dates like "Mar 2026" (no day number immediately after month)
  if(/^[A-Za-z]+\s+\d{4}$/.test(str.trim()))return null;
  const m=str.match(/^([A-Za-z]+)\s+(\d+)/);
  if(!m)return null;
  const mo=SHORT_MONTHS[m[1].slice(0,3)];
  if(mo===undefined)return null;
  return new Date(year,mo,parseInt(m[2]));
}
function calPrev(){calMonth--;if(calMonth<0){calMonth=11;calYear--;}renderCalendar();}
function calNext(){calMonth++;if(calMonth>11){calMonth=0;calYear++;}renderCalendar();}
function renderCalendar(){
  const lbl=document.getElementById('cal-month-label');
  if(lbl)lbl.textContent=MONTH_NAMES[calMonth]+' '+calYear;
  const grid=document.getElementById('cal-grid');if(!grid)return;
  const first=new Date(calYear,calMonth,1).getDay();
  const days=new Date(calYear,calMonth+1,0).getDate();
  const today=new Date();
  // Build items map: day -> [{type,label,page}]
  const map={};
  function addItem(dateStr,type,label,page){
    const d=parseItemDate(dateStr,calYear);
    if(!d||d.getMonth()!==calMonth||d.getFullYear()!==calYear)return;
    const k=d.getDate();
    if(!map[k])map[k]=[];
    map[k].push({type,label,page});
  }
  eventsData.upcoming.forEach(e=>addItem(e.date,'ev',e.name,'events'));
  bootcamps.forEach(b=>addItem(b.date,'bc',b.name+': '+b.topic,'bootcamps'));
  [...tasks.ebod,...tasks.general].filter(t=>!t.done).forEach(t=>addItem(t.due,'tk',t.text,'tasks'));
  agendas.forEach(a=>addItem(a.date,'ag',a.name,'tasks'));
  if(importedCalEvents)importedCalEvents.forEach(e=>addItem(e.date,'ev','📅 '+e.name,'calendar'));
  let html='';
  ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d=>{html+=`<div class="cal-dow">${d}</div>`;});
  for(let i=0;i<first;i++)html+=`<div class="cal-cell out"></div>`;
  for(let d=1;d<=days;d++){
    const isToday=today.getFullYear()===calYear&&today.getMonth()===calMonth&&today.getDate()===d;
    const items=map[d]||[];
    const badges=items.slice(0,4).map(it=>`<div class="cal-badge cal-${it.type}" onclick="event.stopPropagation();showPage('${it.page}')" title="${it.label}">${it.label}</div>`).join('');
    const more=items.length>4?`<div style="font-size:8px;color:var(--t3)">+${items.length-4} more</div>`:'';
    html+=`<div class="cal-cell${isToday?' today':''}"><div class="cal-dn">${d}</div>${badges}${more}</div>`;
  }
  grid.innerHTML=html;
}

// ---- FEATURE 6: Sponsor renewal alerts ----
function sponsorRenewalAlerts(){
  const alerts=[];
  const now=new Date();
  const in60=new Date(now.getTime()+60*24*60*60*1000);
  sponsors.forEach(s=>{
    if(!s.renewalDate)return;
    const m=s.renewalDate.match(/^([A-Za-z]+)\s+(\d{4})$/);
    if(!m)return;
    const mo=SHORT_MONTHS[m[1].slice(0,3)];
    if(mo===undefined)return;
    const d=new Date(parseInt(m[2]),mo,1);
    if(d>=now&&d<=in60)alerts.push(s.name+' ('+s.renewalDate+')');
  });
  return alerts;
}

// NAV
const META={
  consulting:['Consulting','Client project tracker & deliverables'],
  competition:['FBLA Competitions','Member results, events & chapter history'],
  budget:['Budget','Income, expenses & financial summary'],
  minutes:['Meeting Minutes','Full meeting records & action items'],
  recruitment:['Recruitment','Prospect pipeline & follow-ups'],
  goals:['Goals & OKRs','Quarter targets & progress tracking'],
  transition:['Officer Transition','Handoff docs by position'],
  contacts:['Contacts','Vendors, leadership & key contacts'],
  announcements:['Announcements','Draft & log club communications'],
  'member-content':['Member Portal Content','Manage what members see: announcements, guides, slides'],
  dashboard:['Dashboard','Spring 2026 \u00b7 De Anza PBL'],
  calendar:['Calendar','Monthly view of events, tasks & bootcamps'],
  attendance:['Attendance','Member roster & session records'],
  exec:['Exec Team','Executive board management'],
  mentorship:['Mentor / Mentee','Pair tracking & check-ins'],
  bootcamps:['Bootcamps','Session notes & attendance'],
  tasks:['Tasks & Agendas','EBOD task board & agendas'],
  events:['Events','Upcoming, past & run of show'],
  templates:['Templates','Proposals, resources & timelines'],
  sponsors:['Sponsors','Pipeline, contacts & email history'],
  'portal-president':['President\'s Hub',''],
  'portal-finance':['VP of Finance',''],
  'portal-operations':['VP of Operations',''],
  'portal-strategy':['VP of Strategy & Development',''],
  'portal-marketing':['VP of Marketing',''],
  'portal-clubaffairs':['VP of Club Affairs',''],
  homework:['Homework','Review & grade member submissions'],
};
function showPage(id){
  closeDetail();
  const appEl=document.getElementById('app-ebod');
  appEl.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  appEl.querySelectorAll('.ni').forEach(n=>n.classList.remove('active'));
  const pageEl=appEl.querySelector('#page-'+id);
  if(!pageEl)return;
  pageEl.classList.add('active');
  appEl.querySelectorAll('.ni').forEach(n=>{if(n.getAttribute('onclick')&&n.getAttribute('onclick').includes("'"+id+"'"))n.classList.add('active');});
  const m=META[id];
  if(m){document.getElementById('page-title').textContent=m[0];document.getElementById('page-sub').textContent=m[1];}
  if(PORTALS_CFG[id])renderPortals();
}
function showTab(page,tab){
  const appEl=document.getElementById('app-ebod');
  const p=appEl.querySelector('#page-'+page);
  if(!p)return;
  p.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  p.querySelectorAll('.sub').forEach(s=>s.classList.remove('active'));
  const tEl=p.querySelector(`[onclick*="'${tab}'"]`);if(tEl)tEl.classList.add('active');
  const sEl=appEl.querySelector('#'+page+'-'+tab);if(sEl)sEl.classList.add('active');
}

// MODALS
function openModal(id){document.getElementById(id).classList.add('open');}
function openTaskModal(b){document.getElementById('task-board').value=b;openModal('task-modal');}
function closeModals(){document.querySelectorAll('.overlay').forEach(m=>m.classList.remove('open'));}
document.querySelectorAll('.overlay').forEach(m=>m.addEventListener('click',function(e){if(e.target===this)closeModals();}));

// INIT
// RUN OF SHOW DATA
let rosData={
  'DAIS 2026':[
    {id:1,time:'8:00 AM',item:'Doors Open / Check-In',notes:'2 volunteers at entrance, sign-in sheet at table'},
    {id:2,time:'8:30 AM',item:'Welcome & Introductions',notes:'President opens, introduce EBOD, housekeeping'},
    {id:3,time:'9:00 AM',item:'Keynote Speaker',notes:'Confirm A/V 30 min before · 45 min slot'},
    {id:4,time:'10:00 AM',item:'Breakout Sessions',notes:'3 rooms · assignments on door'},
    {id:5,time:'12:00 PM',item:'Lunch',notes:'Catering confirmed · dietary restrictions tracked'},
    {id:6,time:'1:00 PM',item:'Student Presentations',notes:'4 groups · 10 min each · judges panel'},
    {id:7,time:'2:30 PM',item:'Awards & Closing',notes:'Awards printed by May 28'},
  ]
};let nRos=8;let currentRosEvent='DAIS 2026';

function renderRos(){
  // Populate event select
  const sel=document.getElementById('ros-event-select');
  if(sel){
    const events=[...eventsData.upcoming,...eventsData.past].map(e=>e.name);
    const allEvents=[...new Set([...Object.keys(rosData),...events])];
    sel.innerHTML='<option value="">Select Event...</option>'+allEvents.map(e=>`<option value="${e}"${e===currentRosEvent?' selected':''}>${e}</option>`).join('');
  }
  const title=document.getElementById('ros-event-title');
  if(title)title.textContent=(currentRosEvent||'Run of Show')+' — Minute by Minute';
  const t=document.getElementById('ros-table');
  if(!t)return;
  const items=rosData[currentRosEvent]||[];
  const dotColors=['var(--cr)','var(--gold2)','var(--grn)','var(--blu)','var(--cr2)','var(--gold)'];
  t.innerHTML=`<div class="tl">${items.map((r,i)=>`
    <div class="tli" style="cursor:pointer" onclick="openRosDetail(${r.id})">
      <div class="tld" style="background:${dotColors[i%dotColors.length]}"></div>
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
        <div style="flex:1">
          <div class="tlt">${r.time}</div>
          <div class="tll">${r.item}</div>
          ${r.notes?`<div class="tln">${r.notes}</div>`:''}
        </div>
        <button class="rb" style="opacity:.5;flex-shrink:0;margin-top:2px" onmouseenter="this.style.opacity=1" onmouseleave="this.style.opacity=.5" onclick="event.stopPropagation();deleteRosItem(${r.id})">&times;</button>
      </div>
    </div>`).join('')}</div>`;
}
function switchRos(eventName){
  if(!eventName)return;
  currentRosEvent=eventName;
  if(!rosData[eventName])rosData[eventName]=[];
  renderRos();
}
function openRosDetail(id){
  const items=rosData[currentRosEvent]||[];
  const r=items.find(x=>x.id===id);if(!r)return;
  openDetail(r.item,currentRosEvent+' · '+r.time,
    row2(fld('Time',inp('ed-rostime',r.time)),fld('Item',inp('ed-rositem',r.item)))+
    fld('Notes',ta('ed-rosnotes',r.notes,4))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveRosItem(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="deleteRosItem(${id});closeDetail()">Delete</button></div>`,r);
}
function saveRosItem(id,btn){
  const items=rosData[currentRosEvent]||[];
  const r=items.find(x=>x.id===id);if(!r)return;
  r.time=g('ed-rostime');r.item=g('ed-rositem');r.notes=g('ed-rosnotes');
  renderRos();saved(btn);
  document.getElementById('d-title').textContent=r.item;
  document.getElementById('d-sub').textContent=currentRosEvent+' · '+r.time;
}
function addRosItem(){
  if(!currentRosEvent){alert('Select an event first.');return;}
  if(!rosData[currentRosEvent])rosData[currentRosEvent]=[];
  rosData[currentRosEvent].push({id:nRos++,time:'',item:'New Item',notes:''});
  renderRos();
  const items=rosData[currentRosEvent];
  openRosDetail(items[items.length-1].id);
}
function deleteRosItem(id){
  if(!rosData[currentRosEvent])return;
  rosData[currentRosEvent]=rosData[currentRosEvent].filter(x=>x.id!==id);
  renderRos();
}

// ---- CSV IMPORT ENGINE ----
let csvTarget=null;
function triggerCsv(target){csvTarget=target;const inp=document.getElementById('csv-input');inp.value='';inp.click();}
function parseCsv(text){
  // Strip BOM, normalize line endings
  text=text.replace(/^﻿/,'').replace(/\r\n/g,'\n').replace(/\r/g,'\n');
  const lines=text.trim().split('\n');if(lines.length<2)return[];
  // Auto-detect separator: tab or comma
  const sep=lines[0].includes('\t')?'\t':',';
  const headers=lines[0].split(sep).map(h=>h.trim().replace(/^"|"$/g,'').toLowerCase().replace(/[^a-z0-9]/g,''));
  return lines.slice(1).filter(l=>l.trim()).map(line=>{
    const vals=[];let cur='';let inQ=false;
    for(let i=0;i<line.length;i++){
      const ch=line[i];
      if(ch==='"'){inQ=!inQ;}
      else if(ch===sep&&!inQ){vals.push(cur.trim().replace(/^"|"$/g,''));cur='';}
      else{cur+=ch;}
    }
    vals.push(cur.trim().replace(/^"|"$/g,''));
    const obj={};headers.forEach((h,i)=>{obj[h]=vals[i]||'';});return obj;
  });
}
function col(row,...keys){
  for(const k of keys){
    if(row[k]!==undefined&&row[k]!=='')return row[k];
    // also try key with all spaces/special chars stripped
    const nk=k.toLowerCase().replace(/[^a-z0-9]/g,'');
    if(nk!==k&&row[nk]!==undefined&&row[nk]!=='')return row[nk];
  }
  return'';
}
function handleCsvImport(e){
  const file=e.target.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=ev=>{
    const rows=parseCsv(ev.target.result);
    if(!rows.length){alert('No data found in CSV.');return;}
    const t=csvTarget;let added=0;
    if(t==='members'){rows.forEach(r=>{const nm=col(r,'name','fullname','full name');const first=col(r,'first','firstname','fname','first name')||(nm?nm.split(' ')[0]:'Unknown');const last=col(r,'last','lastname','lname','last name')||(nm?nm.split(' ').slice(1).join(' '):'');members.push({id:nM++,first,last,role:col(r,'role','type','position')||'Member',email:col(r,'email','emailaddress')||'',att:[0,0,0,0,0,0]});added++;});renderMembers();}
    else if(t==='exec'){rows.forEach(r=>{execTeam.push({id:nE++,name:col(r,'name','fullname','full name'),position:col(r,'position','title','role','pos')||'Member'});added++;});renderExec();}
    else if(t==='mentors'){rows.forEach(r=>{mentorPairs.push({id:nMP++,mentor:col(r,'mentor','mentorname','mentor name'),mentee:col(r,'mentee','menteename','mentee name'),checkins:parseInt(col(r,'checkins','checkindone','done'))||0,goal:parseInt(col(r,'goal','checkinsgoal','total'))||4,status:col(r,'status')||'In Progress',notes:col(r,'notes','note')});added++;});renderMentorship();}
    else if(t==='bootcamps'){rows.forEach(r=>{bootcamps.push({id:nB++,name:col(r,'name','session','sessionname'),date:col(r,'date'),topic:col(r,'topic','subject'),att:parseInt(col(r,'attended','attendance','att','present'))||0,tot:parseInt(col(r,'total','totalmembers','capacity'))||47,notes:col(r,'notes','note'),files:[]});added++;});renderBootcamps();}
    else if(t==='ebod'||t==='general'){rows.forEach(r=>{tasks[t].push({id:nT++,text:col(r,'task','text','name','title','description'),owner:col(r,'owner','assignedto','assigned')||'President',due:col(r,'due','duedate','deadline','date')||'TBD',cat:col(r,'category','cat','type')||'General',done:(col(r,'status','done','complete')||'').toLowerCase()==='complete',notes:col(r,'notes','note'),files:[]});added++;});renderTasks();}
    else if(t==='agendas'){rows.forEach(r=>{agendas.push({id:nA++,name:col(r,'name','meeting','title'),date:col(r,'date'),items:col(r,'items','agenda','agendaitems'),notes:col(r,'notes','note'),status:col(r,'status')||'Draft',files:[]});added++;});renderAgendas();}
    else if(t==='sponsors'){rows.forEach(r=>{sponsors.push({id:nSp++,abbr:(col(r,'name','company')||'??').slice(0,2).toUpperCase(),name:col(r,'name','company','organization'),tier:col(r,'tier','level','type')||'Bronze',contact:col(r,'contact','contactname'),email:col(r,'email','contactemail'),amount:col(r,'amount','donation')||''});added++;});renderSponsors();}
    else if(t==='pipeline'){rows.forEach(r=>{pipeline.push({id:nPl++,name:col(r,'name','company','organization'),ask:col(r,'ask','amount','target')||'',stage:col(r,'stage','status')||'Identified',next:col(r,'next','nextstep')||''});added++;});renderSponsors();}
    else if(t==='consulting'){rows.forEach(r=>{consultingProjects.push({id:nCon++,name:col(r,'name','project','projectname'),client:col(r,'client','company','clientname'),lead:col(r,'lead','owner','projectlead'),start:col(r,'start','startdate','date')||'',status:col(r,'status')||'Active',notes:col(r,'notes','note'),files:[]});added++;});renderConsulting();}
    else if(t==='clients'){rows.forEach(r=>{clients.push({id:nCli++,name:col(r,'name','company','organization'),contact:col(r,'contact','contactname'),email:col(r,'email'),industry:col(r,'industry','sector','type')||'',status:col(r,'status')||'Active',notes:col(r,'notes','note')});added++;});renderConsulting();}
    else if(t==='compresults'){rows.forEach(r=>{compResults.push({id:nCR++,member:col(r,'member','name','student'),event:col(r,'event','eventname'),competition:col(r,'competition','comp'),placement:col(r,'placement','place','result')||'Participated',year:col(r,'year')||'2026'});added++;});renderCompetition();}
    else if(t==='income'||t==='expense'){rows.forEach(r=>{transactions[t].push({id:nTr++,desc:col(r,'description','desc','name','item'),cat:col(r,'category','cat','type')||'Other',date:col(r,'date')||'',amount:parseFloat(col(r,'amount','total','cost','value'))||0});added++;});renderBudget();}
    else if(t==='minutes'){rows.forEach(r=>{meetingMinutes.push({id:nMin++,name:col(r,'name','meeting','title'),date:col(r,'date')||'',recorder:col(r,'recorder','recordedby','secretary')||'',actions:col(r,'actions','actionitems'),notes:col(r,'notes','note'),files:[]});added++;});renderMinutes();}
    else if(t==='prospects'){rows.forEach(r=>{prospects.push({id:nPr++,name:col(r,'name','fullname'),contact:col(r,'contact','email','phone'),source:col(r,'source','referral','channel')||'Other',stage:col(r,'stage','status')||'Interested',followup:col(r,'followup','followupdate')||'',notes:col(r,'notes','note')});added++;});renderRecruitment();}
    else if(t==='ec-members'){const id=document.getElementById('ec-select').value;const e=eventCosts.find(x=>x.id==id);if(e){rows.forEach(r=>{e.members.push({name:col(r,'name','member','membername'),paid:parseFloat(col(r,'paid','amount','payment'))||0,aid:parseFloat(col(r,'aid','financialaid','scholarship'))||0});added++;});calcEventCost();}else{alert('Select an event first before importing members.');return;}}
    else if(t==='reimbursements'){rows.forEach(r=>{reimbursements.push({id:nReim++,member:col(r,'member','name','submittedby'),item:col(r,'item','description','desc'),amount:parseFloat(col(r,'amount','cost','total'))||0,date:col(r,'date')||'',receipt:col(r,'receipt','receiptlink','link')||'',notes:col(r,'notes','note')||'',status:col(r,'status')||'Pending'});added++;});renderReimbursements();}
    renderDashboard();
    alert('Imported '+added+' row'+(added!==1?'s':'')+' into '+t+'. Review the section to confirm.');
  };
  reader.readAsText(file);
}

(function(){const sb=document.getElementById('sidebar');const rz=document.getElementById('sb-resizer');let dragging=false,startX=0,startW=0;rz.addEventListener('mousedown',e=>{dragging=true;startX=e.clientX;startW=sb.offsetWidth;rz.classList.add('dragging');document.body.style.cursor='col-resize';document.body.style.userSelect='none';e.preventDefault();});document.addEventListener('mousemove',e=>{if(!dragging)return;const w=Math.min(360,Math.max(160,startW+(e.clientX-startX)));sb.style.setProperty('--sb-width',w+'px');sb.style.width=w+'px';});document.addEventListener('mouseup',()=>{if(!dragging)return;dragging=false;rz.classList.remove('dragging');document.body.style.cursor='';document.body.style.userSelect='';});})();
loadData();
renderMembers();renderExec();renderBootcamps();renderTasks();renderAgendas();renderEvents();renderRos();renderTemplates();renderSponsors();renderEmailList();renderConsulting();renderCompetition();renderBudget();renderMinutes();renderRecruitment();renderGoals();renderTransition();renderAnnouncements();renderMentorship();renderDashboard();renderPortals();renderEcSelect();renderReimbursements();renderVenues();renderVolSlots();renderCompPrep();renderCurriculum();renderBrandKit();renderContentCalendar();renderCaMentors();renderMemberCheckIns();renderCalendar();

// ── FIRESTORE REAL-TIME SYNC ─────────────────────────────────────────────────
// Applies a Firestore snapshot to all in-memory variables (mirrors loadData)
function _applyFirestoreData(d){
  if(d.members)members=d.members;
  if(d.execTeam)execTeam=d.execTeam;
  if(d.bootcamps)bootcamps=d.bootcamps;
  if(d.tasks)tasks=d.tasks;
  if(d.agendas)agendas=d.agendas;
  if(d.eventsData)eventsData=d.eventsData;
  if(d.emails)emails=d.emails;
  if(d.consultingProjects)consultingProjects=d.consultingProjects;
  if(d.clients)clients=d.clients;
  if(d.deliverables)deliverables=d.deliverables;
  if(d.compResults)compResults=d.compResults;
  if(d.compEvents)compEvents=d.compEvents;
  if(d.compHistory)compHistory=d.compHistory;
  if(d.transactions)transactions=d.transactions;
  if(d.meetingMinutes)meetingMinutes=d.meetingMinutes;
  if(d.prospects)prospects=d.prospects;
  if(d.goals)goals=d.goals;
  if(d.transitionDocs)transitionDocs=d.transitionDocs;
  if(d.announcements)announcements=d.announcements;
  if(d.mentorPairs)mentorPairs=d.mentorPairs;
  if(d.sponsors)sponsors=d.sponsors;
  if(d.pipeline)pipeline=d.pipeline;
  if(d.rosData)rosData=d.rosData;
  if(d.eventCosts)eventCosts=d.eventCosts;
  if(d.reimbursements)reimbursements=d.reimbursements;
  if(d.venues)venues=d.venues;
  if(d.volunteerSlots)volunteerSlots=d.volunteerSlots;
  if(d.compPrep)compPrep=d.compPrep;
  if(d.curriculum)curriculum=d.curriculum;
  if(d.brandKit)brandKit=d.brandKit;
  if(d.contentPosts)contentPosts=d.contentPosts;
  if(d.memberCheckIns)memberCheckIns=d.memberCheckIns;
  if(d.resources)resources=d.resources;
  if(d.eventSlides)eventSlides=d.eventSlides;
  if(d.lectureSlides)lectureSlides=d.lectureSlides;
  if(d.pblTransactions)pblTransactions=d.pblTransactions;
  if(d.merchSales)merchSales=d.merchSales;
  if(d.importedCalEvents)importedCalEvents=d.importedCalEvents;
  // ── pbl_* shared keys ──
  if(d.highlights&&typeof highlights!=='undefined'){highlights=d.highlights;try{localStorage.setItem('pbl_highlights',JSON.stringify(d.highlights));}catch(e){}}
  if(d.quickLinks&&typeof quickLinks!=='undefined'){quickLinks=d.quickLinks;try{localStorage.setItem('pbl_quicklinks',JSON.stringify(d.quickLinks));}catch(e){}}
  if(d.confEvents){_confEvents=d.confEvents;try{localStorage.setItem('pbl_confevents',JSON.stringify(d.confEvents));}catch(e){}}
  if(d.fblaEvents&&typeof _fblaEvents!=='undefined'){_fblaEvents=d.fblaEvents;try{localStorage.setItem('pbl_fblaevents',JSON.stringify(d.fblaEvents));}catch(e){}}
  if(d.ohSlots&&typeof _ohSlots!=='undefined'){_ohSlots=d.ohSlots;try{localStorage.setItem('pbl_ohslots',JSON.stringify(d.ohSlots));}catch(e){}}
  if(d.contacts&&typeof _contacts!=='undefined'){_contacts=d.contacts;try{localStorage.setItem('pbl_contacts',JSON.stringify(d.contacts));}catch(e){}}
  if(d.hwAssignments&&typeof hwAssignments!=='undefined'){hwAssignments=d.hwAssignments;try{localStorage.setItem('pblhub_hw_assignments',JSON.stringify(d.hwAssignments));}catch(e){}}
  if(d.execContacts){try{localStorage.setItem('pbl_execcontacts',JSON.stringify(d.execContacts));}catch(e){}}
  // Also write to localStorage so syncFromEBOD() still works same-device
  try{localStorage.setItem(SAVE_KEY,JSON.stringify(d));}catch(e){}
}
function _renderAll(){
  renderMembers();renderExec();renderBootcamps();renderTasks();renderAgendas();
  renderEvents();renderSponsors();renderConsulting();renderCompetition();
  renderBudget();renderMinutes();renderRecruitment();renderAnnouncements();
  renderMentorship();renderDashboard();renderEcSelect();renderReimbursements();
  renderMemberContent();renderMerch();
  // pbl_* sections
  if(typeof renderFBLAEvents==='function')renderFBLAEvents();
  if(typeof renderOHSlots==='function')renderOHSlots();
  if(typeof renderContacts==='function')renderContacts();
  if(typeof renderEBODHomework==='function')renderEBODHomework();
  if(typeof imeRefresh==='function')imeRefresh();
}
function initFirestore(){
  if(!window._db)return;
  window._db.collection('chapter').doc('main')
    .onSnapshot({includeMetadataChanges:true},snap=>{
      // hasPendingWrites=true means this is our OWN local write already in memory — skip
      if(snap.metadata.hasPendingWrites)return;
      if(!snap.exists)return;
      const d=snap.data();if(!d)return;
      _applyFirestoreData(d);
      _renderAll();
      // If IM portal is open, refresh it too
      const imApp=document.getElementById('app-im');
      if(imApp&&imApp.style.display!=='none'){
        syncFromEBOD();
        mRenderBootcamps();mRenderAnnouncements();mRenderEvents();renderHome();renderResources();renderTeam();
      }
    },err=>console.warn('Firestore listener error:',err));
}
initFirestore();

// ── EXTRA FIRESTORE LISTENERS (competition signups, reimbursements, leads, mentor check-ins, office hours)
let _ebodAllMembersHW={};
let _imReimbs=[];
let _officeHourReqs=[];
let _compSignupsMap={};
let _mySignups=new Set();
let _mentorCheckins={};
let _mentorCheckinsList=[];
let _fsExtListenersStarted=false;

function initExtraListeners(){
  if(!window._db||_fsExtListenersStarted)return;
  _fsExtListenersStarted=true;

  // IM Reimbursements
  _db.collection('im-reimbursements').onSnapshot(snap=>{
    _imReimbs=snap.docs.map(d=>({...d.data(),_id:d.id}));
    renderEBODImReimbs();renderIMMyReimbs();
  },e=>console.warn('im-reimbursements:',e));

  // Office hours requests
  _db.collection('office-hours').onSnapshot(snap=>{
    _officeHourReqs=snap.docs.map(d=>({...d.data(),_id:d.id}));
    renderEBODOfficeHours();renderIMConsulting();
  },e=>console.warn('office-hours:',e));

  // Competition sign-ups
  _db.collection('signups').onSnapshot(snap=>{
    _compSignupsMap={};
    const uid=firebase.auth().currentUser?.uid;
    snap.docs.forEach(d=>{
      const data=d.data();
      if(d.id===uid)_mySignups=new Set(data.interests||[]);
      (data.interests||[]).forEach(eid=>{
        if(!_compSignupsMap[eid])_compSignupsMap[eid]=[];
        _compSignupsMap[eid].push({name:data.name,uid:d.id});
      });
    });
    renderCompetition();mRenderCompetition();
  },e=>console.warn('signups:',e));

  // Mentor check-ins
  _db.collection('mentorCheckins').onSnapshot(snap=>{
    _mentorCheckinsList=snap.docs.map(d=>d.data()).sort((a,b)=>(b.loggedAt||0)-(a.loggedAt||0));
    _mentorCheckins={};
    _mentorCheckinsList.forEach(c=>{
      const k=c.pairKey||'';
      if(k)_mentorCheckins[k]=(_mentorCheckins[k]||0)+1;
    });
    renderMentorship();renderCaMentors();renderIMMyMentorship();renderIMCheckinLog();
  },e=>console.warn('mentorCheckins:',e));
}

function loadEBODHWFromFirestore(){
  if(!window._db)return;
  const el=document.getElementById('ebod-hw-table');
  if(el)el.innerHTML='<div style="font-size:11px;color:var(--t4);padding:14px 0;text-align:center">Loading from Firestore…</div>';
  _db.collection('members').get().then(snap=>{
    _ebodAllMembersHW={};
    snap.forEach(doc=>{
      const d=doc.data();
      if(d.homework&&Object.keys(d.homework).length>0){
        _ebodAllMembersHW[doc.id]={name:d.name||d.email||doc.id,email:d.email||'',hw:d.homework};
      }
    });
    renderEBODHomework();
  }).catch(e=>console.warn('loadEBODHWFromFirestore:',e));
}

