import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, Send, ShieldCheck, Check, 
  Layers, Terminal, X, AlertTriangle 
} from 'lucide-react';
import BrandLogo from './BrandLogo';

// Mock Candidate Discovery Data (No lazy percentages. Factual summaries only)
const MOCK_CANDIDATES = [
  {
    id: 'c-1',
    initials: 'KD',
    name: 'Key.Dev #482',
    summary: 'Candidate is actively scaling out of basic academic scripts into enterprise full-stack distributed database architecture. High code velocity indexed.',
    intent: 'MLOps & Pipeline Systems',
    tags: ['FastAPI', 'Python', 'PgVector', 'Docker'],
    velocity: 'High Velocity (14 commits/week)'
  },
  {
    id: 'c-2',
    initials: 'NS',
    name: 'Net.Socket #119',
    summary: 'Candidate has demonstrated heavy low-level network performance capabilities and multi-threaded partition controls. Solid infrastructure logic.',
    intent: 'Distributed Systems',
    tags: ['Golang', 'Docker', 'Postgres', 'Linux'],
    velocity: 'Consistent (8 commits/week)'
  },
  {
    id: 'c-3',
    initials: 'CO',
    name: 'Comp.Ops #903',
    summary: 'Candidate shows strong compiler optimization foundations but has active skill gaps in deployment caching layers. Actively patching distributed consensus.',
    intent: 'Systems Infrastructure',
    tags: ['Rust', 'WebAssembly', 'Kubernetes', 'AWS'],
    velocity: 'High Velocity (21 commits/week)'
  }
];

// Mock Active Postings Data
const MOCK_POSTINGS = [
  {
    id: 'p-1',
    role: 'MLOps Platform Architect',
    applicants: 4,
    status: 'Active Ingesting',
    stack: 'FastAPI, PgVector, Kafka'
  },
  {
    id: 'p-2',
    role: 'Junior Infrastructure Analyst',
    applicants: 7,
    status: 'Active Ingesting',
    stack: 'Docker, Bash, AWS'
  },
  {
    id: 'p-3',
    role: 'Systems Engineering Lead',
    applicants: 2,
    status: 'Paused Ingesting',
    stack: 'Golang, WebAssembly, Rust'
  }
];

// Mock Signal Feed Data
const MOCK_SIGNALS = [
  "🟢 [Signal Ingest] User 'dev_block_0x4f' just synced a verified FastAPI milestone ledger...",
  "🟢 [Registry Sync] University Registrar updated graduation registry metadata for 2026 Cohort...",
  "🟢 [Telemetry Stream] Cryptographic audit trail generated for Junior Infrastructure Analyst path..."
];

