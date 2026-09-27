import React, { useState } from 'react'

const people = [
  { initials: 'AS', name: 'Anil Sharma', designation: 'Lieutenant Colonel', location: 'Leh, Ladakh', unit: 'Northern Sector · Alpha', role: 'Operations', score: 78, status: 'High', trend: '↑ 12%', color: '#e76f51' },
  { initials: 'RK', name: 'Ravi Kumar', designation: 'Major', location: 'Tawang, Arunachal Pradesh', unit: 'Eastern Sector · Bravo', role: 'Logistics', score: 64, status: 'Moderate', trend: '↑ 6%', color: '#f2a93b' },
  { initials: 'PM', name: 'Priya Menon', designation: 'Captain', location: 'Pune, Maharashtra', unit: 'Western Sector · Charlie', role: 'Medical Support', score: 42, status: 'Low', trend: '↓ 8%', color: '#35a77b' },
  { initials: 'VK', name: 'Vikram K.', designation: 'Lieutenant', location: 'Srinagar, Jammu & Kashmir', unit: 'Northern Sector · Delta', role: 'Communications', score: 71, status: 'Moderate', trend: '↑ 3%', color: '#f2a93b' },
  { initials: 'NS', name: 'Neha Singh', designation: 'Subedar Major', location: 'Jaisalmer, Rajasthan', unit: 'Southern Sector · Echo', role: 'Administration', score: 36, status: 'Low', trend: '↑ 2%', color: '#5b9bd5' },
  { initials: 'AR', name: 'Arjun Rao', designation: 'Major', location: 'Lucknow, Uttar Pradesh', unit: 'Eastern Sector · Foxtrot', role: 'Field Support', score: 83, status: 'High', trend: '↑ 15%', color: '#c95d70' },
  { initials: 'SD', name: 'Sonia Das', designation: 'Captain', location: 'Guwahati, Assam', unit: 'Western Sector · Golf', role: 'Training & Readiness', score: 58, status: 'Moderate', trend: '↓ 4%', color: '#8a78c7' },
  { initials: 'MS', name: 'Manoj Shah', designation: 'Havildar', location: 'Dehradun, Uttarakhand', unit: 'Northern Sector · Alpha', role: 'Engineering', score: 47, status: 'Moderate', trend: '↑ 1%', color: '#48a6a6' },
  { initials: 'KT', name: 'Kavita Thomas', designation: 'Naib Subedar', location: 'Chennai, Tamil Nadu', unit: 'Southern Sector · Hotel', role: 'Medical Support', score: 29, status: 'Low', trend: '↓ 6%', color: '#6eaa70' },
  { initials: 'RD', name: 'Rahul Desai', designation: 'Lieutenant Colonel', location: 'Ambala, Haryana', unit: 'Eastern Sector · Bravo', role: 'Transport', score: 76, status: 'High', trend: '↑ 9%', color: '#d9824b' },
]

const riskItems = [
  { label: 'Elevated risk', value: '18', detail: '+4 this week', tone: 'red', icon: '!' },
  { label: 'Needs attention', value: '42', detail: '-8 this week', tone: 'amber', icon: '◒' },
  { label: 'Stable / low risk', value: '276', detail: '+12 this week', tone: 'green', icon: '✓' },
]

