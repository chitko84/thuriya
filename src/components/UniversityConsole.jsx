import { useState, useRef, useEffect } from 'react';
import { GraduationCap, AlertTriangle, Check, Sparkles, Terminal, Activity, Zap } from 'lucide-react';
import BrandLogo from './BrandLogo';

// Mapping of department to its specific mock comparator data
const DEPT_COMPARATOR_DATA = {
  cs: [
    {
      track: 'Data Engineering',
      competency: 62,
      demand: 88,
      desc: 'High demand for data pipelines; students need more training on real-time data.'
    },
    {
      track: 'Distributed Systems',
      competency: 78,
      demand: 82,
      desc: 'Reasonable balance on concurrency concepts; minor gaps in low-level network libraries.'
    },
    {
      track: 'Full-Stack Apps',
      competency: 48,
      demand: 94,
      desc: 'High recruiter demand for modern frameworks; coursework relies on legacy scripts.'
    }
  ],
  ds: [
    {
      track: 'ML Pipelines',
      competency: 55,
      demand: 90,
      desc: 'Students are strong in AI modeling; weak in pipeline deployment and automation.'
    },
    {
      track: 'Data Ingestion',
      competency: 82,
      demand: 75,
      desc: 'Excellent SQL foundation; minor gaps in real-time streaming tools like Kafka.'
    },
    {
      track: 'Statistical Math',
      competency: 90,
      demand: 85,
      desc: 'Solid theoretical math; needs more hands-on training with large data tools.'
    }
  ],
  se: [
    {
      track: 'Cloud Design',
      competency: 68,
      demand: 85,
      desc: 'Good cloud hosting coverage; minor gaps in serverless architecture.'
    },
    {
      track: 'Enterprise APIs',
      competency: 80,
      demand: 82,
      desc: 'Strong API practices; needs modern GraphQL implementations.'
    },
    {
      track: 'CI/CD Pipelines',
      competency: 40,
      demand: 92,
      desc: 'Curriculum lacks hands-on automated deployment and testing.'
    }
  ]
};

// Mock Warnings Data
const DEPT_WARNINGS = {
  cs: [
    {
      id: 'w-1',
      severity: 'CRITICAL GAP',
      warning: '85% of active tech roles require server-side caching components.',
      reco: 'Update CS-302 course to teach caching and edge networks.',
      status: 'pending'
    },
    {
      id: 'w-2',
      severity: 'MODERATE GAP',
      warning: 'Recruiters report candidates need more real-time messaging skills (Kafka).',
      reco: 'Introduce data streaming in Data Science course DS-204.',
      status: 'pending'
    }
  ],
  ds: [
    {
      id: 'w-1',
      severity: 'CRITICAL GAP',
      warning: '92% of Machine Learning jobs require Docker orchestration knowledge.',
      reco: 'Add container labs to Advanced Analytics course DS-402.',
      status: 'pending'
    },
    {
      id: 'w-2',
      severity: 'MODERATE GAP',
      warning: 'Data teams demand experience with Snowflake or Databricks lakehouses.',
      reco: 'Include cloud database projects in Data Science course DS-208.',
      status: 'pending'
    }
  ],
  se: [
    {
      id: 'w-1',
      severity: 'CRITICAL GAP',
      warning: '88% of enterprise engineering teams use automated CI/CD pipelines.',
      reco: 'Add automation projects to SE-304 Software Lifecycle.',
      status: 'pending'
    },
    {
      id: 'w-2',
      severity: 'MODERATE GAP',
      warning: 'Companies seek candidates with microservices orchestration using Kubernetes.',
      reco: 'Introduce container systems in SE-310.',
      status: 'pending'
    }
  ]
};

const DEPT_LABELS = {
  cs: 'Computer Science Dept',
  ds: 'Data Science Dept',
  se: 'Software Eng. Dept'
};

const COHORT_SIZES = {
  '2026': '1,240',
  '2027': '1,480',
  '2028': '1,650'
};

