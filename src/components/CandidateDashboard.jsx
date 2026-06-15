import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  History as HistoryIcon, Compass, MessageSquare, GitBranch, FileText, 
  Terminal, AlertTriangle, Send
} from 'lucide-react';
import BrandLogo from './BrandLogo';

// Mock Portfolio Milestones
const MOCK_MILESTONES = [
  {
    id: 'm1',
    type: 'github',
    icon: GitBranch,
    title: 'GitHub Commit Synced',
    desc: 'Optimized asynchronous vector index database clustering paths',
    time: '2026-06-12 14:02 UTC',
    tags: ['FastAPI', 'Python', 'PgVector']
  },
  {
    id: 'm2',
    type: 'github',
    icon: GitBranch,
    title: 'GitHub PR Merged',
    desc: 'Configured multi-node Kafka partition balancing triggers',
    time: '2026-06-10 09:15 UTC',
    tags: ['Docker', 'Go', 'Kafka']
  },
  {
    id: 'm3',
    type: 'registrar',
    icon: FileText,
    title: 'University Registrar Synced',
    desc: 'CS-302 Advanced Databases course telemetry: Verified score A',
    time: '2026-06-05 11:30 UTC',
    tags: ['SQL', 'PgVector', 'Indexing']
  }
];

// Mock Career Path Branches
const CAREER_NODES = {
  mlops: {
    id: 'mlops',
    title: 'MLOps Platform Architect',
    description: 'Bridges data pipelines, model registry stores, and real-time streaming infrastructure.',
    landscape: 'Establish production scale vector index ingestion routines, deploy distributed models on orchestration engines, and monitor GPU hardware clustering.',
    tradeoffs: 'Higher infrastructure configuration complexity. Tight dependency on model ingestion latencies and database streaming rates.',
    gaps: ['Apache Kafka Cluster Infrastructure', 'PgVector Clustering Algorithms', 'Kubernetes GPU Scheduling Nodes'],
    color: '#00E5FF'
  },
  systems: {
    id: 'systems',
    title: 'Distributed Systems Lead',
    description: 'Designs high-concurrency messaging backbones and customized low-level transaction nodes.',
    landscape: 'Refine network socket configurations, construct high-throughput storage layers, and deploy concurrent thread pools.',
    tradeoffs: 'Extremely high engineering discipline needed. Debugging race conditions and network partition failures requires significant telemetry.',
    gaps: ['Distributed Systems Patching', 'Go Socket Buffer Layer Tuning', 'Raft Consensus Protocol Implementations'],
    color: '#FFD369'
  },
  fullstack: {
    id: 'fullstack',
    title: 'Full-Stack Lead',
    description: 'Coordinates web layout structures with database pipelines and server-side components.',
    landscape: 'Configure edge server caching frameworks, construct dynamic routing engines, and implement modular API boundaries.',
    tradeoffs: 'High library rate churn. Must constantly re-balance edge node logic and server-side computations for fast responses.',
    gaps: ['Next.js Server Component Routing', 'Server-Side Node CS-302 Node Parameters', 'Edge Cache Invalidation Triggers'],
    color: '#F7F9FA'
  }
};

// Mock specifications for SVG stage nodes
const STAGE_DETAILS = {
  ingestion: {
    name: 'Ingestion Pipeline Stage',
    desc: 'Focuses on model vectors insertion rates, Celery task buffers, and PgVector clustering parameters.',
    stack: 'FastAPI, Celery, PgVector, Redis'
  },
  registry: {
    name: 'Model Registry Sync Stage',
    desc: 'Monitors machine learning model parameters, version tagging validation, and remote storage links.',
    stack: 'MLflow, Python, Docker'
  },
  mlops: {
    name: 'MLOps Architect Capstone',
    desc: 'Validates full-system pipeline orchestrations, Kubernetes GPU nodes scheduler, and live monitoring dashboards.',
    stack: 'Kubernetes, AWS Cloud, Prometheus, Grafana'
  },
  sockets: {
    name: 'Network Socket Tuning Stage',
    desc: 'Optimizes Unix low-level syscall bounds, socket buffering rings, and byte buffers allocations.',
    stack: 'Golang, Linux Syscalls, Socket Buffers'
  },
  concurrency: {
    name: 'High-Concurrency Backbones Stage',
    desc: 'Analyzes multi-threaded scheduling loops, race condition controls, and read/write mutex locks.',
    stack: 'Go channels, Rust sync, Mutex Locks'
  },
  systems: {
    name: 'Systems Engineering Capstone',
    desc: 'Validates distributed consensus ledgers, Raft replication protocols, and failover parameters.',
    stack: 'Golang, WebAssembly, Raft Consensus'
  },
  apis: {
    name: 'Modular API Caching Stage',
    desc: 'Establishes type-safe API boundaries, REST/GraphQL interfaces, and database mapping connections.',
    stack: 'Next.js, Node.js, GraphQL, PostgreSQL'
  },
  caching: {
    name: 'Edge Cache Invalidation Stage',
    desc: 'Manages server-side caching pools, Edge network protocols (HTTP/3), and cache eviction logic.',
    stack: 'Redis, Edge Cache, Vercel edge networks'
  },
  fullstack: {
    name: 'Full-Stack Architecture Capstone',
    desc: 'Validates React Server Components, server-side data stream rendering, and user telemetry security.',
    stack: 'React 19, Tailwind CSS, TypeScript, Postgres'
  }
};

