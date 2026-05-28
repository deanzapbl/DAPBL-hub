// â”€â”€â”€ GLOBAL STATE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let currentApp = null; // declared first to avoid TDZ errors from async callbacks

// â”€â”€â”€ IM CONSTANTS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const IM_SAVE_KEY = 'pblmember_v1';

// â”€â”€â”€ EBOD JS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// ---- HELPERS ----
function fld(label,inputHtml){return`<div class="fg"><div class="fl">${label}</div>${inputHtml}</div>`;}
function row2(a,b){return`<div class="fr">${a}${b}</div>`;}
function inp(id,val,type='text'){return`<input id="${id}" type="${type}" value="${String(val||'').replace(/"/g,'&quot;')}">`;}
function sel(id,opts,val){return`<select id="${id}">${opts.map(o=>`<option${o===val?' selected':''}>${o}</option>`).join('')}</select>`;}
function ta(id,val,rows=4){return`<textarea id="${id}" style="min-height:${rows*32}px;line-height:1.6">${String(val||'').replace(/</g,'&lt;')}</textarea>`;}
function g(id){const e=document.getElementById(id);return e?e.value:'';}
function saved(btn){btn.textContent='Saved';btn.style.background='var(--grn)';setTimeout(()=>{btn.textContent='Save';btn.style.background='var(--cr)';},1500);}

// DATA
let members=[
  // Exec Team
  {id:1,first:'Nisa',last:'Pradhan',role:'Exec',email:'',att:[1,1,1,1,1,1]},
  {id:2,first:'Carine',last:'Chan',role:'Exec',email:'',att:[1,1,1,1,1,1]},
  {id:3,first:'Arya',last:'Somu',role:'Exec',email:'',att:[1,1,0,1,1,1]},
  {id:4,first:'George',last:'Huang',role:'Exec',email:'',att:[1,1,1,1,0,1]},
  {id:5,first:'Addy',last:'Hu',role:'Exec',email:'',att:[1,1,1,1,1,0]},
  {id:6,first:'Nhi',last:'Tran',role:'Exec',email:'',att:[1,0,1,1,1,1]},
  {id:7,first:'Christina',last:'Tran',role:'Exec',email:'',att:[1,1,1,0,1,1]},
  {id:8,first:'Anna',last:'Huynh',role:'Exec',email:'',att:[1,1,1,1,1,1]},
  {id:9,first:'Iker',last:'Jimenez',role:'Exec',email:'',att:[1,1,0,1,1,1]},
  {id:10,first:'Jordan',last:'Nguyen',role:'Exec',email:'',att:[1,1,1,1,0,1]},
  {id:11,first:'Dianne',last:'Johnson',role:'Exec',email:'',att:[1,1,1,0,1,1]},
  // General Members
  {id:12,first:'Amaan',last:'Hussain',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:13,first:'Amy',last:'Tran',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:14,first:'Ananya',last:'Sharma',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:15,first:'Angelo',last:'Maniraho',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:16,first:'Anirudh',last:'Ahluwalia',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:17,first:'Anna',last:'Shvedova',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:18,first:'Anusha',last:'Shringi',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:19,first:'Arin',last:'Kumar',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:20,first:'Arnav',last:'Junday',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:21,first:'Ashwika',last:'Agarwal',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:22,first:'Bryant',last:'Vo',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:23,first:'Caleb',last:'Man',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:24,first:'Dawit',last:'Mekuria',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:25,first:'Derick',last:'Nguyen',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:26,first:'Dylan',last:'Tran',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:27,first:'Edward',last:'Wong',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:28,first:'Elena',last:'Burgos',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:29,first:'Ella',last:'Yang',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:30,first:'Emmanuel',last:'Aceves',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:31,first:'Eric',last:'Zhao',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:32,first:'Evan',last:'Hoeffner',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:33,first:'Francisco',last:'Rodriguez',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:34,first:'Gabriel',last:'Heiss',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:35,first:'Haley',last:'Truong',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:36,first:'Harika',last:'Talluri',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:37,first:'Helen',last:'Nguyen',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:38,first:'Hwin',last:'Waddi Lwin',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:39,first:'Ilay',last:'Botzer',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:40,first:'ShangRong',last:'Ma',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:41,first:'Jacob',last:'Eliashberg',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:42,first:'James',last:'Yoshida',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:43,first:'Janet',last:'Wong',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:44,first:'Jasmine',last:'Perlas',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:45,first:'Jason',last:'Schnabel',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:46,first:'Jayden',last:'Phan',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:47,first:'Jayden',last:'Mai',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:48,first:'Jensine',last:'Neal',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:49,first:'Jerry',last:'Nguyen',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:50,first:'Jason',last:'Zhou',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:51,first:'Joseph',last:'Leytes',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:52,first:'Joshua',last:'Morris',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:53,first:'Juliana',last:'Estrada',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:54,first:'Kaleab',last:'Bahta',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:55,first:'Kimmy',last:'Huynh',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:56,first:'Koshin',last:'Gokhale',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:57,first:'Kyle',last:'Krawez',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:58,first:'Lehem',last:'Atsebha',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:59,first:'Leo',last:'Chao',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:60,first:'Maryam',last:'Abdurahimova',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:61,first:'Mihir',last:'Thakar',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:62,first:'Moles',last:'Kali',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:63,first:'Nabiha',last:'Shahid',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:64,first:'Natalia',last:'Jimenez',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:65,first:'Nikunj',last:'More',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:66,first:'Olivia',last:'Ma',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:67,first:'Om',last:'Bathija',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:68,first:'Parav',last:'Manney',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:69,first:'Parker',last:'Elsey',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:70,first:'Phillip',last:'Chang',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:71,first:'Ping Tse',last:'Chang',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:72,first:'Rameesha',last:'Farrukh',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:73,first:'Rana',last:'Arjumand',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:74,first:'Ray',last:'Singam',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:75,first:'Razia',last:'Getachew',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:76,first:'Rebecca',last:'Yim',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:77,first:'Rivers',last:'Calareso',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:78,first:'Ronia',last:'Getachew',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:79,first:'Ruhi',last:'Teji',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:80,first:'Ruirui',last:'Wu',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:81,first:'Sarah',last:'Bednarek',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:82,first:'Serena',last:'Ni',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:83,first:'Sezim',last:'Nurlanova',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:84,first:'Shakil',last:'Musthafa',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:85,first:'Sophia',last:'Guidicotti',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:86,first:'Teevra',last:'Singh',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:87,first:'Thierry',last:'Dao',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:88,first:'Thin Thida',last:'Soe',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:89,first:'Timothy',last:'Nguyen',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:90,first:'Tran',last:'Dang',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:91,first:'Wenyu',last:'Qian',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:92,first:'William',last:'Devanney',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:93,first:'Yen Hern',last:'Chan',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:94,first:'Ying',last:'Lin',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:95,first:'Zealous',last:'Lee',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:96,first:'Zhen Cheng',last:'Lin',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:97,first:'Zhen Huey',last:'Lee',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:98,first:'Neil',last:'Sumanth',role:'Member',email:'',att:[0,0,0,0,0,0]},
  {id:99,first:'Jedric',last:'',role:'Member',email:'',att:[0,0,0,0,0,0]},
];let nM=100;

let execTeam=[
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
];let nE=12;

let bootcamps=[
  {id:1,name:'Session 1',date:'Mar 5',topic:'Case Intro & Framework',att:28,tot:47,notes:'Covered the 4-step case framework: Identify, Analyze, Recommend, Present. Students practiced with a sample hospitality case. Key gap: financial ratio interpretation.\n\nSlide Notes:\n- Slide 1: What is a case competition?\n- Slide 2: FBLA judging rubric\n- Slide 3: The 4-step framework\n- Slide 4: Sample case walkthrough',files:[]},
  {id:2,name:'Session 2',date:'Mar 19',topic:'Financial Analysis',att:33,tot:47,notes:'Income statements, balance sheets, key ratios (ROA, ROE, profit margin). Pairs worked on mock financial case.\n\nSlide Notes:\n- Income Statement anatomy\n- Balance Sheet walkthrough\n- Ratio formulas\n- Group exercise: Sunrise Hotels Inc.',files:[]},
  {id:3,name:'Session 3',date:'Apr 16',topic:'Presentation Skills',att:31,tot:47,notes:'Delivery, slide design, judge Q&A. 5-min mock presentations with peer feedback.\n\nKey Takeaways:\n- Eye contact and pacing matter most\n- Avoid reading slides verbatim\n- Anticipate judge questions\n- Hook judges in first 30 seconds',files:[]},
  {id:4,name:'Session 4',date:'Apr 30',topic:'Mock Competition',att:40,tot:47,notes:'Full format: 30 min prep, 10 min presentation, 5 min Q&A. 8 groups, 3 mock judges.\n\nResults:\n- Group A: Strongest financials, weak conclusion\n- Group B: Best delivery\n- Group C: Most creative recommendation\n\nAction: All groups practice 10-min hard stop.',files:[]},
];let nB=5;

let tasks={
  ebod:[
    {id:1,text:'Confirm venue for DAIS 2026',due:'May 12',cat:'Events',owner:'Addy Hu',done:false,notes:'Reached out to MLC 105 and MCC. MLC 105 responded - need to confirm 60+ capacity.\n\nNext steps:\n1. Call MLC 105 facilities\n2. Submit MCC booking form by May 9\n3. Confirm AV once venue locked',files:[]},
    {id:2,text:'Send sponsor follow-up to Bay Area Credit Union',due:'May 10',cat:'Sponsors',owner:'Nisa Pradhan',done:false,notes:'First outreach Apr 5. Maria responded positively but no confirmed amount yet.\n\nDraft:\n"Hi Maria, circling back on DAIS 2026 on June 3. We expect 60+ attendees and would love to confirm your sponsorship at the Gold Tier ($1,000)."',files:[]},
    {id:3,text:'Submit NLC registration forms',due:'Apr 30',cat:'Competition',owner:'Christina Tran',done:true,notes:'Completed. 8 members registered across 6 events. Hotel block reserved.',files:[]},
    {id:4,text:'Finalize bootcamp curriculum for Spring',due:'May 15',cat:'Education',owner:'Arya Somu',done:false,notes:'Sessions 1-4 complete.\nRemaining:\n- Session 5: Advanced Case Strategies (May 21)\n- Session 6: Final Mock (Jun 4)\n\nUpdate curriculum doc in Drive.',files:[]},
  ],
  general:[
    {id:5,text:'Update club website with Spring results',due:'May 20',cat:'Marketing',owner:'Jordan Nguyen',done:false,notes:'SBLC: 17 entries, 2 first-place wins. Update competition page and header photo.',files:[]},
    {id:6,text:'Design DAIS 2026 program booklet',due:'May 25',cat:'Design',owner:'Iker Jimenez',done:false,notes:'8-page booklet: Welcome, Agenda, Speaker Bio, Sponsor Page, Awards.\nTemplate in Drive > DAIS 2025 > Design Assets.',files:[]},
  ]
};let nT=7;

let agendas=[
  {id:1,name:'Spring Gen. Meeting',date:'May 14',items:'Officer reports\nDAIS 2026 update\nBootcamp recap\nSponsor pipeline review\nOpen Q&A\nAnnouncements',notes:'Send to all members by May 12. Reserve MLC 105.',status:'Draft',files:[]},
  {id:2,name:'EBOD Weekly #12',date:'May 7',items:'DAIS venue update\nTask check-ins\nSponsor follow-ups\nBootcamp Session 5 prep',notes:'Quick 30-min sync. All execs attend.',status:'Final',files:[]},
  {id:3,name:'IM Meeting â€” Nationals/Consulting Prep',date:'May 7',items:'Nationals prep overview\nConsulting team strategy form due\nQ&A',notes:'5â€“7 PM, MLC 105, business casual.',status:'Final',files:[]},
  {id:4,name:'IM Meeting â€” Nationals/Consulting Prep',date:'May 12',items:'Nationals prep continued\nConsulting check-in\nAnnouncements',notes:'5â€“7 PM, MLC 105, business casual.',status:'Final',files:[]},
  {id:5,name:'IM Meeting â€” Nationals/Consulting Prep',date:'May 14',items:'Nationals prep\nConsulting progress update\nOpen floor',notes:'5â€“7 PM, MLC 105, business casual.',status:'Draft',files:[]},
  {id:6,name:'IM Meeting â€” Run Throughs',date:'May 19',items:'Run throughs with leaderboard\nFeedback rounds\nFinal prep notes',notes:'5â€“7 PM, MLC 105, business casual.',status:'Draft',files:[]},
  {id:7,name:'IM Meeting â€” Run Throughs',date:'May 21',items:'Run throughs with leaderboard\nFinal adjustments\nNLC logistics',notes:'5â€“7 PM, MLC 105, business casual.',status:'Draft',files:[]},
];let nA=8;

let eventsData={
  upcoming:[
    {id:1,name:'DAIS 2026',date:'Jun 3, 2026',loc:'TBD',att:60,desc:'Annual De Anza Case & Investment Competition.\n\nGoals:\n- 60+ attendees\n- 3+ sponsor tables\n- Awards for top 3 case teams\n\nOutstanding:\n- Venue confirmation\n- Catering order\n- Judge panel (3 external)\n- Award certificate design',files:[]},
    {id:2,name:'Spring General Meeting',date:'May 14, 2026',loc:'MLC 105',att:35,desc:'End-of-quarter all-hands meeting.\n\nAgenda:\n- Officer reports\n- DAIS preview\n- NLC prep update\n- Recruitment\n- Open floor',files:[]},
    {id:4,name:'IM Meeting â€” Nationals/Consulting Prep',date:'May 12, 2026',loc:'MLC 105',att:35,desc:'Intermediate Member meeting.\n\nFocus: Nationals prep and consulting track overview.\nTime: 5â€“7 PM, business casual.',files:[]},
    {id:5,name:'Group Pics / Headshots',date:'May 8, 2026',loc:'Communications Hill Grand Staircase',att:47,desc:'Official chapter group photos and individual headshots.\nTime: 2:30â€“4:00 PM, business formal.',files:[]},
    {id:6,name:'IM Meeting â€” Nationals/Consulting Prep',date:'May 7, 2026',loc:'MLC 105',att:35,desc:'Intermediate Member meeting.\n\nFocus: Nationals prep and consulting team strategy.\nTime: 5â€“7 PM, business casual.',files:[]},
    {id:7,name:'IM Meeting â€” Run Throughs',date:'May 19, 2026',loc:'MLC 105',att:35,desc:'Intermediate Member meeting.\n\nFocus: Run throughs with leaderboard.\nTime: 5â€“7 PM, business casual.',files:[]},
    {id:8,name:'IM Meeting â€” Run Throughs',date:'May 21, 2026',loc:'MLC 105',att:35,desc:'Intermediate Member meeting.\n\nFocus: Run throughs with leaderboard.\nTime: 5â€“7 PM, business casual.',files:[]},
    {id:9,name:'CSP Planting Event',date:'May 16, 2026',loc:'De Anza Campus',att:20,desc:'Community service planting event with CSP.\nTime: 9:00 AMâ€“12:00 PM.\nRSVP via Eventbrite link.',files:[]},
  ],
  past:[
    {id:3,name:'SBLC 2026 - Emeryville, CA',date:'Mar 2026',loc:'Emeryville',att:23,desc:'State Business Leadership Conference 2026.\n\nResults:\n- 17 entries total\n- 1st Place: Community Service Project\n- 1st Place: Entrepreneurship Pitch Competition\n\nPost-Event Notes:\n- Need more prep time for written events\n- Financial gaps identified, inform bootcamp curriculum\n- Start prep 6 weeks out instead of 4',files:[]},
    {id:10,name:'BJ\'s Fundraiser Night',date:'May 7, 2026',loc:'BJ\'s â€” 10690 N De Anza Blvd',att:30,desc:'CSP fundraiser night at BJ\'s Restaurant.\nTime: 7:00â€“11:00 PM.\nCode: MAY411 at checkout.',files:[]},
  ]
};let nEv=11;

let emails=[
  {subj:'Partnership Opportunity - De Anza PBL Spring 2026',to:'Bay Area Credit Union (Maria Santos)',date:'Apr 5, 2026',status:'Responded',body:'Dear Ms. Santos,\n\nI hope this message finds you well. My name is Jayden Pham and I\'m reaching out on behalf of the De Anza College chapter of Phi Beta Lambda.\n\nWe are hosting DAIS 2026 on June 3rd and are seeking sponsors. With 60+ expected attendees, this is a great opportunity to connect with motivated business students.\n\nOur Gold Tier sponsorship ($1,000) includes logo placement, a 5-minute speaking slot, table presence at DAIS, and a newsletter feature.\n\nWould you be open to a brief call this week?\n\nWarm regards,\nJayden Pham\nPresident, De Anza PBL'},
  {subj:'Follow-Up: De Anza PBL DAIS 2026 Sponsorship',to:'Tech District Co. (James Wu)',date:'Apr 12, 2026',status:'Responded',body:'Hi James,\n\nWanted to follow up on sponsoring DAIS 2026. We have a few tiers remaining and would love to have Tech District Co. involved.\n\nDAIS is June 3rd. Would you have 15 minutes this week?\n\nBest,\nJayden Pham\nPresident, De Anza PBL'},
  {subj:'DAIS 2026 Sponsorship - Fidelity Investments',to:'Fidelity Investments',date:'Apr 30, 2026',status:'Awaiting response',body:'Dear Fidelity Team,\n\nDe Anza PBL is hosting DAIS 2026 on June 3rd - our annual case competition with 60+ attendees, many of them finance and business majors.\n\nWe\'d love to explore a sponsorship partnership.\n\nBest regards,\nJayden Pham\nPresident, De Anza PBL'},
];