export default function EmployerDashboard({ setCurrentView }) {
  const [empTab, setEmpTab] = useState('discovery'); // 'discovery' | 'postings'
  const [invitedCandidates, setInvitedCandidates] = useState([]); // List of invited candidate IDs
  const [showSandboxModal, setShowSandboxModal] = useState(false);
  const [provisioningStatus, setProvisioningStatus] = useState('idle'); // 'idle' | 'provisioning' | 'completed'
  const [currentSignalIndex, setCurrentSignalIndex] = useState(0);
  const [auditTrailJob, setAuditTrailJob] = useState(null);

  useEffect(() => {
    if (empTab === 'postings') {
      const interval = setInterval(() => {
        setCurrentSignalIndex((prev) => (prev + 1) % MOCK_SIGNALS.length);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [empTab]);

  const handleCloseModal = () => {
    setShowSandboxModal(false);
    setProvisioningStatus('idle');
  };

  // Filter & Search states
  const [selectedTrajectory, setSelectedTrajectory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedVelocity, setSelectedVelocity] = useState('all');
  const [candidateSearchQuery, setCandidateSearchQuery] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleInvite = (candId) => {
    if (invitedCandidates.includes(candId)) return;
    setInvitedCandidates(prev => [...prev, candId]);
    setShowSandboxModal(true);
  };

  const handleCopyPayload = (payloadText) => {
    navigator.clipboard.writeText(payloadText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Filter & Search Logic
  const filteredCandidates = MOCK_CANDIDATES.filter((candidate) => {
    if (candidateSearchQuery) {
      const q = candidateSearchQuery.toLowerCase();
      const matches = 
        candidate.name.toLowerCase().includes(q) ||
        candidate.summary.toLowerCase().includes(q) ||
        candidate.intent.toLowerCase().includes(q) ||
        candidate.tags.some(t => t.toLowerCase().includes(q));
      if (!matches) return false;
    }
    if (selectedTrajectory !== 'all') {
      // Allow slight match
      if (selectedTrajectory === 'mlops' && !candidate.intent.includes('MLOps')) return false;
      if (selectedTrajectory === 'systems' && !candidate.intent.includes('Distributed')) return false;
      if (selectedTrajectory === 'infra' && !candidate.intent.includes('Infrastructure')) return false;
    }
    if (selectedLanguage !== 'all' && !candidate.tags.map(t => t.toLowerCase()).includes(selectedLanguage.toLowerCase())) {
      return false;
    }
    if (selectedVelocity !== 'all') {
      if (selectedVelocity === 'high' && !candidate.velocity.includes('High')) return false;
      if (selectedVelocity === 'consistent' && !candidate.velocity.includes('Consistent')) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0B0F12] text-[#F7F9FA] flex flex-col font-sans">
      
      {/* Top Header Section */}
      <header className="w-full bg-[#161B22] border-b border-[#1E262F] px-6 py-4 sticky top-0 z-40 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <BrandLogo />
          {/* Tab Controller Links */}
          <div className="flex gap-4">
            <button
              onClick={() => setEmpTab('discovery')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                empTab === 'discovery'
                  ? 'bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/20'
                  : 'text-[#8A99A5] hover:text-[#F7F9FA]'
              }`}
            >
              Talent Discovery
            </button>
            <button
              onClick={() => setEmpTab('postings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                empTab === 'postings'
                  ? 'bg-[#00E5FF]/15 text-[#00E5FF] border border-[#00E5FF]/20'
                  : 'text-[#8A99A5] hover:text-[#F7F9FA]'
              }`}
            >
              Active Postings Tracker
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-[#8A99A5] bg-[#0B0F12] px-3 py-1 rounded border border-[#1E262F]">
            Node: Recruiter Command Center
          </span>
          <button
            onClick={() => setCurrentView('gateway')}
            className="px-4 py-2 bg-[#1E262F] hover:bg-[#FF5252] text-[#8A99A5] hover:text-[#F7F9FA] font-bold rounded-lg text-xs transition-all"
          >
            Exit Console
          </button>
        </div>
      </header>

      {/* Main Panel Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        
        {/* Recruiter SaaS Header Console */}
        <div className="bg-[#161B22] border border-[#1E262F] rounded-xl p-5 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-[#161B22] to-[#1E262F]/40 shadow-lg">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-sm font-bold text-[#F7F9FA] font-mono">Workspace Token: Vektor-Ops-Command-Central</h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 text-[9px] font-mono font-bold uppercase">
                <span className="w-1 h-1 rounded-full bg-[#00E5FF] animate-pulse" />
                Telemetry Ingesting
              </span>
            </div>
            <p className="text-xs text-[#8A99A5]">
              Monitoring verified language competencies for <span className="text-[#00E5FF]">MLOps Pipelines</span> and <span className="text-[#FFD369]">Distributed Systems</span>
            </p>
          </div>
          <div className="bg-[#0B0F12] border border-[#1E262F] px-4 py-2.5 rounded-lg text-right font-mono text-[10px] text-[#8A99A5] flex flex-col gap-0.5 font-semibold">
            <div><span className="text-[#8A99A5]/60">PIPELINES INSTANTIATED:</span> <span className="text-[#FFD369]">3 Active Listings</span></div>
            <div><span className="text-[#8A99A5]/60">SANDBOX HOST:</span> <span className="text-[#00E5FF]">aws-us-east-2.dna.sh</span></div>
          </div>
        </div>

        {/* Tab A: Talent Discovery Module */}
        {empTab === 'discovery' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Left Column: Filter Controls */}
            <div className="lg:col-span-1 bg-[#161B22] border border-[#1E262F] rounded-xl p-5 space-y-6 self-start">
              <div className="flex items-center gap-2 pb-3 border-b border-[#1E262F]">
                <Filter className="w-4 h-4 text-[#00E5FF]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#F7F9FA]">Talent Filters</h3>
              </div>

              {/* Trajectory filter */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase text-[#8A99A5] font-mono">
                  Trajectory Intent
                </label>
                <select
                  value={selectedTrajectory}
                  onChange={(e) => setSelectedTrajectory(e.target.value)}
                  className="w-full bg-[#0B0F12] border border-[#1E262F] rounded px-3 py-2 text-xs text-[#F7F9FA] focus:border-[#00E5FF] focus:outline-none"
                >
                  <option value="all">All Trajectories</option>
                  <option value="mlops">MLOps & Pipelines</option>
                  <option value="systems">Distributed Systems</option>
                </select>
              </div>

              {/* Language filter */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase text-[#8A99A5] font-mono">
                  Verified Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full bg-[#0B0F12] border border-[#1E262F] rounded px-3 py-2 text-xs text-[#F7F9FA] focus:border-[#00E5FF] focus:outline-none"
                >
                  <option value="all">All Languages</option>
                  <option value="python">Python</option>
                  <option value="golang">Golang</option>
                  <option value="rust">Rust</option>
                </select>
              </div>

              {/* Code Velocity Filter */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold uppercase text-[#8A99A5] font-mono">
                  Velocity Ratio
                </label>
                <select
                  value={selectedVelocity}
                  onChange={(e) => setSelectedVelocity(e.target.value)}
                  className="w-full bg-[#0B0F12] border border-[#1E262F] rounded px-3 py-2 text-xs text-[#F7F9FA] focus:border-[#00E5FF] focus:outline-none"
                >
                  <option value="all">All Velocities</option>
                  <option value="high">High Velocity (&gt; 10 commits)</option>
                  <option value="consistent">Consistent (&gt; 5 commits)</option>
                </select>
              </div>
            </div>

            {/* Right Column: Candidates Feed */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h2 className="text-lg font-bold border-l-4 border-[#00E5FF] pl-3">
                  Verified Candidates Telemetry Feed
                </h2>
                <span className="text-xs text-[#8A99A5] font-mono">
                  {filteredCandidates.length} matches found
                </span>
              </div>

              {/* Text Search Input */}
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#8A99A5] group-focus-within:text-[#00E5FF] transition-colors">
                  <Terminal className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={candidateSearchQuery}
                  onChange={(e) => setCandidateSearchQuery(e.target.value)}
                  placeholder="Search candidate names, tags, or description parameters..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0C1014] border border-[#1E262F] rounded-xl text-[#F7F9FA] placeholder-[#8A99A5]/40 focus:border-[#00E5FF] focus:outline-none transition-all text-xs"
                />
              </div>

              {/* Candidates Grid */}
              <div className="space-y-4">
                {filteredCandidates.length > 0 ? (
                  filteredCandidates.map((candidate) => {
                    const isInvited = invitedCandidates.includes(candidate.id);
                    return (
                      <div
                        key={candidate.id}
                        className="bg-[#161B22] border border-[#1E262F] rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#00E5FF]/20 transition-all"
                      >
                        <div className="flex gap-4 items-start flex-1">
                          {/* Cryptographic Initials Container */}
                          <div className="w-12 h-12 rounded-xl bg-[#0B0F12] border border-[#1E262F] flex items-center justify-center text-[#00E5FF] font-bold text-sm shadow-inner flex-shrink-0">
                            {candidate.initials}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-sm font-bold text-[#F7F9FA] font-mono">{candidate.name}</h3>
                              <span className="text-[9px] font-mono font-bold text-[#FFD369] bg-[#FFD369]/10 px-2 py-0.5 rounded border border-[#FFD369]/20">
                                {candidate.velocity}
                              </span>
                            </div>
                            {/* Honest trajectory statements */}
                            <p className="text-xs text-[#8A99A5] leading-relaxed max-w-xl">
                              {candidate.summary}
                            </p>

                            {/* Stacks pills */}
                            <div className="flex flex-wrap gap-2 pt-1">
                              {candidate.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 bg-[#0B0F12] border border-[#1E262F] rounded text-[10px] font-mono text-[#8A99A5]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Invitation CTA */}
                        <div className="w-full md:w-auto flex-shrink-0">
                          <button
                            onClick={() => handleInvite(candidate.id)}
                            disabled={isInvited}
                            className={`w-full md:w-auto py-2.5 px-4 font-extrabold text-xs rounded-lg transition-all flex items-center justify-center gap-2 ${
                              isInvited
                                ? 'bg-[#FFD369]/10 text-[#FFD369] border border-[#FFD369]/20 cursor-default'
                                : 'bg-[#00E5FF] text-[#0B0F12] hover:bg-[#00E5FF]/90 shadow-[0_0_12px_rgba(0,229,255,0.1)]'
                            }`}
                          >
                            {isInvited ? (
                              <>
                                <Check className="w-4 h-4" />
                                <span>Pipeline Streamed</span>
                              </>
                            ) : (
                              <>
                                <Send className="w-4 h-4" />
                                <span>Invite to Workspace Pipeline</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="bg-[#161B22] border border-[#1E262F] rounded-xl p-12 text-center space-y-2">
                    <Layers className="w-8 h-8 text-[#FF5252] mx-auto opacity-60" />
                    <h4 className="text-sm font-bold text-[#F7F9FA]">No Ledger Matches Found</h4>
                    <p className="text-xs text-[#8A99A5]">Try clearing telemetry filters to expand candidate scans.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* Tab B: Active Postings Tracker Module */}
        {empTab === 'postings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold border-l-4 border-[#00E5FF] pl-3">
                Active Listings Telemetry Status
              </h2>
              <span className="text-xs text-[#8A99A5] font-mono">
                Monitoring 3 pipeline streams
              </span>
            </div>

            {/* Feature 1: Real-Time Live Signal Ticker */}
            <div className="bg-[#11161B]/60 backdrop-blur-md border border-[#30363D] rounded-xl p-4 overflow-hidden h-14 flex items-center shadow-lg relative my-4">
              <div className="absolute left-4 z-10 bg-[#11161B] pr-2 flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#FFD369] font-mono select-none">
                <span>SIGNAL FEED</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <div className="w-full pl-28 relative h-6 overflow-hidden flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSignalIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-xs text-[#00E5FF] font-semibold truncate"
                  >
                    {MOCK_SIGNALS[currentSignalIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Table layout */}
            <div className="bg-[#161B22] border border-[#1E262F] rounded-xl overflow-hidden shadow-xl">
              <table className="w-full border-collapse text-left text-xs font-sans">
                <thead>
                  <tr className="bg-[#0B0F12]/40 border-b border-[#1E262F] text-[#8A99A5] font-bold font-mono">
                    <th className="p-4 uppercase tracking-wider">Position Title</th>
                    <th className="p-4 uppercase tracking-wider">Mandated Stack</th>
                    <th className="p-4 uppercase tracking-wider">Telemetry State</th>
                    <th className="p-4 uppercase tracking-wider">Synced Candidates</th>
                    <th className="p-4 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E262F]">
                  {MOCK_POSTINGS.map((post) => (
                    <tr key={post.id} className="hover:bg-[#1E262F]/10 transition-colors">
                      {/* Role */}
                      <td className="p-4">
                        <span className="font-bold text-[#F7F9FA] block">{post.role}</span>
                      </td>

                      {/* Stack */}
                      <td className="p-4">
                        <span className="font-mono text-[#8A99A5]">{post.stack}</span>
                      </td>

                      {/* Telemetry Status */}
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          post.status.includes('Active')
                            ? 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20'
                            : 'bg-[#FF5252]/10 text-[#FF5252] border border-[#FF5252]/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            post.status.includes('Active') ? 'bg-[#00E5FF] animate-pulse' : 'bg-[#FF5252]'
                          }`} />
                          {post.status}
                        </span>
                      </td>

                      {/* Applicant badge */}
                      <td className="p-4">
                        <span className="font-bold text-[#FFD369] bg-[#FFD369]/10 px-2.5 py-1 rounded-full border border-[#FFD369]/20 font-mono text-[10px]">
                          {post.applicants} Synced Ledgers
                        </span>
                      </td>

                      {/* Action */}
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setAuditTrailJob(post)}
                          className="px-3 py-1.5 bg-[#1E262F] hover:bg-[#00E5FF] hover:text-[#0B0F12] text-[#8A99A5] font-bold rounded transition-all text-[11px]"
                        >
                          Inspect Telemetry Streams
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Sandbox Provisioning Modal */}
      <AnimatePresence>
        {showSandboxModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-[#0B0F12] z-50 cursor-pointer"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="fixed inset-x-4 inset-y-auto md:inset-0 m-auto w-[calc(100%-2rem)] md:w-full max-w-md max-h-[90vh] overflow-y-auto bg-[#161B22] border border-[#1E262F] rounded-2xl p-6 z-50 shadow-2xl space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-[#1E262F] pb-4">
                <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF]">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#F7F9FA]">Workspace Invitation Active</h3>
                  <p className="text-[11px] text-[#8A99A5]">Recruitment telemetry pipeline established.</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-[#8A99A5] leading-relaxed">
                  The candidate's ledger stream has been synced. To evaluate their capabilities in a secure container sandbox, provision their telemetry runtime environment.
                </p>
                <div className="bg-[#0B0F12] p-3 rounded-lg border border-[#1E262F] font-mono text-[10px] text-[#8A99A5] space-y-1">
                  <div className="flex justify-between">
                    <span>Target Node:</span>
                    <span className="text-[#F7F9FA]">aws-us-east-2.dna.sh</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-[#FFD369]">
                      {provisioningStatus === 'completed' ? 'Telemetry Online' : 'Awaiting Provisioning'}
                    </span>
                  </div>
                </div>

                {/* Docker Sandbox Telemetry Terminal */}
                {provisioningStatus !== 'idle' && (
                  <div className="bg-[#0B0F12] border border-[#1E262F] rounded p-3 font-mono text-[10px] text-[#8A99A5] space-y-1 h-32 overflow-y-auto">
                    <div className="text-[#00E5FF] font-semibold">&gt; [10:06:01] CONTAINER: Initializing sandbox context...</div>
                    {provisioningStatus === 'provisioning' ? (
                      <>
                        <div className="animate-pulse">&gt; [10:06:02] DOCKER: Pulling vector-runtime-env:latest...</div>
                        <div className="text-[#8A99A5]/40">&gt; [10:06:02] DOCKER: Layer extraction...</div>
                      </>
                    ) : (
                      <>
                        <div>&gt; [10:06:02] DOCKER: Pulling vector-runtime-env:latest... Complete.</div>
                        <div>&gt; [10:06:02] DOCKER: Spawning isolated sandbox environment...</div>
                        <div className="text-emerald-500 font-semibold">&gt; [10:06:03] CONTAINER: Listening on port 8080. Sandbox online.</div>
                        <div className="text-[#FFD369] font-semibold">&gt; [10:06:03] TELEMETRY: Streaming candidate ledger data... Connected.</div>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleCloseModal}
                  className="flex-1 py-2.5 bg-[#1E262F] hover:bg-[#1E262F]/80 text-[#8A99A5] font-bold rounded-xl text-xs transition-all border border-[#1E262F]"
                >
                  Configure Later
                </button>
                
                <button
                  onClick={() => {
                    setProvisioningStatus('provisioning');
                    setTimeout(() => {
                      setProvisioningStatus('completed');
                    }, 1500);
                  }}
                  disabled={provisioningStatus !== 'idle'}
                  className="flex-1 py-2.5 bg-[#00E5FF] text-[#0B0F12] disabled:bg-[#FFD369]/10 disabled:text-[#FFD369] font-extrabold rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)] flex items-center justify-center gap-1.5"
                >
                  {provisioningStatus === 'idle' && (
                    <span>Provision Telemetry Sandbox Environment</span>
                  )}
                  {provisioningStatus === 'provisioning' && (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="w-3.5 h-3.5 border-2 border-t-transparent border-[#0B0F12] rounded-full inline-block"
                      />
                      <span>Provisioning...</span>
                    </>
                  )}
                  {provisioningStatus === 'completed' && (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Sandbox Ready</span>
                    </>
                  )}
                </button>
              </div>

              {provisioningStatus === 'completed' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-[#00E5FF]/5 border border-[#00E5FF]/20 rounded-xl text-[11px] text-[#00E5FF] font-mono flex items-start gap-2"
                >
                  <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Success:</span> Container online. Sync logs via remote bash endpoint inside recruiter credentials console.
                  </div>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Feature 3: Cryptographic Audit Trail Modal */}
      <AnimatePresence>
        {auditTrailJob && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setAuditTrailJob(null)}
              className="fixed inset-0 bg-[#0B0F12]/80 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-x-4 inset-y-auto md:inset-0 m-auto w-[calc(100%-2rem)] md:w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#161B22] border border-[#1E262F] rounded-2xl p-6 z-50 shadow-2xl space-y-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#1E262F] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFD369]/10 border border-[#FFD369]/20 flex items-center justify-center text-[#FFD369]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#F7F9FA]">Verified Ledger Audit Trail</h3>
                    <p className="text-[11px] text-[#8A99A5] font-mono">{auditTrailJob.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Glowing Verified Light */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20 text-[9px] font-mono font-bold uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                    ✓ Verified Secure
                  </span>
                  <button
                    onClick={() => setAuditTrailJob(null)}
                    className="p-1.5 bg-[#0B0F12] border border-[#1E262F] rounded-lg hover:border-[#FF5252]/40 text-[#8A99A5] hover:text-[#FF5252] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Code payload container */}
              <div className="space-y-3">
                <p className="text-xs text-[#8A99A5] leading-relaxed">
                  Cryptographic ledger proof of applicant capabilities synced from public registrar nodes:
                </p>
                <div className="bg-[#0B0F12] p-5 rounded-xl border border-[#1E262F] font-mono text-xs text-[#F7F9FA] space-y-2 overflow-x-auto select-all shadow-inner relative">
                  <button
                    onClick={() => handleCopyPayload(
`[BLOCK #9,412] AUTHORIZED BY: CENTRAL REGISTRAR NETWORK
TIMESTAMP: 2026-06-14Z04:47:00
HASH: 8f2d93e1a8b3c4d5e6f7g8h9i0j2k1l3m4n5o6p7c2b
PAYLOAD: {
  milestone: "Advanced Distributed Systems Lab",
  validation_source: "GitHub Actions + Registrar API",
  status: "IMMUTABLE_INTEGRITY_VERIFIED"
}`
                    )}
                    className="absolute top-3 right-3 text-[8px] uppercase tracking-wider text-[#8A99A5] border border-[#1E262F] hover:border-[#00E5FF]/40 hover:text-[#00E5FF] px-2 py-0.5 rounded font-mono transition-colors"
                  >
                    {isCopied ? "✓ COPIED" : "COPY BLOCK"}
                  </button>
                  <div>[BLOCK #9,412] AUTHORIZED BY: CENTRAL REGISTRAR NETWORK</div>
                  <div>TIMESTAMP: 2026-06-14Z04:47:00</div>
                  <div>HASH: 8f2d93e1a8b3c4d5e6f7g8h9i0j2k1l3m4n5o6p7c2b</div>
                  <div className="text-[#8A99A5] mt-2">PAYLOAD: &#123;</div>
                  <div className="pl-4 text-[#00E5FF]">&nbsp;&nbsp;milestone: "Advanced Distributed Systems Lab",</div>
                  <div className="pl-4 text-[#FFD369]">&nbsp;&nbsp;validation_source: "GitHub Actions + Registrar API",</div>
                  <div className="pl-4 text-[#10B981]">&nbsp;&nbsp;status: "IMMUTABLE_INTEGRITY_VERIFIED"</div>
                  <div className="text-[#8A99A5]">&#125;</div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setAuditTrailJob(null)}
                  className="px-5 py-2.5 bg-[#1E262F] hover:bg-[#1E262F]/80 text-[#8A99A5] hover:text-[#F7F9FA] font-bold rounded-xl text-xs transition-colors border border-[#1E262F]"
                >
                  Close Audit Inspector
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