// Sandbox upgrades lookup per department
const SANDBOX_UPGRADES_BY_DEPT = {
  cs: [
    { id: 'kafka', label: 'Kafka Streaming', target: 'Data Engineering', desc: 'Introduces real-time stream ingestion coursework.' },
    { id: 'docker', label: 'Docker Containers', target: 'Data Engineering', desc: 'Adds container build and deployment exercises.' },
    { id: 'redis', label: 'Redis Caching', target: 'Distributed Systems', desc: 'Integrates database caching labs.' },
    { id: 'nextjs', label: 'Next.js Framework', target: 'Full-Stack Apps', desc: 'Updates web course to modern React frameworks.' }
  ],
  ds: [
    { id: 'pytorch', label: 'PyTorch AI Deployment', target: 'ML Pipelines', desc: 'Integrates model deployment pipeline automation.' },
    { id: 'k8s', label: 'Cloud Machine Learning', target: 'ML Pipelines', desc: 'Teaches model hosting on scaled cluster nodes.' },
    { id: 'kafka', label: 'Kafka Data Streams', target: 'Data Ingestion', desc: 'Connects data lakes to direct live stream feeds.' },
    { id: 'pandas', label: 'Distributed Pandas', target: 'Statistical Math', desc: 'Transitions math tools from single thread to cluster compute.' }
  ],
  se: [
    { id: 'aws', label: 'Serverless AWS Stack', target: 'Cloud Design', desc: 'Leverages Lambda and API Gateways in coursework.' },
    { id: 'k8s', label: 'Kubernetes Orchestrator', target: 'Cloud Design', desc: 'Teaches automated cluster deployments and auto-scaling.' },
    { id: 'grpc', label: 'gRPC API Services', target: 'Enterprise APIs', desc: 'Implements binary serialization protocols for microservices.' },
    { id: 'github', label: 'GitHub Actions Automation', target: 'CI/CD Pipelines', desc: 'Establishes continuous verification checks for student repositories.' }
  ]
};