let templates={
  proposals:[
    {name:'Standard Sponsor Proposal',desc:'Full package with tiers, overview, and impact stats',content:'DE ANZA PBL - SPONSORSHIP PROPOSAL\n\nAbout Us\nDe Anza College Phi Beta Lambda: 47+ active members, competing at state and national levels.\n\nWhy Sponsor?\n- SBLC 2026: 17 entries, 2 first-place finishes\n- Events reach 200+ community members annually\n\nSponsorship Tiers\n\nGOLD  $1,000+\n- Logo on all event materials + banners\n- 5-min speaking slot at DAIS\n- Table presence at event\n- Newsletter feature (750+ reach)\n- Social media spotlight\n\nSILVER  $500-999\n- Logo on event materials\n- Newsletter mention + social post\n\nBRONZE  $100-499\n- Logo on digital materials\n- Social media thank-you\n\nIN-KIND  Goods/Services\n- In-Kind Sponsor recognition\n- Logo + social media thank-you\n\nContact\nJayden Pham, President\nDe Anza PBL'},
    {name:'Cold Outreach Email',desc:'First-touch email for local businesses',content:'Subject: Partnership Opportunity - De Anza PBL [Event Name]\n\nDear [Name],\n\nMy name is [Your Name] and I\'m reaching out on behalf of De Anza College\'s Phi Beta Lambda chapter.\n\nWe are hosting [Event Name] on [Date] and are seeking sponsors. With [X]+ expected attendees, this is a great opportunity to connect with emerging professionals.\n\nOur [Tier] sponsorship ($[Amount]) includes:\n- [Benefit 1]\n- [Benefit 2]\n- [Benefit 3]\n\nWould you be open to a brief call this week?\n\nWarm regards,\n[Your Name], [Title]\nDe Anza PBL'},
    {name:'Follow-Up Email',desc:'Second touch after no response',content:'Subject: Following Up - De Anza PBL Sponsorship\n\nHi [Name],\n\nWanted to follow up on my message about sponsoring [Event Name] on [Date]. We\'re finalizing sponsors and would love to have [Company] involved.\n\nWould you have 15 minutes this week?\n\nBest,\n[Your Name]\nPresident, De Anza PBL'},
    {name:'Sponsor Thank You Letter',desc:'Post-event recap and tax receipt',content:'Subject: Thank You - [Event Name] Recap\n\nDear [Name],\n\nThank you for sponsoring [Event Name] on [Date].\n\nEvent Recap:\n- [X] attendees\n- [X] student presentations\n- [Highlight]\n\nTax receipt attached for [Year].\n\nWarm regards,\n[Your Name]\nPresident, De Anza PBL'},
    {name:'In-Kind Donation Request',desc:'Template for non-cash contributions',content:'Subject: In-Kind Donation Request - De Anza PBL\n\nDear [Name],\n\nI\'m reaching out to request an in-kind donation of [item/service] for [Event Name] on [Date].\n\nIn return, [Company] would receive In-Kind Sponsor recognition including logo placement, social media acknowledgment, and verbal recognition at the event.\n\nThank you,\n[Your Name]\nPresident, De Anza PBL'},
  ],
  resources:[
    {name:'Case Study Prep Guide',desc:'4-step framework for FBLA case competitions',content:'FBLA CASE COMPETITION PREP GUIDE\n\nTHE 4-STEP FRAMEWORK\n\n1. IDENTIFY (5 min)\n   - What is the core problem?\n   - Who are the stakeholders?\n   - What constraints exist?\n\n2. ANALYZE (15 min)\n   - Quantify the problem\n   - SWOT or PESTLE if applicable\n   - Financial analysis: margins, ROI\n\n3. RECOMMEND (5 min)\n   - 2-3 specific, actionable recommendations\n   - Prioritize by impact and feasibility\n   - Include implementation timeline\n\n4. PRESENT (10 min)\n   - Hook in first 30 seconds\n   - Data behind every claim\n   - Prepare for 3-5 judge questions\n\nCOMMON JUDGE QUESTIONS\n- "What would you do differently?"\n- "How did you arrive at that number?"\n- "What\'s the biggest risk?"\n\nTIMING\n30-min prep, 10-min presentation, 5-min Q&A. Practice to the hard stop.'},
    {name:'Bootcamp Facilitator Guide',desc:'Session structure and tips for leads',content:'BOOTCAMP FACILITATOR GUIDE\n\nBEFORE THE SESSION\n- Review slide deck in Drive\n- Prepare 2-3 discussion questions\n- Assign a note-taker\n- Set up room 10 min early\n\nSESSION STRUCTURE (60 min)\n0:00-0:05   Welcome + Attendance\n0:05-0:15   Warm-up / recap quiz\n0:15-0:40   Main content delivery\n0:40-0:55   Group exercise / case practice\n0:55-1:00   Wrap-up and action items\n\nFACILITATION TIPS\n- Cold call to keep engagement up\n- Use whiteboard for live calculations\n- Flag members who seem lost for mentorship\n\nAFTER\n- Log attendance in PBL Hub\n- Add session notes and key takeaways'},
    {name:'New Member Onboarding Packet',desc:'Overview for incoming PBL members',content:'WELCOME TO DE ANZA PBL\n\nWhat is PBL?\nPhi Beta Lambda is the nation\'s largest collegiate business organization. We compete at SBLC (State) and NLC (National).\n\nFirst 2 Weeks\n[ ] Join the member GroupMe\n[ ] Follow @DeAnzaPBL on Instagram\n[ ] Sign up for a competition event\n[ ] Attend your first bootcamp\n[ ] Meet your mentor (if assigned)\n\nKey Dates\n- May 14: Spring General Meeting\n- Jun 3: DAIS 2026\n- Jun 20: NLC Debrief\n\nQuestions? Message any exec member.'},
    {name:'Post-Event Debrief Template',desc:'What went well, what to improve',content:'POST-EVENT DEBRIEF\nEvent: [Event Name]\nDate: [Date]\n\nWHAT WENT WELL\n- \n- \n\nWHAT TO IMPROVE\n- \n- \n\nACTION ITEMS FOR NEXT TIME\nItem                   Owner       Deadline\n\nMETRICS\nAttendance: \nFeedback Score (1-5): \nSponsor Revenue: \nBudget vs. Actual: '},
  ],
  ros:[
    {name:'Full Conference Run of Show',desc:'Multi-room event template (DAIS-style)',content:'CONFERENCE RUN OF SHOW\n[Event Name] - [Date] - [Venue]\n\nPRE-EVENT (Day Before)\n[ ] Confirm venue + room setup\n[ ] Print sign-in sheets, name tags, programs\n[ ] Test A/V\n[ ] Brief all volunteers\n[ ] Confirm catering\n[ ] Print award certificates\n\nDAY OF\n[X:00 AM]  Volunteer arrival + setup\n[X:30 AM]  Doors open / Check-In\n[X:00 AM]  Welcome and Introductions\n[X:15 AM]  Keynote Speaker\n[X:00 AM]  Breakout Sessions begin\n[XX:00]    Lunch\n[X:00 PM]  Presentations\n[X:30 PM]  Judge deliberation\n[X:00 PM]  Awards Ceremony\n[X:30 PM]  Close + Cleanup\n\nROOM ASSIGNMENTS\nRoom A: [Purpose] - [Lead]\nRoom B: [Purpose] - [Lead]\n\nEMERGENCY CONTACTS\nPresident: [Phone]\nVP Events: [Phone]\nFacilities: [Phone]'},
    {name:'General Meeting Template',desc:'Standard 1-hour meeting structure',content:'GENERAL MEETING\n[Name] - [Date] - [Time] - [Location]\n\nATTENDANCE\nExpected: [X] | Present: ___\n\nAGENDA\n0:00-0:05   Welcome + Attendance\n0:05-0:25   Officer Reports\n0:25-0:40   Main Topic: [Topic]\n0:40-0:50   Announcements\n0:50-1:00   Open Floor / Q&A\n\nACTION ITEMS\nItem                    Owner       Due\n\nNOTES'},
    {name:'Competition Day Timeline',desc:'SLC/NLC competition day structure',content:'COMPETITION DAY\n[Competition] - [Date] - [Location]\n\nMEMBER CHECKLIST\n[ ] Print registration confirmation\n[ ] Official ID\n[ ] Business professional attire\n[ ] Presentation materials / USB\n\nDAY OF\n[X:00]  Group meet-up\n[X:30]  Registration / Check-In\n[X:00]  Opening Session\n[X:00]  Event slots begin\n[XX:00] Lunch\n[X:00]  Awards ceremony\n\nEVENT ROSTER\nEvent               Member(s)        Time\n\nEMERGENCY CONTACTS\nPresident: [Phone]\nAdvisor: [Phone]'},
  ]
};

// DRIVE FILES - loaded from your actual Google Drive
let driveFiles=[
  {id:'1YNMpslxRGmfxrT411-Xj2FdrajsdcyUXY7IKzl8YiMw',title:'Phan, Jayden, DAPBL SGP',type:'doc',url:'https://docs.google.com/document/d/1YNMpslxRGmfxrT411-Xj2FdrajsdcyUXY7IKzl8YiMw/edit',modified:'May 8, 2026'},
  {id:'1sq1QU0OF3r6W3dbNAmy-eVE5DS2VfVhR_6kLorAQWYc',title:'SGP - De Anza PBL Club Operations Hub',type:'doc',url:'https://docs.google.com/document/d/1sq1QU0OF3r6W3dbNAmy-eVE5DS2VfVhR_6kLorAQWYc/edit',modified:'May 1, 2026'},
  {id:'1mDURR3HFgWFYqCDaLzm5vZEyIFt1tXYhSpqg7paz8yg',title:'Studentpreneur',type:'doc',url:'https://docs.google.com/document/d/1mDURR3HFgWFYqCDaLzm5vZEyIFt1tXYhSpqg7paz8yg/edit',modified:'May 4, 2026'},
  {id:'1nxYBkr5koNe5WSTiq5goM2jRIS5ntzt8bBnfmMqGND4',title:'ACCT 1B - Spring QTR',type:'doc',url:'https://docs.google.com/document/d/1nxYBkr5koNe5WSTiq5goM2jRIS5ntzt8bBnfmMqGND4/edit',modified:'May 6, 2026'},
  {id:'1OTOdZfeIKig0PRjKa7QgmOXTjTKgTZCSABo7oJhgKwo',title:'Orkizz Marketing Strategy',type:'doc',url:'https://docs.google.com/document/d/1OTOdZfeIKig0PRjKa7QgmOXTjTKgTZCSABo7oJhgKwo/edit',modified:'Apr 8, 2026'},
  {id:'1Uh1_BnGQe5H5p0RwodUeprKTd9DqhNVD',title:'Phan, Jayden, Portfolio',type:'folder',url:'https://drive.google.com/drive/folders/1Uh1_BnGQe5H5p0RwodUeprKTd9DqhNVD',modified:'May 8, 2026'},
  {id:'1Etxi3aktTkjWrx7MMwGhjJEWhptryrLr',title:'Studentprenuer Videos',type:'folder',url:'https://drive.google.com/drive/folders/1Etxi3aktTkjWrx7MMwGhjJEWhptryrLr',modified:'May 8, 2026'},
];

let currentTarget=null;
let driveOpen=false;

function typeIcon(t){return{doc:'D',sheet:'S',folder:'F',pdf:'P',slide:'Sl',other:'?'}[t]||'?';}
function typeClass(t){return{doc:'t-doc',sheet:'t-sheet',folder:'t-folder',pdf:'t-pdf',slide:'t-doc',other:'t-other'}[t]||'t-other';}
function typeLabel(t){return{doc:'Google Doc',sheet:'Google Sheet',folder:'Drive Folder',pdf:'PDF',slide:'Google Slides',other:'Drive File'}[t]||'Drive File';}

function renderDriveList(files){
  const l=document.getElementById('drive-list');if(!l)return;
  if(!files.length){l.innerHTML='<div style="padding:20px;text-align:center;color:var(--t4);font-size:11px">No files found</div>';return;}
  l.innerHTML=files.map(f=>`
    <div class="dp-item">
      <div class="dp-ico ${typeClass(f.type)}">${typeIcon(f.type)}</div>
      <div class="dp-info"><div class="dp-name">${f.title}</div><div class="dp-meta">${typeLabel(f.type)} &middot; ${f.modified||''}</div></div>
      <a href="${f.url}" target="_blank" class="dp-open">Open</a>
      <button class="dp-attach" onclick="attachFile('${f.id}','${f.title.replace(/'/g,"\\'")}','${f.type}','${f.url}',this)">Attach</button>
    </div>`).join('');
}

function filterDrive(q){
  const f=q.trim().toLowerCase();
  renderDriveList(f?driveFiles.filter(x=>x.title.toLowerCase().includes(f)):driveFiles);
}

function toggleDrive(){
  driveOpen=!driveOpen;
  const p=document.getElementById('drive-panel');
  const b=document.getElementById('drive-btn');
  if(driveOpen){p.classList.add('open');b.classList.add('on');renderDriveList(driveFiles);}
  else{p.classList.remove('open');b.classList.remove('on');}
}

function attachFile(id,title,type,url,btn){
  if(!currentTarget){
    alert('First open an item (bootcamp session, task, event, or agenda) by clicking on it, then use "Attach from Drive" or click Attach here.');
    return;
  }
  currentTarget.files=currentTarget.files||[];
  if(!currentTarget.files.find(f=>f.id===id)){
    currentTarget.files.push({id,title,type,url});
    const el=document.getElementById('d-attached-files');
    if(el)el.innerHTML=renderAttachedFiles(currentTarget.files);
  }
  btn.textContent='Attached';btn.style.background='var(--grn)';
  setTimeout(()=>{btn.textContent='Attach';btn.style.background='var(--cr)';},1500);
  // Re-render tables to update file counts
  renderBootcamps();renderAgendas();
}

function renderAttachedFiles(files){
  if(!files||!files.length)return'<div style="font-size:11px;color:var(--t4)">No files attached. Use Drive panel to attach.</div>';
  return files.map(f=>`
    <div class="af">
      <div class="afi ${typeClass(f.type)}">${typeIcon(f.type)}</div>
      <div style="flex:1;min-width:0"><div class="afn">${f.title}</div><div class="afm">${typeLabel(f.type)}</div></div>
      <a href="${f.url}" target="_blank" class="afo">Open in Google</a>
    </div>`).join('');
}

// DETAIL PANEL
function openDetail(title,sub,html,ref){
  currentTarget=ref||null;
  document.getElementById('d-title').textContent=title;
  document.getElementById('d-sub').textContent=sub;
  document.getElementById('d-body').innerHTML=html;
  document.getElementById('detail-panel').classList.add('open');
}
function closeDetail(){document.getElementById('detail-panel').classList.remove('open');currentTarget=null;}
function sec(label,content){return`<div style="margin-bottom:18px"><div class="dsl">${label}</div>${content}</div>`;}

// MEMBER EDIT
function openMemberDetail(id){
  const m=members.find(x=>x.id===id);
  const r=_attRate(m.att);
  openDetail(m.first+' '+m.last,'Member profile â€” click Save to apply changes',
    row2(fld('First Name',inp('ed-first',m.first)),fld('Last Name',inp('ed-last',m.last)))+
    row2(fld('Role',sel('ed-role',['Member','Exec'],m.role)),fld('Email',inp('ed-email',m.email)))+
    sec('Attendance',`
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">
        ${m.att.map((a,i)=>`
          <div style="text-align:center">
            <div style="font-size:8px;color:var(--t4);margin-bottom:2px">S${i+1}</div>
            <div style="width:30px;height:30px;border-radius:5px;background:${_attColor(a)};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;cursor:pointer" onclick="toggleAtt(${id},${i})" title="Tap to toggle Present / Absent">${_attLabel(a)}</div>
            <select style="font-size:8px;width:30px;margin-top:2px;border:1px solid var(--bd);border-radius:3px;background:var(--s2);color:var(--t3);cursor:pointer;padding:0 1px" onchange="setAtt(${id},${i},+this.value);this.blur()">
              <option value="0"${a===0?' selected':''}>A</option>
              <option value="1"${a===1?' selected':''}>P</option>
              <option value="2"${a===2?' selected':''}>L</option>
              <option value="3"${a===3?' selected':''}>E</option>
            </select>
          </div>`).join('')}
      </div>
      <div style="font-size:9px;color:var(--t4);margin-bottom:6px">Tap square = Present / Absent &nbsp;Â·&nbsp; Use dropdown for Late or Excused</div>
      <div style="font-size:11px;color:var(--t3)">Attendance rate: <strong>${r}%</strong> (Excused not counted)</div>`)+
    `<div style="display:flex;gap:7px;margin-top:4px"><button class="btn btn-p btn-sm" onclick="saveMember(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="removeMember(${id});closeDetail()">Remove</button></div>`,m);
}
// 0=Absent, 1=Present, 2=Late, 3=Excused
function _attClass(v){return v===1?'dg':v===2?'dl':v===3?'de':'dr';}
function _attLabel(v){return v===1?'P':v===2?'L':v===3?'E':'A';}
function _attColor(v){return v===1?'var(--grn)':v===2?'#FF9800':v===3?'#42A5F5':'#E57373';}
function _attRate(att){
  const scored=att.filter(a=>a!==3); // excused don't count against rate
  if(!scored.length)return 100;
  return Math.round(scored.filter(a=>a===1||a===2).length/scored.length*100);
}
function toggleAtt(memberId,idx){
  const m=members.find(x=>x.id===memberId);
  if(m){m.att[idx]=m.att[idx]===1?0:1;openMemberDetail(memberId);renderMembers();}
}
function setAtt(memberId,idx,val){
  const m=members.find(x=>x.id===memberId);
  if(m){m.att[idx]=val;openMemberDetail(memberId);renderMembers();}
}

// â”€â”€ QUICK ATTENDANCE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function openQuickAtt(){
  const maxSess=members.length?Math.max(...members.map(m=>m.att?m.att.length:0)):1;
  const n=maxSess||1;
  const sel=document.getElementById('qa-sess-sel');
  sel.innerHTML=Array.from({length:n},(_,i)=>`<option value="${i}">Session ${i+1}</option>`).join('');
  sel.value=n-1;
  renderQuickAtt(n-1);
  openModal('quick-att-modal');
}
function renderQuickAtt(sessIdx){
  const el=document.getElementById('qa-list');
  if(!el)return;
  if(!members.length){el.innerHTML='<div style="padding:20px;text-align:center;color:var(--t4);font-size:12px">No members yet.</div>';return;}
  const sorted=[...members].sort((a,b)=>(a.last+a.first).localeCompare(b.last+b.first));
  el.innerHTML=sorted.map(m=>{
    const a=m.att&&m.att[sessIdx]!=null?m.att[sessIdx]:0;
    const bg=_attColor(a);
    return`<div style="display:flex;align-items:center;gap:10px;padding:8px 2px;border-bottom:1px solid var(--bd)">
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:600;color:var(--t1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${m.first} ${m.last}</div>
        <div style="font-size:10px;color:var(--t3)">${m.role}</div>
      </div>
      <button style="min-width:62px;height:36px;border-radius:7px;border:none;font-weight:700;font-size:12px;cursor:pointer;background:${bg};color:#fff" onclick="qaToggle(${m.id},${sessIdx})">${a===1?'Present':'Absent'}</button>
      <select style="font-size:10px;height:36px;border:1px solid var(--bd);border-radius:5px;background:var(--s2);color:var(--t2);padding:0 4px;cursor:pointer" onchange="qaSetAtt(${m.id},${sessIdx},+this.value)">
        <option value="1"${a===1?' selected':''}>P â€“ Present</option>
        <option value="0"${a===0?' selected':''}>A â€“ Absent</option>
        <option value="2"${a===2?' selected':''}>L â€“ Late</option>
        <option value="3"${a===3?' selected':''}>E â€“ Excused</option>
      </select>
    </div>`;
  }).join('');
  const rateEl=document.getElementById('qa-rate');
  if(rateEl){
    const here=members.filter(m=>m.att&&(m.att[sessIdx]===1||m.att[sessIdx]===2)).length;
    rateEl.textContent=`${here} / ${members.length} here`;
  }
}
function qaToggle(memberId,sessIdx){
  const m=members.find(x=>x.id===memberId);
  if(!m)return;
  if(!m.att)m.att=[];
  while(m.att.length<=sessIdx)m.att.push(0);
  m.att[sessIdx]=m.att[sessIdx]===1?0:1;
  renderQuickAtt(sessIdx);renderMembers();
}
function qaSetAtt(memberId,sessIdx,val){
  const m=members.find(x=>x.id===memberId);
  if(!m)return;
  if(!m.att)m.att=[];
  while(m.att.length<=sessIdx)m.att.push(0);
  m.att[sessIdx]=val;
  renderQuickAtt(sessIdx);renderMembers();
}

function saveMember(id,btn){
  const m=members.find(x=>x.id===id);
  m.first=g('ed-first');m.last=g('ed-last');m.role=g('ed-role');m.email=g('ed-email');
  renderMembers();saved(btn);
  document.getElementById('d-title').textContent=m.first+' '+m.last;
}

// EXEC EDIT
function openExecDetail(id){
  const e=execTeam.find(x=>x.id===id);
  openDetail(e.name,e.position,
    row2(fld('Name',inp('ed-ename',e.name)),fld('Position',inp('ed-epos',e.position)))+
    `<div style="display:flex;gap:7px;margin-top:4px"><button class="btn btn-p btn-sm" onclick="saveExec(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="removeExec(${id});closeDetail()">Remove</button></div>`,e);
}
function saveExec(id,btn){
  const e=execTeam.find(x=>x.id===id);
  e.name=g('ed-ename');e.position=g('ed-epos');
  renderExec();saved(btn);
  document.getElementById('d-title').textContent=e.name;
  document.getElementById('d-sub').textContent=e.position;
}

// BOOTCAMP EDIT
function openBcDetail(id){
  const b=bootcamps.find(x=>x.id===id);
  const idx=bootcamps.indexOf(b);
  const memberList=members.map((m,mi)=>{
    const checked=m.att&&m.att[idx]===1;
    return`<label style="display:flex;align-items:center;gap:7px;padding:4px 0;font-size:12px;cursor:pointer">
      <input type="checkbox" data-mi="${mi}" ${checked?'checked':''} onchange="toggleBcAtt(${id},${idx},this)">
      <span>${m.first} ${m.last}</span><span style="color:var(--t4);font-size:10px">${m.role||''}</span>
    </label>`;
  }).join('');
  openDetail(b.name+' â€” '+b.topic,b.date,
    row2(fld('Session Name',inp('ed-bname',b.name)),fld('Date',inp('ed-bdate',b.date)))+
    row2(fld('Topic',inp('ed-btopic',b.topic)),'<div></div>')+
    row2(fld('Attended',inp('ed-batt',b.att,'number')),fld('Total Members',inp('ed-btot',b.tot,'number')))+
    fld('Session Notes & Slides',ta('ed-bnotes',b.notes,6))+
    sec('Mark Individual Attendance',`<div style="max-height:220px;overflow-y:auto;padding:4px 0">${memberList||'<span style="color:var(--t4);font-size:11px">No members added yet.</span>'}</div>`)+
    sec('Linked Drive Files',`<div id="d-attached-files">${renderAttachedFiles(b.files)}</div><button class="btn btn-g btn-sm" style="margin-top:8px" onclick="toggleDrive()">Browse Drive</button>`)+
    `<button class="btn btn-p btn-sm" onclick="saveBc(${id},this)">Save</button>`,b);
}
function toggleBcAtt(sessionId,sessionIdx,cb){
  const mi=parseInt(cb.dataset.mi);
  const m=members[mi];if(!m)return;
  if(!m.att)m.att=bootcamps.map(()=>0);
  m.att[sessionIdx]=cb.checked?1:0;
  const b=bootcamps.find(x=>x.id===sessionId);
  if(b){b.att=members.filter(m=>m.att&&m.att[sessionIdx]===1).length;
    document.getElementById('ed-batt').value=b.att;}
  saveData();renderBootcamps();
}
function saveBc(id,btn){
  const b=bootcamps.find(x=>x.id===id);
  b.name=g('ed-bname');b.date=g('ed-bdate');b.topic=g('ed-btopic');
  b.att=parseInt(g('ed-batt'))||0;b.tot=parseInt(g('ed-btot'))||47;
  b.notes=g('ed-bnotes');
  renderBootcamps();saved(btn);
  document.getElementById('d-title').textContent=b.name+' â€” '+b.topic;
}