export default function CandidateDashboard({ setCurrentView }) {
  const [candTab, setCandTab] = useState('portfolio'); // 'portfolio' | 'navigator' | 'ai_coach'
  const [selectedPathNode, setSelectedPathNode] = useState('mlops');
  const [selectedStageNode, setSelectedStageNode] = useState(null);
  const [verifyingMilestone, setVerifyingMilestone] = useState({});
  const [logs, setLogs] = useState([
    "> [10:04:12] INDEXER: Connected to GitHub webhook event trigger.",
    "> [10:04:13] LEDGER: Found commit SHA: c829fa1 (PgVector search)",
    "> [10:04:13] LEDGER: Validated codebase block signatures.",
    "> [10:04:15] REGISTRAR: Synced grades telemetry for CS-302 (Database)",
    "> [10:04:15] LEDGER: Cryptographic Block #4812 validated.",
    "> [10:04:16] INDEXER: Awaiting new repository push event..."
  ]);

  const handleVerifyStream = (id, title) => {
    setVerifyingMilestone(prev => ({ ...prev, [id]: 'verifying' }));
    
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [
      ...prev,
      `> [${timeStr}] AUDIT: Initiating check on milestone '${title}'...`,
      `> [${timeStr}] LEDGER: Contacting registrar nodes for signature verification...`
    ]);

    setTimeout(() => {
      setVerifyingMilestone(prev => ({ ...prev, [id]: 'verified' }));
      const doneTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLogs(prev => [
        ...prev,
        `> [${doneTimeStr}] LEDGER: Verified cryptographic block for '${title}' (SHA-256 success).`
      ]);
    }, 800);
  };

  // AI Coach Chat states
  const [messages, setMessages] = useState([
    {
      sender: 'coach',
      text: "Hello! Looking over your Living Portfolio, I see strong FastAPI foundations but notice an active skill gap in Apache Kafka for your target MLOps track. Would you like a targeted open-source project blueprint to patch this gap?",
      time: '10:02 AM'
    },
    {
      sender: 'user',
      text: "Yes, give me a backend project idea to verify my Kafka skills.",
      time: '10:03 AM'
    },
    {
      sender: 'coach',
      text: "Perfect. Build a real-time transactional telemetry consumer service. Once you push the repo with passing GitHub actions, your CareerDNA ledger will verify the badge and update recruiters automatically.",
      time: '10:03 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulated response after 1.5 seconds
    setTimeout(() => {
      let replyText = "Understood. The CareerDNA engine is currently scanning public repository hooks. Check your target roadmap details on the 'Career Path Navigator' tab to see updated skill gaps.";
      if (inputText.toLowerCase().includes('project') || inputText.toLowerCase().includes('kafka')) {
        replyText = "To patch the Apache Kafka skill gap, initialize a producer-consumer setup tracking simulated CPU metrics. Tag the repository with #careerdna-kafka-telemetry to trigger ledger verification.";
      }
      setMessages(prev => [...prev, {
        sender: 'coach',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1200);
  };

  const triggerAutoMessage = (text) => {
    const newMsg = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    setTimeout(() => {
      let replyText = "Understood. The CareerDNA engine is currently scanning public repository hooks. Check your target roadmap details on the 'Career Path Navigator' tab to see updated skill gaps.";
      if (text.toLowerCase().includes('kafka') || text.toLowerCase().includes('project')) {
        replyText = "To patch the Apache Kafka skill gap, initialize a producer-consumer setup tracking simulated CPU metrics. Tag the repository with #careerdna-kafka-telemetry to trigger ledger verification.";
      } else if (text.toLowerCase().includes('database') || text.toLowerCase().includes('course') || text.toLowerCase().includes('telemetry')) {
        replyText = "Your CS-302 coursework has been verified with Grade A. The registrar signature registrar-node-cs302 is cryptographically logged on the ledger.";
      } else if (text.toLowerCase().includes('tradeoffs') || text.toLowerCase().includes('distributed')) {
        replyText = "Systems Engineering requires high engineering discipline. Debugging race conditions and socket buffering layers requires explicit telemetry.";
      }
      setMessages(prev => [...prev, {
        sender: 'coach',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0B0F12] text-[#F7F9FA] flex flex-col md:flex-row font-sans">
      
      {/* Fixed Left Navigation Panel */}
      <aside className="w-full md:w-64 bg-[#161B22] border-b md:border-b-0 md:border-r border-[#1E262F] flex flex-col justify-between flex-shrink-0">
        <div className="p-6 space-y-8">
          <BrandLogo />
          
          <nav className="space-y-2">
            <button
              onClick={() => setCandTab('portfolio')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold border-l-2 transition-all duration-200 ${
                candTab === 'portfolio'
                  ? 'border-[#00E5FF] bg-[#1E262F]/50 text-[#F7F9FA] rounded-r-xl rounded-l-none'
                  : 'border-transparent text-[#8A99A5] hover:text-[#F7F9FA]'
              }`}
            >
              <HistoryIcon className="w-4 h-4" />
              <span>Living Portfolio</span>
            </button>

            <button
              onClick={() => setCandTab('navigator')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold border-l-2 transition-all duration-200 ${
                candTab === 'navigator'
                  ? 'border-[#00E5FF] bg-[#1E262F]/50 text-[#F7F9FA] rounded-r-xl rounded-l-none'
                  : 'border-transparent text-[#8A99A5] hover:text-[#F7F9FA]'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Path Navigator</span>
            </button>

            <button
              onClick={() => setCandTab('ai_coach')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold border-l-2 transition-all duration-200 ${
                candTab === 'ai_coach'
                  ? 'border-[#00E5FF] bg-[#1E262F]/50 text-[#F7F9FA] rounded-r-xl rounded-l-none'
                  : 'border-transparent text-[#8A99A5] hover:text-[#F7F9FA]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>AI Career Coach</span>
            </button>
          </nav>
        </div>

        <div className="p-6 border-t border-[#1E262F] space-y-3 bg-[#0B0F12]/20">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFD369] animate-pulse" />
            <span className="text-[10px] font-mono text-[#8A99A5]">Ledger Status: ACTIVE</span>
          </div>
          <button
            onClick={() => setCurrentView('gateway')}
            className="w-full py-2 bg-[#1E262F] hover:bg-[#FF5252] hover:text-[#F7F9FA] text-[#8A99A5] font-bold rounded-lg text-xs transition-all"
          >
            Exit Workspace
          </button>
        </div>
      </aside>

      {/* Main Workspace Frame */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-6xl mx-auto w-full">
        
        {/* Global SaaS Header Console */}
        <div className="bg-[#161B22] border border-[#1E262F] rounded-xl p-5 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-[#161B22] to-[#1E262F]/40 shadow-lg">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-sm font-bold text-[#F7F9FA] font-mono">Ledger Node: verified-candidate-0482</h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 text-[9px] font-mono font-bold uppercase">
                <span className="w-1 h-1 rounded-full bg-[#00E5FF] animate-ping" />
                Active Sync
              </span>
            </div>
            <p className="text-xs text-[#8A99A5]">
              Ecosystem registries indexed: <span className="text-[#FFD369]">GitHub Commit Stream</span> & <span className="text-[#FFD369]">University Registrar API</span>
            </p>
          </div>
          <div className="bg-[#0B0F12] border border-[#1E262F] px-4 py-2.5 rounded-lg text-right font-mono text-[10px] text-[#8A99A5] flex flex-col gap-0.5 font-semibold">
            <div><span className="text-[#8A99A5]/60">SYNC TOKEN:</span> <span className="text-[#00E5FF] font-bold">SHA-256://8a2b9f30...</span></div>
            <div><span className="text-[#8A99A5]/60">METRIC RESOLUTION:</span> <span className="text-[#FFD369]">100% Fact-Checked</span></div>
          </div>
        </div>

        {/* TAB A: MY LIVING PORTFOLIO */}
        {candTab === 'portfolio' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left/Middle: Timeline Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-1">
                <h2 className="text-2xl font-extrabold text-[#F7F9FA]">My Living Portfolio</h2>
                <p className="text-sm text-[#8A99A5]">
                  Factual history of verified developer milestones synced from registrar nodes and git ledgers.
                </p>
              </div>

              {/* Timeline list */}
              <div className="relative border-l-2 border-[#1E262F] ml-4 pl-6 space-y-8 py-2">
                {MOCK_MILESTONES.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <div key={item.id} className="relative">
                      {/* Timeline Node Icon Bubble */}
                      <span className="absolute -left-10 top-0.5 bg-[#161B22] border border-[#1E262F] p-2 rounded-lg flex items-center justify-center text-[#00E5FF] shadow-md">
                        <IconComp className="w-4 h-4" />
                      </span>

                      {/* Milestone Card */}
                      <motion.div layout className="bg-[#161B22] border border-[#1E262F] rounded-xl p-5 space-y-4 hover:border-[#00E5FF]/30 transition-all">
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-1">
                            <h3 className="text-sm font-bold text-[#F7F9FA]">{item.title}</h3>
                            <p className="text-xs text-[#8A99A5] leading-relaxed">{item.desc}</p>
                          </div>
                          <span className="text-[10px] font-mono text-[#FFD369] bg-[#FFD369]/10 px-2 py-0.5 rounded border border-[#FFD369]/20 flex-shrink-0">
                            {item.time}
                          </span>
                        </div>

                        {/* Tag Pills */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-[#0B0F12] border border-[#1E262F] rounded text-[10px] font-mono text-[#8A99A5]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Verification Button/Badge */}
                        <motion.div layout className="flex items-center gap-3 pt-3 mt-3 border-t border-[#1E262F]/50">
                          {verifyingMilestone[item.id] === 'verified' ? (
                            <motion.span
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="px-3 py-1.5 bg-[#FFD369]/5 text-[#FFD369] border border-[#FFD369]/30 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(255,211,105,0.08)]"
                            >
                              ✓ Ledger Cryptographically Verified
                            </motion.span>
                          ) : verifyingMilestone[item.id] === 'verifying' ? (
                            <motion.button
                              disabled
                              className="px-3 py-1.5 bg-[#1E262F] border border-[#1E262F] text-[#8A99A5] rounded-lg text-[10px] font-mono font-bold flex items-center gap-2 cursor-wait"
                            >
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                className="w-3.5 h-3.5 border-2 border-t-transparent border-[#FFD369] rounded-full inline-block"
                              />
                              Running Cryptographic Check...
                            </motion.button>
                          ) : (
                            <button
                              onClick={() => handleVerifyStream(item.id, item.title)}
                              className="px-3 py-1.5 bg-[#1E262F] hover:bg-[#FFD369]/10 hover:text-[#FFD369] hover:border-[#FFD369]/20 border border-[#1E262F] text-[#8A99A5] font-mono font-bold rounded-lg text-[10px] transition-all flex items-center gap-1"
                            >
                              Verify Stream Integrity
                            </button>
                          )}
                        </motion.div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Circular Competency Progress Rings */}
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#F7F9FA]">Competency Index</h3>
                <p className="text-xs text-[#8A99A5]">
                  Quantified code volume and index checkpoints.
                </p>
              </div>

              <div className="bg-[#161B22] border border-[#1E262F] rounded-xl p-6 space-y-6">
                
                {/* Python / FastAPI Progress */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#1E262F" strokeWidth="4" fill="transparent" />
                      <circle cx="32" cy="32" r="28" stroke="#00E5FF" strokeWidth="4" fill="transparent"
                        strokeDasharray={175} strokeDashoffset={175 * (1 - 0.75)} strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-[10px] font-mono font-bold text-[#00E5FF]">75u</span>
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-[#F7F9FA]">Python & FastAPI Engine</h4>
                    <p className="text-[10px] text-[#8A99A5]">75 verified codebase telemetry blocks.</p>
                  </div>
                </div>

                {/* Infrastructure / Docker Progress */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#1E262F" strokeWidth="4" fill="transparent" />
                      <circle cx="32" cy="32" r="28" stroke="#FFD369" strokeWidth="4" fill="transparent"
                        strokeDasharray={175} strokeDashoffset={175 * (1 - 0.50)} strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-[10px] font-mono font-bold text-[#FFD369]">50u</span>
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-[#F7F9FA]">Infrastructure & Docker</h4>
                    <p className="text-[10px] text-[#8A99A5]">50 pipeline build logs indexed.</p>
                  </div>
                </div>

                {/* Systems / Go Progress */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#1E262F" strokeWidth="4" fill="transparent" />
                      <circle cx="32" cy="32" r="28" stroke="#FF5252" strokeWidth="4" fill="transparent"
                        strokeDasharray={175} strokeDashoffset={175 * (1 - 0.35)} strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-[10px] font-mono font-bold text-[#FF5252]">35u</span>
                  </div>
              <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-[#F7F9FA]">Go Systems Architecture</h4>
                    <p className="text-[10px] text-[#8A99A5]">35 system socket routines parsed.</p>
                  </div>
                </div>

              </div>

              {/* Live Ledger Telemetry Terminal */}
              <div className="bg-[#161B22] border border-[#1E262F] rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#1E262F]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7F9FA] flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-[#00E5FF]" /> Live Sync Telemetry
                  </h4>
                  <span className="flex items-center gap-1 text-[9px] font-mono text-[#00E5FF]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" /> INDEXER ACTIVE
                  </span>
                </div>
                <div className="bg-[#0B0F12] border border-[#1E262F] rounded p-3 font-mono text-[10px] text-[#8A99A5] space-y-1.5 h-36 overflow-y-auto">
                  {logs.map((log, logIdx) => {
                    let colorClass = "";
                    if (log.includes("success") || log.includes("Connected") || log.includes("Verified") || log.includes("validated")) {
                      colorClass = "text-emerald-400 font-semibold";
                    } else if (log.includes("Initiating") || log.includes("AUDIT:")) {
                      colorClass = "text-[#FFD369]";
                    } else if (log.includes("drift") || log.includes("DRIFT") || log.includes("Warning")) {
                      colorClass = "text-[#FF5252]";
                    }
                    return (
                      <div key={logIdx} className={colorClass}>
                        {log}
                      </div>
                    );
                  })}
                  <div className="text-[#8A99A5]/40 animate-pulse">&gt; [Sync Telemetry Engine Running...]</div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB B: CAREER PATH NAVIGATOR */}
        {candTab === 'navigator' && (
          <div className="space-y-6">
            {/* Top Warning Banner */}
            <div className="p-4 bg-[#FF5252]/10 border border-[#FF5252]/30 rounded-xl flex gap-3 items-center">
              <AlertTriangle className="w-5 h-5 text-[#FF5252] flex-shrink-0 animate-pulse" />
              <p className="text-xs font-bold text-[#F7F9FA]">
                Navigation Mode Active: Visualizing 40-Year Macro Trajectories. Zero predictive black-box metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left/Middle: Custom Interactive SVG Tree */}
              <div className="lg:col-span-2 bg-[#161B22] border border-[#1E262F] rounded-xl p-6 flex flex-col justify-between min-h-[400px]">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#F7F9FA]">Macro Trajectory Roadmap</h3>
                  <p className="text-xs text-[#8A99A5]">Select a trajectory path node below to inspect milestones, design constraints, and identified gaps.</p>
                </div>

                {/* SVG Branches Layout */}
                <div className="relative flex-1 flex items-center justify-center my-6 bg-[#0B0F12]/60 border border-[#1E262F]/40 rounded-xl overflow-hidden shadow-inner p-4 min-h-[300px]">
                  <svg width="100%" height="280" viewBox="0 0 500 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="max-w-md w-full">
                    {/* Grid Background */}
                    <defs>
                      <pattern id="blueprint-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E262F" strokeWidth="0.5" opacity="0.35" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#blueprint-grid)" rx="8" />

                    {/* Connection Lines */}
                    {/* Path 1: MLOps (Top) */}
                    <path
                      d="M 50 120 C 100 60, 120 60, 170 60 H 290 H 410"
                      stroke={selectedPathNode === 'mlops' ? '#00E5FF' : '#1E262F'}
                      strokeWidth={selectedPathNode === 'mlops' ? "3" : "1.5"}
                      strokeOpacity={selectedPathNode === 'mlops' ? "1" : "0.15"}
                      strokeDasharray={selectedPathNode === 'mlops' ? "none" : "3 3"}
                      className="transition-all duration-300"
                    />

                    {/* Path 2: Systems (Middle) */}
                    <path
                      d="M 50 120 H 410"
                      stroke={selectedPathNode === 'systems' ? '#FFD369' : '#1E262F'}
                      strokeWidth={selectedPathNode === 'systems' ? "3" : "1.5"}
                      strokeOpacity={selectedPathNode === 'systems' ? "1" : "0.15"}
                      strokeDasharray={selectedPathNode === 'systems' ? "none" : "3 3"}
                      className="transition-all duration-300"
                    />

                    {/* Path 3: Full-Stack (Bottom) */}
                    <path
                      d="M 50 120 C 100 180, 120 180, 170 180 H 290 H 410"
                      stroke={selectedPathNode === 'fullstack' ? '#F7F9FA' : '#1E262F'}
                      strokeWidth={selectedPathNode === 'fullstack' ? "3" : "1.5"}
                      strokeOpacity={selectedPathNode === 'fullstack' ? "1" : "0.15"}
                      strokeDasharray={selectedPathNode === 'fullstack' ? "none" : "3 3"}
                      className="transition-all duration-300"
                    />

                    {/* ----------------- ROOT NODE ----------------- */}
                    <g className="cursor-default">
                      <circle cx="50" cy="120" r="10" fill="#161B22" stroke="#8A99A5" strokeWidth="2.5" />
                      <circle cx="50" cy="120" r="4" fill="#8A99A5" />
                      <text x="50" y="142" fill="#8A99A5" fontSize="7.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">FOOTPRINT</text>
                    </g>

                    {/* ----------------- MLOPS PATH NODES ----------------- */}
                    {/* Stage 1 */}
                    <g className="cursor-pointer" onClick={() => { setSelectedPathNode('mlops'); setSelectedStageNode(STAGE_DETAILS.ingestion); }}>
                      <circle cx="170" cy="60" r="8" fill="#161B22" stroke={selectedPathNode === 'mlops' ? '#00E5FF' : '#1E262F'} strokeWidth="2" />
                      {selectedPathNode === 'mlops' && <circle cx="170" cy="60" r="3" fill="#00E5FF" />}
                      <text x="170" y="48" fill={selectedPathNode === 'mlops' ? '#00E5FF' : '#8A99A5'} opacity={selectedPathNode === 'mlops' ? 1 : 0.25} fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">INGESTION</text>
                    </g>
                    {/* Stage 2 */}
                    <g className="cursor-pointer" onClick={() => { setSelectedPathNode('mlops'); setSelectedStageNode(STAGE_DETAILS.registry); }}>
                      <circle cx="290" cy="60" r="8" fill="#161B22" stroke={selectedPathNode === 'mlops' ? '#00E5FF' : '#1E262F'} strokeWidth="2" />
                      {selectedPathNode === 'mlops' && <circle cx="290" cy="60" r="3" fill="#00E5FF" />}
                      <text x="290" y="48" fill={selectedPathNode === 'mlops' ? '#00E5FF' : '#8A99A5'} opacity={selectedPathNode === 'mlops' ? 1 : 0.25} fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">REGISTRY</text>
                    </g>
                    {/* Stage 3 (Destination) */}
                    <g className="cursor-pointer" onClick={() => { setSelectedPathNode('mlops'); setSelectedStageNode(STAGE_DETAILS.mlops); }}>
                      <circle cx="410" cy="60" r="12" fill={selectedPathNode === 'mlops' ? '#00E5FF' : '#161B22'} stroke="#00E5FF" strokeWidth="2.5" />
                      <text x="410" y="63" fill={selectedPathNode === 'mlops' ? '#0B0F12' : '#00E5FF'} fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">ML</text>
                      <text x="410" y="82" fill={selectedPathNode === 'mlops' ? '#F7F9FA' : '#8A99A5'} opacity={selectedPathNode === 'mlops' ? 1 : 0.3} fontSize="7.5" fontWeight="bold" textAnchor="middle">MLOps Arch</text>
                    </g>

                    {/* ----------------- SYSTEMS PATH NODES ----------------- */}
                    {/* Stage 1 */}
                    <g className="cursor-pointer" onClick={() => { setSelectedPathNode('systems'); setSelectedStageNode(STAGE_DETAILS.sockets); }}>
                      <circle cx="170" cy="120" r="8" fill="#161B22" stroke={selectedPathNode === 'systems' ? '#FFD369' : '#1E262F'} strokeWidth="2" />
                      {selectedPathNode === 'systems' && <circle cx="170" cy="120" r="3" fill="#FFD369" />}
                      <text x="170" y="140" fill={selectedPathNode === 'systems' ? '#FFD369' : '#8A99A5'} opacity={selectedPathNode === 'systems' ? 1 : 0.25} fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">SOCKETS</text>
                    </g>
                    {/* Stage 2 */}
                    <g className="cursor-pointer" onClick={() => { setSelectedPathNode('systems'); setSelectedStageNode(STAGE_DETAILS.concurrency); }}>
                      <circle cx="290" cy="120" r="8" fill="#161B22" stroke={selectedPathNode === 'systems' ? '#FFD369' : '#1E262F'} strokeWidth="2" />
                      {selectedPathNode === 'systems' && <circle cx="290" cy="120" r="3" fill="#FFD369" />}
                      <text x="290" y="140" fill={selectedPathNode === 'systems' ? '#FFD369' : '#8A99A5'} opacity={selectedPathNode === 'systems' ? 1 : 0.25} fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">CONCURRENCY</text>
                    </g>
                    {/* Stage 3 (Destination) */}
                    <g className="cursor-pointer" onClick={() => { setSelectedPathNode('systems'); setSelectedStageNode(STAGE_DETAILS.systems); }}>
                      <circle cx="410" cy="120" r="12" fill={selectedPathNode === 'systems' ? '#FFD369' : '#161B22'} stroke="#FFD369" strokeWidth="2.5" />
                      <text x="410" y="123" fill={selectedPathNode === 'systems' ? '#0B0F12' : '#FFD369'} fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">DS</text>
                      <text x="410" y="142" fill={selectedPathNode === 'systems' ? '#F7F9FA' : '#8A99A5'} opacity={selectedPathNode === 'systems' ? 1 : 0.3} fontSize="7.5" fontWeight="bold" textAnchor="middle">Systems Lead</text>
                    </g>

                    {/* ----------------- FULL-STACK PATH NODES ----------------- */}
                    {/* Stage 1 */}
                    <g className="cursor-pointer" onClick={() => { setSelectedPathNode('fullstack'); setSelectedStageNode(STAGE_DETAILS.apis); }}>
                      <circle cx="170" cy="180" r="8" fill="#161B22" stroke={selectedPathNode === 'fullstack' ? '#F7F9FA' : '#1E262F'} strokeWidth="2" />
                      {selectedPathNode === 'fullstack' && <circle cx="170" cy="180" r="3" fill="#F7F9FA" />}
                      <text x="170" y="200" fill={selectedPathNode === 'fullstack' ? '#F7F9FA' : '#8A99A5'} opacity={selectedPathNode === 'fullstack' ? 1 : 0.25} fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">APIS</text>
                    </g>
                    {/* Stage 2 */}
                    <g className="cursor-pointer" onClick={() => { setSelectedPathNode('fullstack'); setSelectedStageNode(STAGE_DETAILS.caching); }}>
                      <circle cx="290" cy="180" r="8" fill="#161B22" stroke={selectedPathNode === 'fullstack' ? '#F7F9FA' : '#1E262F'} strokeWidth="2" />
                      {selectedPathNode === 'fullstack' && <circle cx="290" cy="180" r="3" fill="#F7F9FA" />}
                      <text x="290" y="200" fill={selectedPathNode === 'fullstack' ? '#F7F9FA' : '#8A99A5'} opacity={selectedPathNode === 'fullstack' ? 1 : 0.25} fontSize="7" fontWeight="bold" fontFamily="monospace" textAnchor="middle">CACHING</text>
                    </g>
                    {/* Stage 3 (Destination) */}
                    <g className="cursor-pointer" onClick={() => { setSelectedPathNode('fullstack'); setSelectedStageNode(STAGE_DETAILS.fullstack); }}>
                      <circle cx="410" cy="180" r="12" fill={selectedPathNode === 'fullstack' ? '#F7F9FA' : '#161B22'} stroke="#F7F9FA" strokeWidth="2.5" />
                      <text x="410" y="183" fill={selectedPathNode === 'fullstack' ? '#0B0F12' : '#F7F9FA'} fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">FS</text>
                      <text x="410" y="202" fill={selectedPathNode === 'fullstack' ? '#F7F9FA' : '#8A99A5'} opacity={selectedPathNode === 'fullstack' ? 1 : 0.3} fontSize="7.5" fontWeight="bold" textAnchor="middle">Full-Stack Lead</text>
                    </g>
                  </svg>
                </div>

                {selectedStageNode ? (
                  <div className="mt-4 p-4 bg-[#0B0F12]/80 border border-[#1E262F] rounded-lg animate-in slide-in-from-bottom-2 duration-200">
                    <div className="flex justify-between items-center border-b border-[#1E262F]/60 pb-1.5 mb-2">
                      <span className="text-xs font-bold text-[#00E5FF] font-mono">{selectedStageNode.name}</span>
                      <button 
                        onClick={() => setSelectedStageNode(null)}
                        className="text-[9px] text-[#FF5252] hover:underline uppercase font-mono"
                      >
                        Hide Details
                      </button>
                    </div>
                    <p className="text-xs text-[#8A99A5] leading-relaxed mb-2">{selectedStageNode.desc}</p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] text-[#FFD369] font-bold uppercase font-mono">Stage Stack:</span>
                      <span className="text-[9px] text-[#F7F9FA] font-mono bg-[#1E262F]/80 px-1.5 py-0.5 rounded">{selectedStageNode.stack}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-[10px] text-[#8A99A5] text-center font-mono mt-4">
                    Interact with individual nodes on the tree diagram to view step-by-step verification specifications.
                  </div>
                )}
              </div>

              {/* Right: Path Info Panel */}
              <div className="space-y-6">
                <div className="bg-[#161B22] border border-[#1E262F] rounded-xl p-6 space-y-6">
                  <div>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#1E262F] text-[#8A99A5]">
                      TRAJECTORY TELEMETRY
                    </span>
                    <h3 className="text-lg font-bold text-[#F7F9FA] mt-2">
                      {CAREER_NODES[selectedPathNode].title}
                    </h3>
                    <p className="text-xs text-[#8A99A5] mt-1">
                      {CAREER_NODES[selectedPathNode].description}
                    </p>
                  </div>

                  {/* Realistic Project Landscapes */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#00E5FF] font-mono">
                      Realistic Project Landscape
                    </h4>
                    <p className="text-xs text-[#8A99A5] leading-relaxed bg-[#0B0F12] p-3 rounded-lg border border-[#1E262F]">
                      {CAREER_NODES[selectedPathNode].landscape}
                    </p>
                  </div>

                  {/* System Tradeoffs */}
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A99A5] font-mono">
                      System Design Trade-offs
                    </h4>
                    <p className="text-xs text-[#8A99A5] leading-relaxed">
                      {CAREER_NODES[selectedPathNode].tradeoffs}
                    </p>
                  </div>

                  {/* Red alert Skill Gaps */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF5252] font-mono flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-[#FF5252]" /> Identified Skill Gaps
                    </h4>
                    <div className="bg-[#FF5252]/5 border border-[#FF5252]/20 rounded-xl p-4 space-y-2">
                      <ul className="space-y-1.5">
                        {CAREER_NODES[selectedPathNode].gaps.map((gap, idx) => (
                          <li key={idx} className="text-xs text-[#FF5252] font-mono flex items-start gap-2">
                            <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#FF5252]" />
                            <span>Missing Verification: {gap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB C: AI CAREER COACH CHAT INTERFACE */}
        {candTab === 'ai_coach' && (
          <div className="bg-[#161B22] border border-[#1E262F] rounded-xl flex flex-col h-[520px] justify-between shadow-xl">
            
            {/* Header */}
            <div className="p-4 border-b border-[#1E262F] bg-[#0B0F12]/40 flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-[#F7F9FA]">
                  CareerDNA Interactive AI Coach — Real-Time Trajectory Navigation
                </h3>
                <p className="text-[10px] text-[#8A99A5]">Direct telemetry connection to your living portfolio. Zero black-box metrics.</p>
              </div>
              <span className="flex items-center gap-1.5 bg-[#FFD369]/10 text-[#FFD369] px-2.5 py-1 rounded-full border border-[#FFD369]/20 text-[10px] font-mono">
                <Terminal className="w-3 h-3" /> ROADMAP SYNCED
              </span>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 font-sans text-sm">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col max-w-[80%] ${
                    msg.sender === 'user' ? 'ml-auto items-end' : 'items-start'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-[#8A99A5] font-mono">
                      {msg.sender === 'user' ? 'Candidate (You)' : 'CareerDNA Coach'}
                    </span>
                    <span className="text-[9px] text-[#8A99A5]/60 font-mono">{msg.time}</span>
                  </div>
                  <div
                    className={`p-3.5 rounded-xl border leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#00E5FF]/10 border-[#00E5FF]/30 text-[#00E5FF]'
                        : 'bg-[#0B0F12] border-[#1E262F] text-[#8A99A5]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestion Prompt Chips */}
            <div className="px-4 pb-2.5 flex flex-wrap gap-2 text-[10px] font-mono select-none">
              <span className="text-[#8A99A5] self-center">Quick Ask:</span>
              {[
                "Suggest a project to patch my Kafka gap",
                "Verify my database telemetry course",
                "What are the tradeoffs for Distributed Systems?"
              ].map((promptText, pIdx) => (
                <button
                  key={pIdx}
                  type="button"
                  onClick={() => {
                    setInputText(promptText);
                    triggerAutoMessage(promptText);
                  }}
                  className="px-2 py-0.5 bg-[#0B0F12] hover:bg-[#00E5FF]/10 text-[#8A99A5] hover:text-[#00E5FF] border border-[#1E262F] hover:border-[#00E5FF]/30 rounded transition-colors text-[9px]"
                >
                  {promptText}
                </button>
              ))}
            </div>

            {/* Message Input text bar */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-[#1E262F] bg-[#0B0F12]/40 flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about your skill gaps, repo tag triggers, or trajectory paths..."
                className="flex-1 px-4 py-3 bg-[#0B0F12] border border-[#1E262F] rounded-lg text-[#F7F9FA] placeholder-[#8A99A5]/50 focus:border-[#00E5FF] focus:outline-none transition-colors text-xs"
              />
              <button
                type="submit"
                className="p-3 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-[#0B0F12] rounded-lg transition-all flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.2)]"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

      </main>
    </div>
  );
}
