import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, AlertTriangle, ShieldCheck, ChevronRight, Cpu, FileText, GitBranch, Terminal, Shield, ArrowUpRight } from 'lucide-react';
import BrandLogo from './BrandLogo';

// Mock Job Board Data
const MOCK_JOBS = [
  {
    id: 'job-1',
    title: 'Junior Infrastructure Analyst',
    company: 'Vektor Ops',
    location: 'Remote (US)',
    tags: ['Docker', 'Bash', 'AWS', 'YAML'],
    trajectory: 'Cloud Security & Platform Operations',
    gaps: ['Cloud Server Patching', 'Automated Infrastructure Config'],
    landscape: 'Build and monitor server operations, manage secure connections, and automate server setups.'
  },
  {
    id: 'job-2',
    title: 'MLOps Platform Architect',
    company: 'Helix Intelligence',
    location: 'San Francisco, CA',
    tags: ['FastAPI', 'PyVector', 'Python', 'Apache Kafka'],
    trajectory: 'Data Engineering & Pipeline Workflows',
    gaps: ['Message Queue Ingestion', 'Database Search Algorithms'],
    landscape: 'Design database systems, manage real-time data pipelines, and process structured database collections.'
  },
  {
    id: 'job-3',
    title: 'Systems Engineering Intern',
    company: 'Core Ledger',
    location: 'Austin, TX',
    tags: ['Golang', 'Docker', 'Postgres', 'Linux'],
    trajectory: 'Core Backend & Network Operations',
    gaps: ['Web Compilers', 'Network Settings Tuning'],
    landscape: 'Optimize network speeds, monitor database performance, and write efficient backend services.'
  }
];

const MOCK_READMES = {
  'job-1': (
    <div className="space-y-3">
      <div className="border-b border-[#1E262F] pb-2">
        <h5 className="text-xs font-bold text-[#F7F9FA]"># Vektor Ops Challenge: background-service-audit</h5>
        <p className="text-[10px] text-[#8A99A5] mt-1">Verify Docker, Bash, and AWS platform reliability capacities.</p>
      </div>
      <div className="space-y-1">
        <h6 className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-wider font-mono">## Objective</h6>
        <p className="text-[11px] text-[#8A99A5] leading-relaxed">
          Construct an automated bash service executing server health checks and outputting clean log files.
        </p>
      </div>
      <div className="space-y-1">
        <h6 className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-wider font-mono">## Setup Instructions</h6>
        <pre className="bg-[#0B0F12] border border-[#1E262F] p-2.5 rounded-lg text-[10px] text-[#FFD369] overflow-x-auto leading-normal">
{`$ git clone https://github.com/vektor-ops/telemetry-audit.git
$ cd telemetry-audit
$ docker build -t telemetry-audit .`}
        </pre>
        <ul className="list-disc list-inside space-y-1 text-[11px] text-[#8A99A5] pl-1">
          <li>Write server check loop in <code className="bg-[#0B0F12] px-1 py-0.5 rounded text-[#00E5FF] font-mono text-[10px]">health_daemon.sh</code>.</li>
          <li>Ensure logging output format is compliant JSON to stdout.</li>
        </ul>
      </div>
      <div className="bg-[#00E5FF]/5 border border-[#00E5FF]/20 rounded p-2 text-[10px] text-[#00E5FF]">
        💡 <span className="font-bold">Apply via Smart Portfolio:</span> Push your solution to your GitHub repository. Clicking Apply matches your commits to verify your project code.
      </div>
    </div>
  ),
  'job-2': (
    <div className="space-y-3">
      <div className="border-b border-[#1E262F] pb-2">
        <h5 className="text-xs font-bold text-[#F7F9FA]"># Helix Intelligence Challenge: database-stream-index</h5>
        <p className="text-[10px] text-[#8A99A5] mt-1">Verify FastAPI, PgVector, and Apache Kafka workflows.</p>
      </div>
      <div className="space-y-1">
        <h6 className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-wider font-mono">## Objective</h6>
        <p className="text-[11px] text-[#8A99A5] leading-relaxed">
          Ingest data streams, compute real-time search vectors, and batch insert to index stores.
        </p>
      </div>
      <div className="space-y-1">
        <h6 className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-wider font-mono">## Setup Instructions</h6>
        <pre className="bg-[#0B0F12] border border-[#1E262F] p-2.5 rounded-lg text-[10px] text-[#FFD369] overflow-x-auto leading-normal">
{`$ docker-compose up -d kafka pgvector
$ pip install fastapi pgvector celery
$ uvicorn app.main:app --reload`}
        </pre>
        <ul className="list-disc list-inside space-y-1 text-[11px] text-[#8A99A5] pl-1">
          <li>Establish stream ingestion endpoint at <code className="bg-[#0B0F12] px-1 py-0.5 rounded text-[#00E5FF] font-mono text-[10px]">/v1/embeddings</code>.</li>
          <li>Tune write batch limits inside <code className="bg-[#0B0F12] px-1 py-0.5 rounded text-[#00E5FF] font-mono text-[10px]">indexer.py</code>.</li>
        </ul>
      </div>
    </div>
  ),
  'job-3': (
    <div className="space-y-3">
      <div className="border-b border-[#1E262F] pb-2">
        <h5 className="text-xs font-bold text-[#F7F9FA]"># Core Ledger Challenge: socket-buffer-tuning</h5>
        <p className="text-[10px] text-[#8A99A5] mt-1">Verify Golang network sockets and Linux kernel controls.</p>
      </div>
      <div className="space-y-1">
        <h6 className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-wider font-mono">## Objective</h6>
        <p className="text-[11px] text-[#8A99A5] leading-relaxed">
          Develop dynamic network socket buffers preventing drops under concurrent loads.
        </p>
      </div>
      <div className="space-y-1">
        <h6 className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-wider font-mono">## Setup Instructions</h6>
        <pre className="bg-[#0B0F12] border border-[#1E262F] p-2.5 rounded-lg text-[10px] text-[#FFD369] overflow-x-auto leading-normal">
{`$ go build ./cmd/bench
$ go test -v -race ./...`}
        </pre>
        <ul className="list-disc list-inside space-y-1 text-[11px] text-[#8A99A5] pl-1">
          <li>Complete ring allocation logic in <code className="bg-[#0B0F12] px-1 py-0.5 rounded text-[#00E5FF] font-mono text-[10px]">buffer.go</code>.</li>
          <li>Optimize system buffers via Unix low-level syscalls.</li>
        </ul>
      </div>
    </div>
  )
};