export default function UniversityConsole({ setCurrentView, universityConfig = { dept: 'cs', cohort: '2026' } }) {
  const { dept, cohort } = universityConfig;

  // Base state hook configurations
  const [warnings, setWarnings] = useState(() => DEPT_WARNINGS[dept] || DEPT_WARNINGS.cs);
  const [comparatorData, setComparatorData] = useState(() => DEPT_COMPARATOR_DATA[dept] || DEPT_COMPARATOR_DATA.cs);
  const [hoveredTrack, setHoveredTrack] = useState(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  
  // Sandbox upgrades active array
  const [sandboxUpgrades, setSandboxUpgrades] = useState([]);
  
  // Interactive Controls
  const [baselineThreshold, setBaselineThreshold] = useState(70);
  const [showCompetency, setShowCompetency] = useState(true);
  const [showDemand, setShowDemand] = useState(true);
  const [activeTrackIdx, setActiveTrackIdx] = useState(null);

  // Auto-scrolling logs state
  const [logs, setLogs] = useState([
    `[10:07:01] SYSTEM: Connecting to school database...`,
    `[10:07:02] SYSTEM: Loading coursework history...`,
    `[10:07:03] SYSTEM: Synced ${COHORT_SIZES[cohort] || '1,240'} student profiles.`
  ]);

  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${time}] ${msg}`]);
  };

  // Computes boosts based on active simulator settings
  const getCompetencyWithBoost = (trackName, baseVal) => {
    let boost = 0;
    if (dept === 'cs') {
      if (trackName === 'Data Engineering') {
        if (sandboxUpgrades.includes('kafka')) boost += 15;
        if (sandboxUpgrades.includes('docker')) boost += 15;
      }
      if (trackName === 'Distributed Systems') {
        if (sandboxUpgrades.includes('redis')) boost += 15;
      }
      if (trackName === 'Full-Stack Apps') {
        if (sandboxUpgrades.includes('nextjs')) boost += 15;
      }
    } else if (dept === 'ds') {
      if (trackName === 'ML Pipelines') {
        if (sandboxUpgrades.includes('pytorch')) boost += 15;
        if (sandboxUpgrades.includes('k8s')) boost += 15;
      }
      if (trackName === 'Data Ingestion') {
        if (sandboxUpgrades.includes('kafka')) boost += 15;
      }
      if (trackName === 'Statistical Math') {
        if (sandboxUpgrades.includes('pandas')) boost += 15;
      }
    } else if (dept === 'se') {
      if (trackName === 'Cloud Design') {
        if (sandboxUpgrades.includes('aws')) boost += 15;
        if (sandboxUpgrades.includes('k8s')) boost += 15;
      }
      if (trackName === 'Enterprise APIs') {
        if (sandboxUpgrades.includes('grpc')) boost += 15;
      }
      if (trackName === 'CI/CD Pipelines') {
        if (sandboxUpgrades.includes('github')) boost += 15;
      }
    }
    return Math.min(100, baseVal + boost);
  };

  const handleToggleUpgrade = (id, label, target) => {
    const active = sandboxUpgrades.includes(id);
    if (active) {
      setSandboxUpgrades(prev => prev.filter(item => item !== id));
      addLog(`SIMULATOR: Removed syllabus upgrade "${label}". "${target}" readiness reduced.`);
    } else {
      setSandboxUpgrades(prev => [...prev, id]);
      addLog(`SIMULATOR: Added syllabus upgrade "${label}". Boosted "${target}" readiness by +15%.`);
    }
  };

  const handleSliderChange = (idx, val) => {
    setComparatorData(prev => 
      prev.map((c, i) => i === idx ? { ...c, competency: val } : c)
    );
  };

  // Compute live properties
  const activeComparatorData = comparatorData.map(item => ({
    ...item,
    competency: getCompetencyWithBoost(item.track, item.competency)
  }));

  const avgCompetency = (activeComparatorData.reduce((sum, item) => sum + item.competency, 0) / activeComparatorData.length).toFixed(1);

  // Warnings auto-resolve if competency with boost exceeds baseline threshold
  const dynamicWarnings = warnings.map((warn) => {
    let comp = 0;
    if (dept === 'cs') {
      if (warn.id === 'w-1') comp = activeComparatorData[0].competency;
      if (warn.id === 'w-2') comp = activeComparatorData[1].competency;
    } else if (dept === 'ds') {
      if (warn.id === 'w-1') comp = activeComparatorData[0].competency;
      if (warn.id === 'w-2') comp = activeComparatorData[1].competency;
    } else if (dept === 'se') {
      if (warn.id === 'w-1') comp = activeComparatorData[2].competency;
      if (warn.id === 'w-2') comp = activeComparatorData[1].competency;
    }
    const meetsThreshold = comp >= baselineThreshold;
    return {
      ...warn,
      status: warn.status === 'approved' || meetsThreshold ? 'approved' : 'pending'
    };
  });

  const activeGapsCount = dynamicWarnings.filter(w => w.status !== 'approved').length;

  const handleApproveIntervention = (warningId, recoText) => {
    setWarnings(prev =>
      prev.map(w => w.id === warningId ? { ...w, status: 'approved' } : w)
    );
    const courseCode = recoText.match(/[A-Z]{2}-\d{3}/)?.[0] || 'CS-302';
    addLog(`INTERVENTION: Syllabus updates approved for course ${courseCode}. Course updated.`);
  };

  return (
    <div className="min-h-screen bg-[#0B0F12] text-[#F7F9FA] flex flex-col font-sans">
      
      {/* Header */}
      <header className="w-full bg-[#161B22] border-b border-[#1E262F] px-6 py-4 sticky top-0 z-40 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <BrandLogo />
          <span className="px-3 py-1 bg-[#FFD369]/10 text-[#FFD369] rounded-full border border-[#FFD369]/20 text-[10px] font-mono font-bold uppercase tracking-wider">
            University Console
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-[#8A99A5] bg-[#0B0F12] px-3 py-1 rounded border border-[#1E262F]">
            University Registrar
          </span>
          <button
            onClick={() => setCurrentView('gateway')}
            className="px-4 py-2 bg-[#1E262F] hover:bg-[#FF5252] text-[#8A99A5] hover:text-[#F7F9FA] font-bold rounded-lg text-xs transition-all"
          >
            Exit Dashboard
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-8">
        
        {/* University SaaS Header Console */}
        <div className="bg-[#161B22] border border-[#1E262F] rounded-xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-[#161B22] to-[#1E262F]/40 shadow-lg">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-sm font-bold text-[#F7F9FA] font-mono">Institution: Apex Tech University</h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 text-[9px] font-mono font-bold uppercase">
                <span className="w-1 h-1 rounded-full bg-[#00E5FF] animate-ping" />
                Registrar Connected
              </span>
            </div>
            <p className="text-xs text-[#8A99A5]">
              Course alignment for <span className="text-[#FFD369]">{DEPT_LABELS[dept] || DEPT_LABELS.cs}</span> • Batch Class of <span className="text-[#00E5FF]">{cohort}</span>
            </p>
          </div>
          <div className="bg-[#0B0F12] border border-[#1E262F] px-4 py-2.5 rounded-lg text-right font-mono text-[10px] text-[#8A99A5] flex flex-col gap-0.5 font-semibold">
            <div><span className="text-[#8A99A5]/60">STUDENTS IN BATCH:</span> <span className="text-[#00E5FF]">{COHORT_SIZES[cohort] || '1,240'} Students</span></div>
            <div><span className="text-[#8A99A5]/60">COURSE CODE:</span> <span className="text-[#FFD369]">registrar-node-{dept === 'ds' ? 'ds402' : dept === 'se' ? 'se304' : 'cs302'}</span></div>
          </div>
        </div>

        {/* KPI Matrix Row */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Card 1: Cohort Size */}
          <div className="bg-[#161B22] border border-[#1E262F] rounded-xl p-5 flex items-center justify-between shadow-md">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#8A99A5] uppercase tracking-wider block">Cohort Size</span>
              <span className="text-2xl font-black text-[#F7F9FA]">{COHORT_SIZES[cohort] || '1,240'}</span>
              <span className="text-[10px] text-[#8A99A5] block">Total active students</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#0B0F12] border border-[#1E262F] flex items-center justify-center text-[#00E5FF]">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>

          {/* Card 2: Alignment Index */}
          <div className="bg-[#161B22] border border-[#1E262F] rounded-xl p-5 flex items-center justify-between shadow-md">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#8A99A5] uppercase tracking-wider block">Employment Readiness</span>
              <span className="text-2xl font-black text-[#FFD369]">{avgCompetency}%</span>
              <span className="text-[10px] text-[#8A99A5] block">Average curriculum alignment</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#0B0F12] border border-[#1E262F] flex items-center justify-center text-[#FFD369]">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          {/* Card 3: Active Gaps */}
          <div className="bg-[#161B22] border border-[#1E262F] rounded-xl p-5 flex items-center justify-between shadow-md">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#8A99A5] uppercase tracking-wider block">Curriculum Gaps</span>
              <span className="text-2xl font-black text-[#FF5252]">{activeGapsCount} {activeGapsCount === 1 ? 'Gap' : 'Gaps'}</span>
              <span className="text-[10px] text-[#8A99A5] block">Courses below readiness target</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#0B0F12] border border-[#1E262F] flex items-center justify-center text-[#FF5252]">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>

          {/* Card 4: Network Status */}
          <div className="bg-[#161B22] border border-[#1E262F] rounded-xl p-5 flex items-center justify-between shadow-md">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#8A99A5] uppercase tracking-wider block">System Status</span>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black text-[#10B981]">100%</span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">ONLINE</span>
              </div>
              <span className="text-[10px] text-[#8A99A5] block">Data up-to-date</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#0B0F12] border border-[#1E262F] flex items-center justify-center text-[#10B981]">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
          </div>

        </section>

        {/* Dashboard Workstation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Panel: Course Curriculum Simulator Sandbox */}
          <section className="lg:col-span-6 bg-[#161B22] border border-[#1E262F] rounded-xl p-6 space-y-6 flex flex-col justify-between shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#FFD369]" />
                <h3 className="text-base font-bold text-[#F7F9FA]">Curriculum Simulator</h3>
              </div>
              <p className="text-xs text-[#8A99A5]">
                Toggle curriculum upgrades to see how they improve student job readiness.
              </p>
            </div>

            {/* Upgrades Matrix Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 py-4">
              {(SANDBOX_UPGRADES_BY_DEPT[dept] || []).map((upgrade) => {
                const isActive = sandboxUpgrades.includes(upgrade.id);
                return (
                  <button
                    key={upgrade.id}
                    onClick={() => handleToggleUpgrade(upgrade.id, upgrade.label, upgrade.target)}
                    className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-300 ${
                      isActive 
                        ? 'border-[#00E5FF] bg-[#00E5FF]/5 shadow-[0_0_15px_rgba(0,229,255,0.12)] scale-[1.02]' 
                        : 'border-[#1E262F] bg-[#0B0F12] hover:border-[#8A99A5]/35 hover:scale-[1.01]'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <span className={`text-xs font-bold transition-colors ${isActive ? 'text-[#00E5FF]' : 'text-[#F7F9FA]'}`}>
                        {upgrade.label}
                      </span>
                      <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded transition-all ${
                        isActive ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40' : 'bg-[#1E262F] text-[#8A99A5]'
                      }`}>
                        {isActive ? 'ACTIVE' : 'TOGGLE'}
                      </span>
                    </div>
                    
                    <p className="text-[10px] text-[#8A99A5] leading-relaxed mt-2 flex-1">
                      {upgrade.desc}
                    </p>
                    
                    <div className="mt-3 pt-2 border-t border-[#1E262F]/40 flex justify-between items-center w-full">
                      <span className="text-[9px] font-mono text-[#8A99A5]/60 uppercase">Impacts: {upgrade.target}</span>
                      <span className="text-[10px] font-mono font-extrabold text-[#00E5FF]">+15% Readiness</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Interactive Target Baseline Slider */}
            <div className="pt-4 border-t border-[#1E262F] space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#F7F9FA] font-mono">Readiness Goal</span>
                <span className="font-mono text-[#FF5252] font-black">{baselineThreshold}%</span>
              </div>
              <input 
                type="range"
                min="30"
                max="95"
                value={baselineThreshold}
                onChange={(e) => setBaselineThreshold(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-[#0B0F12] rounded-lg appearance-none cursor-pointer accent-[#FF5252] focus:outline-none"
              />
              <p className="text-[10px] text-[#8A99A5] leading-relaxed">
                Adjust the target goal. Courses below this line will flag curriculum warnings.
              </p>
            </div>

          </section>

          {/* Right Panel: Academic Track Alignment Comparative List */}
          <section className="lg:col-span-6 bg-[#161B22] border border-[#1E262F] rounded-xl p-6 space-y-6 shadow-xl flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#F7F9FA]">Curriculum Alignment</h3>
              <p className="text-xs text-[#8A99A5]">Compare students' skills with current job market requirements.</p>
            </div>
            
            <div className="space-y-4 flex-1 justify-center flex flex-col py-2">
              {activeComparatorData.map((item, idx) => {
                const isUnderThreshold = item.competency < baselineThreshold;
                const isHighlighted = activeTrackIdx === idx;
                
                return (
                  <div 
                    key={idx} 
                    id={`course-card-${idx}`}
                    className={`p-4 bg-[#0B0F12] border rounded-lg space-y-3.5 transition-all duration-300 relative group cursor-pointer ${
                      isHighlighted 
                        ? "border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.15)] scale-[1.01]" 
                        : "border-[#1E262F] hover:border-[#1E262F]/80"
                    }`}
                    onClick={() => setActiveTrackIdx(idx)}
                    onMouseEnter={() => setHoveredTrack({ item, idx })}
                    onMouseMove={(e) => setMouseCoords({ x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => setHoveredTrack(null)}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xs font-bold text-[#F7F9FA]">{item.track}</h4>
                        <p className="text-[10px] text-[#8A99A5] leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                      
                      {/* Alignment warning/sync badges */}
                      {isUnderThreshold ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#FF5252]/10 border border-[#FF5252]/20 text-[#FF5252] text-[9px] font-mono font-bold uppercase animate-pulse">
                          ⚠️ GAP
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-[9px] font-mono font-bold uppercase">
                          ✓ ALIGNED
                        </span>
                      )}
                    </div>

                    {/* Dual Comparative Progress Bars */}
                    <div className="space-y-2">
                      
                      {/* 1. Cohort Competency Progress */}
                      {showCompetency && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-mono text-[#8A99A5]">
                            <span>Student Skills</span>
                            <span className="text-[#00E5FF] font-bold">{item.competency}%</span>
                          </div>
                          <div className="w-full h-2 bg-[#161B22] rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-[#00E5FF] rounded-full transition-all duration-500 ease-out ${
                                isUnderThreshold ? 'shadow-[0_0_10px_rgba(0,229,255,0.7)]' : ''
                              }`}
                              style={{ width: `${item.competency}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* 2. Recruiter Demand Progress */}
                      {showDemand && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-mono text-[#8A99A5]">
                            <span>Market Demand</span>
                            <span className="text-[#FFD369] font-bold">{item.demand}%</span>
                          </div>
                          <div className="w-full h-2 bg-[#161B22] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#FFD369]/80 rounded-full transition-all duration-500 ease-out"
                              style={{ width: `${item.demand}%` }}
                            />
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Manual Range Adjustment Slider */}
                    <div className="pt-2 border-t border-[#1E262F]/30 space-y-1 opacity-60 hover:opacity-100 transition-opacity">
                      <div className="flex justify-between text-[9px] font-mono text-[#8A99A5]">
                        <span>Manual Base Adjustment</span>
                        <span>Adjust base skills value</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="95"
                        value={comparatorData[idx].competency}
                        onChange={(e) => handleSliderChange(idx, parseInt(e.target.value, 10))}
                        className="w-full h-1 bg-[#1E262F] rounded-lg appearance-none cursor-pointer accent-[#00E5FF] focus:outline-none"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Visual Series Toggles */}
            <div className="flex items-center gap-6 justify-center pt-4 border-t border-[#1E262F] text-[10px] font-mono">
              <button 
                onClick={() => setShowCompetency(!showCompetency)}
                className={`flex items-center gap-2 px-3 py-1 rounded border transition-colors ${
                  showCompetency 
                    ? "border-[#00E5FF]/30 bg-[#00E5FF]/5 text-[#00E5FF]" 
                    : "border-[#1E262F] bg-[#0B0F12] text-[#8A99A5]"
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded ${showCompetency ? "bg-[#00E5FF]" : "bg-transparent border border-[#8A99A5]"}`} />
                <span>Student Skills Index</span>
              </button>
              
              <button 
                onClick={() => setShowDemand(!showDemand)}
                className={`flex items-center gap-2 px-3 py-1 rounded border transition-colors ${
                  showDemand 
                    ? "border-[#FFD369]/30 bg-[#FFD369]/5 text-[#FFD369]" 
                    : "border-[#1E262F] bg-[#0B0F12] text-[#8A99A5]"
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded ${showDemand ? "bg-[#FFD369]" : "bg-transparent border border-[#8A99A5]"}`} />
                <span>Market Demand</span>
              </button>
            </div>
          </section>

        </div>

        {/* Bottom Panel Row: Curriculum Gaps Warning & Scroll Node Log Console */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Warnings Table (Spans 2 columns) */}
          <section className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-[#FF5252]" />
              <h3 className="text-base font-bold text-[#F7F9FA]">Curriculum Warnings & Updates</h3>
            </div>

            <div className="bg-[#161B22] border border-[#1E262F] rounded-xl overflow-hidden shadow-xl">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-[#0B0F12]/40 border-b border-[#1E262F] text-[#8A99A5] font-bold font-mono">
                    <th className="p-4 uppercase tracking-wider w-1/4">Priority</th>
                    <th className="p-4 uppercase tracking-wider w-1/3">Identified Curriculum Gap</th>
                    <th className="p-4 uppercase tracking-wider w-2/5">Proposed Course Update</th>
                    <th className="p-4 uppercase tracking-wider text-right w-1/5">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E262F]">
                  {dynamicWarnings.map((warn) => (
                    <tr key={warn.id} className="hover:bg-[#1E262F]/10 transition-colors">
                      {/* Severity */}
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          warn.status === 'approved'
                            ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                            : 'bg-[#FF5252]/10 text-[#FF5252] border border-[#FF5252]/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            warn.status === 'approved' ? 'bg-[#10B981]' : 'bg-[#FF5252] animate-pulse'
                          }`} />
                          {warn.status === 'approved' ? 'UPDATED' : warn.severity}
                        </span>
                      </td>

                      {/* Warning */}
                      <td className="p-4">
                        <span className="font-semibold text-[#F7F9FA]">{warn.warning}</span>
                      </td>

                      {/* Recommendation */}
                      <td className="p-4">
                        <span className="text-[#8A99A5] leading-relaxed">{warn.reco}</span>
                      </td>

                      {/* Action */}
                      <td className="p-4 text-right">
                        {warn.status === 'approved' ? (
                          <span className="text-[11px] font-bold text-[#10B981] flex items-center justify-end gap-1">
                             <Check className="w-4 h-4" /> Course Updated
                          </span>
                        ) : (
                          <button
                            onClick={() => handleApproveIntervention(warn.id, warn.reco)}
                            className="px-3.5 py-1.5 bg-[#00E5FF] text-[#0B0F12] hover:bg-[#00E5FF]/90 font-bold rounded-lg transition-all text-[11px] font-mono shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                          >
                            Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Registrar Audit Terminal logs (Spans 1 column) */}
          <section className="space-y-4 flex flex-col">
            <div className="flex items-center justify-between">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#F7F9FA] flex items-center gap-1.5 font-mono">
                <Terminal className="w-3.5 h-3.5 text-[#00E5FF]" /> University Console Logs
              </h4>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            </div>
            
            <div className="bg-[#0B0F12] border border-[#1E262F] rounded-xl p-4 flex-1 font-mono text-[10px] text-[#8A99A5] space-y-1.5 h-[230px] overflow-y-auto font-semibold shadow-inner scrollbar-thin">
              {logs.map((logLine, idx) => (
                <div 
                  key={idx} 
                  className={
                    logLine.includes('SIMULATOR') 
                      ? 'text-[#00E5FF]' 
                      : logLine.includes('INTERVENTION') 
                        ? 'text-[#10B981]' 
                        : logLine.includes('COURSEWORK') 
                          ? 'text-[#FFD369]' 
                          : ''
                  }
                >
                  &gt; {logLine}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </section>

        </div>

        {/* Floating Tooltip Indicator */}
        {hoveredTrack && (() => {
          const tooltipWidth = 288;
          const tooltipHeight = 180;
          const offset = 15;
          let left = mouseCoords.x + offset;
          let top = mouseCoords.y + offset;
          
          if (left + tooltipWidth > window.innerWidth) {
            left = mouseCoords.x - tooltipWidth - offset;
          }
          if (top + tooltipHeight > window.innerHeight) {
            top = mouseCoords.y - tooltipHeight - offset;
          }
          
          return (
            <div className="fixed pointer-events-none bg-[#161B22]/95 backdrop-blur-md border border-[#1E262F] rounded-xl p-3 shadow-2xl z-50 w-72 space-y-1.5 text-xs text-[#8A99A5] transition-all duration-75 animate-in fade-in zoom-in-95"
              style={{ top: `${top}px`, left: `${left}px` }}
            >
              <div className="flex justify-between items-center border-b border-[#1E262F] pb-1">
                <span className="font-bold text-[#F7F9FA]">{hoveredTrack.item.track}</span>
                <span className="text-[10px] font-mono text-[#00E5FF] font-bold">TELEMETRY ANALYSIS</span>
              </div>
              <div className="flex justify-between font-mono text-[10px] pt-1">
                <span>Cohort Competency:</span>
                <span className="text-[#00E5FF] font-bold">{hoveredTrack.item.competency}%</span>
              </div>
              <div className="flex justify-between font-mono text-[10px]">
                <span>Network Demand:</span>
                <span className="text-[#8A99A5] font-bold">{hoveredTrack.item.demand}%</span>
              </div>
              <div className="flex justify-between font-mono text-[10px] border-t border-[#1E262F]/40 pt-1.5 mt-1">
                <span>Alignment Gap:</span>
                <span className={hoveredTrack.item.demand - hoveredTrack.item.competency > 15 ? "text-[#FF5252] font-bold" : "text-[#FFD369] font-bold"}>
                  {hoveredTrack.item.demand - hoveredTrack.item.competency}% Drift
                </span>
              </div>
              <div className="text-[9px] font-mono text-center text-[#8A99A5]/80 pt-1 border-t border-[#1E262F]/30">
                {hoveredTrack.item.competency < baselineThreshold ? "⚠️ Below baseline! Activate simulator upgrades to align." : "✓ Aligned with threshold."}
              </div>
            </div>
          );
        })()}

      </main>
    </div>
  );
}