function WorkspaceView({ active, people, setSelectedPerson, setRiskFilter, riskFilter, exportReport, notify, setShowCheckIn }) {
  const descriptions = {
    Personnel: 'Review personnel wellbeing profiles and privacy-restricted risk indicators.',
    'Wellness insights': 'Explore aggregated trends, contributing factors, and early warning signals.',
    Interventions: 'Coordinate confidential welfare support and track recommended actions.',
    Reports: 'Generate secure, welfare-focused reports for authorized decision makers.',
  }

  if (active === 'Personnel') return <>
    <div className="card"><div className="panel-head"><div><h2 className="panel-title">Personnel directory</h2><div className="sub" style={{marginTop:6}}>{descriptions[active]}</div></div><div className="table-tools"><select className="period" value={riskFilter} onChange={e => setRiskFilter(e.target.value)}><option>All</option><option>High</option><option>Moderate</option><option>Low</option></select></div></div><table className="table"><thead><tr><th>PERSONNEL</th><th>DESIGNATION / LOCATION</th><th>UNIT / ROLE</th><th>RISK SCORE</th><th>CHANGE</th></tr></thead><tbody>{(riskFilter === 'All' ? people : people.filter(p => p.status === riskFilter)).map(p => <tr key={p.name} onClick={() => setSelectedPerson(p)} style={{cursor:'pointer'}}><td><div className="person"><div className="mini-avatar" style={{background:p.color}}>{p.initials}</div><div>{p.name}<small>{p.role}</small></div></div></td><td style={{color:'#71818c'}}><div>{p.designation}</div><small style={{display:'block',marginTop:3,color:'#98a4a9'}}>{p.location}</small></td><td style={{color:'#71818c'}}>{p.unit}<small style={{display:'block',marginTop:3,color:'#98a4a9'}}>{p.role}</small></td><td><span className={`score ${p.status === 'High' ? 'red' : p.status === 'Moderate' ? 'amber' : 'green'}`}>{p.score}</span> <span className={`status risk-${p.status.toLowerCase()}`}>{p.status}</span></td><td className="trend">{p.trend}</td></tr>)}</tbody></table></div>
  </>

  if (active === 'Wellness insights') return <>
    <div className="cards">{riskItems.map(item => <div className="card risk-card" key={item.label}><div className={`risk-icon ${item.tone}`}>{item.icon}</div><div><div className="card-label">{item.label}</div><div className="card-value">{item.value}</div><div className="detail">{item.detail}</div></div></div>)}</div>
    <div className="grid"><section className="card"><div className="panel-head"><h2 className="panel-title">Aggregated wellness signals</h2><span className="period">Last 30 days</span></div><div className="insight" style={{marginTop:0}}>✦ <strong>Key signal:</strong> Stress indicators are highest in the Northern Sector, where extended deployment cycles and irregular schedules are currently concentrated.</div><div className="detail-modal" style={{marginTop:20}}><div className="detail-row"><span>Check-in participation</span><b>68%</b></div><div className="detail-row"><span>Average workload trend</span><b>+11%</b></div><div className="detail-row"><span>Recommended review</span><b>Alpha unit schedule</b></div></div></section><section className="card"><h2 className="panel-title">Privacy-preserving analysis</h2><p className="sub" style={{lineHeight:1.7}}>Insights are aggregated wherever possible. Individual responses are never used for disciplinary decisions and access is limited to authorized welfare personnel.</p><button className="btn primary" onClick={() => setShowCheckIn(true)}>Complete voluntary check-in</button></section></div>
  </>

  if (active === 'Interventions') return <>
    <div className="card"><div className="panel-head"><div><h2 className="panel-title">Intervention queue</h2><div className="sub" style={{marginTop:6}}>{descriptions[active]}</div></div><span className="period">3 open actions</span></div><div className="queue"><div className="queue-item"><div className="queue-icon">♡</div><div className="queue-text"><b>Peer support follow-up</b><br/>3 personnel requested a confidential conversation.</div><button className="link" onClick={() => notify('Follow-up marked for welfare review.')}>Review</button><span className="queue-time">2h ago</span></div><div className="queue-item"><div className="queue-icon">◷</div><div className="queue-text"><b>Schedule review suggested</b><br/>Alpha unit shows sustained fatigue indicators.</div><button className="link" onClick={() => notify('Schedule review assigned to the welfare team.')}>Assign</button><span className="queue-time">Yesterday</span></div><div className="queue-item"><div className="queue-icon">✦</div><div className="queue-text"><b>Wellness resource shared</b><br/>Guided recovery resources sent to 12 personnel.</div><button className="link" onClick={() => notify('Resource follow-up completed.')}>Complete</button><span className="queue-time">2d ago</span></div></div></div>
  </>

  return <>
    <div className="card"><div className="panel-head"><div><h2 className="panel-title">Secure reports</h2><div className="sub" style={{marginTop:6}}>{descriptions[active]}</div></div><button className="btn primary" onClick={exportReport}>Export CSV ↗</button></div><div className="detail-modal"><div className="detail-row"><span>Personnel wellbeing summary</span><b>Updated today</b></div><div className="detail-row"><span>Aggregated risk trends</span><b>Last 6 months</b></div><div className="detail-row"><span>Access classification</span><b>Authorized welfare staff</b></div></div></div>
  </>
}

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = e => {
    e.preventDefault()
    if (username.trim() === 'welfare.officer' && password === 'welfare123') {
      onLogin({ name: 'Welfare Officer', initials: 'WO' })
    } else {
      setError('Invalid credentials. Use the demo credentials shown below.')
    }
  }

  return (
    <div style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'linear-gradient(135deg,#eef8f6,#f7fafb)',padding:20,fontFamily:"'DM Sans',sans-serif",color:'#172b3a'}}>
      <div style={{width:'min(420px,100%)',background:'#fff',border:'1px solid #e7edf0',borderRadius:16,padding:32,boxShadow:'0 18px 50px #173e5218'}}>
        <div style={{display:'flex',alignItems:'center',gap:11,marginBottom:28,fontFamily:'Manrope,sans-serif',fontWeight:800,fontSize:18}}><div style={{width:34,height:34,borderRadius:10,background:'#dff2ef',color:'#16726e',display:'grid',placeItems:'center',fontSize:19}}>✦</div><span>Wellbeing<span style={{color:'#197b76'}}>OS</span></span></div>
        <h1 style={{fontFamily:'Manrope,sans-serif',fontSize:25,margin:'0 0 8px'}}>Sign in securely</h1>
        <p style={{color:'#71818c',fontSize:13,lineHeight:1.6,margin:'0 0 24px'}}>Access is restricted to authorized welfare personnel. Your session is protected and access is logged.</p>
        <form onSubmit={submit}>
          <label style={{display:'block',fontSize:12,fontWeight:600,color:'#52636c',marginBottom:7}}>USERNAME</label>
          <input value={username} onChange={e => {setUsername(e.target.value);setError('')}} placeholder="Enter your username" autoComplete="username" style={{width:'100%',padding:'12px 13px',border:'1px solid #dbe5e7',borderRadius:7,marginBottom:16,font: 'inherit',fontSize:13}} />
          <label style={{display:'block',fontSize:12,fontWeight:600,color:'#52636c',marginBottom:7}}>PASSWORD</label>
          <input type="password" value={password} onChange={e => {setPassword(e.target.value);setError('')}} placeholder="Enter your password" autoComplete="current-password" style={{width:'100%',padding:'12px 13px',border:'1px solid #dbe5e7',borderRadius:7,marginBottom:10,font: 'inherit',fontSize:13}} />
          {error && <div role="alert" style={{color:'#c45145',background:'#fff0ed',border:'1px solid #f5d4cf',borderRadius:7,padding:'10px 12px',fontSize:12,margin:'4px 0 16px'}}>{error}</div>}
          <button type="submit" style={{width:'100%',border:0,borderRadius:7,padding:12,background:'#176d70',color:'#fff',fontWeight:700,cursor:'pointer',font: 'inherit',fontSize:13}}>Sign in</button>
        </form>
        <div style={{marginTop:20,padding:12,background:'#eef8f6',borderRadius:7,color:'#366d6d',fontSize:11,lineHeight:1.6}}><b>Demo access</b><br/>Username: welfare.officer<br/>Password: welfare123</div>
      </div>
    </div>
  )
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({ name: 'Welfare Officer', initials: 'WO' })
  const [active, setActive] = useState('Overview')
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [riskFilter, setRiskFilter] = useState('All')
  const [checkInValue, setCheckInValue] = useState(5)
  const [toast, setToast] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const notify = message => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  const exportReport = () => {
    const rows = [['Personnel', 'Designation', 'Location', 'Unit', 'Role', 'Risk score', 'Status', 'Change'], ...people.map(p => [p.name, p.designation, p.location, p.unit, p.role, p.score, p.status, p.trend])]
    const csv = rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\\n')
    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
    link.download = 'personnel-wellbeing-report.csv'
    link.click()
    URL.revokeObjectURL(link.href)
    notify('Report exported securely as a CSV file.')
  }

  const visiblePeople = riskFilter === 'All' ? people : people.filter(person => person.status === riskFilter)

  const nav = [
    ['Overview', '⌂'], ['Personnel', '♙'], ['Wellness insights', '◌'], ['Interventions', '♡'], ['Reports', '▤']
  ]

  const navigateTo = section => {
    setActive(section)
    setSelectedPerson(null)
    setShowCheckIn(false)
    setSubmitted(false)
  }

  if (!loggedIn) return <LoginScreen onLogin={user => { setCurrentUser(user); setLoggedIn(true) }} />

  return (
    <div className="app-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@700;800&display=swap');
        :root { --ink:#172b3a; --muted:#71818c; --line:#e7edf0; --blue:#206b71; --pale:#f5f9f9; }
        * { box-sizing:border-box; } body { margin:0; background:#f7fafb; color:var(--ink); font-family:'DM Sans',sans-serif; }
        button { font:inherit; cursor:pointer; } .app-shell { min-height:100vh; display:flex; }
        .sidebar { width:244px; background:#fff; border-right:1px solid var(--line); padding:29px 16px; display:flex; flex-direction:column; flex-shrink:0; transition:width .2s ease, padding .2s ease; overflow:hidden; }
        .sidebar.closed { width:0; padding-left:0; padding-right:0; border-right:0; }
        .brand { display:flex; align-items:center; gap:11px; padding:0 13px 38px; font-family:Manrope,sans-serif; font-size:17px; font-weight:800; letter-spacing:-.5px; white-space:nowrap; }
        .brand-mark { width:31px; height:31px; border-radius:10px; background:#dff2ef; color:#16726e; display:grid; place-items:center; font-size:19px; }
        .section-label { color:#a1adb3; font-size:10px; font-weight:700; letter-spacing:1.4px; text-transform:uppercase; padding:0 14px 11px; }
        .nav { display:flex; flex-direction:column; gap:5px; } .nav button { border:0; background:transparent; color:#70808b; text-align:left; padding:12px 14px; border-radius:9px; display:flex; gap:13px; align-items:center; font-size:13px; }
        .nav button.active { color:#17666b; background:#e8f5f3; font-weight:600; } .nav-icon { width:18px; font-size:18px; text-align:center; }
        .sidebar-footer { margin-top:auto; border-top:1px solid var(--line); padding:20px 12px 0; color:#788790; font-size:12px; line-height:1.6; }
        .privacy { display:flex; gap:8px; align-items:center; color:#24766d; font-weight:600; margin-bottom:7px; } .lock { background:#e6f5f1; border-radius:50%; padding:3px 6px; }
        .main { flex:1; min-width:0; } .topbar { height:78px; background:#fff; border-bottom:1px solid var(--line); display:flex; align-items:center; justify-content:space-between; padding:0 43px; }
        .sidebar-toggle { border:1px solid var(--line); background:#fff; color:#42616a; width:34px; height:34px; border-radius:7px; display:grid; place-items:center; font-size:18px; line-height:1; margin-right:12px; }
        .topbar-left { display:flex; align-items:center; min-width:0; }
        .breadcrumb { color:#96a2a8; font-size:12px; } .breadcrumb b { color:#52636c; font-weight:500; } .user { display:flex; align-items:center; gap:12px; font-size:12px; } .avatar { width:34px; height:34px; display:grid; place-items:center; border-radius:50%; background:#173e52; color:#fff; font-weight:700; font-size:11px; }
        .content { max-width:1390px; margin:auto; padding:34px 43px 55px; } .heading { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:29px; } h1 { font-family:Manrope,sans-serif; font-size:28px; margin:0 0 7px; letter-spacing:-1px; } .sub { color:var(--muted); font-size:13px; } .actions { display:flex; gap:10px; }
        .btn { border:1px solid #dbe5e7; background:white; color:#36535d; border-radius:7px; padding:10px 14px; font-size:12px; font-weight:600; } .btn.primary { background:#176d70; color:#fff; border-color:#176d70; padding:11px 17px; box-shadow:0 4px 8px #176d7025; }
        .notice { background:#eef8f6; border:1px solid #d6eeea; border-radius:8px; padding:13px 17px; display:flex; align-items:center; gap:11px; color:#366d6d; font-size:12px; margin-bottom:25px; } .notice b { color:#1d6666; } .info { margin-left:auto; color:#4d8884; font-size:17px; }
        .cards { display:grid; grid-template-columns:repeat(3,1fr); gap:15px; margin-bottom:25px; } .card { background:#fff; border:1px solid var(--line); border-radius:10px; padding:19px 21px; box-shadow:0 2px 5px #183b4910; } .risk-card { display:flex; align-items:center; gap:15px; } .risk-icon { width:38px;height:38px; border-radius:50%; display:grid; place-items:center; font-weight:800; font-size:18px; } .red { color:#d65f4d; background:#fff0ed; } .amber { color:#c88917; background:#fff6dc; } .green { color:#278b68; background:#e5f6ef; } .card-label { color:#75858d; font-size:12px; margin-bottom:5px; } .card-value { font-family:Manrope,sans-serif; font-size:24px; } .detail { font-size:11px; color:#7b8a91; margin-top:3px; }
        .grid { display:grid; grid-template-columns:1.42fr 1fr; gap:18px; margin-bottom:18px; } .panel-title { font-family:Manrope,sans-serif; font-size:14px; margin:0; } .panel-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:22px; } .period { border:1px solid var(--line); padding:6px 9px; border-radius:5px; color:#788991; font-size:11px; }
        .chart-legend { display:flex; gap:15px; color:#829098; font-size:11px; } .dot { width:7px; height:7px; display:inline-block; border-radius:50%; margin-right:5px; } .chart { height:188px; position:relative; padding:5px 8px 22px 29px; } .y-label { position:absolute; left:0; color:#a2adb1; font-size:10px; } .y1{top:3px}.y2{top:49px}.y3{top:95px}.y4{top:141px}.gridline { position:absolute; left:30px; right:4px; border-top:1px dashed #e3eaeb; }.g1{top:9px}.g2{top:55px}.g3{top:101px}.g4{top:147px}.chart svg { width:100%; height:158px; overflow:visible; } .months { display:flex; justify-content:space-around; color:#99a7ac; font-size:10px; padding-left:28px; }
        .insight { background:#fffaf0; border:1px solid #f6e9c5; border-radius:7px; padding:12px 13px; font-size:11px; color:#826c39; line-height:1.5; margin-top:17px; } .insight strong { color:#735b22; }
        .table { width:100%; border-collapse:collapse; font-size:11px; } .table th { color:#9aa5a9; font-weight:500; text-align:left; padding:0 0 11px; border-bottom:1px solid var(--line); } .table td { padding:13px 0; border-bottom:1px solid #edf1f2; vertical-align:middle; } .person { display:flex; gap:9px; align-items:center; font-weight:600; color:#304650; } .person small { display:block; color:#98a4a9; font-weight:400; margin-top:3px; } .mini-avatar { width:28px;height:28px; border-radius:50%; display:grid; place-items:center; color:#fff; font-size:9px; font-weight:700; background:#628995; } .score { display:inline-block; min-width:30px; text-align:center; border-radius:12px; padding:5px 7px; font-size:10px; font-weight:700; } .status { font-size:10px; font-weight:600; } .risk-high{color:#d55d4e}.risk-moderate{color:#bd841e}.risk-low{color:#31906d} .trend { color:#d26b59; margin-left:6px; font-size:10px; }
        .queue { display:flex; flex-direction:column; gap:13px; } .queue-item { display:flex; align-items:flex-start; gap:11px; padding-bottom:13px; border-bottom:1px solid #edf1f2; } .queue-icon { width:27px;height:27px; border-radius:7px; background:#edf5f5; color:#317a7a; display:grid;place-items:center; font-size:14px; } .queue-text { font-size:11px; color:#52656d; line-height:1.45; flex:1; } .queue-text b { color:#2d444e; } .queue-time { color:#a0aaae; font-size:10px; white-space:nowrap; } .link { color:#1a7776; font-size:11px; font-weight:600; background:none; border:0; padding:0; }
        .checkin { background:linear-gradient(120deg,#155d66,#287d79); color:#fff; display:flex; align-items:center; justify-content:space-between; padding:20px 22px; border:0; } .checkin h3 { margin:0 0 5px; font-family:Manrope,sans-serif; font-size:14px; } .checkin p { margin:0; color:#c8e4e1; font-size:11px; } .checkin .btn { color:#1c676d; border:0; margin-left:15px; } .modal-backdrop { position:fixed; inset:0; background:#102d3545; display:grid; place-items:center; z-index:5; } .modal { background:#fff; border-radius:12px; width:min(440px,calc(100% - 30px)); padding:25px; box-shadow:0 20px 60px #12323b40; } .modal h2 { margin:0 0 7px; font-family:Manrope,sans-serif; font-size:20px; } .modal p { color:#71818c; font-size:12px; line-height:1.5; } .range { width:100%; accent-color:#19716f; margin:18px 0; } .modal-actions { display:flex; justify-content:flex-end; gap:9px; }
        .table-tools { display:flex; align-items:center; gap:12px; } .table-tools select { background:#fff; cursor:pointer; } .toast { position:fixed; right:24px; bottom:24px; z-index:10; background:#173e52; color:#fff; padding:13px 17px; border-radius:8px; box-shadow:0 8px 24px #173e5240; font-size:12px; } .detail-modal { display:grid; gap:12px; } .detail-row { display:flex; justify-content:space-between; border-bottom:1px solid var(--line); padding-bottom:9px; color:#71818c; font-size:12px; } .detail-row b { color:var(--ink); } 
        @media(max-width:900px){ .sidebar{width:220px;padding:22px 12px}.brand{padding:0 9px 35px}.nav button{padding:12px 14px}.topbar{padding:0 22px}.content{padding:26px 22px}.cards{grid-template-columns:1fr}.grid{grid-template-columns:1fr} } @media(max-width:590px){.sidebar{width:190px;padding:18px 9px}.brand{padding-bottom:28px}.nav button{font-size:12px;gap:9px}.sidebar-footer{font-size:11px}.heading{display:block}.actions{margin-top:18px}.topbar{height:65px}.breadcrumb{display:none}.user{margin-left:auto}.table th:nth-child(2),.table td:nth-child(2){display:none}.card{padding:16px}.content{padding:22px 15px}.notice{align-items:flex-start}.notice .info{display:none}}
      `}</style>
      <aside className={`sidebar ${sidebarOpen ? '' : 'closed'}`} aria-hidden={!sidebarOpen}>
        <div className="brand"><div className="brand-mark">✦</div><span>Wellbeing<span style={{color:'#197b76'}}>OS</span></span></div>
        <div className="section-label">Workspace</div>
        <nav className="nav" aria-label="Main navigation">{nav.map(([label, icon]) => <button key={label} type="button" aria-current={active === label ? 'page' : undefined} title={`Open ${label}`} className={active === label ? 'active' : ''} onClick={() => navigateTo(label)}><span className="nav-icon" aria-hidden="true">{icon}</span><span>{label}</span></button>)}</nav>
        <div className="sidebar-footer"><div className="privacy"><span className="lock">⌑</span> Privacy protected</div>Data is encrypted and access is logged. Built for welfare, not discipline.</div>
      </aside>
      <main className="main">
        <header className="topbar"><div className="topbar-left"><button className="sidebar-toggle" type="button" onClick={() => setSidebarOpen(open => !open)} aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'} aria-expanded={sidebarOpen}>{sidebarOpen ? '‹' : '☰'}</button><div className="breadcrumb">Workspace / <b>{active}</b></div></div><div className="user"><span>{currentUser.name}</span><div className="avatar">{currentUser.initials}</div><button className="link" onClick={() => { setLoggedIn(false); setActive('Overview'); setSelectedPerson(null); setToast('') }}>Log out</button></div></header>
        <div className="content">
          <div className="heading"><div><h1>{active === 'Overview' ? 'Good morning, Avinash' : active}</h1><div className="sub">{active === 'Overview' ? 'Here’s a privacy-preserving view of personnel wellbeing across your units.' : 'A secure, welfare-focused workspace for authorized personnel.'}</div></div><div className="actions"><button className="btn" onClick={exportReport}>Export report ↗</button><button className="btn primary" onClick={() => setShowCheckIn(true)}>＋ Send check-in</button></div></div>
          {active === 'Overview' ? <>
          <div className="notice"><span style={{fontSize:17}}>◉</span><span><b>Privacy mode is active.</b> Individual data is only visible to authorized welfare personnel. All insights are aggregated where possible.</span><span className="info">ⓘ</span></div>
          <div className="cards">{riskItems.map(item => <div className="card risk-card" key={item.label}><div className={`risk-icon ${item.tone}`}>{item.icon}</div><div><div className="card-label">{item.label}</div><div className="card-value">{item.value}</div><div className="detail">{item.detail}</div></div></div>)}</div>
          <div className="grid"><section className="card"><div className="panel-head"><h2 className="panel-title">Wellbeing trend</h2><div className="chart-legend"><span><i className="dot" style={{background:'#e2a034'}}></i>Stress indicators</span><span><i className="dot" style={{background:'#3b9786'}}></i>Check-ins</span><span className="period">Last 6 months⌄</span></div></div><div className="chart"><span className="y-label y1">100</span><span className="y-label y2">75</span><span className="y-label y3">50</span><span className="y-label y4">25</span><i className="gridline g1"></i><i className="gridline g2"></i><i className="gridline g3"></i><i className="gridline g4"></i><svg viewBox="0 0 600 160" preserveAspectRatio="none"><path d="M0 104 C45 102 55 82 100 89 S150 97 200 76 S250 80 300 60 S355 76 400 48 S450 61 500 38 S555 50 600 27" fill="none" stroke="#e0a03c" strokeWidth="3"/><path d="M0 126 C55 120 70 108 110 115 S160 116 205 102 S260 112 305 91 S360 102 405 82 S465 93 510 68 S560 77 600 57" fill="none" stroke="#3b9786" strokeWidth="3"/><circle cx="600" cy="27" r="4" fill="#e0a03c"/><circle cx="600" cy="57" r="4" fill="#3b9786"/></svg></div><div className="months"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span></div><div className="insight">✦ <strong>Trend insight:</strong> Stress indicators have risen 9% over the last 30 days, correlating with extended deployment cycles in the Northern Sector.</div></section>
          <section className="card"><div className="panel-head"><h2 className="panel-title">Intervention queue</h2><button className="link" onClick={() => { navigateTo('Interventions'); notify('Showing the intervention workspace.') }}>View all →</button></div><div className="queue"><div className="queue-item"><div className="queue-icon">♡</div><div className="queue-text"><b>Peer support follow-up</b><br/>3 personnel requested a confidential conversation.</div><button className="link" onClick={() => notify('Follow-up marked for welfare review.')}>Review</button><span className="queue-time">2h ago</span></div><div className="queue-item"><div className="queue-icon">◷</div><div className="queue-text"><b>Schedule review suggested</b><br/>Alpha unit shows sustained fatigue indicators.</div><span className="queue-time">Yesterday</span></div><div className="queue-item"><div className="queue-icon">✦</div><div className="queue-text"><b>Wellness resource shared</b><br/>Guided recovery resources sent to 12 personnel.</div><span className="queue-time">2d ago</span></div></div></section></div>
          <div className="grid"><section className="card"><div className="panel-head"><h2 className="panel-title">People needing attention</h2><div className="table-tools"><select className="period" value={riskFilter} onChange={e => setRiskFilter(e.target.value)}><option>All</option><option>High</option><option>Moderate</option><option>Low</option></select><button className="link" onClick={() => navigateTo('Personnel')}>See personnel view →</button></div></div><table className="table"><thead><tr><th>PERSONNEL</th><th>DESIGNATION / LOCATION</th><th>UNIT / ROLE</th><th>RISK SCORE</th><th>CHANGE</th></tr></thead><tbody>{visiblePeople.map(p => <tr key={p.name} onClick={() => setSelectedPerson(p)} style={{cursor:'pointer'}} title="Open personnel welfare details"><td><div className="person"><div className="mini-avatar" style={{background:p.color}}>{p.initials}</div><div>{p.name}<small>{p.role}</small></div></div></td><td style={{color:'#71818c'}}><div>{p.designation}</div><small style={{display:'block',marginTop:3,color:'#98a4a9'}}>{p.location}</small></td><td style={{color:'#71818c'}}>{p.unit}<small style={{display:'block',marginTop:3,color:'#98a4a9'}}>{p.role}</small></td><td><span className={`score ${p.status === 'High' ? 'red' : p.status === 'Moderate' ? 'amber' : 'green'}`}>{p.score}</span> <span className={`status risk-${p.status.toLowerCase()}`}>{p.status}</span></td><td className="trend">{p.trend}</td></tr>)}</tbody></table></section><section className="card checkin"><div><h3>How are you feeling today?</h3><p>A quick, confidential check-in helps us support you better.</p></div><button className="btn" onClick={() => setShowCheckIn(true)}>Take check-in</button></section></div>
          </>
          : <WorkspaceView active={active} people={people} setSelectedPerson={setSelectedPerson} setRiskFilter={setRiskFilter} riskFilter={riskFilter} exportReport={exportReport} notify={notify} setShowCheckIn={setShowCheckIn} />}
        </div>
      </main>
      {selectedPerson && <div className="modal-backdrop" onClick={() => setSelectedPerson(null)}><div className="modal" onClick={e => e.stopPropagation()}><h2>{selectedPerson.name}</h2><p>Privacy-preserving welfare profile. This view is restricted to authorized welfare personnel.</p><div className="detail-modal"><div className="detail-row"><span>Designation</span><b>{selectedPerson.designation}</b></div><div className="detail-row"><span>Location</span><b>{selectedPerson.location}</b></div><div className="detail-row"><span>Unit</span><b>{selectedPerson.unit}</b></div><div className="detail-row"><span>Role</span><b>{selectedPerson.role}</b></div><div className="detail-row"><span>Current risk</span><b className={`risk-${selectedPerson.status.toLowerCase()}`}>{selectedPerson.status} · {selectedPerson.score}/100</b></div><div className="detail-row"><span>Recent change</span><b>{selectedPerson.trend}</b></div></div><div className="modal-actions"><button className="btn" onClick={() => setSelectedPerson(null)}>Close</button><button className="btn primary" onClick={() => { setSelectedPerson(null); notify(`Welfare follow-up queued for ${selectedPerson.name}.`) }}>Create follow-up</button></div></div></div>}
      {showCheckIn && <div className="modal-backdrop" onClick={() => setShowCheckIn(false)}><div className="modal" onClick={e => e.stopPropagation()}>{submitted ? <><h2>Thank you for checking in.</h2><p>Your response is confidential and will only be used to connect you with appropriate wellbeing support.</p><div className="modal-actions"><button className="btn primary" onClick={() => {setSubmitted(false);setShowCheckIn(false)}}>Done</button></div></> : <><h2>Confidential wellbeing check-in</h2><p>How would you describe your current stress level? Your response is voluntary and will not affect your service evaluation.</p><input className="range" type="range" min="1" max="10" value={checkInValue} onChange={e => setCheckInValue(e.target.value)} /><div style={{textAlign:'center',fontWeight:700,color:'#176d70',fontSize:18}}>{checkInValue}<span style={{fontSize:11,fontWeight:400,color:'#71818c'}}> / 10</span></div><div style={{display:'flex',justifyContent:'space-between',color:'#9aa6aa',fontSize:11}}><span>Feeling well</span><span>Need support</span></div><div className="modal-actions"><button className="btn" onClick={() => setShowCheckIn(false)}>Cancel</button><button className="btn primary" onClick={() => { setSubmitted(true); notify('Your confidential check-in was submitted.') }}>Submit securely</button></div></>}</div></div>}
      {toast && <div className="toast" role="status">✓ {toast}</div>}
    </div>
  )
}

export default App