const SKILLS_TOP = [
  { name: 'Git', prof: 'Expert', status: 'Verified' },
  { name: 'Docker', prof: 'Advanced', status: 'Verified' },
  { name: 'Python', prof: 'Expert', status: 'Verified' },
  { name: 'FastAPI', prof: 'Advanced', status: 'Verified' },
  { name: 'SQL', prof: 'Expert', status: 'Verified' },
  { name: 'Apache Kafka', prof: 'Intermediate', status: 'Verified' },
  { name: 'Golang', prof: 'Advanced', status: 'Verified' },
  { name: 'Rust', prof: 'Intermediate', status: 'Verified' },
  { name: 'AWS Cloud', prof: 'Expert', status: 'Verified' },
  { name: 'Kubernetes', prof: 'Advanced', status: 'Verified' },
  { name: 'React', prof: 'Expert', status: 'Verified' },
  { name: 'Tailwind CSS', prof: 'Expert', status: 'Verified' },
  { name: 'Next.js', prof: 'Advanced', status: 'Verified' },
  { name: 'PostgreSQL', prof: 'Expert', status: 'Verified' }
];

const SKILLS_BOTTOM = [
  { name: 'GitHub Actions', prof: 'Expert', status: 'Verified' },
  { name: 'Linux OS', prof: 'Expert', status: 'Verified' },
  { name: 'Algorithms', prof: 'Advanced', status: 'Verified' },
  { name: 'REST APIs', prof: 'Expert', status: 'Verified' },
  { name: 'NoSQL Databases', prof: 'Advanced', status: 'Verified' },
  { name: 'Celery Queues', prof: 'Intermediate', status: 'Verified' },
  { name: 'Sockets', prof: 'Advanced', status: 'Verified' },
  { name: 'Concurrency', prof: 'Advanced', status: 'Verified' },
  { name: 'Google Cloud', prof: 'Intermediate', status: 'Verified' },
  { name: 'CI/CD Automation', prof: 'Expert', status: 'Verified' },
  { name: 'TypeScript', prof: 'Advanced', status: 'Verified' },
  { name: 'HTML5 & CSS3', prof: 'Expert', status: 'Verified' },
  { name: 'Serverless Functions', prof: 'Advanced', status: 'Verified' },
  { name: 'GraphQL API', prof: 'Intermediate', status: 'Verified' }
];

