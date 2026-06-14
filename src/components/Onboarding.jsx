import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, FileText, CheckCircle, Building, Layers, Globe, Calendar, Compass, ShieldCheck } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Onboarding({ selectedRole, setCurrentView, setUniversityConfig }) {
  // Candidate onboarding states
  const [gitConnected, setGitConnected] = useState(false);
  const [gitConnecting, setGitConnecting] = useState(false);
  const [gitStep, setGitStep] = useState('');

  const [registrarConnected, setRegistrarConnected] = useState(false);
  const [registrarConnecting, setRegistrarConnecting] = useState(false);
  const [registrarStep, setRegistrarStep] = useState('');

  const [candError, setCandError] = useState('');

  // Employer onboarding states
  const [companyDomain, setCompanyDomain] = useState('');
  const [targetFocus, setTargetFocus] = useState('mlops');
  const [infraStack, setInfraStack] = useState('kubernetes');
  const [empError, setEmpError] = useState('');

  // University onboarding states
  const [selectedDept, setSelectedDept] = useState('cs');
  const [selectedCohort, setSelectedCohort] = useState('2026');

  const handleConnectGit = () => {
    if (gitConnected) {
      setGitConnected(false);
      return;
    }
    setGitConnecting(true);
    setGitStep('⚡ Connecting API gateway...');
    setTimeout(() => {
      setGitStep('🔍 Reading commit signature ledger...');
      setTimeout(() => {
        setGitStep('✓ Verified! Synced 125 commits.');
        setTimeout(() => {
          setGitConnecting(false);
          setGitConnected(true);
          setGitStep('');
        }, 300);
      }, 400);
    }, 400);
  };

  const handleConnectRegistrar = () => {
    if (registrarConnected) {
      setRegistrarConnected(false);
      return;
    }
    setRegistrarConnecting(true);
    setRegistrarStep('⚡ Syncing university ledger...');
    setTimeout(() => {
      setRegistrarStep('🎓 Downloading academic telemetries...');
      setTimeout(() => {
        setRegistrarStep('✓ Verified! Synced CS-302 coursework.');
        setTimeout(() => {
          setRegistrarConnecting(false);
          setRegistrarConnected(true);
          setRegistrarStep('');
        }, 300);
      }, 400);
    }, 400);
  };

  const handleQuickSeed = () => {
    if (selectedRole === 'candidate') {
      setGitConnected(true);
      setRegistrarConnected(true);
      setCandError('');
    } else if (selectedRole === 'employer') {
      setCompanyDomain('vektor-ops.com');
      setTargetFocus('mlops');
      setInfraStack('kubernetes');
      setEmpError('');
    } else if (selectedRole === 'university') {
      setSelectedDept('cs');
      setSelectedCohort('2026');
    }
  };

  const handleCandidateSubmit = () => {
    if (!gitConnected && !registrarConnected) {
      setCandError('Please link at least one verified footprint registry (GitHub or Registrar API) to generate your living portfolio.');
      return;
    }
    setCandError('');
    setCurrentView('candidate_panel');
  };

  const handleEmployerSubmit = (e) => {
    e.preventDefault();
    if (!companyDomain) {
      setEmpError('Please enter a company domain to establish telemetry.');
      return;
    }
    setEmpError('');
    setCurrentView('employer_panel');
  };

  const handleUniversitySubmit = (e) => {
    e.preventDefault();
    setUniversityConfig({ dept: selectedDept, cohort: selectedCohort });
    setCurrentView('university_panel');
  };

  return (
    <div className="min-h-screen bg-[#0B0F12] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-[#161B22] border border-[#1E262F] rounded-2xl shadow-2xl p-8 space-y-8">
        
        {/* Navigation Indicator */}
        <div className="flex items-center justify-between border-b border-[#1E262F] pb-6 flex-wrap gap-4">
          <BrandLogo />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleQuickSeed}
              className="px-3 py-1.5 bg-[#FFD369]/10 hover:bg-[#FFD369]/20 text-[#FFD369] border border-[#FFD369]/30 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span>⚡ Quick-Seed Demo Telemetry</span>
            </button>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#1E262F] rounded-full border border-[#1E262F]">
              <span className="w-2 h-2 rounded-full bg-[#FFD369]" />
              <span className="text-[10px] text-[#FFD369] font-bold uppercase tracking-wider">
                {selectedRole} Sync Mode
              </span>
            </div>
          </div>
        </div>

        {/* 1. Candidate Onboarding View */}
        {selectedRole === 'candidate' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-[#F7F9FA]">Sync Verified Footprint</h1>
              <p className="text-sm text-[#8A99A5]">
                Link third-party ledgers to automatically build your immutable skills ledger. We bypass manual form entries to guarantee factual career integrity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* GitHub Link Button */}
              <button
                type="button"
                onClick={handleConnectGit}
                disabled={gitConnecting}
                className={`p-6 rounded-xl border text-left flex flex-col justify-between h-42 transition-all relative overflow-hidden ${
                  gitConnected
                    ? 'border-[#00E5FF] bg-[#00E5FF]/5 shadow-[0_0_15px_rgba(0,229,255,0.08)]'
                    : 'border-[#1E262F] bg-[#0B0F12] hover:border-[#8A99A5]/30'
                } ${gitConnecting ? 'cursor-wait border-[#FFD369]/30 bg-[#FFD369]/5' : ''}`}
              >
                <div className="flex justify-between items-start w-full">
                  <GitBranch className={`w-8 h-8 ${gitConnected ? 'text-[#00E5FF]' : gitConnecting ? 'text-[#FFD369]' : 'text-[#8A99A5]'}`} />
                  {gitConnected && <CheckCircle className="w-5 h-5 text-[#00E5FF]" />}
                  {gitConnecting && (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="w-4 h-4 border-2 border-t-transparent border-[#FFD369] rounded-full"
                    />
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-[#F7F9FA]">Connect GitHub Commit Stream</h3>
                  {gitConnecting ? (
                    <p className="text-[10px] font-mono text-[#FFD369] animate-pulse">{gitStep}</p>
                  ) : gitConnected ? (
                    <p className="text-[10px] font-mono text-[#00E5FF]">✓ Connected to Git Webhook</p>
                  ) : (
                    <p className="text-xs text-[#8A99A5]">Analyzes commits, PR logs, and architectural velocity.</p>
                  )}
                </div>
              </button>

              {/* Registrar API Button */}
              <button
                type="button"
                onClick={handleConnectRegistrar}
                disabled={registrarConnecting}
                className={`p-6 rounded-xl border text-left flex flex-col justify-between h-42 transition-all relative overflow-hidden ${
                  registrarConnected
                    ? 'border-[#00E5FF] bg-[#00E5FF]/5 shadow-[0_0_15px_rgba(0,229,255,0.08)]'
                    : 'border-[#1E262F] bg-[#0B0F12] hover:border-[#8A99A5]/30'
                } ${registrarConnecting ? 'cursor-wait border-[#FFD369]/30 bg-[#FFD369]/5' : ''}`}
              >
                <div className="flex justify-between items-start w-full">
                  <FileText className={`w-8 h-8 ${registrarConnected ? 'text-[#00E5FF]' : registrarConnecting ? 'text-[#FFD369]' : 'text-[#8A99A5]'}`} />
                  {registrarConnected && <CheckCircle className="w-5 h-5 text-[#00E5FF]" />}
                  {registrarConnecting && (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="w-4 h-4 border-2 border-t-transparent border-[#FFD369] rounded-full"
                    />
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-[#F7F9FA]">Connect Registrar Academic API</h3>
                  {registrarConnecting ? (
                    <p className="text-[10px] font-mono text-[#FFD369] animate-pulse">{registrarStep}</p>
                  ) : registrarConnected ? (
                    <p className="text-[10px] font-mono text-[#00E5FF]">✓ Connected to Academic Registrar</p>
                  ) : (
                    <p className="text-xs text-[#8A99A5]">Syncs verified university course telemetry and scores.</p>
                  )}
                </div>
              </button>
            </div>

            {/* Simulated telemetry info banner */}
            {(gitConnected || registrarConnected) && (
              <div className="p-4 bg-[#0B0F12] border border-[#1E262F] rounded-xl flex gap-3 items-start">
                <ShieldCheck className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-[#F7F9FA]">Ready to Index Ledger</h4>
                  <p className="text-[11px] text-[#8A99A5]">
                    Data telemetry from {gitConnected && 'GitHub'} {gitConnected && registrarConnected && 'and'} {registrarConnected && 'Registrar API'} has been checked. We will generate the milestone index on completion.
                  </p>
                </div>
              </div>
            )}

            {candError && (
              <div className="p-3 bg-[#FF5252]/10 border border-[#FF5252]/30 rounded-lg text-xs text-[#FF5252] font-semibold">
                {candError}
              </div>
            )}

            {/* Candidate CTA */}
            <div className="pt-4">
              <button
                type="button"
                onClick={handleCandidateSubmit}
                className="w-full py-4 bg-[#00E5FF] text-[#0B0F12] font-extrabold rounded-xl hover:bg-[#00E5FF]/90 transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,229,255,0.2)]"
              >
                <span>Generate Living Portfolio</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. Employer Onboarding View */}
        {selectedRole === 'employer' && (
          <form onSubmit={handleEmployerSubmit} className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-[#F7F9FA]">Ecosystem Setup</h1>
              <p className="text-sm text-[#8A99A5]">
                Configure your recruiter profile to monitor verified developer trajectories and language velocities.
              </p>
            </div>

            <div className="space-y-4">
              {/* Domain Input */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#F7F9FA]">
                  Company Corporate Domain
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#8A99A5]">
                    <Globe className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={companyDomain}
                    onChange={(e) => setCompanyDomain(e.target.value)}
                    placeholder="e.g. vektor-ops.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#0B0F12] border border-[#1E262F] rounded-lg text-[#F7F9FA] placeholder-[#8A99A5]/60 focus:border-[#00E5FF] focus:outline-none transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Trajectory Select */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#F7F9FA]">
                  Target Trajectory Focus
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#8A99A5]">
                    <Compass className="w-4 h-4" />
                  </span>
                  <select
                    value={targetFocus}
                    onChange={(e) => setTargetFocus(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#0B0F12] border border-[#1E262F] rounded-lg text-[#F7F9FA] focus:border-[#00E5FF] focus:outline-none transition-colors text-sm appearance-none"
                  >
                    <option value="mlops">MLOps Platform & Data Architecture</option>
                    <option value="systems">Distributed Systems Engineering</option>
                    <option value="fullstack">Enterprise Full-Stack Infrastructure</option>
                  </select>
                </div>
              </div>

              {/* Core Infra Stacks Select */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-[#F7F9FA]">
                  Core Infrastructure Stack
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#8A99A5]">
                    <Layers className="w-4 h-4" />
                  </span>
                  <select
                    value={infraStack}
                    onChange={(e) => setInfraStack(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#0B0F12] border border-[#1E262F] rounded-lg text-[#F7F9FA] focus:border-[#00E5FF] focus:outline-none transition-colors text-sm appearance-none"
                  >
                    <option value="kubernetes">Docker / Kubernetes / AWS Cloud</option>
                    <option value="kafka">Apache Kafka / PgVector / Python</option>
                    <option value="golang">Golang / Rust / WebAssembly Systems</option>
                  </select>
                </div>
              </div>
            </div>

            {empError && (
              <div className="p-3 bg-[#FF5252]/10 border border-[#FF5252]/30 rounded-lg text-xs text-[#FF5252] font-semibold">
                {empError}
              </div>
            )}

            {/* Employer CTA */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 bg-[#00E5FF] text-[#0B0F12] font-extrabold rounded-xl hover:bg-[#00E5FF]/90 transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,229,255,0.2)]"
              >
                <span>Launch Command Center</span>
              </button>
            </div>
          </form>
        )}

        {/* 3. University Onboarding View */}
        {selectedRole === 'university' && (
          <form onSubmit={handleUniversitySubmit} className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-[#F7F9FA]">Authorize Telemetry Node</h1>
              <p className="text-sm text-[#8A99A5]">
                Configure institutional parameters to analyze real-time cohort curriculum alignments with network job market demands.
              </p>
            </div>

            <div className="space-y-4">
              {/* Department Selection Grid */}
              <div>
                <label className="block text-sm font-bold text-[#F7F9FA] mb-3">
                  Academic Department Focus
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'cs', label: 'Computer Science', sub: 'Systems & Algorithms' },
                    { id: 'ds', label: 'Data Science', sub: 'Machine Learning Pipelines' },
                    { id: 'se', label: 'Software Eng.', sub: 'Enterprise App Architecture' },
                  ].map((dept) => (
                    <button
                      key={dept.id}
                      type="button"
                      onClick={() => setSelectedDept(dept.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedDept === dept.id
                          ? 'border-[#00E5FF] bg-[#00E5FF]/5 shadow-[0_0_15px_rgba(0,229,255,0.1)]'
                          : 'border-[#1E262F] bg-[#0B0F12] hover:border-[#8A99A5]/40'
                      }`}
                    >
                      <Building className="w-5 h-5 text-[#00E5FF] mb-2" />
                      <span className="text-xs font-bold text-[#F7F9FA] block">{dept.label}</span>
                      <span className="text-[10px] text-[#8A99A5] leading-tight block mt-1">{dept.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Graduation Batch Selection */}
              <div>
                <label className="block text-sm font-bold text-[#F7F9FA] mb-3">
                  Active Graduating Cohort
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { year: '2026', desc: 'Summer Batch' },
                    { year: '2027', desc: 'Winter Batch' },
                    { year: '2028', desc: 'Pre-graduates' },
                  ].map((cohort) => (
                    <button
                      key={cohort.year}
                      type="button"
                      onClick={() => setSelectedCohort(cohort.year)}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        selectedCohort === cohort.year
                          ? 'border-[#00E5FF] bg-[#00E5FF]/5 shadow-[0_0_15px_rgba(0,229,255,0.1)]'
                          : 'border-[#1E262F] bg-[#0B0F12] hover:border-[#8A99A5]/40'
                      }`}
                    >
                      <Calendar className="w-5 h-5 text-[#00E5FF] mx-auto mb-2" />
                      <span className="text-xs font-bold text-[#F7F9FA] block">Class of {cohort.year}</span>
                      <span className="text-[9px] text-[#8A99A5] leading-tight block mt-1">{cohort.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* University CTA */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 bg-[#00E5FF] text-[#0B0F12] font-extrabold rounded-xl hover:bg-[#00E5FF]/90 transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(0,229,255,0.2)]"
              >
                <span>Open Telemetry View</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
