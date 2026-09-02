/* ── Data tree ── */

  const EXAM_KEYS = [
    'IOQM','NSEP','INPHO','NSEC','INCHO','ZIO','ZCO','INOI',
    'JEEMAINS','JEEADV','NEET','GAOKAO','ZHONGKAO','SAT','SSAT','ACT',
    'IMOINTL','IOIINTL','IPHOINTL','ICHOINTL','PUTNAM','SIMON'
  ];
  const SESSION_YEARS = [2021,2022,2023,2024,2025,2026,2027];
  const sessionLinks = {};
  EXAM_KEYS.forEach(k => {
    SESSION_YEARS.forEach(y => { sessionLinks[k+'_'+y]={pdf:'',image:''}; });
  });

  /* Custom year ranges for PRMO, RMO, INMO */
  const PRMO_YEARS = [2012,2013,2014,2015,2016,2017,2018,2019];
  const RMO_INMO_YEARS = Array.from({length:2026-2000+1},(_,i)=>2000+i);
  ['PRMO'].forEach(k => { PRMO_YEARS.forEach(y => { sessionLinks[k+'_'+y]={pdf:'',image:''}; }); });
  ['RMO','INMO'].forEach(k => { RMO_INMO_YEARS.forEach(y => { sessionLinks[k+'_'+y]={pdf:'',image:''}; }); });

  function yearsCustom(examKey, yearList){
    return yearList.map(y => sessionYearNode(examKey, y));
  }
  function sessionsFolderCustom(examKey, label, yearList){
    return {name:label+' Sessions', type:'folder', children:yearsCustom(examKey, yearList)};
  }

  function sessionYearNode(examKey, year){
    return {
      name:String(year), type:'folder',
      children:[{
        name:'Types of Notes', type:'folder',
        children:[{
          name:'Official Exam Assessment Content Notes', type:'folder',
          children:[{name:"Official Problems' Analysis", type:'blank', linksYear:examKey+'_'+year}]
        }]
      }]
    };
  }
  function years(examKey){ return SESSION_YEARS.map(y => sessionYearNode(examKey,y)); }
  function sessionsFolder(examKey, label){
    return {name:label+' Sessions', type:'folder', children:years(examKey)};
  }
  function genericOlympiadChildren(examKey, indiaNode){
    return [
      {name:'International Stage', type:'folder', children:[sessionsFolder(examKey,'International Stage')]},
      {name:'Previous Stage', type:'folder', children:[{
        name:'Nation Lists', type:'folder',
        children:[{name:'U.S.',type:'blank'}, indiaNode, {name:'China',type:'blank'}]
      }]}
    ];
  }

  const imoNode = {
    name:'International Mathematical Olympiad', type:'folder',
    children:[
      {name:'International Stage', type:'folder', children:[sessionsFolder('IMOINTL','International Stage')]},
      {name:'Previous Stages', type:'folder', children:[{
        name:"Nation's Track", type:'folder',
        children:[{
          name:'Nation Lists', type:'folder',
          children:[
            {name:'India', type:'folder', children:[
              {name:'I.O.Q.M.', fullForm:'Indian Olympiad Qualifier in Mathematics', type:'folder', children:[sessionsFolder('IOQM','I.O.Q.M.')]},
              {name:'P.R.M.O.', fullForm:'Pre-Regional Mathematical Olympiad', type:'folder', children:[sessionsFolderCustom('PRMO','P.R.M.O.',PRMO_YEARS)]},
              {name:'R.M.O.', fullForm:'Regional Mathematical Olympiad', type:'folder', children:[sessionsFolderCustom('RMO','R.M.O.',RMO_INMO_YEARS)]},
              {name:'I.N.M.O.', fullForm:'Indian National Mathematical Olympiad', type:'folder', children:[sessionsFolderCustom('INMO','I.N.M.O.',RMO_INMO_YEARS)]}
            ]},
            {name:'U.S.', type:'folder', children:[
              {name:'American Math Contest 8', type:'blank'},
              {name:'American Math Contest 10', type:'blank'},
              {name:'American Math Contest 12', type:'blank'}
            ]},
            {name:'China', type:'blank'}
          ]
        }]
      }]}
    ]
  };

  const informaticsIndiaNode = {name:'India', type:'folder', children:[
    {name:'Z.I.O.', fullForm:'Zonal Informatics Olympiad', type:'folder', children:[sessionsFolder('ZIO','Z.I.O.')]},
    {name:'Z.C.O.', fullForm:'Zonal Computing Olympiad', type:'folder', children:[sessionsFolder('ZCO','Z.C.O.')]},
    {name:'I.N.O.I.', fullForm:'Indian National Olympiad in Informatics', type:'folder', children:[sessionsFolder('INOI','I.N.O.I.')]}
  ]};

  const physicsIndiaNode = {name:'India', type:'folder', children:[
    {name:'N.S.E.P.', fullForm:'National Standard Examination in Physics', type:'folder', children:[sessionsFolder('NSEP','N.S.E.P.')]},
    {name:'I.N.Ph.O.', fullForm:'Indian National Physics Olympiad', type:'folder', children:[sessionsFolder('INPHO','I.N.Ph.O.')]}
  ]};

  const chemistryIndiaNode = {name:'India', type:'folder', children:[
    {name:'N.S.E.C.', fullForm:'National Standard Examination in Chemistry', type:'folder', children:[sessionsFolder('NSEC','N.S.E.C.')]},
    {name:'I.N.Ch.O.', fullForm:'Indian National Chemistry Olympiad', type:'folder', children:[sessionsFolder('INCHO','I.N.Ch.O.')]}
  ]};

  const academicCompetitions = {
    name:'Academic Competitions', type:'folder',
    children:[
      imoNode,
      {name:'International Olympiad in Informatics', type:'folder', children:genericOlympiadChildren('IOIINTL', informaticsIndiaNode)},
      {name:'International Physics Olympiad', type:'folder', children:genericOlympiadChildren('IPHOINTL', physicsIndiaNode)},
      {name:'International Chemistry Olympiad', type:'folder', children:genericOlympiadChildren('ICHOINTL', chemistryIndiaNode)},
      {name:'William Lowell Putnam Mathematical Competition', type:'folder', children:[sessionsFolder('PUTNAM','William Lowell Putnam Mathematical Competition')]},
      {name:'Simon Marais Mathematics Competition', type:'folder', children:[sessionsFolder('SIMON','Simon Marais Mathematics Competition')]},
      {name:'Stanford Math Tournament', type:'folder', children:[]},
      {name:'Harvard-MIT Mathematics Tournament', type:'folder', children:[]},
      {name:'Princeton University Mathematics', type:'folder', children:[]},
      {name:'Duke Math Meet', type:'folder', children:[]},
      {name:'North American Mathematics Olympiad', type:'folder', children:[]},
      {name:'Carnegie Mellon Informatics and Mathematics Competition', type:'folder', children:[]}
    ]
  };

  const academicEntranceTests = {
    name:'Academic Entrance Tests', type:'folder',
    children:[
      {name:'J.E.E. Exams', fullForm:'Joint Entrance Examinations', type:'folder', children:[
        {name:'J.E.E. Mains', type:'folder', children:[sessionsFolder('JEEMAINS','J.E.E. Mains')]},
        {name:'J.E.E. Advanced', type:'folder', children:[sessionsFolder('JEEADV','J.E.E. Advanced')]}
      ]},
      {name:'N.E.E.T.', fullForm:'National Eligibility cum Entrance Test', type:'blank'},
      {name:'Gaokao', type:'folder', children:[sessionsFolder('GAOKAO','GAOKAO')]},
      {name:'Zhongkao', type:'folder', children:[sessionsFolder('ZHONGKAO','ZHONGKAO')]},
      {name:'SAT', type:'folder', children:[sessionsFolder('SAT','SAT')]},
      {name:'SSAT', type:'folder', children:[sessionsFolder('SSAT','SSAT')]},
      {name:'ACT', type:'folder', children:[sessionsFolder('ACT','ACT')]}
    ]
  };

  const academicSubjects = {
    name:'Academic Subjects', type:'folder',
    children:[{
      name:'Lists', type:'folder',
      children:[{
        name:'[1]', type:'folder',
        children:[{
          name:'Broad Subjects', type:'folder',
          children:[
            {name:'Mathematics', type:'blank'},
            {name:'C.S.', fullForm:'Computer Science', type:'blank'},
            {name:'Physics', type:'blank'},
            {name:'Chemistry', type:'blank'},
            {name:'Biology', type:'blank'}
          ]
        }]
      }]
    }]
  };

  const notesNode = {
    name:'Notes', type:'folder',
    children:[academicCompetitions, academicEntranceTests, academicSubjects, {name:'Academia', type:'blank'}]
  };

  const aboutMeNode = {name:'About The Project', type:'blank'};

  /* Root has no "Home" label shown — children go straight in */
  const root = {name:'Home', type:'folder', children:[aboutMeNode, notesNode]};