const DnaLedgerVisualizer = () => {
  const [logs, setLogs] = useState([
    '> [SYSTEM] Connecting candidate profile...',
    '> [SYSTEM] Verification: 100% Verified'
  ]);
  const [syncSpeed, setSyncSpeed] = useState(1);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [activePulseColumn, setActivePulseColumn] = useState(-1);
  const [sweepX, setSweepX] = useState(0);

  useEffect(() => {
    const mockEvents = [
      'SYNC: Connected GitHub profile "dev_block_0x4f"',
      'VERIFY: FastAPI project verified (125 commits)',
      'SYNC: University grades for Class of 2026 connected',
      'UPDATE: Skills recommendation updated (-12% drift)',
      'AUDIT: Profile verification complete',
      'SYNC: Smart Portfolio generated for Candidate #1240',
      'MATCH: Helix Intelligence requirements parsed successfully'
    ];
    
    let idx = 0;
    const runInterval = () => {
      return setInterval(() => {
        setLogs(prev => {
          const next = [...prev, `> [SYSTEM] ${mockEvents[idx % mockEvents.length]}`];
          if (next.length > 4) next.shift();
          return next;
        });
        idx++;
      }, 2500 / syncSpeed);
    };

    let interval = runInterval();
    return () => clearInterval(interval);
  }, [syncSpeed]);

  useEffect(() => {
    let frame;
    let start = Date.now();
    const updateSweep = () => {
      const elapsed = Date.now() - start;
      const period = 3000 / syncSpeed;
      const phase = (elapsed % period) / period;
      const currentX = 35 + Math.sin(phase * Math.PI * 2) * 165 + 165; 
      setSweepX(currentX);

      const colIdx = Math.round((currentX - 45) / 24);
      if (colIdx >= 0 && colIdx < 14) {
        setActivePulseColumn(colIdx);
      } else {
        setActivePulseColumn(-1);
      }

      frame = requestAnimationFrame(updateSweep);
    };
    frame = requestAnimationFrame(updateSweep);
    return () => cancelAnimationFrame(frame);
  }, [syncSpeed]);

  const triggerAudit = () => {
    if (isAuditing) return;
    setIsAuditing(true);
    setLogs(prev => [
      ...prev.slice(-2),
      `> [AUDIT] Initiating full system security check...`,
      `> [AUDIT] Verification Status: 100% SECURE`
    ]);
    setTimeout(() => {
      setIsAuditing(false);
    }, 1200);
  };

  const handleNodeHover = (skill, isTop, idx, cx, cy) => {
    setHoveredNode({
      ...skill,
      x: cx,
      y: cy,
      isTop,
      idx
    });
    setLogs(prev => {
      const next = [...prev, `> [INFO] Hovered over "${skill.name}" node - 100% verified`];
      if (next.length > 4) next.shift();
      return next;
    });
  };

  return (
    <div className="bg-[#161B22]/60 border border-[#1E262F] rounded-2xl p-5 backdrop-blur-md shadow-2xl space-y-4 relative overflow-hidden flex flex-col justify-between h-[390px] group transition-all duration-300 hover:border-[#00E5FF]/20 lg:col-span-5">
      
      {isAuditing && (
        <div className="absolute inset-0 bg-[#00E5FF]/5 animate-pulse pointer-events-none z-20 border border-[#00E5FF]/40 rounded-2xl" />
      )}

      <div className="flex items-center justify-between z-10 relative">
        <span className="text-[9px] font-mono text-[#8A99A5] bg-[#0B0F12] px-2 py-0.5 rounded border border-[#1E262F] uppercase">
          DNA Ledger Visualizer
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSyncSpeed(prev => (prev === 1 ? 2.5 : 1))}
            className={`px-2 py-0.5 border rounded text-[8px] font-mono font-bold transition-all ${
              syncSpeed > 1 
                ? 'bg-[#00E5FF]/20 text-[#00E5FF] border-[#00E5FF]' 
                : 'bg-[#0B0F12] border-[#1E262F] text-[#8A99A5] hover:text-[#F7F9FA]'
            }`}
          >
            {syncSpeed > 1 ? '⚡ BOOST ON' : '⚡ BOOST'}
          </button>
          <button
            onClick={triggerAudit}
            className="px-2 py-0.5 bg-[#0B0F12] border border-[#1E262F] hover:border-[#FFD369] text-[#8A99A5] hover:text-[#FFD369] rounded text-[8px] font-mono font-bold transition-all"
          >
            🔍 AUDIT
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center w-full min-h-[170px] relative">
        <div 
          className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#00E5FF]/40 to-transparent pointer-events-none z-10"
          style={{ left: `${(sweepX / 400) * 100}%` }}
        />

        <svg className="w-full h-full max-h-[180px] z-10" viewBox="0 0 400 160">
          {Array.from({ length: 14 }).map((_, i) => {
            const angle = (i * Math.PI) / 6;
            const topSkill = SKILLS_TOP[i];
            const bottomSkill = SKILLS_BOTTOM[i];
            const cx = 45 + i * 24;
            const yOffset = Math.sin(angle) * 35;
            const isPulsed = activePulseColumn === i;

            return (
              <g key={i}>
                <line
                  x1={cx}
                  y1={80 + yOffset}
                  x2={cx}
                  y2={80 - yOffset}
                  stroke="#1E262F"
                  strokeWidth={isPulsed ? "2" : "0.75"}
                  strokeOpacity={isPulsed ? "0.6" : "0.2"}
                />

                <motion.circle
                  cx={cx}
                  cy={80 + yOffset}
                  r={isPulsed ? 6 : hoveredNode?.isTop && hoveredNode?.idx === i ? 7 : 4}
                  fill="#00E5FF"
                  className="cursor-pointer"
                  onMouseEnter={() => handleNodeHover(topSkill, true, i, cx, 80 + yOffset)}
                  onMouseLeave={() => setHoveredNode(null)}
                  animate={isPulsed ? { scale: [1, 1.25, 1] } : {}}
                />

                <motion.circle
                  cx={cx}
                  cy={80 - yOffset}
                  r={isPulsed ? 6 : !hoveredNode?.isTop && hoveredNode?.idx === i ? 7 : 4}
                  fill="#FFD369"
                  className="cursor-pointer"
                  onMouseEnter={() => handleNodeHover(bottomSkill, false, i, cx, 80 - yOffset)}
                  onMouseLeave={() => setHoveredNode(null)}
                  animate={isPulsed ? { scale: [1, 1.25, 1] } : {}}
                />
              </g>
            );
          })}

          {hoveredNode && (
            <g>
              <rect
                x={hoveredNode.x - 45}
                y={hoveredNode.isTop ? hoveredNode.y - 45 : hoveredNode.y + 12}
                width="90"
                height="30"
                rx="4"
                fill="#0B0F12"
                stroke={hoveredNode.isTop ? "#00E5FF" : "#FFD369"}
                strokeWidth="1"
                opacity="0.95"
              />
              <text x={hoveredNode.x - 39} y={hoveredNode.isTop ? hoveredNode.y - 33 : hoveredNode.y + 24} fill="#F7F9FA" fontSize="8" fontWeight="bold">
                {hoveredNode.name}
              </text>
              <text x={hoveredNode.x - 39} y={hoveredNode.isTop ? hoveredNode.y - 23 : hoveredNode.y + 34} fill="#8A99A5" fontSize="6.5">
                {hoveredNode.prof} • {hoveredNode.status}
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="bg-[#0B0F12]/80 border border-[#1E262F] rounded-xl p-3.5 font-mono text-[9px] text-[#8A99A5] h-24 overflow-hidden flex flex-col justify-between shadow-inner">
        {logs.map((line, logIdx) => {
          let lineClass = 'text-[#8A99A5]/80';
          if (line.includes('VERIFY') || line.includes('SYNC')) {
            lineClass = 'text-[#00E5FF] font-semibold';
          } else if (line.includes('AUDIT')) {
            lineClass = 'text-[#FFD369] font-semibold animate-pulse';
          } else if (line.includes('INFO')) {
            lineClass = 'text-[#FFD369]/90';
          }
          return (
            <div key={logIdx} className={lineClass}>
              {line}
            </div>
          );
        })}
      </div>

    </div>
  );
};



export default function GatewayPortal({ setCurrentView }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [authWarning, setAuthWarning] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState(() => {
    return localStorage.getItem('careerdna_gateway_tab') || 'home';
  });

  useEffect(() => {
    localStorage.setItem('careerdna_gateway_tab', activeSubTab);
  }, [activeSubTab]);

  const handleApplyClick = () => {
    setAuthWarning(true);
    setTimeout(() => {
      setAuthWarning(false);
    }, 5000);
  };

  const filteredJobs = MOCK_JOBS.filter(job => {
    const matchesSearch = searchQuery ? (
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.trajectory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ) : true;

    const matchesTag = selectedTag ? job.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  const isFiltered = searchQuery !== '' || selectedTag !== null;
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
  };

  return (
    <div className="min-h-screen bg-[#0B0F12] text-[#F7F9FA] flex flex-col font-sans relative overflow-hidden">
      
      {/* Background neon ambient grids */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#00E5FF]/[0.02] via-transparent to-transparent pointer-events-none -z-10" />
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#00E5FF]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FFD369]/[0.03] rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Top Navigation Bar */}
      <header className="w-full bg-[#161B22]/80 backdrop-blur-md border-b border-[#1E262F] sticky top-0 z-40 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <BrandLogo />
        <nav className="flex items-center gap-4 md:gap-8 text-xs md:text-sm font-semibold">
          <button
            onClick={() => setActiveSubTab('home')}
            className={`transition-colors py-1 ${activeSubTab === 'home' ? 'text-[#00E5FF] border-b-2 border-[#00E5FF]' : 'text-[#8A99A5] hover:text-[#F7F9FA]'}`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveSubTab('about')}
            className={`transition-colors py-1 ${activeSubTab === 'about' ? 'text-[#00E5FF] border-b-2 border-[#00E5FF]' : 'text-[#8A99A5] hover:text-[#F7F9FA]'}`}
          >
            About
          </button>
          <button
            onClick={() => setActiveSubTab('features')}
            className={`transition-colors py-1 ${activeSubTab === 'features' ? 'text-[#00E5FF] border-b-2 border-[#00E5FF]' : 'text-[#8A99A5] hover:text-[#F7F9FA]'}`}
          >
            Features
          </button>
        </nav>
        <button
          onClick={() => setCurrentView('auth_modal')}
          className="px-3 md:px-5 py-2 md:py-2.5 bg-[#00E5FF] text-[#0B0F12] font-extrabold rounded-xl hover:bg-[#00E5FF]/90 transition-all text-[10px] md:text-xs uppercase tracking-wider font-mono shadow-[0_4px_20px_rgba(0,229,255,0.25)] hover:scale-[1.02]"
        >
          Access Console
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-16">
        
        {activeSubTab === 'home' && (
          <>
            {/* Simplified Hero Section */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
              
              {/* Hero Left Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/20 text-[10px] font-mono text-[#00E5FF] uppercase font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
                  Portfolio Platform 1.0
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none">
                  Career<span className="text-[#00E5FF] bg-gradient-to-r from-[#00E5FF] via-[#FFD369] to-[#FF5252] bg-clip-text text-transparent">DNA</span>: Verified Skills Portfolio
                </h1>
                
                <p className="text-sm md:text-base text-[#8A99A5] leading-relaxed max-w-xl">
                  Banish outdated resumes. CareerDNA links your real coding projects from GitHub and verified university grades directly to actual job opportunities. Show what you can build.
                </p>

                {/* Quick Stats Matrix */}
                <div className="grid grid-cols-3 gap-4 pt-2 max-w-md">
                  <div className="bg-[#161B22]/50 border border-[#1E262F] rounded-xl p-3 text-center">
                    <span className="text-xs font-bold text-[#FFD369] block">15K+</span>
                    <span className="text-[9px] font-mono text-[#8A99A5] uppercase">Projects Connected</span>
                  </div>
                  <div className="bg-[#161B22]/50 border border-[#1E262F] rounded-xl p-3 text-center">
                    <span className="text-xs font-bold text-[#00E5FF] block">98%</span>
                    <span className="text-[9px] font-mono text-[#8A99A5] uppercase">Accuracy Rate</span>
                  </div>
                  <div className="bg-[#161B22]/50 border border-[#1E262F] rounded-xl p-3 text-center">
                    <span className="text-xs font-bold text-[#FF5252] block">120+</span>
                    <span className="text-[9px] font-mono text-[#8A99A5] uppercase">Active Pipelines</span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => setCurrentView('auth_modal')}
                    className="px-6 py-4 bg-[#00E5FF] text-[#0B0F12] font-extrabold rounded-xl hover:bg-[#00E5FF]/90 transition-all text-xs uppercase tracking-wider font-mono shadow-[0_4px_25px_rgba(0,229,255,0.3)] hover:scale-[1.02]"
                  >
                    Create Your Verified Portfolio
                  </button>
                  <a
                    href="#job-marketplace"
                    className="px-6 py-4 bg-[#161B22] border border-[#1E262F] hover:border-[#8A99A5]/40 text-[#F7F9FA] font-bold rounded-xl transition-all text-xs uppercase tracking-wider font-mono flex items-center gap-2 hover:scale-[1.01]"
                  >
                    <span>Browse Openings</span>
                    <ChevronRight className="w-4 h-4 text-[#8A99A5]" />
                  </a>
                </div>
              </div>

              {/* Hero Right Visualizer */}
              <DnaLedgerVisualizer />
              
            </section>

            {/* Live Marketplace Segment */}
            <section id="job-marketplace" className="space-y-6 pt-6 scroll-mt-24">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold border-l-4 border-[#00E5FF] pl-3">
                    Active Job Openings
                  </h2>
                  <p className="text-xs text-[#8A99A5]">Browse tech job positions and see how your skills match.</p>
                </div>
                
                {/* Live query search block */}
                <div className="relative w-full sm:w-80 group">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#8A99A5] group-focus-within:text-[#00E5FF] transition-colors">
                    <Search className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search job stack or query..."
                    className="w-full pl-9 pr-4 py-2 bg-[#161B22] border border-[#1E262F] rounded-lg text-[#F7F9FA] placeholder-[#8A99A5]/50 focus:border-[#00E5FF] focus:outline-none transition-colors text-xs"
                  />
                </div>
              </div>

              {/* Quick Active Filter Badge details */}
              {isFiltered && (
                <div className="flex items-center gap-3 bg-[#161B22]/50 border border-[#1E262F] p-3 rounded-lg text-xs">
                  <span className="text-[#8A99A5]">
                    Active Filter: {searchQuery && `"${searchQuery}"`} {searchQuery && selectedTag && " + "} {selectedTag && `Tag: ${selectedTag}`}
                  </span>
                  <button 
                    onClick={handleClearFilters}
                    className="px-2 py-0.5 bg-[#FF5252]/10 hover:bg-[#FF5252] border border-[#FF5252]/30 text-[#FF5252] hover:text-white rounded text-[10px] font-mono transition-colors font-bold uppercase"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* Job Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-[#161B22] border border-[#1E262F] rounded-xl p-6 flex flex-col justify-between hover:border-[#00E5FF]/40 transition-all group hover:scale-[1.01] hover:shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
                    >
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <span className="text-[10px] text-[#FFD369] font-mono font-bold flex items-center gap-1.5 uppercase tracking-wider">
                            <Cpu className="w-3.5 h-3.5" /> verified listing
                          </span>
                          <h3 className="text-base font-extrabold text-[#F7F9FA] group-hover:text-[#00E5FF] transition-colors leading-tight">
                            {job.title}
                          </h3>
                          <p className="text-xs text-[#8A99A5] font-semibold">
                            {job.company} • <span className="font-normal font-mono text-[10px] bg-[#0B0F12] border border-[#1E262F] px-1.5 py-0.5 rounded text-[#8A99A5]/80">{job.location}</span>
                          </p>
                        </div>

                        <p className="text-xs text-[#8A99A5] leading-relaxed line-clamp-2">
                          {job.landscape}
                        </p>

                        {/* Technology Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {job.tags.map((tag) => (
                            <span
                              key={tag}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTag(tag);
                              }}
                              className={`px-2 py-0.5 border rounded text-[9px] font-bold font-mono cursor-pointer transition-all duration-200 ${
                                selectedTag === tag 
                                  ? 'bg-[#00E5FF]/20 text-[#00E5FF] border-[#00E5FF]/50 shadow-[0_0_8px_rgba(0,229,255,0.15)]'
                                  : 'bg-[#0B0F12] border-[#1E262F] text-[#8A99A5] hover:border-[#8A99A5]/40 hover:text-[#F7F9FA]'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 border-t border-[#1E262F]/30 mt-6 flex justify-between items-center w-full">
                        <button
                          onClick={() => {
                            setSelectedJob(job);
                            setAuthWarning(false);
                          }}
                          className="w-full py-2.5 bg-[#1E262F] hover:bg-[#00E5FF] hover:text-[#0B0F12] text-[#F7F9FA] font-bold rounded-lg text-xs transition-all flex items-center justify-center gap-1 shadow-md"
                        >
                          <span>Analyze Requirements</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 bg-[#161B22]/50 border border-[#1E262F] rounded-xl p-12 text-center space-y-4">
                    <AlertTriangle className="w-8 h-8 text-[#FFD369] mx-auto animate-bounce" />
                    <p className="text-xs text-[#8A99A5] font-mono">No active jobs match your search filters.</p>
                    <button 
                      onClick={handleClearFilters}
                      className="px-4 py-2 bg-[#00E5FF] text-[#0B0F12] font-extrabold rounded-lg text-xs font-mono tracking-wider uppercase shadow-md"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {activeSubTab === 'about' && (
          <section className="py-12 max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
            <div className="space-y-3 text-center">
              <h2 className="text-3xl font-extrabold text-[#F7F9FA]">About CareerDNA</h2>
              <p className="text-sm text-[#8A99A5]">Making tech hiring honest, simple, and visual.</p>
            </div>
            
            <div className="bg-[#161B22] border border-[#1E262F] rounded-2xl p-8 space-y-6 leading-relaxed text-[#8A99A5] text-sm shadow-xl">
              <p>
                Traditional resumes are filled with buzzwords and unverified claims. This makes it difficult for companies to find the right talent, and hard for qualified candidates to stand out.
              </p>
              <p>
                <strong>CareerDNA</strong> solves this by creating a verified skills portfolio. We connect directly to your public coding history (like GitHub projects) and verified school grades to build a factual portfolio.
              </p>
              <h3 className="text-base font-bold text-[#F7F9FA] pt-2">Our Core Principles</h3>
              <ul className="space-y-3 list-disc list-inside">
                <li><strong className="text-[#00E5FF]">Real Code History</strong>: Every skill shown is backed by real code history or academic grades.</li>
                <li><strong className="text-[#FFD369]">Simple & Friendly</strong>: We replace complicated technical jargon with everyday words.</li>
                <li><strong className="text-[#FF5252]">No Resume Hassles</strong>: Apply directly to jobs by sharing your smart portfolio, saving time for both you and recruiters.</li>
              </ul>
            </div>
          </section>
        )}

        {activeSubTab === 'features' && (
          <section className="py-12 space-y-10 animate-in fade-in duration-300">
            <div className="space-y-3 text-center">
              <h2 className="text-3xl font-extrabold text-[#F7F9FA]">Platform Features</h2>
              <p className="text-sm text-[#8A99A5]">Everything you need to showcase and verify your capabilities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#161B22] border border-[#1E262F] rounded-2xl p-6 space-y-4 shadow-xl hover:border-[#00E5FF]/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF] border border-[#00E5FF]/20">
                  <GitBranch className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#F7F9FA]">GitHub Project Integration</h3>
                <p className="text-xs text-[#8A99A5] leading-relaxed">
                  Connect your GitHub profile to analyze your commits and pull requests. We automatically convert your coding activity into clear, verified skills.
                </p>
              </div>

              <div className="bg-[#161B22] border border-[#1E262F] rounded-2xl p-6 space-y-4 shadow-xl hover:border-[#FFD369]/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#FFD369]/10 flex items-center justify-center text-[#FFD369] border border-[#FFD369]/20">
                  <Terminal className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#F7F9FA]">Verified Academic Grades</h3>
                <p className="text-xs text-[#8A99A5] leading-relaxed">
                  Link directly with university databases to import your verified course grades. Show recruiters your academic achievements with absolute credibility.
                </p>
              </div>

              <div className="bg-[#161B22] border border-[#1E262F] rounded-2xl p-6 space-y-4 shadow-xl hover:border-[#FF5252]/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#FF5252]/10 flex items-center justify-center text-[#FF5252] border border-[#FF5252]/20">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#F7F9FA]">Skills Matcher</h3>
                <p className="text-xs text-[#8A99A5] leading-relaxed">
                  See exactly how your skills match open jobs. We identify what skills you have and suggest key skills to learn to help you unlock new career pathways.
                </p>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Footer Branding */}
      <footer className="w-full bg-[#161B22]/20 border-t border-[#1E262F] py-8 text-center text-xs text-[#8A99A5] mt-16 font-mono">
        <p>© 2026 CareerDNA. Verified skills portfolio matching candidates with top software roles.</p>
      </footer>

      {/* Side Panel Sheet Overlay */}
      <AnimatePresence>
        {selectedJob && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedJob(null)}
              className="fixed inset-0 bg-black/80 z-40 cursor-pointer backdrop-blur-xs"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#161B22] border-l border-[#1E262F] z-50 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Header */}
                <div className="p-6 border-b border-[#1E262F] flex items-center justify-between bg-[#0B0F12]/40">
                  <div className="space-y-1">
                    <span className="text-[10px] text-[#FFD369] font-mono font-bold tracking-wider uppercase">
                      Route Trajectory Analysis
                    </span>
                    <h3 className="text-lg font-black text-[#F7F9FA]">{selectedJob.title}</h3>
                    <p className="text-xs text-[#8A99A5] font-semibold">{selectedJob.company}</p>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="p-2 bg-[#0B0F12] border border-[#1E262F] rounded-lg hover:border-[#FF5252]/40 text-[#8A99A5] hover:text-[#FF5252] transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  
                  {/* Trajectory Blueprint */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#00E5FF] font-mono">
                      Target Career Trajectory
                    </h4>
                    <p className="text-xs font-bold text-[#F7F9FA] bg-[#0B0F12] p-3 rounded-lg border border-[#1E262F] leading-relaxed">
                      {selectedJob.trajectory}
                    </p>
                  </div>

                  {/* Landscape description */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A99A5] font-mono">
                      Realistic Project Landscape
                    </h4>
                    <p className="text-xs text-[#8A99A5] leading-relaxed">
                      {selectedJob.landscape}
                    </p>
                  </div>

                  {/* Required Stack */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A99A5] font-mono">
                      Mandated Production Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 bg-[#0B0F12] border border-[#1E262F] rounded-lg text-xs font-mono text-[#F7F9FA] flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Technical Challenge README */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFD369] font-mono flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#FFD369]" /> Challenge Specification
                    </h4>
                    <div className="bg-[#0B0F12]/50 border border-[#1E262F] rounded-xl p-5 space-y-2">
                      {MOCK_READMES[selectedJob.id]}
                    </div>
                  </div>

                  {/* Skill Gaps Breakdown */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF5252] font-mono flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-[#FF5252]" /> Systemic Skill Gaps
                    </h4>
                    <div className="bg-[#FF5252]/5 border border-[#FF5252]/20 rounded-xl p-4 space-y-2">
                      <p className="text-xs text-[#8A99A5] leading-relaxed">
                        To unlock this route, your verified codebase ledger must demonstrate capacity in:
                      </p>
                      <ul className="space-y-1.5 pl-1">
                        {selectedJob.gaps.map((gap, index) => (
                          <li key={index} className="text-xs text-[#FF5252] font-mono flex items-start gap-2">
                            <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#FF5252]" />
                            <span>{gap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Auth warning banner */}
                  {authWarning && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-[#FF5252]/10 border border-[#FF5252]/30 rounded-xl flex flex-col gap-3"
                    >
                      <div className="flex gap-3 items-start">
                        <AlertTriangle className="w-5 h-5 text-[#FF5252] flex-shrink-0 mt-0.5 animate-bounce" />
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-[#F7F9FA]">Authentication Required</h4>
                          <p className="text-[11px] text-[#8A99A5]">
                            Please create an account or sign in first to verify your ledger and sync credentials.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setCurrentView('auth_modal')}
                        className="w-full py-2 bg-[#FF5252] hover:bg-[#FF5252]/90 text-white font-bold rounded-lg text-[10px] transition-colors uppercase tracking-wider font-mono text-center"
                      >
                        Sign In / Register Now →
                      </button>
                    </motion.div>
                  )}

                </div>
              </div>

              {/* Footer action buttons */}
              <div className="p-6 bg-[#0B0F12]/40 border-t border-[#1E262F] flex flex-col gap-3">
                <button
                  onClick={handleApplyClick}
                  className="w-full py-4 bg-[#00E5FF] text-[#0B0F12] font-extrabold rounded-xl hover:bg-[#00E5FF]/90 transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,229,255,0.2)]"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>Apply via CareerDNA Stream</span>
                </button>
                <p className="text-[10px] text-center text-[#8A99A5]">
                  Applying streams your verified GitHub commits and Registrars. Zero PDF resumes required.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