// TASK EDIT
function openTaskDetail(id,board){
  const t=[...tasks.ebod,...tasks.general].find(x=>x.id===id);
  const owners=['President','VP Events','VP Education','VP Operations','Secretary','Treasurer','Dir. Marketing','Dir. Design'];
  const cats=['Events','Sponsors','Competition','Education','Marketing','Design','General','Operations'];
  openDetail(t.text,'Due '+t.due+' Â· '+t.owner,
    fld('Task Text',inp('ed-ttext',t.text))+
    row2(fld('Owner',sel('ed-towner',owners,t.owner)),fld('Due Date',inp('ed-tdue',t.due)))+
    row2(fld('Category',sel('ed-tcat',cats,t.cat)),fld('Status',sel('ed-tstatus',['Open','Complete'],t.done?'Complete':'Open')))+
    fld('Notes',ta('ed-tnotes',t.notes,5))+
    sec('Linked Drive Files',`<div id="d-attached-files">${renderAttachedFiles(t.files)}</div><button class="btn btn-g btn-sm" style="margin-top:8px" onclick="toggleDrive()">Browse Drive</button>`)+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveTask(${id},'${board}',this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="removeTask(${id},'${board}');closeDetail()">Delete</button></div>`,t);
}
function saveTask(id,board,btn){
  const t=tasks[board].find(x=>x.id===id);
  t.text=g('ed-ttext');t.owner=g('ed-towner');t.due=g('ed-tdue');
  t.cat=g('ed-tcat');t.done=g('ed-tstatus')==='Complete';
  t.notes=g('ed-tnotes');
  renderTasks();saved(btn);
  document.getElementById('d-title').textContent=t.text;
  document.getElementById('d-sub').textContent='Due '+t.due+' Â· '+t.owner;
}

// AGENDA EDIT
function openAgendaDetail(id){
  const a=agendas.find(x=>x.id===id);
  openDetail(a.name,a.date+' Â· '+a.status,
    row2(fld('Meeting Name',inp('ed-aname',a.name)),fld('Date',inp('ed-adate',a.date)))+
    fld('Status',sel('ed-astatus',['Draft','Final','Complete'],a.status))+
    fld('Agenda Items (one per line)',ta('ed-aitems',a.items,5))+
    fld('Notes',ta('ed-anotes',a.notes,3))+
    sec('Linked Drive Files',`<div id="d-attached-files">${renderAttachedFiles(a.files)}</div><button class="btn btn-g btn-sm" style="margin-top:8px" onclick="toggleDrive()">Browse Drive</button>`)+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveAgenda(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="agendas=agendas.filter(x=>x.id!==${id});renderAgendas();closeDetail()">Delete</button></div>`,a);
}
function saveAgenda(id,btn){
  const a=agendas.find(x=>x.id===id);
  a.name=g('ed-aname');a.date=g('ed-adate');a.status=g('ed-astatus');
  a.items=g('ed-aitems');a.notes=g('ed-anotes');
  renderAgendas();saved(btn);
  document.getElementById('d-title').textContent=a.name;
  document.getElementById('d-sub').textContent=a.date+' Â· '+a.status;
}

// EVENT EDIT
function openEventDetail(id,bucket){
  const e=eventsData[bucket].find(x=>x.id===id);
  openDetail(e.name,e.date+' Â· '+e.loc,
    row2(fld('Event Name',inp('ed-evname',e.name)),fld('Date',inp('ed-evdate',e.date)))+
    row2(fld('Location',inp('ed-evloc',e.loc)),fld('Est. Attendance',inp('ed-evatt',e.att,'number')))+
    fld('Description & Notes',ta('ed-evdesc',e.desc,6))+
    sec('Linked Drive Files',`<div id="d-attached-files">${renderAttachedFiles(e.files)}</div><button class="btn btn-g btn-sm" style="margin-top:8px" onclick="toggleDrive()">Browse Drive</button>`)+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveEvent(${id},'${bucket}',this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="eventsData['${bucket}']=eventsData['${bucket}'].filter(x=>x.id!==${id});renderEvents();closeDetail()">Delete</button></div>`,e);
}
function saveEvent(id,bucket,btn){
  const e=eventsData[bucket].find(x=>x.id===id);
  e.name=g('ed-evname');e.date=g('ed-evdate');e.loc=g('ed-evloc');
  e.att=parseInt(g('ed-evatt'))||0;e.desc=g('ed-evdesc');
  renderEvents();saved(btn);
  document.getElementById('d-title').textContent=e.name;
  document.getElementById('d-sub').textContent=e.date+' Â· '+e.loc;
}

// TEMPLATE EDIT
// Google Doc URLs for each template section
const templateDocs={
  proposals:'https://docs.google.com/document/d/1bqKMV1NI1amlD7A2gX3Gf1Rcd9Mdo7iFS7lfteJ05eI/edit',
  resources:'https://docs.google.com/document/d/1FwBCXkOyj6yFpeoRMvTd0IfzlEJRwq-01zSL0qBDT00/edit',
  ros:'https://docs.google.com/document/d/1tiHZzLEbwqtEPS3S_wvIzQ27eZa8g-AxkbI52hj1Hxo/edit',
};

function openTemplateDetail(section,idx){
  const map={proposals:templates.proposals,resources:templates.resources,ros:templates.ros};
  const t=map[section][idx];
  openDetail(t.name,t.desc,
    row2(fld('Template Name',inp('ed-tpname',t.name)),fld('Description',inp('ed-tpdesc',t.desc)))+
    fld('Content',ta('ed-tpcontent',t.content,10))+
    `<div style="display:flex;gap:7px;margin-top:4px">
      <button class="btn btn-p btn-sm" onclick="saveTemplate('${section}',${idx},this)">Save</button>
      <button class="btn btn-g btn-sm" onclick="copyTemplateDetail(this)">Copy</button>
      <a href="${templateDocs[section]}" target="_blank" class="btn btn-g btn-sm" style="text-decoration:none">Open Google Doc &#8599;</a>
      <button class="btn btn-g btn-sm" style="color:#E57373;margin-left:auto" onclick="deleteTemplate('${section}',${idx})">Delete</button>
    </div>`,null);
}
function saveTemplate(section,idx,btn){
  const map={proposals:templates.proposals,resources:templates.resources,ros:templates.ros};
  const t=map[section][idx];
  t.name=g('ed-tpname');t.desc=g('ed-tpdesc');t.content=g('ed-tpcontent');
  renderTemplates();saved(btn);
  document.getElementById('d-title').textContent=t.name;
  document.getElementById('d-sub').textContent=t.desc;
}
function copyTemplateDetail(btn){
  const val=g('ed-tpcontent');
  navigator.clipboard.writeText(val).then(()=>{btn.textContent='Copied';setTimeout(()=>btn.textContent='Copy',1500);});
}
function deleteTemplate(section,idx){
  const map={proposals:templates.proposals,resources:templates.resources,ros:templates.ros};
  map[section].splice(idx,1);
  renderTemplates();closeDetail();
}
function addTemplate(section){
  const map={proposals:templates.proposals,resources:templates.resources,ros:templates.ros};
  map[section].push({name:'New Template',desc:'Click to edit',content:''});
  renderTemplates();
  openTemplateDetail(section,map[section].length-1);
}

// EMAIL EDIT
function openEmailDetail(idx){
  const e=emails[idx];
  openDetail(e.subj,e.to+' Â· '+e.date,
    fld('Subject',inp('ed-esubj',e.subj))+
    row2(fld('To',inp('ed-eto',e.to)),fld('Date',inp('ed-edate',e.date)))+
    fld('Status',sel('ed-estats',['Responded','Awaiting response','Sent','Draft'],e.status))+
    fld('Email Body',ta('ed-ebody',e.body,8))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveEmail(${idx},this)">Save</button><button class="btn btn-g btn-sm" onclick="copyEmail(this)">Copy</button></div>`,null);
}
function saveEmail(idx,btn){
  const e=emails[idx];
  e.subj=g('ed-esubj');e.to=g('ed-eto');e.date=g('ed-edate');
  e.status=g('ed-estats');e.body=g('ed-ebody');
  renderEmailList();saved(btn);
  document.getElementById('d-title').textContent=e.subj;
}
function copyEmail(btn){
  const val=g('ed-ebody');
  navigator.clipboard.writeText(val).then(()=>{btn.textContent='Copied';setTimeout(()=>btn.textContent='Copy',1500);});
}

function copyDetail(btn){
  const nb=btn.closest('.dpb').querySelector('.nb');
  if(!nb)return;
  navigator.clipboard.writeText(nb.textContent).then(()=>{btn.textContent='Copied';setTimeout(()=>btn.textContent='Copy',1500);});
}

// RENDER
function renderEmailList(){
  const c=document.getElementById('email-list-container');
  if(!c)return;
  c.innerHTML=emails.map((e,i)=>`<div class="emc" onclick="openEmailDetail(${i})"><div class="ems">${e.subj}</div><div class="emp">${e.body.slice(0,80)}...</div><div class="emm">${e.to} &middot; ${e.date} &middot; ${e.status}</div></div>`).join('');
}
function renderMembers(){
  const l=document.getElementById('member-list');if(!l)return;
  l.innerHTML=members.map(m=>{
    const r=_attRate(m.att);
    const sc=r>=80?'bg':r>=50?'bo':'br';const sl=r>=80?'Good':r>=50?'At Risk':'Inactive';
    const d=m.att.map(a=>`<div class="dot ${_attClass(a)}"></div>`).join('');
    return`<div class="mr" style="cursor:pointer" onclick="openMemberDetail(${m.id})"><div class="mav">${m.first[0]+m.last[0]}</div><div class="mi"><div class="mn">${m.first} ${m.last}</div><div class="mro">${m.role} &middot; ${m.email}</div></div><div class="dots" style="margin-right:10px">${d}</div><span style="font-size:11px;color:var(--t3);margin-right:8px">${r}%</span><span class="badge ${sc}">${sl}</span><span style="font-size:9px;color:var(--t4);margin-left:8px">Edit</span></div>`;
  }).join('');updateStats();
}
function renderExec(){
  const l=document.getElementById('exec-list');if(!l)return;
  l.innerHTML=execTeam.map(e=>`<div class="mr" style="cursor:pointer" onclick="openExecDetail(${e.id})"><div class="mav" style="background:var(--cr)">${e.name.split(' ').map(w=>w[0]).join('').slice(0,2)}</div><div class="mi"><div class="mn">${e.name}</div><div class="mro">${e.position}</div></div><span style="font-size:9px;color:var(--t4);margin-left:auto">Edit</span></div>`).join('');updateStats();
}
function renderBootcamps(){
  const t=document.getElementById('bc-table');if(!t)return;
  t.innerHTML=bootcamps.map(b=>{
    const r=Math.round(b.att/b.tot*100);const bc=r>=80?'bg':r>=60?'bo':'br';
    const fc=b.files&&b.files.length?`<span class="badge bb">${b.files.length} linked</span>`:`<span style="color:var(--t4);font-size:10px">None</span>`;
    return`<tr class="cr" onclick="openBcDetail(${b.id})"><td class="nm">${b.name}</td><td>${b.date}</td><td>${b.topic}</td><td>${b.att}/${b.tot}</td><td><span class="badge ${bc}">${r}%</span></td><td>${fc}</td></tr>`;
  }).join('');
}
function renderTasks(){
  const filterEl=document.getElementById('task-owner-filter');
  const filter=filterEl?filterEl.value:'';
  // populate filter options once
  if(filterEl&&filterEl.options.length<=1){
    const owners=[...new Set([...tasks.ebod,...tasks.general].map(t=>t.owner))].sort();
    owners.forEach(o=>{const opt=document.createElement('option');opt.value=o;opt.textContent=o;filterEl.appendChild(opt);});
  }
  ['ebod','general'].forEach(board=>{
    const l=document.getElementById(board+'-tasks');if(!l)return;
    const filtered=filter?tasks[board].filter(t=>t.owner===filter):tasks[board];
    l.innerHTML=filtered.length?filtered.map(t=>`<div class="tr"><div class="tcb ${t.done?'done':''}" onclick="toggleTask(${t.id},'${board}')"></div><div style="flex:1"><div class="tt ${t.done?'dk':''}" onclick="openTaskDetail(${t.id},'${board}')">${t.text}</div><div class="tm">Due ${t.due} &middot; ${t.cat}</div></div><div class="to">${t.owner}</div><button class="rb" onclick="removeTask(${t.id},'${board}')">&times;</button></div>`).join(''):`<div style="font-size:11px;color:var(--t4);padding:12px 0">No tasks yet.</div>`;
  });
  const open=[...tasks.ebod,...tasks.general].filter(t=>!t.done).length;
  const b=document.getElementById('task-badge');if(b)b.textContent=open;
  renderDashTasks();
}
function renderDashTasks(){
  const el=document.getElementById('dash-tasks');if(!el)return;
  const all=[...tasks.ebod,...tasks.general].filter(t=>!t.done).slice(0,4);
  el.innerHTML=all.map(t=>`<div class="tr"><div class="tcb" onclick="toggleTask(${t.id},'${tasks.ebod.find(x=>x.id===t.id)?'ebod':'general'}')"></div><div style="flex:1"><div class="tt">${t.text}</div><div class="tm">Due ${t.due}</div></div><div class="to">${t.owner}</div></div>`).join('');
}
function renderAgendas(){
  const t=document.getElementById('ag-table');if(!t)return;
  t.innerHTML=agendas.map(a=>{
    const fc=a.files&&a.files.length?`<span class="badge bb">${a.files.length} linked</span>`:`<span style="color:var(--t4);font-size:10px">None</span>`;
    return`<tr class="cr" onclick="openAgendaDetail(${a.id})"><td class="nm">${a.name}</td><td>${a.date}</td><td>${a.items.split('\n').length}</td><td><span class="badge ${a.status==='Final'||a.status==='Complete'?'bg':'bo'}">${a.status}</span></td><td>${fc}</td><td><button class="btn btn-g btn-sm" onclick="event.stopPropagation();printAgenda(${a.id})">Print</button></td></tr>`;
  }).join('');
}
function renderEvents(){
  const u=document.getElementById('upcoming-list');
  if(u)u.innerHTML=eventsData.upcoming.map(e=>`<div class="evc" onclick="openEventDetail(${e.id},'upcoming')"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><div class="evn">${e.name}</div><span class="badge bo">${e.date}</span></div><div class="evs"><div class="evst">Location: <span>${e.loc}</span></div><div class="evst">Est. Att: <span>${e.att}</span></div><div class="evst">Drive Files: <span>${e.files&&e.files.length?e.files.length+' linked':'None'}</span></div></div></div>`).join('');
  const p=document.getElementById('past-list');
  if(p)p.innerHTML=eventsData.past.map(e=>`<div class="evc" onclick="openEventDetail(${e.id},'past')"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><div class="evn">${e.name}</div><span class="badge bg">${e.date}</span></div><div class="evs"><div class="evst">Members: <span>${e.att}</span></div></div></div>`).join('');
}
function renderTemplates(){
  rT('tmpl-proposals',templates.proposals,'proposals');
  rT('tmpl-resources',templates.resources,'resources');
  rT('tmpl-ros',templates.ros,'ros');
}
function rT(id,arr,section){
  const el=document.getElementById(id);if(!el)return;
  if(!arr.length){el.innerHTML=`<div style="font-size:11px;color:var(--t4);padding:8px 0">No templates yet. Click + Add Template to create one.</div>`;return;}
  el.innerHTML=arr.map((t,i)=>`<div class="tc" onclick="openTemplateDetail('${section}',${i})">
    <div style="flex:1"><div class="tn">${t.name}</div><div class="td2">${t.desc}</div></div>
    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px;flex-shrink:0">
      <span style="font-size:9px;color:var(--t3)">Edit &rsaquo;</span>
    </div>
  </div>`).join('') +
  `<div style="margin-top:10px;padding:8px 10px;background:var(--s2);border-radius:5px;display:flex;align-items:center;justify-content:space-between">
    <span style="font-size:10px;color:var(--t3)">${arr.length} template${arr.length!==1?'s':''}</span>
    <a href="${templateDocs[section]}" target="_blank" style="font-size:10px;color:var(--grn);font-family:'IBM Plex Sans',sans-serif;font-weight:600;text-decoration:none">Open Google Doc &#8599;</a>
  </div>`;
}
function updateStats(){
  const tot=members.length,ex=members.filter(m=>m.role==='Exec').length;
  const ae=document.getElementById('att-total');if(ae)ae.textContent=tot;
  const ae2=document.getElementById('att-exec');if(ae2)ae2.textContent=ex;
  renderDashboard();
}

// CRUD
function removeMember(id){members=members.filter(m=>m.id!==id);renderMembers();}
function removeExec(id){execTeam=execTeam.filter(e=>e.id!==id);renderExec();}
function removeTask(id,board){tasks[board]=tasks[board].filter(t=>t.id!==id);renderTasks();}
function toggleTask(id,board){const t=tasks[board].find(x=>x.id===id);if(t){t.done=!t.done;renderTasks();}}
function addMember(){
  const f=document.getElementById('m-first').value.trim(),l=document.getElementById('m-last').value.trim();
  if(!f||!l)return;
  members.push({id:nM++,first:f,last:l,role:document.getElementById('m-role').value,email:document.getElementById('m-email').value.trim(),att:[0,0,0,0,0,0]});
  closeModals();renderMembers();
}
function addExec(){
  const name=document.getElementById('e-name').value.trim();
  let pos=document.getElementById('e-pos').value;
  if(pos==='Custom')pos=document.getElementById('e-custom').value.trim();
  if(!name||!pos)return;
  execTeam.push({id:nE++,name,position:pos});closeModals();renderExec();
}
function addTask(){
  const text=document.getElementById('t-text').value.trim();if(!text)return;
  const board=document.getElementById('task-board').value;
  const due=document.getElementById('t-due').value;
  const dStr=due?new Date(due).toLocaleDateString('en-US',{month:'short',day:'numeric'}):'TBD';
  tasks[board].push({id:nT++,text,owner:document.getElementById('t-owner').value,due:dStr,cat:'General',done:false,notes:document.getElementById('t-notes').value,files:[]});
  closeModals();renderTasks();
}
function addAgenda(){
  const name=document.getElementById('ag-name').value.trim();if(!name)return;
  const date=document.getElementById('ag-date').value;
  const dStr=date?new Date(date).toLocaleDateString('en-US',{month:'short',day:'numeric'}):'TBD';
  agendas.push({id:nA++,name,date:dStr,items:document.getElementById('ag-items').value,notes:document.getElementById('ag-notes').value,status:'Draft',files:[]});
  closeModals();renderAgendas();
}
function addEvent(){
  const name=document.getElementById('ev-name').value.trim();if(!name)return;
  const date=document.getElementById('ev-date').value;
  const dStr=date?new Date(date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}):'TBD';
  eventsData.upcoming.push({id:nEv++,name,date:dStr,loc:document.getElementById('ev-loc').value||'TBD',att:parseInt(document.getElementById('ev-att').value)||0,desc:document.getElementById('ev-desc').value,files:[]});
  closeModals();renderEvents();
}
function addBootcamp(){
  const name=document.getElementById('bc-name').value.trim();if(!name)return;
  const date=document.getElementById('bc-date').value;
  const dStr=date?new Date(date).toLocaleDateString('en-US',{month:'short',day:'numeric'}):'TBD';
  bootcamps.push({id:nB++,name,date:dStr,topic:document.getElementById('bc-topic').value,att:parseInt(document.getElementById('bc-att').value)||0,tot:parseInt(document.getElementById('bc-tot').value)||members.length||0,notes:document.getElementById('bc-notes').value,files:[]});
  closeModals();renderBootcamps();
}

// ---- NEW SECTION DATA ----

// CONSULTING
let consultingProjects=[
  {id:1,name:'Marketing Strategy Refresh',client:'Orkizz',lead:'Nisa Pradhan',start:'Apr 2026',status:'Active',notes:'Conducting market analysis and rebranding recommendations. Deliverable: full strategy deck.',files:[]},
  {id:2,name:'Social Media Audit',client:'Local Boba Shop',lead:'Arya Somu',start:'Mar 2026',status:'Complete',notes:'Audited IG/TikTok presence. Delivered content calendar and engagement playbook.',files:[]},
];let nCon=3;
let clients=[
  {id:1,name:'Orkizz',contact:'Orkizz Team',email:'contact@orkizz.com',industry:'Tech / Startup',status:'Active',notes:'Current project: Marketing Strategy Refresh'},
  {id:2,name:'Local Boba Shop',contact:'Owner',email:'',industry:'F&B / Retail',status:'Complete',notes:'Social media audit complete. Open to future engagements.'},
];let nCli=3;
let deliverables=[
  {id:1,name:'Market Analysis Report',project:'Marketing Strategy Refresh',owner:'Jayden Pham',due:'May 20',status:'In Progress'},
  {id:2,name:'Strategy Deck (Final)',project:'Marketing Strategy Refresh',owner:'Jason Liu',due:'Jun 1',status:'Not Started'},
  {id:3,name:'Content Calendar',project:'Social Media Audit',owner:'Jason Liu',due:'Mar 30',status:'Complete'},
];let nDel=4;

// COMPETITION
let compResults=[
  {id:1,member:'Nisa Pradhan',event:'Entrepreneurship Pitch',competition:'SBLC 2026',placement:'1st',year:'2026'},
  {id:2,member:'Carine Chan',event:'Community Service Project',competition:'SBLC 2026',placement:'1st',year:'2026'},
  {id:3,member:'Arya Somu',event:'Business Presentation',competition:'SBLC 2026',placement:'3rd',year:'2026'},
  {id:4,member:'George Huang',event:'Financial Analysis',competition:'SBLC 2026',placement:'4th',year:'2026'},
];let nCR=5;
let compEvents=[
  {id:1,name:'Entrepreneurship Pitch',members:'Nisa Pradhan',competition:'NLC 2026',type:'Individual',notes:'Prep sessions scheduled May 20 & 27'},
  {id:2,name:'Community Service Project',members:'Carine Chan, Arya Somu',competition:'NLC 2026',type:'Team',notes:'Update project documentation by May 15'},
];let nCE=3;
let compHistory=[
  {id:1,year:'2026',competition:'SBLC',entries:17,first:2,top5:6,notes:'Best chapter performance to date'},
  {id:2,year:'2025',competition:'SBLC',entries:11,first:0,top5:3,notes:''},
  {id:3,year:'2024',competition:'SBLC',entries:8,first:1,top5:2,notes:'First year competing at full capacity'},
];let nCH=4;

// BUDGET
let transactions={
  income:[
    // â”€â”€ CONFERENCE MEMBER PAYMENTS â”€â”€
    {id:1,desc:'Fall Conference Member Payments',cat:'Conference',date:'Oct 2024',amount:6200},
    {id:2,desc:'State Conference Member Payments',cat:'Conference',date:'Feb 2025',amount:25814},
    {id:3,desc:'National Conference Member Payments',cat:'Conference',date:'May 2025',amount:17176},
    // â”€â”€ SPONSORSHIPS â”€â”€
    {id:4,desc:'Key Point Credit Union (Fall)',cat:'Sponsorship',date:'Sep 2024',amount:2000},
    {id:5,desc:'Moss Adams Sponsorship',cat:'Sponsorship',date:'Nov 2024',amount:3000},
    {id:6,desc:'Star One Credit Union Sponsorship',cat:'Sponsorship',date:'Oct 2024',amount:500},
    {id:7,desc:'Key Point Credit Union (Spring)',cat:'Sponsorship',date:'Mar 2025',amount:1500},
    // â”€â”€ OTHER INCOME â”€â”€
    {id:8,desc:'Donations',cat:'Donation',date:'2024-2025',amount:2000},
    {id:9,desc:'ICC Award â€” Most Decorated (Club Day)',cat:'ICC Award',date:'May 2025',amount:100},
    {id:10,desc:'ICC Award â€” Club of the Year',cat:'ICC Award',date:'May 2025',amount:300},
    {id:11,desc:'ICC Award â€” Most Popular',cat:'ICC Award',date:'May 2025',amount:150},
    {id:12,desc:'ICC Award â€” Perfect Attendance',cat:'ICC Award',date:'May 2025',amount:100},
    {id:13,desc:'Merch Sales',cat:'Merchandise',date:'2024-2025',amount:1190},
    {id:14,desc:'Club Budget Request (De Anza)',cat:'Grant',date:'Sep 2024',amount:444},
  ],
  expense:[
    // â”€â”€ FALL CONFERENCE â”€â”€
    {id:15,desc:'Fall Conference Expense',cat:'Conference',date:'Oct 2024',amount:6200},
    // â”€â”€ STATE CONFERENCE â”€â”€
    {id:16,desc:'State Conference â€” Hotel & Registration',cat:'Conference',date:'Feb 2025',amount:14665},
    {id:17,desc:'State Conference â€” Transportation',cat:'Travel',date:'Feb 2025',amount:7408},
    {id:18,desc:'State Conference â€” Reimbursements',cat:'Reimbursement',date:'Feb 2025',amount:4427},
    {id:19,desc:'State Conference â€” Food',cat:'Food',date:'Feb 2025',amount:2314},
    // â”€â”€ NATIONAL CONFERENCE â”€â”€
    {id:20,desc:'Nationals â€” Hotel & Registration',cat:'Conference',date:'Jun 2025',amount:14343},
    {id:21,desc:'Nationals â€” Financial Aid Refund',cat:'Reimbursement',date:'Jun 2025',amount:2900},
    {id:22,desc:'Nationals â€” Scholarship Refund',cat:'Reimbursement',date:'Jun 2025',amount:2145},
    {id:23,desc:'Nationals â€” Aquarium Excursion',cat:'Events',date:'Jun 2025',amount:821},
    {id:24,desc:'Nationals â€” PayPal Fees',cat:'Admin',date:'Jun 2025',amount:465},
    // â”€â”€ DE ANZA BUSINESS CONFERENCE â”€â”€
    {id:25,desc:'DABC â€” Custodial Fees',cat:'Events',date:'Apr 2025',amount:444},
    {id:26,desc:'DABC â€” Food',cat:'Food',date:'Apr 2025',amount:180},
    {id:27,desc:'DABC â€” Supplies',cat:'Admin',date:'Apr 2025',amount:48},
    // â”€â”€ OTHER EXPENSES â”€â”€
    {id:28,desc:'Merch Expense',cat:'Merchandise',date:'2024-2025',amount:678},
    {id:29,desc:'Banquet Expense',cat:'Events',date:'May 2025',amount:374},
    {id:30,desc:'Advisor Gift',cat:'Admin',date:'Jun 2025',amount:187},
    {id:31,desc:'Beach Social Expense',cat:'Events',date:'May 2025',amount:18},
    {id:32,desc:'Business Olympics Expense',cat:'Competition',date:'2024-2025',amount:92},
  ]
};let nTr=33;

// MINUTES
let meetingMinutes=[
  {id:1,name:'EBOD Weekly #12',date:'May 7',recorder:'Nina Reyes',actions:'Confirm DAIS venue by May 9\nSend Fidelity follow-up by May 10\nFinalize bootcamp Session 5 agenda',notes:'Full discussion on DAIS timeline. Bootcamp curriculum approved.',files:[]},
  {id:2,name:'Spring General Meeting',date:'Apr 30',recorder:'Nina Reyes',actions:'All members register for NLC by May 3\nUpdate website with SBLC results',notes:'SBLC debrief presented. NLC prep timeline shared.',files:[]},
];let nMin=3;

// RECRUITMENT
let prospects=[
  {id:1,name:'Alex Kim',contact:'alexkim@deanza.edu',source:'Club Rush',stage:'Interested',followup:'May 12',notes:'Business major, sophomore. Interested in competitions.'},
  {id:2,name:'Jenny Tran',contact:'jennyt@deanza.edu',source:'Referral',stage:'Attended Meeting',followup:'May 15',notes:'Referred by Lucas Tran. Came to Spring Gen Meeting.'},
  {id:3,name:'Marcus Lee',contact:'marcusl@deanza.edu',source:'Instagram',stage:'Converted',followup:'',notes:'Joined as member after Spring Gen Meeting.'},
];let nPr=4;

// GOALS
let goals=[
  {id:1,title:'Membership Growth',metric:'Reach 60 active members',progress:42,target:60,unit:'members',notes:'Currently at 47. Recruitment push at DAIS and fall club rush.',status:'On Track'},
  {id:2,title:'Competition Placements',metric:'Top 5 in 10+ events at NLC',progress:4,target:10,unit:'events',notes:'SBLC results strong. Need more prep for written events.',status:'On Track'},
  {id:3,title:'Sponsorship Revenue',metric:'Raise $4,000 for Spring',progress:2550,target:4000,unit:'dollars',notes:'Fidelity follow-up pending. Need 2 more confirmed sponsors.',status:'Behind'},
  {id:4,title:'Consulting Projects',metric:'Complete 4 client projects',progress:1,target:4,unit:'projects',notes:'Orkizz active, 3 more needed. Reach out to local businesses.',status:'Behind'},
];let nGoal=5;

// â”€â”€ NEW FINANCE / CALENDAR DATA (must be before global render call) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
let pblTransactions={income:[],expense:[]};let nPblTr=1;
let budgetTarget=parseFloat(localStorage.getItem('dapbl_budget_target'))||4000;
let merchSales=[];let nMerch=1;
let importedCalEvents=[];

// TRANSITION
let transitionDocs=[
  {id:1,position:'President',author:'Nisa Pradhan',updated:'May 2026',content:'KEY CONTACTS\n- Advisor: [Name, email]\n- FBLA State Office: [contact]\n- Venue Contacts: MLC 105 Facilities x1234\n\nONGOING RELATIONSHIPS\n- Bay Area Credit Union (Maria Santos) â€” renews annually, very receptive\n- Tech District Co. (James Wu) â€” prefers email, follow up in March\n\nDO NOT FORGET\n- Submit chapter dues to national by Sept 15\n- Reserve rooms for bootcamps at least 3 weeks out\n- Start SBLC prep in October, not November\n\nWHAT I WOULD DO DIFFERENTLY\n- Delegate more to VPs earlier\n- Set exec expectations in writing Week 1\n- Build sponsor relationships before you need them',files:[]},
  {id:2,position:'VP of Operations',author:'Addy Hu',updated:'May 2026',content:'EVENT LOGISTICS\n- DAIS: book venue by March, catering 2 weeks out, judges confirmed 3 weeks out\n- Always get room confirmation in writing from facilities\n\nVENDORS\n- Catering: [Contact]\n- Printing: Local Print Co. (in-kind sponsor)\n\nTEMPLATES\n- Run of Show template in Hub > Templates\n- DAIS 2025 folder in Drive has all previous materials',files:[]},
];let nTD=3;

// ANNOUNCEMENTS
let announcements={
  draft:[
    {id:1,title:'DAIS 2026 Save the Date',channel:'GroupMe + Instagram',date:'May 10',content:'DAIS 2026 is coming up June 3rd! Mark your calendars. More details coming soon. This is our biggest event of the year â€” bring a friend.'},
    {id:2,title:'NLC Prep Bootcamp Reminder',channel:'GroupMe',date:'May 12',content:'Reminder: Bootcamp Session 5 is this Wednesday. All NLC competitors must attend. Session covers advanced case strategies. See you at 6pm in MLC 105.'},
  ],
  sent:[
    {id:3,title:'SBLC Results Announcement',channel:'GroupMe + Instagram',date:'Mar 20',content:'We are incredibly proud to share that De Anza PBL placed in 17 events at SBLC 2026, including TWO first-place finishes. Thank you to every member who competed. This is just the beginning.'},
    {id:4,title:'Spring Quarter Kickoff',channel:'GroupMe',date:'Apr 1',content:'Welcome back everyone! Spring quarter is here. First general meeting is April 14th. Bootcamps start April 16th. Let\'s have our best quarter yet.'},
  ]
};let nAnn=5;

// ---- CONSULTING FUNCTIONS ----
function renderConsulting(){
  // Stats
  const active=consultingProjects.filter(p=>p.status==='Active').length;
  const done=consultingProjects.filter(p=>p.status==='Complete').length;
  const openDel=deliverables.filter(d=>d.status!=='Complete').length;
  const el=id=>document.getElementById(id);
  if(el('con-active'))el('con-active').textContent=active;
  if(el('con-done'))el('con-done').textContent=done;
  if(el('con-clients'))el('con-clients').textContent=clients.length;
  if(el('con-del'))el('con-del').textContent=openDel;
  // Projects table
  const pt=el('con-projects-table');
  if(pt)pt.innerHTML=consultingProjects.map(p=>{
    const sc=p.status==='Active'?'bo':p.status==='Complete'?'bg':'bx';
    const fc=p.files&&p.files.length?`<span class="badge bb">${p.files.length}</span>`:`<span style="color:var(--t4);font-size:10px">None</span>`;
    return`<tr class="cr" onclick="openConsultingProjectDetail(${p.id})"><td class="nm">${p.name}</td><td>${p.client}</td><td>${p.lead}</td><td>${p.start}</td><td><span class="badge ${sc}">${p.status}</span></td><td>${fc}</td></tr>`;
  }).join('');
  // Clients list
  const cl=el('con-clients-list');
  if(cl)cl.innerHTML=clients.map(c=>`<div class="mr" style="cursor:pointer" onclick="openClientDetail(${c.id})"><div class="mav" style="background:var(--blu)">${c.name.slice(0,2).toUpperCase()}</div><div class="mi"><div class="mn">${c.name}</div><div class="mro">${c.industry} &middot; ${c.contact} &middot; ${c.email||'No email'}</div></div><span class="badge ${c.status==='Active'?'bo':'bg'}">${c.status}</span></div>`).join('');
  // Deliverables
  const dt=el('con-del-table');
  if(dt)dt.innerHTML=deliverables.map(d=>{
    const sc=d.status==='Complete'?'bg':d.status==='In Progress'?'bo':'bx';
    return`<tr class="cr" onclick="openDeliverableDetail(${d.id})"><td class="nm">${d.name}</td><td>${d.project}</td><td>${d.owner}</td><td>${d.due}</td><td><span class="badge ${sc}">${d.status}</span></td></tr>`;
  }).join('');
}

function openConsultingProjectDetail(id){
  const p=consultingProjects.find(x=>x.id===id);
  const statusOpts=['Active','Complete','On Hold','Cancelled'];
  openDetail(p.name,p.client+' Â· '+p.status,
    row2(fld('Project Name',inp('ed-cname',p.name)),fld('Client',inp('ed-cclient',p.client)))+
    row2(fld('Lead',inp('ed-clead',p.lead)),fld('Start Date',inp('ed-cstart',p.start)))+
    fld('Status',sel('ed-cstatus',statusOpts,p.status))+
    fld('Project Notes',ta('ed-cnotes',p.notes,6))+
    sec('Linked Drive Files',`<div id="d-attached-files">${renderAttachedFiles(p.files)}</div><button class="btn btn-g btn-sm" style="margin-top:8px" onclick="toggleDrive()">Browse Drive</button>`)+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveConsultingProject(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="consultingProjects=consultingProjects.filter(x=>x.id!==${id});renderConsulting();closeDetail()">Delete</button></div>`,p);
}
function saveConsultingProject(id,btn){
  const p=consultingProjects.find(x=>x.id===id);
  p.name=g('ed-cname');p.client=g('ed-cclient');p.lead=g('ed-clead');
  p.start=g('ed-cstart');p.status=g('ed-cstatus');p.notes=g('ed-cnotes');
  renderConsulting();saved(btn);
  document.getElementById('d-title').textContent=p.name;
  document.getElementById('d-sub').textContent=p.client+' Â· '+p.status;
}
function addConsultingProject(){
  consultingProjects.push({id:nCon++,name:'New Project',client:'',lead:'',start:'',status:'Active',notes:'',files:[]});
  renderConsulting();openConsultingProjectDetail(consultingProjects[consultingProjects.length-1].id);
}
function openClientDetail(id){
  const c=clients.find(x=>x.id===id);
  openDetail(c.name,c.industry,
    row2(fld('Company Name',inp('ed-cliname',c.name)),fld('Industry',inp('ed-cliind',c.industry)))+
    row2(fld('Contact',inp('ed-clicont',c.contact)),fld('Email',inp('ed-cliemail',c.email)))+
    fld('Status',sel('ed-clistat',['Active','Complete','Prospective'],c.status))+
    fld('Notes',ta('ed-clinotes',c.notes,4))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveClient(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="clients=clients.filter(x=>x.id!==${id});renderConsulting();closeDetail()">Remove</button></div>`,c);
}
function saveClient(id,btn){
  const c=clients.find(x=>x.id===id);
  c.name=g('ed-cliname');c.industry=g('ed-cliind');c.contact=g('ed-clicont');
  c.email=g('ed-cliemail');c.status=g('ed-clistat');c.notes=g('ed-clinotes');
  renderConsulting();saved(btn);
  document.getElementById('d-title').textContent=c.name;
}
function addClient(){
  clients.push({id:nCli++,name:'New Client',contact:'',email:'',industry:'',status:'Prospective',notes:'',files:[]});
  renderConsulting();openClientDetail(clients[clients.length-1].id);
}
function openDeliverableDetail(id){
  const d=deliverables.find(x=>x.id===id);
  openDetail(d.name,d.project,
    row2(fld('Deliverable',inp('ed-dlname',d.name)),fld('Project',inp('ed-dlproj',d.project)))+
    row2(fld('Owner',inp('ed-dlowner',d.owner)),fld('Due Date',inp('ed-dldue',d.due)))+
    fld('Status',sel('ed-dlstat',['Not Started','In Progress','Complete','Blocked'],d.status))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveDeliverable(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="deliverables=deliverables.filter(x=>x.id!==${id});renderConsulting();closeDetail()">Delete</button></div>`,d);
}
function saveDeliverable(id,btn){
  const d=deliverables.find(x=>x.id===id);
  d.name=g('ed-dlname');d.project=g('ed-dlproj');d.owner=g('ed-dlowner');
  d.due=g('ed-dldue');d.status=g('ed-dlstat');
  renderConsulting();saved(btn);
  document.getElementById('d-title').textContent=d.name;
}
function addDeliverable(){
  deliverables.push({id:nDel++,name:'New Deliverable',project:'',owner:'',due:'',status:'Not Started'});
  renderConsulting();openDeliverableDetail(deliverables[deliverables.length-1].id);
}

// ---- COMPETITION FUNCTIONS ----
function renderCompetition(){
  const rt=document.getElementById('comp-results-table');
  if(rt)rt.innerHTML=compResults.map(r=>`<tr class="cr" onclick="openCompResultDetail(${r.id})"><td class="nm">${r.member}</td><td>${r.event}</td><td>${r.competition}</td><td><span class="badge ${r.placement==='1st'?'bg':r.placement==='2nd'||r.placement==='3rd'?'bo':'bx'}">${r.placement}</span></td><td>${r.year}</td></tr>`).join('');
  const et=document.getElementById('comp-events-table');
  if(et)et.innerHTML=compEvents.map(e=>{
    const sups=_compSignupsMap[e.id]||[];
    const supBadge=sups.length?`<span class="badge bg" title="${sups.map(s=>s.name).join(', ')}" style="cursor:default">${sups.length} interested</span>`:'';
    return`<tr class="cr" onclick="openCompEventDetail(${e.id})"><td class="nm">${e.name}</td><td>${e.members}</td><td>${e.competition}</td><td><span class="badge bb">${e.type}</span></td><td style="color:var(--t3);font-size:10px">${e.notes||'â€”'}</td><td>${supBadge}</td></tr>`;
  }).join('');
  const ht=document.getElementById('comp-history-table');
  if(ht)ht.innerHTML=compHistory.map(h=>`<tr class="cr" onclick="openCompHistoryDetail(${h.id})"><td class="nm">${h.year}</td><td>${h.competition}</td><td>${h.entries}</td><td><span class="badge bg">${h.first}</span></td><td>${h.top5}</td><td style="color:var(--t3);font-size:10px">${h.notes||'â€”'}</td></tr>`).join('');
}
function openCompResultDetail(id){
  const r=compResults.find(x=>x.id===id);
  openDetail(r.member+' â€” '+r.event,r.competition+' '+r.year,
    row2(fld('Member',inp('ed-crmem',r.member)),fld('Event',inp('ed-crevt',r.event)))+
    row2(fld('Competition',inp('ed-crcomp',r.competition)),fld('Year',inp('ed-cryear',r.year)))+
    fld('Placement',sel('ed-crpl',['1st','2nd','3rd','4th','5th','Top 10','Participated'],r.placement))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveCompResult(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="compResults=compResults.filter(x=>x.id!==${id});renderCompetition();closeDetail()">Delete</button></div>`,r);
}
function saveCompResult(id,btn){
  const r=compResults.find(x=>x.id===id);
  r.member=g('ed-crmem');r.event=g('ed-crevt');r.competition=g('ed-crcomp');
  r.year=g('ed-cryear');r.placement=g('ed-crpl');
  renderCompetition();saved(btn);
  document.getElementById('d-title').textContent=r.member+' â€” '+r.event;
}
function addCompResult(){
  compResults.push({id:nCR++,member:'',event:'',competition:'',placement:'Participated',year:'2026'});
  renderCompetition();openCompResultDetail(compResults[compResults.length-1].id);
}
function openCompEventDetail(id){
  const e=compEvents.find(x=>x.id===id);
  openDetail(e.name,e.competition,
    row2(fld('Event Name',inp('ed-cename',e.name)),fld('Competition',inp('ed-cecomp',e.competition)))+
    row2(fld('Members',inp('ed-cemem',e.members)),fld('Type',sel('ed-cetype',['Individual','Team','Prepared','Objective'],e.type)))+
    fld('Notes',ta('ed-cenotes',e.notes,4))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveCompEvent(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="compEvents=compEvents.filter(x=>x.id!==${id});renderCompetition();closeDetail()">Delete</button></div>`,e);
}
function saveCompEvent(id,btn){
  const e=compEvents.find(x=>x.id===id);
  e.name=g('ed-cename');e.competition=g('ed-cecomp');e.members=g('ed-cemem');
  e.type=g('ed-cetype');e.notes=g('ed-cenotes');
  renderCompetition();saved(btn);
  document.getElementById('d-title').textContent=e.name;
}
function addCompEvent(){
  compEvents.push({id:nCE++,name:'',members:'',competition:'',type:'Individual',notes:''});
  renderCompetition();openCompEventDetail(compEvents[compEvents.length-1].id);
}
function openCompHistoryDetail(id){
  const h=compHistory.find(x=>x.id===id);
  openDetail(h.competition+' '+h.year,'Chapter record',
    row2(fld('Year',inp('ed-chyr',h.year)),fld('Competition',inp('ed-chcomp',h.competition)))+
    row2(fld('Total Entries',inp('ed-chent',h.entries,'number')),fld('1st Place Finishes',inp('ed-ch1st',h.first,'number')))+
    fld('Top 5 Finishes',inp('ed-chtop',h.top5,'number'))+
    fld('Notes',ta('ed-chnotes',h.notes,3))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveCompHistory(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="compHistory=compHistory.filter(x=>x.id!==${id});renderCompetition();closeDetail()">Delete</button></div>`,h);
}
function saveCompHistory(id,btn){
  const h=compHistory.find(x=>x.id===id);
  h.year=g('ed-chyr');h.competition=g('ed-chcomp');h.entries=parseInt(g('ed-chent'))||0;
  h.first=parseInt(g('ed-ch1st'))||0;h.top5=parseInt(g('ed-chtop'))||0;h.notes=g('ed-chnotes');
  renderCompetition();saved(btn);
  document.getElementById('d-title').textContent=h.competition+' '+h.year;
}

// ---- BUDGET FUNCTIONS ----
function renderBudget(){
  const totalInc=transactions.income.reduce((s,t)=>s+t.amount,0);
  const totalExp=transactions.expense.reduce((s,t)=>s+t.amount,0);
  const bal=totalInc-totalExp;
  const el=id=>document.getElementById(id);
  if(el('bud-income'))el('bud-income').innerHTML=`<span class="sa">$${totalInc.toLocaleString()}</span>`;
  if(el('bud-expense'))el('bud-expense').textContent='$'+totalExp.toLocaleString();
  if(el('bud-balance')){el('bud-balance').textContent='$'+bal.toLocaleString();el('bud-balance').style.color=bal>=0?'var(--gold2)':'#E57373';}
  const it=el('income-table');
  if(it)it.innerHTML=transactions.income.map(t=>`<tr class="cr" onclick="openTransactionDetail(${t.id},'income')"><td class="nm">${t.desc}</td><td><span class="badge bg">${t.cat}</span></td><td>${t.date}</td><td style="color:var(--gold2);font-weight:600">+$${t.amount}</td></tr>`).join('');
  const et=el('expense-table');
  if(et)et.innerHTML=transactions.expense.map(t=>`<tr class="cr" onclick="openTransactionDetail(${t.id},'expense')"><td class="nm">${t.desc}</td><td><span class="badge br">${t.cat}</span></td><td>${t.date}</td><td style="color:#E57373;font-weight:600">-$${t.amount}</td></tr>`).join('');
  // Category summary
  const cats={};
  transactions.income.forEach(t=>{cats[t.cat]=(cats[t.cat]||{inc:0,exp:0});cats[t.cat].inc+=t.amount;});
  transactions.expense.forEach(t=>{cats[t.cat]=(cats[t.cat]||{inc:0,exp:0});cats[t.cat].exp+=t.amount;});
  const bc=el('budget-by-cat');
  if(bc)bc.innerHTML=Object.entries(cats).map(([cat,v])=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--bd)"><span style="font-size:12px;color:var(--t1)">${cat}</span><div style="display:flex;gap:12px"><span style="font-size:11px;color:var(--gold2)">${v.inc?'+$'+v.inc:''}</span><span style="font-size:11px;color:#E57373">${v.exp?'-$'+v.exp:''}</span></div></div>`).join('');
}
function openTransactionDetail(id,type){
  const t=transactions[type].find(x=>x.id===id);
  const incCats=['Sponsorship','Dues','Event','Fundraiser','Other'];
  const expCats=['Travel','Competition','Education','Events','Marketing','Design','Operations','Other'];
  openDetail(t.desc,type==='income'?'Income':'Expense',
    fld('Description',inp('ed-trdesc',t.desc))+
    row2(fld('Category',sel('ed-trcat',type==='income'?incCats:expCats,t.cat)),fld('Date',inp('ed-trdate',t.date)))+
    fld('Amount ($)',inp('ed-tramt',t.amount,'number'))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveTransaction(${id},'${type}',this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="transactions['${type}']=transactions['${type}'].filter(x=>x.id!==${id});renderBudget();closeDetail()">Delete</button></div>`,t);
}
function saveTransaction(id,type,btn){
  const t=transactions[type].find(x=>x.id===id);
  t.desc=g('ed-trdesc');t.cat=g('ed-trcat');t.date=g('ed-trdate');t.amount=parseFloat(g('ed-tramt'))||0;
  renderBudget();saved(btn);
  document.getElementById('d-title').textContent=t.desc;
}
function addTransaction(type){
  const newT={id:nTr++,desc:'New Entry',cat:'Other',date:'',amount:0};
  transactions[type].push(newT);
  renderBudget();openTransactionDetail(newT.id,type);
}

// ---- MINUTES FUNCTIONS ----
function renderMinutes(){
  const t=document.getElementById('minutes-table');if(!t)return;
  t.innerHTML=meetingMinutes.map(m=>{
    const ac=m.actions?m.actions.split('\n').length:0;
    const fc=m.files&&m.files.length?`<span class="badge bb">${m.files.length}</span>`:`<span style="color:var(--t4);font-size:10px">None</span>`;
    return`<tr class="cr" onclick="openMinutesDetail(${m.id})"><td class="nm">${m.name}</td><td>${m.date}</td><td>${m.recorder}</td><td>${ac} items</td><td>${fc}</td></tr>`;
  }).join('');
}
function openMinutesDetail(id){
  const m=meetingMinutes.find(x=>x.id===id);
  openDetail(m.name,m.date+' Â· Recorded by '+m.recorder,
    row2(fld('Meeting Name',inp('ed-mnname',m.name)),fld('Date',inp('ed-mndate',m.date)))+
    fld('Recorded By',inp('ed-mnrec',m.recorder))+
    fld('Action Items (one per line)',ta('ed-mnact',m.actions,5))+
    fld('Full Notes',ta('ed-mnnotes',m.notes,6))+
    sec('Linked Drive Files',`<div id="d-attached-files">${renderAttachedFiles(m.files)}</div><button class="btn btn-g btn-sm" style="margin-top:8px" onclick="toggleDrive()">Browse Drive</button>`)+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveMinutes(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="meetingMinutes=meetingMinutes.filter(x=>x.id!==${id});renderMinutes();closeDetail()">Delete</button></div>`,m);
}
function saveMinutes(id,btn){
  const m=meetingMinutes.find(x=>x.id===id);
  m.name=g('ed-mnname');m.date=g('ed-mndate');m.recorder=g('ed-mnrec');
  m.actions=g('ed-mnact');m.notes=g('ed-mnnotes');
  renderMinutes();saved(btn);
  document.getElementById('d-title').textContent=m.name;
  document.getElementById('d-sub').textContent=m.date+' Â· Recorded by '+m.recorder;
}
function addMinutes(){
  meetingMinutes.push({id:nMin++,name:'New Meeting',date:'',recorder:'',actions:'',notes:'',files:[]});
  renderMinutes();openMinutesDetail(meetingMinutes[meetingMinutes.length-1].id);
}

// ---- RECRUITMENT FUNCTIONS ----
function renderRecruitment(){
  const t=document.getElementById('rec-table');if(!t)return;
  const stages=['Interested','Attended Meeting','Followed Up','Converted','Dropped'];
  t.innerHTML=prospects.map(p=>`<tr class="cr" onclick="openProspectDetail(${p.id})"><td class="nm">${p.name}</td><td style="font-size:10px;color:var(--t3)">${p.contact}</td><td><span class="badge bb">${p.source}</span></td><td><span class="badge ${p.stage==='Converted'?'bg':p.stage==='Dropped'?'br':'bo'}">${p.stage}</span></td><td style="font-size:10px;color:var(--t3)">${p.followup||'â€”'}</td></tr>`).join('');
  const el=id=>document.getElementById(id);
  if(el('rec-total'))el('rec-total').textContent=prospects.filter(p=>p.stage!=='Converted'&&p.stage!=='Dropped').length;
  if(el('rec-converted'))el('rec-converted').textContent=prospects.filter(p=>p.stage==='Converted').length;
  if(el('rec-followup'))el('rec-followup').textContent=prospects.filter(p=>p.followup).length;
}
function openProspectDetail(id){
  const p=prospects.find(x=>x.id===id);
  const stages=['Interested','Attended Meeting','Followed Up','Converted','Dropped'];
  const sources=['Club Rush','Referral','Instagram','Class','Event','Other'];
  openDetail(p.name,p.stage,
    row2(fld('Name',inp('ed-prname',p.name)),fld('Contact',inp('ed-prcontact',p.contact)))+
    row2(fld('Source',sel('ed-prsrc',sources,p.source)),fld('Stage',sel('ed-prstage',stages,p.stage)))+
    fld('Follow-up Date',inp('ed-prfu',p.followup))+
    fld('Notes',ta('ed-prnotes',p.notes,4))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveProspect(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="prospects=prospects.filter(x=>x.id!==${id});renderRecruitment();closeDetail()">Remove</button></div>`,p);
}
function saveProspect(id,btn){
  const p=prospects.find(x=>x.id===id);
  p.name=g('ed-prname');p.contact=g('ed-prcontact');p.source=g('ed-prsrc');
  p.stage=g('ed-prstage');p.followup=g('ed-prfu');p.notes=g('ed-prnotes');
  renderRecruitment();saved(btn);
  document.getElementById('d-title').textContent=p.name;
  document.getElementById('d-sub').textContent=p.stage;
}
function addProspect(){
  prospects.push({id:nPr++,name:'New Prospect',contact:'',source:'Club Rush',stage:'Interested',followup:'',notes:''});
  renderRecruitment();openProspectDetail(prospects[prospects.length-1].id);
}

// ---- GOALS FUNCTIONS ----
function renderGoals(){
  const el=document.getElementById('goals-list');if(!el)return;
  el.innerHTML=goals.map(g2=>{
    const pct=Math.min(100,Math.round(g2.progress/g2.target*100));
    const sc=g2.status==='On Track'?'bg':g2.status==='Behind'?'br':'bo';
    const barColor=g2.status==='On Track'?'var(--grn)':g2.status==='Behind'?'var(--cr2)':'var(--gold2)';
    return`<div class="card" style="margin-bottom:10px;cursor:pointer" onclick="openGoalDetail(${g2.id})">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
        <div><div style="font-family:'IBM Plex Sans',sans-serif;font-weight:600;font-size:13px">${g2.title}</div><div style="font-size:10px;color:var(--t3);margin-top:2px">${g2.metric}</div></div>
        <span class="badge ${sc}">${g2.status}</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--t3);margin-bottom:5px"><span>${g2.progress} / ${g2.target} ${g2.unit}</span><span>${pct}%</span></div>
      <div class="pb"><div class="pf" style="width:${pct}%;background:${barColor}"></div></div>
      ${g2.notes?`<div style="font-size:10px;color:var(--t4);margin-top:7px">${g2.notes}</div>`:''}
    </div>`;
  }).join('');
}
function openGoalDetail(id){
  const g2=goals.find(x=>x.id===id);
  openDetail(g2.title,g2.metric,
    fld('Goal Title',inp('ed-gtitle',g2.title))+
    fld('Metric / Description',inp('ed-gmetric',g2.metric))+
    row2(fld('Current Progress',inp('ed-gprog',g2.progress,'number')),fld('Target',inp('ed-gtarget',g2.target,'number')))+
    row2(fld('Unit (members, dollars, etc.)',inp('ed-gunit',g2.unit)),fld('Status',sel('ed-gstatus',['On Track','Behind','At Risk','Complete'],g2.status)))+
    fld('Notes',ta('ed-gnotes',g2.notes,4))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveGoal(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="goals=goals.filter(x=>x.id!==${id});renderGoals();closeDetail()">Delete</button></div>`,g2);
}
function saveGoal(id,btn){
  const g2=goals.find(x=>x.id===id);
  g2.title=g('ed-gtitle');g2.metric=g('ed-gmetric');g2.progress=parseFloat(g('ed-gprog'))||0;
  g2.target=parseFloat(g('ed-gtarget'))||1;g2.unit=g('ed-gunit');
  g2.status=g('ed-gstatus');g2.notes=g('ed-gnotes');
  renderGoals();saved(btn);
  document.getElementById('d-title').textContent=g2.title;
}
function addGoal(){
  goals.push({id:nGoal++,title:'New Goal',metric:'',progress:0,target:100,unit:'',notes:'',status:'On Track'});
  renderGoals();openGoalDetail(goals[goals.length-1].id);
}

// ---- TRANSITION FUNCTIONS ----
function renderTransition(){
  const el=document.getElementById('transition-list');if(!el)return;
  el.innerHTML=transitionDocs.map(d=>`<div class="mr" style="cursor:pointer;align-items:flex-start;padding:12px 10px" onclick="openTransitionDetail(${d.id})"><div class="mav" style="background:var(--cr3)">${d.position.slice(0,2).toUpperCase()}</div><div class="mi"><div class="mn">${d.position}</div><div class="mro">By ${d.author} &middot; Updated ${d.updated}</div></div><span style="font-size:9px;color:var(--t4)">Open</span></div>`).join('');
}
function openTransitionDetail(id){
  const d=transitionDocs.find(x=>x.id===id);
  openDetail(d.position+' Transition Doc','By '+d.author,
    row2(fld('Position',inp('ed-tdpos',d.position)),fld('Written By',inp('ed-tdauth',d.author)))+
    fld('Last Updated',inp('ed-tdupd',d.updated))+
    fld('Transition Notes',ta('ed-tdcontent',d.content,12))+
    sec('Linked Drive Files',`<div id="d-attached-files">${renderAttachedFiles(d.files)}</div><button class="btn btn-g btn-sm" style="margin-top:8px" onclick="toggleDrive()">Browse Drive</button>`)+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveTransition(${id},this)">Save</button><button class="btn btn-g btn-sm" onclick="copyTransitionDetail(this)">Copy</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="transitionDocs=transitionDocs.filter(x=>x.id!==${id});renderTransition();closeDetail()">Delete</button></div>`,d);
}
function saveTransition(id,btn){
  const d=transitionDocs.find(x=>x.id===id);
  d.position=g('ed-tdpos');d.author=g('ed-tdauth');d.updated=g('ed-tdupd');d.content=g('ed-tdcontent');
  renderTransition();saved(btn);
  document.getElementById('d-title').textContent=d.position+' Transition Doc';
}
function copyTransitionDetail(btn){
  const val=g('ed-tdcontent');
  navigator.clipboard.writeText(val).then(()=>{btn.textContent='Copied';setTimeout(()=>btn.textContent='Copy',1500);});
}
function addTransitionDoc(){
  transitionDocs.push({id:nTD++,position:'New Position',author:'',updated:'',content:'KEY CONTACTS\n\nONGOING RELATIONSHIPS\n\nDO NOT FORGET\n\nWHAT I WOULD DO DIFFERENTLY\n',files:[]});
  renderTransition();openTransitionDetail(transitionDocs[transitionDocs.length-1].id);
}

// ---- ANNOUNCEMENTS FUNCTIONS ----
function renderAnnouncements(){
  const channels=['GroupMe','Instagram','Email','GroupMe + Instagram','All Channels'];
  const dl=document.getElementById('ann-drafts-list');
  if(dl)dl.innerHTML=announcements.draft.map(a=>`<div class="emc" onclick="openAnnouncementDetail(${a.id},'draft')"><div class="ems">${a.title}</div><div class="emp">${a.content.slice(0,80)}...</div><div class="emm">${a.channel} &middot; Draft for ${a.date}</div></div>`).join('');
  const sl=document.getElementById('ann-sent-list');
  if(sl)sl.innerHTML=announcements.sent.map(a=>`<div class="emc" onclick="openAnnouncementDetail(${a.id},'sent')"><div class="ems">${a.title}</div><div class="emp">${a.content.slice(0,80)}...</div><div class="emm">${a.channel} &middot; Sent ${a.date}</div></div>`).join('');
}
function openAnnouncementDetail(id,bucket){
  const a=announcements[bucket].find(x=>x.id===id);
  const channels=['GroupMe','Instagram','Email','GroupMe + Instagram','All Channels'];
  openDetail(a.title,a.channel,
    fld('Title',inp('ed-antitle',a.title))+
    row2(fld('Channel',sel('ed-anchan',channels,a.channel)),fld('Date',inp('ed-andate',a.date)))+
    fld('Announcement Text',ta('ed-ancontent',a.content,6))+
    `<div style="display:flex;gap:7px;flex-wrap:wrap"><button class="btn btn-p btn-sm" onclick="saveAnnouncement(${id},'${bucket}',this)">Save</button><button class="btn btn-g btn-sm" onclick="copyAnnouncementDetail(this)">Copy</button><button class="btn btn-p btn-sm" id="pub-btn-${id}" style="background:${a.published?'var(--grn)':''};" onclick="publishAnnouncement(${id},'${bucket}',this)">${a.published?'âœ“ Published to Members':'Publish to Members'}</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="announcements['${bucket}']=announcements['${bucket}'].filter(x=>x.id!==${id});renderAnnouncements();closeDetail()">Delete</button></div>`,a);
}
function saveAnnouncement(id,bucket,btn){
  const a=announcements[bucket].find(x=>x.id===id);
  a.title=g('ed-antitle');a.channel=g('ed-anchan');a.date=g('ed-andate');a.content=g('ed-ancontent');
  renderAnnouncements();saved(btn);
  document.getElementById('d-title').textContent=a.title;
}
function publishAnnouncement(id,bucket,btn){
  const a=announcements[bucket].find(x=>x.id===id);if(!a)return;
  a.published=!a.published;
  saveData();renderAnnouncements();
  btn.textContent=a.published?'âœ“ Published to Members':'Publish to Members';
  btn.style.background=a.published?'var(--grn)':'';
}
function copyAnnouncementDetail(btn){
  const val=g('ed-ancontent');
  navigator.clipboard.writeText(val).then(()=>{btn.textContent='Copied';setTimeout(()=>btn.textContent='Copy',1500);});
}
function renderMemberContent(){
  // Announcements tab
  const al=document.getElementById('mc-ann-list');
  if(al){
    const all=[...announcements.sent,...announcements.draft];
    al.innerHTML=all.length?all.map(a=>`
      <div class="emc" onclick="openAnnouncementDetail(${a.id},'${announcements.sent.find(x=>x.id===a.id)?'sent':'draft'}')">
        <div style="display:flex;align-items:center;gap:8px">
          <span class="badge ${a.published?'bg':'bo'}">${a.published?'Published':'Draft'}</span>
          <div class="ems">${a.title}</div>
        </div>
        <div class="emp">${(a.content||'').slice(0,80)}...</div>
        <div class="emm">${a.channel||''} &middot; ${a.date||''}</div>
      </div>`).join(''):'<div style="font-size:11px;color:var(--t4);padding:8px 0">No announcements yet.</div>';
  }
  // Guides
  const gl=document.getElementById('mc-guides-list');
  if(gl)gl.innerHTML=(resources.guides||[]).map((g,i)=>`
    <div class="tc">
      <div style="flex:1">
        <div class="tn">${g.name}</div>
        <div class="td2">${g.desc}</div>
      </div>
      <div style="display:flex;gap:6px">
        <button class="btn btn-g btn-sm" onclick="editMCGuide(${i})">Edit</button>
        <button class="btn btn-g btn-sm" style="color:#E57373" onclick="deleteMCItem('guides',${i})">Ã—</button>
      </div>
    </div>`).join('')||'<div style="font-size:11px;color:var(--t4);padding:8px 0">No guides yet.</div>';
  // Templates
  const tl=document.getElementById('mc-templates-list');
  if(tl)tl.innerHTML=(resources.templates||[]).map((t,i)=>`
    <div class="tc">
      <div style="flex:1">
        <div class="tn">${t.name}</div>
        <div class="td2">${t.desc}</div>
      </div>
      <div style="display:flex;gap:6px">
        <button class="btn btn-g btn-sm" onclick="editMCTemplate(${i})">Edit</button>
        <button class="btn btn-g btn-sm" style="color:#E57373" onclick="deleteMCItem('templates',${i})">Ã—</button>
      </div>
    </div>`).join('')||'<div style="font-size:11px;color:var(--t4);padding:8px 0">No templates yet.</div>';
  // Event Slides
  const esl=document.getElementById('mc-eventslides-list');
  if(esl)esl.innerHTML=eventSlides.map((s,i)=>`
    <div class="tc">
      <div style="flex:1">
        <div class="tn">${s.name}</div>
        <div class="td2">${s.event} &middot; ${s.date}</div>
        <div style="font-size:10px;color:var(--grn);margin-top:2px">${s.link}</div>
      </div>
      <div style="display:flex;gap:6px">
        <button class="btn btn-g btn-sm" onclick="editEventSlide(${i})">Edit</button>
        <button class="btn btn-g btn-sm" style="color:#E57373" onclick="deleteSlide('event',${i})">Ã—</button>
      </div>
    </div>`).join('')||'<div style="font-size:11px;color:var(--t4);padding:8px 0">No event slides yet.</div>';
  // Lecture Slides
  const lsl=document.getElementById('mc-lectureslides-list');
  if(lsl)lsl.innerHTML=lectureSlides.map((s,i)=>`
    <div class="tc">
      <div style="flex:1">
        <div class="tn">${s.session} â€” ${s.topic}</div>
        <div class="td2">${s.date} &middot; ${s.desc}</div>
        <div style="font-size:10px;color:var(--grn);margin-top:2px">${s.link}</div>
      </div>
      <div style="display:flex;gap:6px">
        <button class="btn btn-g btn-sm" onclick="editLectureSlide(${i})">Edit</button>
        <button class="btn btn-g btn-sm" style="color:#E57373" onclick="deleteSlide('lecture',${i})">Ã—</button>
      </div>
    </div>`).join('')||'<div style="font-size:11px;color:var(--t4);padding:8px 0">No lecture slides yet.</div>';
}
function addMCGuide(){
  resources.guides.push({name:'New Guide',desc:'',content:''});
  saveData();renderMemberContent();editMCGuide(resources.guides.length-1);
}
function editMCGuide(i){
  const g=resources.guides[i];
  openDetail('Edit Guide',g.name,
    fld('Name',inp('mc-gname',g.name))+
    fld('Description',inp('mc-gdesc',g.desc))+
    fld('Google Docs Link (optional)',inp('mc-glink',g.link||''))+
    fld('Content (shown inline if no link)',ta('mc-gcontent',g.content,6))+
    `<button class="btn btn-p btn-sm" onclick="saveMCGuide(${i},this)">Save</button>`,g);
}
function saveMCGuide(i,btn){
  resources.guides[i]={name:g('mc-gname'),desc:g('mc-gdesc'),link:g('mc-glink'),content:g('mc-gcontent')};
  saveData();renderMemberContent();renderResources();saved(btn);
}
function addMCTemplate(){
  resources.templates.push({name:'New Template',desc:'',content:''});
  saveData();renderMemberContent();editMCTemplate(resources.templates.length-1);
}
function editMCTemplate(i){
  const t=resources.templates[i];
  openDetail('Edit Template',t.name,
    fld('Name',inp('mc-tname',t.name))+
    fld('Description',inp('mc-tdesc',t.desc))+
    fld('Google Docs Link (optional)',inp('mc-tlink',t.link||''))+
    fld('Content (shown inline if no link)',ta('mc-tcontent',t.content,6))+
    `<button class="btn btn-p btn-sm" onclick="saveMCTemplate(${i},this)">Save</button>`,t);
}
function saveMCTemplate(i,btn){
  resources.templates[i]={name:g('mc-tname'),desc:g('mc-tdesc'),link:g('mc-tlink'),content:g('mc-tcontent')};
  saveData();renderMemberContent();renderResources();saved(btn);
}
function deleteMCItem(type,i){
  if(!confirm('Delete this item?'))return;
  resources[type].splice(i,1);saveData();renderMemberContent();renderResources();
}
function addEventSlide(){
  eventSlides.push({id:eventSlides.length+1,name:'New Slide Deck',date:'',event:'',link:'',desc:''});
  saveData();renderMemberContent();renderEventSlides();editEventSlide(eventSlides.length-1);
}
function editEventSlide(i){
  const s=eventSlides[i];
  openDetail('Edit Event Slides',s.name,
    fld('Name',inp('mc-esname',s.name))+
    row2(fld('Event',inp('mc-esevent',s.event)),fld('Date',inp('mc-esdate',s.date)))+
    fld('Google Slides Link',inp('mc-eslink',s.link))+
    fld('Description',ta('mc-esdesc',s.desc,3))+
    `<button class="btn btn-p btn-sm" onclick="saveEventSlide(${i},this)">Save</button>`,s);
}
function saveEventSlide(i,btn){
  eventSlides[i]={...eventSlides[i],name:g('mc-esname'),event:g('mc-esevent'),date:g('mc-esdate'),link:g('mc-eslink'),desc:g('mc-esdesc')};
  saveData();renderMemberContent();renderEventSlides();saved(btn);
}
function addLectureSlide(){
  lectureSlides.push({id:lectureSlides.length+1,session:'Session '+(lectureSlides.length+1),topic:'',date:'',link:'',desc:''});
  saveData();renderMemberContent();renderLectureSlides();editLectureSlide(lectureSlides.length-1);
}
function editLectureSlide(i){
  const s=lectureSlides[i];
  openDetail('Edit Lecture Slides',s.session,
    row2(fld('Session Name',inp('mc-lsname',s.session)),fld('Topic',inp('mc-lstopic',s.topic)))+
    fld('Date',inp('mc-lsdate',s.date))+
    fld('Google Slides Link',inp('mc-lslink',s.link))+
    fld('Description',ta('mc-lsdesc',s.desc,3))+
    `<button class="btn btn-p btn-sm" onclick="saveLectureSlide(${i},this)">Save</button>`,s);
}
function saveLectureSlide(i,btn){
  lectureSlides[i]={...lectureSlides[i],session:g('mc-lsname'),topic:g('mc-lstopic'),date:g('mc-lsdate'),link:g('mc-lslink'),desc:g('mc-lsdesc')};
  saveData();renderMemberContent();renderLectureSlides();saved(btn);
}
function deleteSlide(type,i){
  if(!confirm('Delete this slide deck?'))return;
  if(type==='event'){eventSlides.splice(i,1);saveData();renderMemberContent();renderEventSlides();}
  else{lectureSlides.splice(i,1);saveData();renderMemberContent();renderLectureSlides();}
}
function addAnnouncement(bucket){
  announcements[bucket].push({id:nAnn++,title:'New Announcement',channel:'GroupMe',date:'',content:''});
  renderAnnouncements();openAnnouncementDetail(announcements[bucket][announcements[bucket].length-1].id,bucket);
}

// MENTORSHIP DATA
let mentorPairs=[
  {id:1,mentor:'Arya Somu',mentee:'Jordan Nguyen',checkins:2,goal:4,status:'In Progress',notes:''},
  {id:2,mentor:'George Huang',mentee:'Anna Huynh',checkins:3,goal:4,status:'In Progress',notes:''},
  {id:3,mentor:'Addy Hu',mentee:'Iker Jimenez',checkins:4,goal:4,status:'Complete',notes:''},
  {id:4,mentor:'Christina Tran',mentee:'Dianne Johnson',checkins:1,goal:4,status:'Behind',notes:'Follow up needed.'},
];let nMP=5;

function renderMentorship(){
  const t=document.getElementById('mentor-table');
  if(t)t.innerHTML=mentorPairs.map(p=>{
    const sc=p.status==='Complete'?'bg':p.status==='Behind'?'br':'bo';
    const pairKey=p.mentor+'â†’'+p.mentee;
    const fsCheckins=_mentorCheckins[pairKey]||0;
    const totalCheckins=p.checkins+fsCheckins;
    return`<tr class="cr" onclick="openMentorPairDetail(${p.id})"><td class="nm">${p.mentor}</td><td class="nm">${p.mentee}</td><td>${totalCheckins}${fsCheckins>0?` <span style="font-size:9px;color:var(--grn)">(+${fsCheckins} live)</span>`:''}</td><td>${p.goal}</td><td><span class="badge ${sc}">${p.status}</span></td></tr>`;
  }).join('');
  const ontrack=mentorPairs.filter(p=>p.status==='In Progress').length;
  const behind=mentorPairs.filter(p=>p.status==='Behind').length;
  const complete=mentorPairs.filter(p=>p.status==='Complete').length;
  const el=id=>document.getElementById(id);
  if(el('ment-total'))el('ment-total').textContent=mentorPairs.length;
  if(el('ment-ontrack'))el('ment-ontrack').textContent=ontrack;
  if(el('ment-behind'))el('ment-behind').textContent=behind;
  if(el('ment-complete'))el('ment-complete').textContent=complete;
  const totalCI=mentorPairs.reduce((s,p)=>s+p.checkins,0);
  const totalGoal=mentorPairs.reduce((s,p)=>s+p.goal,0);
  const pct=totalGoal?Math.round(totalCI/totalGoal*100):0;
  const prog=document.getElementById('mentor-progress');
  if(prog){
    const behind2=mentorPairs.filter(p=>p.status==='Behind');
    prog.innerHTML=`
      <div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:4px"><span style="color:var(--t3)">Check-ins Complete</span><span style="color:var(--t2)">${totalCI}/${totalGoal}</span></div><div class="pb"><div class="pf" style="width:${pct}%"></div></div></div>
      <div style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:4px"><span style="color:var(--t3)">Pairs On Track or Done</span><span style="color:var(--t2)">${ontrack+complete}/${mentorPairs.length}</span></div><div class="pb"><div class="pf" style="width:${Math.round((ontrack+complete)/mentorPairs.length*100)}%;background:var(--grn)"></div></div></div>
      ${behind2.length?`<div style="margin-top:14px;padding:10px;background:var(--s2);border-radius:5px"><div style="font-size:9px;color:var(--t3);letter-spacing:1px;text-transform:uppercase;margin-bottom:6px">Behind</div>${behind2.map(p=>`<div style="font-size:11px;color:#E57373;margin-bottom:4px">${p.mentor} &rarr; ${p.mentee} &mdash; ${p.checkins}/${p.goal} check-ins${p.notes?'<br><span style=\'font-size:10px;color:var(--t4)\'>'+p.notes+'</span>':''}</div>`).join('')}</div>`:'<div style="padding:10px;background:var(--s2);border-radius:5px;font-size:11px;color:var(--grn)">All pairs on track</div>'}`;
  }
}
function openMentorPairDetail(id){
  const p=mentorPairs.find(x=>x.id===id);
  openDetail(p.mentor+' â†’ '+p.mentee,'Mentor Pair',
    row2(fld('Mentor',inp('ed-mpmentor',p.mentor)),fld('Mentee',inp('ed-mpmentee',p.mentee)))+
    row2(fld('Check-ins Done',inp('ed-mpci',p.checkins,'number')),fld('Check-in Goal',inp('ed-mpgoal',p.goal,'number')))+
    fld('Status',sel('ed-mpstatus',['In Progress','Behind','Complete','Paused'],p.status))+
    fld('Notes',ta('ed-mpnotes',p.notes,4))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveMentorPair(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="mentorPairs=mentorPairs.filter(x=>x.id!==${id});renderMentorship();closeDetail()">Remove</button></div>`,p);
}
function saveMentorPair(id,btn){
  const p=mentorPairs.find(x=>x.id===id);
  p.mentor=g('ed-mpmentor');p.mentee=g('ed-mpmentee');
  p.checkins=parseInt(g('ed-mpci'))||0;p.goal=parseInt(g('ed-mpgoal'))||4;
  p.status=g('ed-mpstatus');p.notes=g('ed-mpnotes');
  renderMentorship();saved(btn);
  document.getElementById('d-title').textContent=p.mentor+' â†’ '+p.mentee;
}
function addMentorPair(){
  mentorPairs.push({id:nMP++,mentor:'',mentee:'',checkins:0,goal:4,status:'In Progress',notes:''});
  renderMentorship();openMentorPairDetail(mentorPairs[mentorPairs.length-1].id);
}

// DYNAMIC DASHBOARD
function renderDashboard(){
  // Stat cards - all live data
  const totalMem=members.length;
  const execCount=execTeam.length;
  const openTasks=[...tasks.ebod,...tasks.general].filter(t=>!t.done).length;
  const totalInc=transactions.income.reduce((s,t)=>s+t.amount,0);
  const totalExp=transactions.expense.reduce((s,t)=>s+t.amount,0);
  const bal=totalInc-totalExp;
  const avgAtt=members.length?Math.round(members.reduce((s,m)=>s+_attRate(m.att),0)/members.length):0;

  const statsEl=document.getElementById('dash-stats');
  if(statsEl)statsEl.innerHTML=`
    <div class="sc"><div class="sl">Members</div><div class="sv">${totalMem}</div><div class="sm">${execCount} on exec</div></div>
    <div class="sc"><div class="sl">Open Tasks</div><div class="sv" style="color:${openTasks>5?'#E57373':'var(--t1)'}">${openTasks}</div><div class="sm">Across all boards</div></div>
    <div class="sc"><div class="sl">Avg Attendance</div><div class="sv"><span class="sa">${avgAtt}%</span></div><div class="sm">All members</div></div>
    <div class="sc"><div class="sl">Balance</div><div class="sv" style="color:${bal>=0?'var(--gold2)':'#E57373'}">${bal>=0?'+':''}\$${bal.toLocaleString()}</div><div class="sm">\$${totalInc.toLocaleString()} in / \$${totalExp.toLocaleString()} out</div></div>`;

  // Alerts - things that need attention
  const alerts=[];
  const atRisk=members.filter(m=>_attRate(m.att)<50);
  if(atRisk.length)alerts.push({color:'#E57373',text:`${atRisk.length} member${atRisk.length>1?'s':''} below 50% attendance: ${atRisk.map(m=>m.first+' '+m.last).join(', ')}`});
  const overdueTasks=[...tasks.ebod,...tasks.general].filter(t=>!t.done&&t.due&&t.due!=='TBD');
  if(overdueTasks.length)alerts.push({color:'var(--gold2)',text:`${overdueTasks.length} open task${overdueTasks.length>1?'s':''} â€” oldest due: ${overdueTasks[0].due} (${overdueTasks[0].text})`});
  const behindGoals=goals.filter(g2=>g2.status==='Behind');
  if(behindGoals.length)alerts.push({color:'var(--gold2)',text:`${behindGoals.length} goal${behindGoals.length>1?'s':''} behind: ${behindGoals.map(g2=>g2.title).join(', ')}`});
  const behindMentors=mentorPairs.filter(p=>p.status==='Behind');
  if(behindMentors.length)alerts.push({color:'#E57373',text:`${behindMentors.length} mentor pair${behindMentors.length>1?'s':''} behind on check-ins: ${behindMentors.map(p=>p.mentor+' â†’ '+p.mentee).join(', ')}`});
  const activeConsulting=consultingProjects.filter(p=>p.status==='Active');
  const overdueDelivs=deliverables.filter(d=>d.status!=='Complete');
  if(overdueDelivs.length&&activeConsulting.length)alerts.push({color:'var(--blu)',text:`${overdueDelivs.length} consulting deliverable${overdueDelivs.length>1?'s':''} pending across ${activeConsulting.length} active project${activeConsulting.length>1?'s':''}`});
  // Sponsor renewal alerts
  const renewals=sponsorRenewalAlerts();
  if(renewals.length)alerts.push({color:'var(--gold2)',text:`Sponsor renewal${renewals.length>1?'s':''} due within 60 days: ${renewals.join(', ')}`});

  const alertsEl=document.getElementById('dash-alerts');
  const alertsWrap=document.getElementById('dash-alerts-wrap');
  if(alertsEl){
    if(!alerts.length){
      alertsWrap.style.display='none';
    } else {
      alertsWrap.style.display='block';
      alertsEl.innerHTML=alerts.map(a=>`<div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px"><div style="width:6px;height:6px;border-radius:50%;background:${a.color};margin-top:4px;flex-shrink:0"></div><div style="font-size:11.5px;color:var(--t2)">${a.text}</div></div>`).join('');
    }
  }

  // Open tasks preview
  const dashTasks=document.getElementById('dash-tasks');
  if(dashTasks){
    const open=[...tasks.ebod,...tasks.general].filter(t=>!t.done).slice(0,4);
    dashTasks.innerHTML=open.length?open.map(t=>`<div class="tr"><div class="tcb" onclick="toggleTask(${t.id},'${tasks.ebod.find(x=>x.id===t.id)?'ebod':'general'}')"></div><div style="flex:1"><div class="tt">${t.text}</div><div class="tm">Due ${t.due}</div></div><div class="to">${t.owner}</div></div>`).join(''):'<div style="font-size:11px;color:var(--t4);padding:8px 0">No open tasks.</div>';
  }

  // Upcoming events
  const dashEvts=document.getElementById('dash-events');
  if(dashEvts){
    const upcoming=eventsData.upcoming.slice(0,3);
    dashEvts.innerHTML=upcoming.length?`<div class="tl">${upcoming.map(e=>`<div class="tli"><div class="tld"></div><div class="tlt">${e.date}</div><div class="tll">${e.name}</div><div class="tln">${e.loc}</div></div>`).join('')}</div>`:'<div style="font-size:11px;color:var(--t4);padding:8px 0">No upcoming events.</div>';
  }

  // Budget snapshot
  const dashBudget=document.getElementById('dash-budget');
  if(dashBudget){
    const goal=4000;const pct=Math.min(100,Math.round(totalInc/goal*100));
    const confirmed=sponsors.filter(s=>s.amount!=='In-Kind').reduce((s,sp)=>{const n=parseFloat(sp.amount.replace(/[^0-9.]/g,''))||0;return s+n;},0);
    dashBudget.innerHTML=`
      <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:4px"><span style="color:var(--t3)">Income vs Goal</span><span style="color:var(--t2)">\$${totalInc.toLocaleString()} / \$${goal.toLocaleString()}</span></div>
      <div class="pb" style="margin-bottom:12px"><div class="pf" style="width:${pct}%;background:var(--grn)"></div></div>
      <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:4px"><span style="color:var(--t3)">Expenses</span><span style="color:#E57373">\$${totalExp.toLocaleString()}</span></div>
      <div class="pb"><div class="pf" style="width:${Math.min(100,Math.round(totalExp/goal*100))}%;background:var(--cr2)"></div></div>
      <div style="margin-top:10px;font-size:10px;color:var(--t3)">Net balance: <span style="color:${bal>=0?'var(--gold2)':'#E57373'};font-weight:600">\$${bal.toLocaleString()}</span></div>`;
  }

  // Goals preview
  const dashGoals=document.getElementById('dash-goals');
  if(dashGoals){
    dashGoals.innerHTML=goals.slice(0,3).map(g2=>{
      const pct2=Math.min(100,Math.round(g2.progress/g2.target*100));
      const bc=g2.status==='On Track'?'var(--grn)':g2.status==='Behind'?'var(--cr2)':'var(--gold2)';
      return`<div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:3px"><span style="color:var(--t2)">${g2.title}</span><span class="badge ${g2.status==='On Track'?'bg':g2.status==='Behind'?'br':'bo'}" style="font-size:8px">${g2.status}</span></div><div class="pb"><div class="pf" style="width:${pct2}%;background:${bc}"></div></div></div>`;
    }).join('');
  }

  // Recent bootcamps
  const dashBc=document.getElementById('dash-bootcamps');
  if(dashBc){
    dashBc.innerHTML=bootcamps.slice(-3).reverse().map(b=>{
      const r=Math.round(b.att/b.tot*100);
      return`<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--bd)"><div style="font-size:11px;color:var(--t1)">${b.name}: ${b.topic}</div><span class="badge ${r>=80?'bg':r>=60?'bo':'br'}">${r}%</span></div>`;
    }).join('');
  }

  // Consulting preview
  const dashCon=document.getElementById('dash-consulting');
  if(dashCon){
    const active2=consultingProjects.filter(p=>p.status==='Active');
    dashCon.innerHTML=active2.length?active2.map(p=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--bd)"><div><div style="font-size:11px;color:var(--t1)">${p.name}</div><div style="font-size:10px;color:var(--t3)">${p.client} &middot; Lead: ${p.lead}</div></div><span class="badge bo">Active</span></div>`).join(''):'<div style="font-size:11px;color:var(--t4);padding:8px 0">No active projects.</div>';
  }
}

// ADD EMAIL
let nEmail=4;
function addEmail(){
  emails.push({subj:'New Email',to:'',date:'',status:'Draft',body:''});
  renderEmailList();
  openEmailDetail(emails.length-1);
}

// SPONSOR DATA
let sponsors=[
  {id:1,abbr:'BC',name:'Bay Area Credit Union',tier:'Gold',contact:'Maria Santos',email:'maria@bacu.org',amount:'$1,000',renewalDate:'Jul 2026',lastContact:'Apr 5'},
  {id:2,abbr:'TD',name:'Tech District Co.',tier:'Silver',contact:'James Wu',email:'j.wu@techdistrict.com',amount:'$800',renewalDate:'Sep 2026',lastContact:'Apr 12'},
  {id:3,abbr:'SC',name:'SCC Foundation',tier:'Bronze',contact:'',email:'',amount:'In-Kind',renewalDate:'',lastContact:''},
];let nSp=4;
let pipeline=[
  {id:1,name:'Fidelity Investments',ask:'$1,500',stage:'Outreach Sent',next:'Follow-up May 10'},
  {id:2,name:'Valley Bank',ask:'$600',stage:'In Talks',next:'Call scheduled'},
  {id:3,name:'Local Print Co.',ask:'In-Kind',stage:'Identified',next:'Draft outreach'},
];let nPl=4;

function renderSponsors(){
  const a=document.getElementById('sponsor-active-list');
  if(a)a.innerHTML=sponsors.map(s=>`<div class="spr" style="cursor:pointer" onclick="openSponsorDetail(${s.id})"><div class="spl">${s.abbr}</div><div style="flex:1"><div class="spn">${s.name}</div><div class="spm">${s.tier} &middot; ${s.contact} &middot; ${s.email}${s.lastContact?' &middot; Last contact: '+s.lastContact:''}</div></div><div style="text-align:right"><div class="spa">${s.amount}</div>${s.renewalDate?`<div style="font-size:9px;color:var(--t3)">Renews ${s.renewalDate}</div>`:''}</div></div>`).join('');
  const p=document.getElementById('pipeline-list');
  if(p)p.innerHTML=pipeline.map(pl=>`<tr class="cr" onclick="openPipelineDetail(${pl.id})"><td class="nm">${pl.name}</td><td>${pl.ask}</td><td><span class="badge bo">${pl.stage}</span></td><td>${pl.next}</td></tr>`).join('');
}
function openSponsorDetail(id){
  const s=sponsors.find(x=>x.id===id);
  openDetail(s.name,s.tier+' Sponsor',
    row2(fld('Company Name',inp('ed-spname',s.name)),fld('Abbreviation',inp('ed-spabbr',s.abbr)))+
    row2(fld('Tier',sel('ed-sptier',['Gold','Silver','Bronze','In-Kind'],s.tier)),fld('Amount',inp('ed-spamt',s.amount)))+
    row2(fld('Contact Name',inp('ed-spcontact',s.contact)),fld('Contact Email',inp('ed-spemail',s.email)))+
    row2(fld('Renewal Date (e.g. Sep 2026)',inp('ed-sprenewal',s.renewalDate||'')),fld('Last Contact (e.g. Apr 12)',inp('ed-splastcontact',s.lastContact||'')))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveSponsor(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="sponsors=sponsors.filter(x=>x.id!==${id});renderSponsors();closeDetail()">Remove</button></div>`,s);
}
function saveSponsor(id,btn){
  const s=sponsors.find(x=>x.id===id);
  s.name=g('ed-spname');s.abbr=g('ed-spabbr');s.tier=g('ed-sptier');
  s.amount=g('ed-spamt');s.contact=g('ed-spcontact');s.email=g('ed-spemail');
  s.renewalDate=g('ed-sprenewal');s.lastContact=g('ed-splastcontact');
  renderSponsors();saved(btn);
  document.getElementById('d-title').textContent=s.name;
  document.getElementById('d-sub').textContent=s.tier+' Sponsor';
}
function openPipelineDetail(id){
  const pl=pipeline.find(x=>x.id===id);
  openDetail(pl.name,'Pipeline',
    row2(fld('Company',inp('ed-plname',pl.name)),fld('Ask Amount',inp('ed-plask',pl.ask)))+
    row2(fld('Stage',sel('ed-plstage',['Identified','Outreach Sent','In Talks','Confirmed','Passed'],pl.stage)),fld('Next Step',inp('ed-plnext',pl.next)))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="savePipeline(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="pipeline=pipeline.filter(x=>x.id!==${id});renderSponsors();closeDetail()">Remove</button></div>`,pl);
}
function savePipeline(id,btn){
  const pl=pipeline.find(x=>x.id===id);
  pl.name=g('ed-plname');pl.ask=g('ed-plask');pl.stage=g('ed-plstage');pl.next=g('ed-plnext');
  renderSponsors();saved(btn);
  document.getElementById('d-title').textContent=pl.name;
}

// INIT SPONSORS BUTTONS
function addSponsor(){
  sponsors.push({id:nSp++,abbr:'??',name:'New Sponsor',tier:'Bronze',contact:'',email:'',amount:'',renewalDate:'',lastContact:''});
  renderSponsors();openSponsorDetail(sponsors[sponsors.length-1].id);
}
function addPipelineLead(){
  pipeline.push({id:nPl++,name:'New Lead',ask:'',stage:'Identified',next:''});
  renderSponsors();openPipelineDetail(pipeline[pipeline.length-1].id);
}

// FINANCE TOOLS
let eventCosts=[];let nEC=1;
let reimbursements=[];let nReim=1;

function renderEcSelect(){
  const sel=document.getElementById('ec-select');if(!sel)return;
  const cur=sel.value;
  sel.innerHTML='<option value="">Select event...</option>'+eventCosts.map(e=>`<option value="${e.id}">${e.name}</option>`).join('');
  if(cur)sel.value=cur;
}
function newEventCost(){
  const e={id:nEC++,name:'New Event',invoice:0,sponsor:0,aid:0,members:[]};
  eventCosts.push(e);renderEcSelect();
  document.getElementById('ec-select').value=e.id;loadEventCost(e.id);
}
function loadEventCost(id){
  const empty=document.getElementById('ec-empty');
  const setup=document.getElementById('ec-setup');
  if(!id){if(empty)empty.style.display='';if(setup)setup.style.display='none';return;}
  const e=eventCosts.find(x=>x.id==id);if(!e)return;
  if(empty)empty.style.display='none';if(setup)setup.style.display='';
  document.getElementById('ec-name').value=e.name;
  document.getElementById('ec-invoice').value=e.invoice||'';
  document.getElementById('ec-sponsor').value=e.sponsor||'';
  renderEcMembers();calcEventCost();
}
function calcEventCost(){
  const id=document.getElementById('ec-select').value;
  const invoice=parseFloat(document.getElementById('ec-invoice').value)||0;
  const sponsor=parseFloat(document.getElementById('ec-sponsor').value)||0;
  const e=eventCosts.find(x=>x.id==id);
  const memberAid=e?e.members.reduce((s,m)=>s+(m.aid||0),0):0;
  const totalPaid=e?e.members.reduce((s,m)=>s+(m.paid||0),0):0;
  const net=Math.max(0,invoice-sponsor-memberAid);
  const payingMembers=e?e.members.filter(m=>!(m.aid>0)):[];
  const count=payingMembers.length||0;
  const share=count?net/count:0;
  const balance=totalPaid+sponsor-invoice;
  const sum=document.getElementById('ec-summary');
  if(sum)sum.innerHTML=[
    {l:'Invoice',v:'$'+invoice.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}),s:'Total event cost',c:''},
    {l:'Sponsor Credits',v:'-$'+sponsor.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}),s:'Applied to invoice',c:''},
    {l:'Net Cost',v:'$'+net.toFixed(2),s:'After credits & individual aid',c:''},
    {l:'Share / Member',v:'$'+share.toFixed(2),s:count+' paying Â· '+((e?e.members.length:0)-count)+' on aid',c:''},
    {l:'Total Collected',v:'$'+totalPaid.toFixed(2),s:'Sum of member payments',c:''},
    {l:'Balance',v:(balance>=0?'+ ':'')+'$'+Math.abs(balance).toFixed(2),s:balance>=0?'Surplus â€” available for aid':'Still owed',c:balance>=0?'var(--grn)':'#E57373'},
  ].map(s=>`<div class="sc"><div class="sl">${s.l}</div><div class="sv" style="font-size:16px${s.c?';color:'+s.c:''}">${s.v}</div><div class="sm">${s.s}</div></div>`).join('');
  renderEcMembers();
}
function renderEcMembers(){
  const id=document.getElementById('ec-select').value;
  const e=eventCosts.find(x=>x.id==id);
  const t=document.getElementById('ec-members-table');if(!t||!e)return;
  const invoice=parseFloat(document.getElementById('ec-invoice').value)||0;
  const sponsor=parseFloat(document.getElementById('ec-sponsor').value)||0;
  const memberAid=e.members.reduce((s,m)=>s+(m.aid||0),0);
  const net=Math.max(0,invoice-sponsor-memberAid);
  const payingCount=e.members.filter(m=>!(m.aid>0)).length;
  const baseShare=payingCount?net/payingCount:0;
  const sa=document.getElementById('ec-select-all');if(sa)sa.checked=false;
  const bar=document.getElementById('ec-bulk-bar');if(bar)bar.style.display='none';
  const inp=(val,field,i,type='text',w='100%')=>`<input type="${type}" value="${val||''}" ${type==='number'?'min="0" step="0.01"':''} onchange="ecUpdate(${i},'${field}',${type==='number'?'parseFloat(this.value)||0':'this.value'})" style="font-size:11px;background:transparent;border:none;color:var(--t1);width:${w};font-family:'IBM Plex Sans',sans-serif">`;
  t.innerHTML=e.members.map((m,i)=>{
    const onAid=m.aid>0;
    const share=onAid?0:baseShare;
    const diff=(m.paid||0)-share;
    const diffStr=onAid
      ?`<span style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:10px;background:rgba(21,88,160,.1);color:var(--blu)">Aid Covered</span>`
      :diff>=0
        ?`<span style="color:#66BB6A">+$${diff.toFixed(2)} refund</span>`
        :`<span style="color:#E57373">-$${Math.abs(diff).toFixed(2)} owes</span>`;
    return`<tr>
      <td style="width:28px;padding:4px 8px"><input type="checkbox" class="ec-chk" data-idx="${i}" onchange="ecCheckChange()" style="cursor:pointer"></td>
      <td>${inp(m.name,'name',i,'text','120px')}</td>
      <td>${inp(m.phone,'phone',i,'text','100px')}</td>
      <td>${inp(m.email,'email',i,'text','130px')}</td>
      <td>${inp(m.paid,'paid',i,'number','70px')}</td>
      <td>${inp(m.aid,'aid',i,'number','70px')}</td>
      <td style="font-size:11px;color:${onAid?'var(--blu)':'var(--t2)'}">${onAid?'â€”':'$'+share.toFixed(2)}</td>
      <td style="font-size:11px">${diffStr}</td>
      <td><button class="rb" onclick="removeEcMember(${i})">&times;</button></td>
    </tr>`;
  }).join('');
  renderEcRoster(e,baseShare,invoice,sponsor);
}
function renderEcRoster(e,baseShare,invoice,sponsor){
  const el=document.getElementById('ec-roster');if(!el)return;
  if(!e||!e.members.length){el.style.display='none';return;}
  el.style.display='';
  const paid=e.members.filter(m=>m.paid>0||m.aid>0);
  const unpaid=e.members.filter(m=>!(m.paid>0||m.aid>0));
  const memberAid=e.members.reduce((s,m)=>s+(m.aid||0),0);
  const net=Math.max(0,invoice-sponsor-memberAid);
  const payingCount=e.members.filter(m=>!(m.aid>0)).length;
  const share=payingCount?net/payingCount:0;
  function card(m,i){
    const onAid=m.aid>0;
    const diff=(m.paid||0)-(onAid?0:share);
    const badge=onAid
      ?`<span style="font-size:9px;font-weight:700;padding:2px 6px;border-radius:8px;background:rgba(21,88,160,.12);color:var(--blu)">AID</span>`
      :diff>=0
        ?`<span style="font-size:9px;font-weight:700;padding:2px 6px;border-radius:8px;background:rgba(76,175,80,.12);color:#43A047">+$${diff.toFixed(2)} REFUND</span>`
        :`<span style="font-size:9px;font-weight:700;padding:2px 6px;border-radius:8px;background:rgba(229,115,115,.12);color:#E57373">-$${Math.abs(diff).toFixed(2)} OWES</span>`;
    return`<div style="display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:6px;background:var(--s2);border:1px solid var(--brd);margin-bottom:5px">
      <div style="width:28px;height:28px;border-radius:50%;background:var(--cr);color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;flex-shrink:0">${(m.name||'?').charAt(0).toUpperCase()}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:11px;font-weight:600;color:var(--t1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${m.name||'<em style="color:var(--t4)">No name</em>'}</div>
        <div style="font-size:10px;color:var(--t3);display:flex;gap:10px;flex-wrap:wrap;margin-top:1px">
          ${m.phone?`<span>ðŸ“ž ${m.phone}</span>`:''}
          ${m.email?`<span>âœ‰ï¸ ${m.email}</span>`:''}
          ${!m.phone&&!m.email?'<span style="color:var(--t4)">No contact info</span>':''}
        </div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-size:11px;font-weight:600;color:var(--t1)">$${(m.paid||0).toFixed(2)} paid</div>
        <div style="margin-top:2px">${badge}</div>
      </div>
    </div>`;
  }
  el.innerHTML=`
    <div class="ch" style="margin-bottom:10px">
      <div class="ct">Payment Roster</div>
      <div style="display:flex;gap:6px;align-items:center">
        <span style="font-size:10px;color:var(--t3)">${e.members.length} total Â· ${paid.length} paid Â· ${unpaid.length} pending</span>
        <button class="btn btn-g btn-sm" onclick="exportRosterCSV()">Export CSV</button>
      </div>
    </div>
    ${paid.length?`<div style="font-size:10px;font-weight:700;color:var(--t3);letter-spacing:.04em;margin-bottom:6px;text-transform:uppercase">Paid / Aid (${paid.length})</div>${paid.map((m,i)=>card(m,e.members.indexOf(m))).join('')}`:''}
    ${unpaid.length?`<div style="font-size:10px;font-weight:700;color:var(--t3);letter-spacing:.04em;margin:10px 0 6px;text-transform:uppercase">Pending (${unpaid.length})</div>${unpaid.map((m,i)=>card(m,e.members.indexOf(m))).join('')}`:''}
  `;
}
function exportRosterCSV(){
  const id=document.getElementById('ec-select').value;
  const e=eventCosts.find(x=>x.id==id);if(!e)return;
  const invoice=parseFloat(document.getElementById('ec-invoice').value)||0;
  const sponsor=parseFloat(document.getElementById('ec-sponsor').value)||0;
  const memberAid=e.members.reduce((s,m)=>s+(m.aid||0),0);
  const net=Math.max(0,invoice-sponsor-memberAid);
  const payingCount=e.members.filter(m=>!(m.aid>0)).length;
  const share=payingCount?net/payingCount:0;
  const rows=[['Name','Phone','Email','Paid','Aid','Their Share','Refund/Owes']];
  e.members.forEach(m=>{
    const onAid=m.aid>0;
    const s=onAid?0:share;
    const diff=(m.paid||0)-s;
    const status=onAid?'Aid Covered':diff>=0?`+$${diff.toFixed(2)} refund`:`-$${Math.abs(diff).toFixed(2)} owes`;
    rows.push([m.name||'',m.phone||'',m.email||'',(m.paid||0).toFixed(2),(m.aid||0).toFixed(2),s.toFixed(2),status]);
  });
  const csv=rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(',')).join('\n');
  const a=document.createElement('a');a.href='data:text/csv;charset=utf-8,'+encodeURIComponent(csv);a.download=(e.name||'roster')+'.csv';a.click();
}
function ecUpdate(idx,field,val){
  const id=document.getElementById('ec-select').value;
  const e=eventCosts.find(x=>x.id==id);if(!e)return;
  e.members[idx][field]=val;calcEventCost();
}
function removeEcMember(idx){
  const id=document.getElementById('ec-select').value;
  const e=eventCosts.find(x=>x.id==id);if(!e)return;
  e.members.splice(idx,1);calcEventCost();
}
function addEcMember(){
  const id=document.getElementById('ec-select').value;
  const e=eventCosts.find(x=>x.id==id);if(!e)return;
  e.members.push({name:'',phone:'',email:'',paid:0,aid:0});calcEventCost();
}
function saveEventCost(){
  const id=document.getElementById('ec-select').value;
  const e=eventCosts.find(x=>x.id==id);if(!e)return;
  e.name=document.getElementById('ec-name').value||e.name;
  e.invoice=parseFloat(document.getElementById('ec-invoice').value)||0;
  e.sponsor=parseFloat(document.getElementById('ec-sponsor').value)||0;
  renderEcSelect();document.getElementById('ec-select').value=id;
  calcEventCost();
}

function renderReimbursements(){
  const t=document.getElementById('reim-table');if(!t)return;
  const pending=reimbursements.filter(r=>r.status==='Pending').length;
  const totalPending=reimbursements.filter(r=>r.status!=='Reimbursed').reduce((s,r)=>s+r.amount,0);
  const ss=document.getElementById('reim-summary-stats');
  if(ss)ss.innerHTML=[
    {l:'Total Requests',v:reimbursements.length,s:'All time'},
    {l:'Pending',v:pending,s:'Awaiting approval'},
    {l:'Amount Pending',v:'$'+totalPending.toFixed(2),s:'To be reimbursed'},
  ].map(s=>`<div class="sc"><div class="sl">${s.l}</div><div class="sv">${s.v}</div><div class="sm">${s.s}</div></div>`).join('');
  if(!reimbursements.length){t.innerHTML=`<tr><td colspan="7" style="font-size:11px;color:var(--t4);padding:12px">No reimbursement requests yet.</td></tr>`;return;}
  t.innerHTML=reimbursements.map(r=>{
    const sc=r.status==='Reimbursed'?'bg':r.status==='Approved'?'bo':'';
    const rcpt=r.receipt?`<a href="${r.receipt}" target="_blank" style="font-size:10px;color:var(--grn);font-weight:600">View â†—</a>`:`<span style="color:var(--t4);font-size:10px">None</span>`;
    return`<tr class="cr" onclick="openReimDetail(${r.id})">
      <td class="nm">${r.member}</td>
      <td>${r.item}</td>
      <td>$${r.amount.toFixed(2)}</td>
      <td>${r.date}</td>
      <td>${rcpt}</td>
      <td><span class="badge ${sc}">${r.status}</span></td>
      <td style="font-size:10px;color:var(--t4)">Edit</td>
    </tr>`;
  }).join('');
}
function openReimDetail(id){
  const r=reimbursements.find(x=>x.id===id);if(!r)return;
  const statuses=['Pending','Approved','Reimbursed'];
  openDetail(r.item,'$'+r.amount.toFixed(2)+' Â· '+r.member,
    fld('Member',inp('ed-reim-member',r.member))+
    row2(fld('Item / Description',inp('ed-reim-item',r.item)),fld('Amount ($)',inp('ed-reim-amount',r.amount,'number')))+
    row2(fld('Date',inp('ed-reim-date',r.date)),fld('Status',sel('ed-reim-status',statuses,r.status)))+
    fld('Receipt Link',inp('ed-reim-receipt',r.receipt||''))+
    fld('Notes',ta('ed-reim-notes',r.notes||'',3))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveReim(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="reimbursements=reimbursements.filter(x=>x.id!==${id});renderReimbursements();closeDetail()">Delete</button></div>`,r);
}
function saveReim(id,btn){
  const r=reimbursements.find(x=>x.id===id);if(!r)return;
  r.member=g('ed-reim-member');r.item=g('ed-reim-item');
  r.amount=parseFloat(g('ed-reim-amount'))||0;
  r.date=g('ed-reim-date');r.status=g('ed-reim-status');
  r.receipt=g('ed-reim-receipt');r.notes=g('ed-reim-notes');
  document.getElementById('d-title').textContent=r.item;
  document.getElementById('d-sub').textContent='$'+r.amount.toFixed(2)+' Â· '+r.member;
  renderReimbursements();saved(btn);
}
function addReimbursement(){
  reimbursements.push({id:nReim++,member:'',item:'New Request',amount:0,date:'',receipt:'',notes:'',status:'Pending'});
  renderReimbursements();openReimDetail(reimbursements[reimbursements.length-1].id);
}

// OPERATIONS PORTAL DATA
let venues=[
  {id:1,name:'MLC 105 Room 4',contact:'Facilities x1234',capacity:60,cost:'Free',status:'Pending',notes:'Has projector and whiteboard. Submit request 3 weeks out.'},
  {id:2,name:'MCC Conference Room',contact:'MCC Events Office',capacity:100,cost:'$200/day',status:'Inquired',notes:'Good for larger events. Check AV availability.'},
];let nVen=3;
let volunteerSlots=[
  {id:1,event:'DAIS 2026',role:'Check-In',assignee:'',notes:'2 people needed at entrance'},
  {id:2,event:'DAIS 2026',role:'Room Monitor',assignee:'',notes:'One per competition room'},
  {id:3,event:'DAIS 2026',role:'AV / Tech',assignee:'',notes:'Needs to know how to run projector'},
];let nVS=4;

function renderVenues(){
  const t=document.getElementById('venues-table');if(!t)return;
  if(!venues.length){t.innerHTML=`<tr><td colspan="6" style="font-size:11px;color:var(--t4);padding:12px">No venues yet.</td></tr>`;return;}
  const statusColor={Confirmed:'bg',Pending:'bo',Inquired:'bo',Unavailable:'br'};
  t.innerHTML=venues.map(v=>`<tr class="cr" onclick="openVenueDetail(${v.id})">
    <td class="nm">${v.name}</td><td>${v.contact}</td><td>${v.capacity}</td><td>${v.cost}</td>
    <td><span class="badge ${statusColor[v.status]||''}">${v.status}</span></td>
    <td style="font-size:10px;color:var(--t4)">Edit</td></tr>`).join('');
}
function openVenueDetail(id){
  const v=venues.find(x=>x.id===id);if(!v)return;
  const statuses=['Pending','Inquired','Confirmed','Unavailable'];
  openDetail(v.name,v.status+' Â· Cap: '+v.capacity,
    row2(fld('Venue Name',inp('ed-ven-name',v.name)),fld('Status',sel('ed-ven-status',statuses,v.status)))+
    row2(fld('Contact',inp('ed-ven-contact',v.contact)),fld('Capacity',inp('ed-ven-cap',v.capacity,'number')))+
    fld('Cost',inp('ed-ven-cost',v.cost))+
    fld('Notes',ta('ed-ven-notes',v.notes,4))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveVenue(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="venues=venues.filter(x=>x.id!==${id});renderVenues();closeDetail()">Delete</button></div>`,v);
}
function saveVenue(id,btn){
  const v=venues.find(x=>x.id===id);if(!v)return;
  v.name=g('ed-ven-name');v.status=g('ed-ven-status');v.contact=g('ed-ven-contact');
  v.capacity=g('ed-ven-cap');v.cost=g('ed-ven-cost');v.notes=g('ed-ven-notes');
  document.getElementById('d-title').textContent=v.name;
  document.getElementById('d-sub').textContent=v.status+' Â· Cap: '+v.capacity;
  renderVenues();saved(btn);
}
function addVenue(){
  venues.push({id:nVen++,name:'New Venue',contact:'',capacity:'',cost:'',status:'Pending',notes:''});
  renderVenues();openVenueDetail(venues[venues.length-1].id);
}

function renderVolSlots(){
  const t=document.getElementById('volslots-table');if(!t)return;
  if(!volunteerSlots.length){t.innerHTML=`<tr><td colspan="5" style="font-size:11px;color:var(--t4);padding:12px">No slots yet.</td></tr>`;return;}
  t.innerHTML=volunteerSlots.map(s=>`<tr class="cr" onclick="openVolDetail(${s.id})">
    <td>${s.event}</td><td class="nm">${s.role}</td><td>${s.assignee||'<span style="color:var(--t4)">Unassigned</span>'}</td>
    <td style="font-size:11px;color:var(--t3)">${s.notes}</td>
    <td style="font-size:10px;color:var(--t4)">Edit</td></tr>`).join('');
}
function openVolDetail(id){
  const s=volunteerSlots.find(x=>x.id===id);if(!s)return;
  openDetail(s.role,s.event,
    row2(fld('Event',inp('ed-vs-event',s.event)),fld('Role',inp('ed-vs-role',s.role)))+
    fld('Assignee',inp('ed-vs-assignee',s.assignee))+
    fld('Notes',ta('ed-vs-notes',s.notes,3))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveVolSlot(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="volunteerSlots=volunteerSlots.filter(x=>x.id!==${id});renderVolSlots();closeDetail()">Delete</button></div>`,s);
}
function saveVolSlot(id,btn){
  const s=volunteerSlots.find(x=>x.id===id);if(!s)return;
  s.event=g('ed-vs-event');s.role=g('ed-vs-role');s.assignee=g('ed-vs-assignee');s.notes=g('ed-vs-notes');
  document.getElementById('d-title').textContent=s.role;
  document.getElementById('d-sub').textContent=s.event;
  renderVolSlots();saved(btn);
}
function addVolSlot(){
  volunteerSlots.push({id:nVS++,event:'',role:'',assignee:'',notes:''});
  renderVolSlots();openVolDetail(volunteerSlots[volunteerSlots.length-1].id);
}

// STRATEGY PORTAL DATA
let compPrep=[
  {id:1,member:'',event:'Business Management',readiness:'On Track',lastPractice:'',notes:''},
];let nCP=2;
let curriculum=[
  {id:1,name:'Session 5',date:'May 21',topic:'Advanced Case Strategies',goals:'Apply 4-step framework to advanced cases',materials:'Slide deck in Drive',speaker:'Arya Somu',status:'Planned'},
  {id:2,name:'Session 6',date:'Jun 4',topic:'Final Mock Competition',goals:'Full competition simulation',materials:'Mock case packet',speaker:'All Execs',status:'Planned'},
];let nCurr=3;

function renderCompPrep(){
  const t=document.getElementById('compprep-table');if(!t)return;
  if(!compPrep.length){t.innerHTML=`<tr><td colspan="6" style="font-size:11px;color:var(--t4);padding:12px">No members tracked yet.</td></tr>`;return;}
  const rc={Ready:'bg','On Track':'bo','Needs Work':'br'};
  t.innerHTML=compPrep.map(p=>`<tr class="cr" onclick="openCompPrepDetail(${p.id})">
    <td class="nm">${p.member||'<span style="color:var(--t4)">â€”</span>'}</td>
    <td>${p.event}</td>
    <td><span class="badge ${rc[p.readiness]||'bo'}">${p.readiness}</span></td>
    <td>${p.lastPractice||'<span style="color:var(--t4)">None</span>'}</td>
    <td style="font-size:11px;color:var(--t3);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.notes}</td>
    <td style="font-size:10px;color:var(--t4)">Edit</td></tr>`).join('');
}
function openCompPrepDetail(id){
  const p=compPrep.find(x=>x.id===id);if(!p)return;
  const readyOpts=['On Track','Ready','Needs Work'];
  openDetail(p.member||'Member',p.event,
    row2(fld('Member Name',inp('ed-cp-member',p.member)),fld('Competition Event',inp('ed-cp-event',p.event)))+
    row2(fld('Readiness',sel('ed-cp-ready',readyOpts,p.readiness)),fld('Last Practice',inp('ed-cp-date',p.lastPractice)))+
    fld('Notes',ta('ed-cp-notes',p.notes,4))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveCompPrep(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="compPrep=compPrep.filter(x=>x.id!==${id});renderCompPrep();closeDetail()">Delete</button></div>`,p);
}
function saveCompPrep(id,btn){
  const p=compPrep.find(x=>x.id===id);if(!p)return;
  p.member=g('ed-cp-member');p.event=g('ed-cp-event');p.readiness=g('ed-cp-ready');p.lastPractice=g('ed-cp-date');p.notes=g('ed-cp-notes');
  document.getElementById('d-title').textContent=p.member||'Member';
  document.getElementById('d-sub').textContent=p.event;
  renderCompPrep();saved(btn);
}
function addCompPrep(){
  compPrep.push({id:nCP++,member:'',event:'',readiness:'On Track',lastPractice:'',notes:''});
  renderCompPrep();openCompPrepDetail(compPrep[compPrep.length-1].id);
}

function renderCurriculum(){
  const t=document.getElementById('curriculum-table');if(!t)return;
  if(!curriculum.length){t.innerHTML=`<tr><td colspan="6" style="font-size:11px;color:var(--t4);padding:12px">No sessions planned yet.</td></tr>`;return;}
  const sc={Planned:'bo',Complete:'bg',Cancelled:'br'};
  t.innerHTML=curriculum.map(s=>`<tr class="cr" onclick="openCurrDetail(${s.id})">
    <td class="nm">${s.name}</td><td>${s.date}</td><td>${s.topic}</td><td>${s.speaker}</td>
    <td><span class="badge ${sc[s.status]||'bo'}">${s.status}</span></td>
    <td style="font-size:10px;color:var(--t4)">Edit</td></tr>`).join('');
}
function openCurrDetail(id){
  const s=curriculum.find(x=>x.id===id);if(!s)return;
  const statuses=['Planned','Complete','Cancelled'];
  openDetail(s.name,s.topic,
    row2(fld('Session Name',inp('ed-cur-name',s.name)),fld('Date',inp('ed-cur-date',s.date)))+
    row2(fld('Topic',inp('ed-cur-topic',s.topic)),fld('Speaker / Lead',inp('ed-cur-speaker',s.speaker)))+
    fld('Goals',ta('ed-cur-goals',s.goals,3))+
    fld('Materials / Links',ta('ed-cur-materials',s.materials,3))+
    fld('Status',sel('ed-cur-status',statuses,s.status))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveCurr(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="curriculum=curriculum.filter(x=>x.id!==${id});renderCurriculum();closeDetail()">Delete</button></div>`,s);
}
function saveCurr(id,btn){
  const s=curriculum.find(x=>x.id===id);if(!s)return;
  s.name=g('ed-cur-name');s.date=g('ed-cur-date');s.topic=g('ed-cur-topic');s.speaker=g('ed-cur-speaker');
  s.goals=g('ed-cur-goals');s.materials=g('ed-cur-materials');s.status=g('ed-cur-status');
  document.getElementById('d-title').textContent=s.name;
  document.getElementById('d-sub').textContent=s.topic;
  renderCurriculum();saved(btn);
}
function addCurrSession(){
  curriculum.push({id:nCurr++,name:'New Session',date:'',topic:'',goals:'',materials:'',speaker:'',status:'Planned'});
  renderCurriculum();openCurrDetail(curriculum[curriculum.length-1].id);
}

// MARKETING PORTAL DATA
let brandKit={
  colors:[
    {id:1,name:'Maroon',hex:'#790000',usage:'Primary brand color â€” logo, headers, CTAs, buttons'},
    {id:2,name:'Orange-Red',hex:'#FA4E1D',usage:'Secondary accent â€” tertiary color for posters & flyers'},
    {id:3,name:'Orange',hex:'#FF983A',usage:'Tertiary accent â€” supporting elements, infographics'},
    {id:4,name:'Light Gray',hex:'#C4C4C4',usage:'Supporting neutral â€” dividers, secondary backgrounds'},
    {id:5,name:'Off White',hex:'#F9F8F6',usage:'Page & publication backgrounds'},
  ],
  fonts:[
    {id:1,name:'Georgia Pro',role:'Headlines & Subheadings (Serif)',source:'System font â€” bold for headlines, regular for subheadings'},
    {id:2,name:'Open Sauce',role:'Body / UI (Sans-serif)',source:'Google Fonts â€” bold for headings, regular for body text'},
    {id:3,name:'Times New Roman',role:'Body text â€” Newsletters',source:'System font â€” classic serif for text-heavy publications'},
  ],
  handles:{instagram:'@deanzapbl',groupme:'De Anza PBL',email:'deanzapbl@gmail.com',linkedin:'Phi Beta Lambda â€” De Anza College'},
  guidelines:`PHI BETA LAMBDA BRAND GUIDELINES v1.3 â€” May 2025
Authored by: Javin Ku, Nhi Tran, Addy Hu (President & Directors of Media)

â•â•â• LOGOMARK â•â•â•
The PBL logomark is the Greek letter Phi (Î¦) in a clean, solid design.
â€¢ Never alter, distort, stretch, or rotate the logomark
â€¢ Never add patterns, shadows, glows, or outlines
â€¢ Never place inside a solid shape or box/frame
â€¢ Never use a faded/screened version on any background
â€¢ Always reproduce from approved official artwork only

COLOR USAGE BY BACKGROUND:
â€¢ White background â†’ use Maroon + Black, Black only, or Maroon only
â€¢ Very light background â†’ use Black for maximum clarity
â€¢ Dark/Black background â†’ use White only (never Maroon on dark)
â€¢ Maroon background â†’ use White only
â€¢ Medium-value background â†’ use Black or White (best contrast) â€” never Maroon

â•â•â• URSA MINOR BEAR â•â•â•
Official secondary symbol of PBL. Embodies: Inclusion, Integrity, Curiosity, Courage, Collaboration.
Connected to the Ursa Minor constellation (home of the North Star / Polaris), reflecting PBL's mission to guide students toward professional success. Polaris Research Group resides within Phi Beta Lambda (Ursa Minor).
Use in maroon on white, or white on maroon. Never alter proportions.

â•â•â• PUBLICATIONS â•â•â•
Typography: Georgia Pro / Open Sauce for headlines & subheadings. Open Sauce / Times New Roman for body.
Headlines: bold, clearly defined, consistent hierarchy with generous line spacing.
Color: Maroon and white are the primary palette. Avoid pale/pastel colors.
Format: Vertical format standard. High-quality non-absorbent paper for print.
Logomark: Required on every publication â€” front, back, or last page.
Illustration: Simple, professional, compositionally strong. Avoid clutter.

INSTAGRAM â€” Limit to 2 fonts per cover. Include logomark + PBL identification. Bold headlines + minimal graphic noise.
POSTERS/FLYERS â€” 2 fonts max. Always include logomark. QR codes acceptable. Orange tertiary color allowed when it enhances design.
LINKEDIN â€” Bold, uncluttered banner. Maroon background with white Î¦ logo. Tagline: "Cultivating Industry Professionals at De Anza College." Posts emphasize text â€” professional, uplifting tone for external audiences.
NEWSLETTER â€” Bold masthead. 1 typeface. Prominent logomark. Use Mailchimp. Bold headlines, bullet points, embedded hyperlinks.

â•â•â• STATIONERY / EMAIL â•â•â•
Subject line prefixes (ALL CAPS): IM NEWSLETTER â€“ WEEK # | URGENT | REMINDER
Opening: "Hello IMs, Make sure you read through this newsletter thoroughly."
Body: flush-left, paragraphs separated by line spacing (no indents), flush-left alignment.
Tone: professional, respectful, approachable â€” no slang, proper grammar/punctuation.
Closing: "In Regards, [Name], [Position], De Anza Phi Beta Lambda Chapter" + Î¦PBL signature art.

â•â•â• CERTIFICATES & AWARDS â•â•â•
Required elements: Certificate title, recipient full name, award statement, event/reason, date, Advisor + Officer signatures, official Î¦ logomark centered.
Templates may not be altered without prior approval.`,
};let nBKC=6;let nBKF=4;
let contentPosts=[
  {id:1,date:'May 14',platform:'Instagram',type:'Event Promo',caption:'Spring General Meeting tonight at 6pm in MLC 105! Come through ðŸŽ‰',status:'Draft'},
  {id:2,date:'May 20',platform:'GroupMe',type:'Announcement',caption:'SBLC results are up â€” check the website for placements!',status:'Sent'},
];let nPost=3;

function switchBrandKitTab(kit){
  document.getElementById('bk-pbl').style.display=kit==='pbl'?'':'none';
  document.getElementById('bk-polaris').style.display=kit==='polaris'?'':'none';
  const btnPbl=document.getElementById('bk-tab-pbl');
  const btnPol=document.getElementById('bk-tab-polaris');
  if(btnPbl){btnPbl.className=kit==='pbl'?'btn btn-p btn-sm':'btn btn-g btn-sm';btnPbl.style.cssText='font-size:11px'+(kit==='pbl'?'':';background:transparent;color:var(--t3);border-color:var(--bd)');}
  if(btnPol){btnPol.style.cssText='font-size:11px;background:'+(kit==='polaris'?'#011c43':'transparent')+';color:'+(kit==='polaris'?'#fff':'var(--t3)')+';border-color:'+(kit==='polaris'?'#011c43':'var(--bd)');}
}
// â”€â”€ BRAND KIT INLINE EDITING â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const _bkSections=['pbl-logo','pbl-bear','pbl-pub','pbl-stat','pol-about','pol-color','pol-typo','pol-vt','pol-drivers'];
function toggleBKEdit(contentId,saveKey,btnId){
  const el=document.getElementById(contentId);
  const btn=document.getElementById(btnId);
  if(!el||!btn)return;
  const editing=el.contentEditable==='true';
  if(editing){
    // Save
    el.contentEditable='false';
    el.style.outline='';
    el.style.borderRadius='';
    el.style.minHeight='';
    localStorage.setItem('pbl_bke_'+saveKey,el.innerHTML);
    btn.textContent='âœŽ Edit';
    btn.className='btn btn-g btn-sm';
  } else {
    // Enter edit mode
    el.contentEditable='true';
    el.style.outline='2px dashed var(--blu)';
    el.style.borderRadius='4px';
    el.style.minHeight='40px';
    el.focus();
    btn.textContent='âœ“ Save';
    btn.className='btn btn-p btn-sm';
  }
}
function loadBKEdits(){
  _bkSections.forEach(key=>{
    const stored=localStorage.getItem('pbl_bke_'+key);
    const el=document.getElementById('bk-'+key+'-content');
    if(stored&&el)el.innerHTML=stored;
  });
}
function resetBKSection(saveKey,contentId){
  localStorage.removeItem('pbl_bke_'+saveKey);
  location.reload();
}
function renderBrandKit(){
  const cc=document.getElementById('brand-colors');
  if(cc)cc.innerHTML=brandKit.colors.map(c=>`
    <div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid var(--bd)" onclick="openColorDetail(${c.id})" style="cursor:pointer">
      <div style="width:28px;height:28px;border-radius:5px;background:${c.hex};flex-shrink:0;border:1px solid var(--bd);cursor:pointer"></div>
      <div style="flex:1"><div style="font-size:11px;font-weight:600;color:var(--t1)">${c.name}</div><div style="font-size:10px;color:var(--t3)">${c.hex} &middot; ${c.usage}</div></div>
      <span style="font-size:9px;color:var(--t4)">Edit</span>
    </div>`).join('');
  const fc=document.getElementById('brand-fonts');
  if(fc)fc.innerHTML=brandKit.fonts.map(f=>`
    <div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid var(--bd);cursor:pointer" onclick="openFontDetail(${f.id})">
      <div style="flex:1"><div style="font-size:13px;font-weight:600;color:var(--t1);font-family:'${f.name}',sans-serif">${f.name}</div><div style="font-size:10px;color:var(--t3)">${f.role} &middot; ${f.source}</div></div>
      <span style="font-size:9px;color:var(--t4)">Edit</span>
    </div>`).join('');
  const hc=document.getElementById('brand-handles');
  if(hc)hc.innerHTML=`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:4px">
      ${[['Instagram','instagram'],['GroupMe','groupme'],['Email','email'],['LinkedIn','linkedin']].map(([label,key])=>`
        <div><div style="font-size:10px;color:var(--t3);margin-bottom:3px">${label}</div>
        <input value="${brandKit.handles[key]||''}" onchange="brandKit.handles['${key}']=this.value" style="width:100%;box-sizing:border-box;font-size:11px;padding:5px 8px;background:var(--s2);border:1px solid var(--brd);border-radius:4px;color:var(--t1)"></div>`).join('')}
    </div>`;
  const bn=document.getElementById('brand-notes');
  if(bn)bn.value=brandKit.guidelines;
}
function saveBrandNotes(btn){brandKit.guidelines=document.getElementById('brand-notes').value;saved(btn);}
function openColorDetail(id){
  const c=brandKit.colors.find(x=>x.id===id);if(!c)return;
  openDetail(c.name,c.hex,
    row2(fld('Color Name',inp('ed-col-name',c.name)),fld('Hex Code',inp('ed-col-hex',c.hex)))+
    fld('Usage / Notes',inp('ed-col-usage',c.usage))+
    `<div style="display:flex;gap:7px;margin-top:8px"><button class="btn btn-p btn-sm" onclick="saveColor(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="brandKit.colors=brandKit.colors.filter(x=>x.id!==${id});renderBrandKit();closeDetail()">Delete</button></div>`,c);
}
function saveColor(id,btn){
  const c=brandKit.colors.find(x=>x.id===id);if(!c)return;
  c.name=g('ed-col-name');c.hex=g('ed-col-hex');c.usage=g('ed-col-usage');
  document.getElementById('d-title').textContent=c.name;
  document.getElementById('d-sub').textContent=c.hex;
  renderBrandKit();saved(btn);
}
function addBrandColor(){
  brandKit.colors.push({id:nBKC++,name:'New Color',hex:'#000000',usage:''});
  renderBrandKit();openColorDetail(brandKit.colors[brandKit.colors.length-1].id);
}
function openFontDetail(id){
  const f=brandKit.fonts.find(x=>x.id===id);if(!f)return;
  openDetail(f.name,f.role,
    row2(fld('Font Name',inp('ed-fnt-name',f.name)),fld('Role',inp('ed-fnt-role',f.role)))+
    fld('Source / Link',inp('ed-fnt-source',f.source))+
    `<div style="display:flex;gap:7px;margin-top:8px"><button class="btn btn-p btn-sm" onclick="saveFont(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="brandKit.fonts=brandKit.fonts.filter(x=>x.id!==${id});renderBrandKit();closeDetail()">Delete</button></div>`,f);
}
function saveFont(id,btn){
  const f=brandKit.fonts.find(x=>x.id===id);if(!f)return;
  f.name=g('ed-fnt-name');f.role=g('ed-fnt-role');f.source=g('ed-fnt-source');
  document.getElementById('d-title').textContent=f.name;
  renderBrandKit();saved(btn);
}
function addBrandFont(){
  brandKit.fonts.push({id:nBKF++,name:'New Font',role:'',source:''});
  renderBrandKit();openFontDetail(brandKit.fonts[brandKit.fonts.length-1].id);
}

function renderContentCalendar(){
  const t=document.getElementById('content-table');if(!t)return;
  if(!contentPosts.length){t.innerHTML=`<tr><td colspan="6" style="font-size:11px;color:var(--t4);padding:12px">No posts yet.</td></tr>`;return;}
  const sc={Draft:'bo',Scheduled:'bo',Sent:'bg',Cancelled:'br'};
  t.innerHTML=contentPosts.map(p=>`<tr class="cr" onclick="openPostDetail(${p.id})">
    <td>${p.date}</td><td>${p.platform}</td><td>${p.type}</td>
    <td style="font-size:11px;color:var(--t3);max-width:200px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${p.caption}</td>
    <td><span class="badge ${sc[p.status]||'bo'}">${p.status}</span></td>
    <td style="font-size:10px;color:var(--t4)">Edit</td></tr>`).join('');
}
function openPostDetail(id){
  const p=contentPosts.find(x=>x.id===id);if(!p)return;
  const platforms=['Instagram','GroupMe','Email','LinkedIn','Twitter/X','Facebook'];
  const types=['Event Promo','Announcement','Recap','Recruitment','General'];
  const statuses=['Draft','Scheduled','Sent','Cancelled'];
  openDetail(p.type,p.platform+' Â· '+p.date,
    row2(fld('Date',inp('ed-post-date',p.date)),fld('Platform',sel('ed-post-platform',platforms,p.platform)))+
    row2(fld('Type',sel('ed-post-type',types,p.type)),fld('Status',sel('ed-post-status',statuses,p.status)))+
    fld('Caption / Copy',ta('ed-post-caption',p.caption,5))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="savePost(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="contentPosts=contentPosts.filter(x=>x.id!==${id});renderContentCalendar();closeDetail()">Delete</button></div>`,p);
}
function savePost(id,btn){
  const p=contentPosts.find(x=>x.id===id);if(!p)return;
  p.date=g('ed-post-date');p.platform=g('ed-post-platform');p.type=g('ed-post-type');
  p.status=g('ed-post-status');p.caption=g('ed-post-caption');
  document.getElementById('d-title').textContent=p.type;
  document.getElementById('d-sub').textContent=p.platform+' Â· '+p.date;
  renderContentCalendar();saved(btn);
}
function addContentPost(){
  contentPosts.push({id:nPost++,date:'',platform:'Instagram',type:'General',caption:'',status:'Draft'});
  renderContentCalendar();openPostDetail(contentPosts[contentPosts.length-1].id);
}

// CLUB AFFAIRS PORTAL DATA
let memberCheckIns=[];let nMCI=1;

function renderCaMentors(){
  const t=document.getElementById('ca-mentor-table');if(!t)return;
  const sc={Complete:'bg','In Progress':'bo',Behind:'br'};
  if(!mentorPairs.length){t.innerHTML=`<tr><td colspan="5" style="font-size:11px;color:var(--t4);padding:12px">No pairs yet. Add them in the Mentorship page.</td></tr>`;return;}
  t.innerHTML=mentorPairs.map(p=>`<tr>
    <td class="nm">${p.mentor}</td><td>${p.mentee}</td>
    <td>${p.checkins}/${p.goal}</td>
    <td><div style="background:var(--s2);border-radius:20px;height:6px;width:80px;overflow:hidden"><div style="background:var(--grn);height:100%;width:${Math.min(100,Math.round(p.checkins/p.goal*100))}%"></div></div></td>
    <td><span class="badge ${sc[p.status]||'bo'}">${p.status}</span></td></tr>`).join('');
  const ss=document.getElementById('ca-mentor-stats');
  if(ss){
    const total=mentorPairs.length,behind=mentorPairs.filter(p=>p.status==='Behind').length,done=mentorPairs.filter(p=>p.status==='Complete').length;
    ss.innerHTML=[
      {l:'Total Pairs',v:total,s:'Active this semester'},
      {l:'On Track',v:total-behind-done,s:'In progress'},
      {l:'Complete',v:done,s:'Finished check-ins'},
      {l:'Behind',v:behind,s:'Need follow-up'},
    ].map(s=>`<div class="sc"><div class="sl">${s.l}</div><div class="sv">${s.v}</div><div class="sm">${s.s}</div></div>`).join('');
  }
}
function renderMemberCheckIns(){
  const t=document.getElementById('checkins-table');if(!t)return;
  if(!memberCheckIns.length){t.innerHTML=`<tr><td colspan="7" style="font-size:11px;color:var(--t4);padding:12px">No check-ins logged yet.</td></tr>`;return;}
  const tc={'Concern':'br','Praise':'bg','Note':'bo'};
  const sc={Open:'bo',Resolved:'bg'};
  t.innerHTML=memberCheckIns.map(c=>`<tr class="cr" onclick="openCheckInDetail(${c.id})">
    <td class="nm">${c.member}</td>
    <td><span class="badge ${tc[c.type]||''}">${c.type}</span></td>
    <td style="font-size:11px;color:var(--t3);max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${c.note}</td>
    <td>${c.date}</td>
    <td style="font-size:11px;color:var(--t3)">${c.followup}</td>
    <td><span class="badge ${sc[c.status]||'bo'}">${c.status}</span></td>
    <td style="font-size:10px;color:var(--t4)">Edit</td></tr>`).join('');
}
function openCheckInDetail(id){
  const c=memberCheckIns.find(x=>x.id===id);if(!c)return;
  openDetail(c.member,c.type+' Â· '+c.date,
    row2(fld('Member',inp('ed-ci-member',c.member)),fld('Type',sel('ed-ci-type',['Concern','Praise','Note'],c.type)))+
    fld('Note',ta('ed-ci-note',c.note,3))+
    row2(fld('Date',inp('ed-ci-date',c.date)),fld('Status',sel('ed-ci-status',['Open','Resolved'],c.status)))+
    fld('Follow-up Action',inp('ed-ci-followup',c.followup))+
    `<div style="display:flex;gap:7px"><button class="btn btn-p btn-sm" onclick="saveCheckIn(${id},this)">Save</button><button class="btn btn-g btn-sm" style="color:#E57373" onclick="memberCheckIns=memberCheckIns.filter(x=>x.id!==${id});renderMemberCheckIns();closeDetail()">Delete</button></div>`,c);
}
function saveCheckIn(id,btn){
  const c=memberCheckIns.find(x=>x.id===id);if(!c)return;
  c.member=g('ed-ci-member');c.type=g('ed-ci-type');c.note=g('ed-ci-note');
  c.date=g('ed-ci-date');c.status=g('ed-ci-status');c.followup=g('ed-ci-followup');
  document.getElementById('d-title').textContent=c.member;
  document.getElementById('d-sub').textContent=c.type+' Â· '+c.date;
  renderMemberCheckIns();saved(btn);
}
function addMemberCheckIn(){
  memberCheckIns.push({id:nMCI++,member:'',type:'Note',note:'',date:'',followup:'',status:'Open'});
  renderMemberCheckIns();openCheckInDetail(memberCheckIns[memberCheckIns.length-1].id);
}
