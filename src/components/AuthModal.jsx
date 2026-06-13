import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, GraduationCap, Mail, Lock, ArrowRight } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function AuthModal({ setCurrentView, selectedRole, setSelectedRole }) {
  const [activeTab, setActiveTab] = useState('register'); // 'register' | 'login'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all security fields.');
      return;
    }
    if (!selectedRole) {
      setError('Please select an ecosystem workspace role to proceed.');
      return;
    }
    setError('');
    // Advance to onboarding state
    setCurrentView('onboarding');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F12]/80 backdrop-blur-md">
      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-xl max-h-[90vh] flex flex-col bg-[#161B22] border border-[#1E262F] rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header Branding */}
        <div className="p-6 border-b border-[#1E262F] flex items-center justify-between bg-[#0B0F12]/40 flex-shrink-0">
          <BrandLogo />
          <button
            onClick={() => setCurrentView('gateway')}
            className="text-[#8A99A5] hover:text-[#00E5FF] transition-colors text-sm font-medium"
          >
            Back to Portal
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto flex-1">
          {/* Tab Controller */}
          <div className="flex bg-[#0B0F12] p-1 rounded-lg border border-[#1E262F] mb-8">
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
                activeTab === 'register'
                  ? 'bg-[#161B22] text-[#00E5FF] border border-[#1E262F] shadow-md'
                  : 'text-[#8A99A5] hover:text-[#F7F9FA]'
              }`}
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
                activeTab === 'login'
                  ? 'bg-[#161B22] text-[#00E5FF] border border-[#1E262F] shadow-md'
                  : 'text-[#8A99A5] hover:text-[#F7F9FA]'
              }`}
            >
              Account Login
            </button>
          </div>

          {/* Quick Demo Access Credentials */}
          <div className="mb-6 bg-[#0B0F12]/50 border border-[#1E262F] p-4 rounded-xl space-y-2.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FFD369] block">
              ⚡ Quick-Seed Demo Access Pass:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('candidate');
                  setEmail('candidate@careerdna.io');
                  setPassword('secured-passcode-0482');
                  setError('');
                }}
                className="px-2.5 py-1 bg-[#1E262F] hover:bg-[#00E5FF]/15 text-[#8A99A5] hover:text-[#00E5FF] border border-[#1E262F] hover:border-[#00E5FF]/30 rounded text-[10px] font-mono font-semibold transition-all"
              >
                Candidate Demo
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('employer');
                  setEmail('recruiter@vektorops.com');
                  setPassword('secured-passcode-9012');
                  setError('');
                }}
                className="px-2.5 py-1 bg-[#1E262F] hover:bg-[#00E5FF]/15 text-[#8A99A5] hover:text-[#00E5FF] border border-[#1E262F] hover:border-[#00E5FF]/30 rounded text-[10px] font-mono font-semibold transition-all"
              >
                Recruiter Demo
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('university');
                  setEmail('registrar@apextech.edu');
                  setPassword('secured-passcode-cs302');
                  setError('');
                }}
                className="px-2.5 py-1 bg-[#1E262F] hover:bg-[#00E5FF]/15 text-[#8A99A5] hover:text-[#00E5FF] border border-[#1E262F] hover:border-[#00E5FF]/30 rounded text-[10px] font-mono font-semibold transition-all"
              >
                University Demo
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role-Selection Array */}
            <div>
              <label className="block text-sm font-bold text-[#F7F9FA] mb-3">
                Select Ecosystem Workspace Role <span className="text-[#FF5252]">*</span>
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Candidate Workspace */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('candidate');
                    setError('');
                  }}
                  className={`flex flex-row md:flex-col items-center md:justify-center p-3 md:p-4 rounded-xl border text-left md:text-center gap-3 md:gap-0 transition-all ${
                    selectedRole === 'candidate'
                      ? 'border-[#00E5FF] bg-[#00E5FF]/5 shadow-[0_0_15px_rgba(0,229,255,0.1)]'
                      : 'border-[#1E262F] bg-[#0B0F12] hover:border-[#8A99A5]/40'
                  }`}
                >
                  <User className={`w-6 h-6 md:mb-2 flex-shrink-0 ${selectedRole === 'candidate' ? 'text-[#00E5FF]' : 'text-[#8A99A5]'}`} />
                  <div className="flex flex-col md:items-center">
                    <span className="text-xs font-bold text-[#F7F9FA] block">Candidate</span>
                    <span className="text-[10px] text-[#8A99A5] mt-0.5 md:mt-1 leading-tight">Student / Dev Portfolio</span>
                  </div>
                </button>

                {/* Employer Workspace */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('employer');
                    setError('');
                  }}
                  className={`flex flex-row md:flex-col items-center md:justify-center p-3 md:p-4 rounded-xl border text-left md:text-center gap-3 md:gap-0 transition-all ${
                    selectedRole === 'employer'
                      ? 'border-[#00E5FF] bg-[#00E5FF]/5 shadow-[0_0_15px_rgba(0,229,255,0.1)]'
                      : 'border-[#1E262F] bg-[#0B0F12] hover:border-[#8A99A5]/40'
                  }`}
                >
                  <Briefcase className={`w-6 h-6 md:mb-2 flex-shrink-0 ${selectedRole === 'employer' ? 'text-[#00E5FF]' : 'text-[#8A99A5]'}`} />
                  <div className="flex flex-col md:items-center">
                    <span className="text-xs font-bold text-[#F7F9FA] block">Recruiter</span>
                    <span className="text-[10px] text-[#8A99A5] mt-0.5 md:mt-1 leading-tight">Talent Discovery Command</span>
                  </div>
                </button>

                {/* University Console */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('university');
                    setError('');
                  }}
                  className={`flex flex-row md:flex-col items-center md:justify-center p-3 md:p-4 rounded-xl border text-left md:text-center gap-3 md:gap-0 transition-all ${
                    selectedRole === 'university'
                      ? 'border-[#00E5FF] bg-[#00E5FF]/5 shadow-[0_0_15px_rgba(0,229,255,0.1)]'
                      : 'border-[#1E262F] bg-[#0B0F12] hover:border-[#8A99A5]/40'
                  }`}
                >
                  <GraduationCap className={`w-6 h-6 md:mb-2 flex-shrink-0 ${selectedRole === 'university' ? 'text-[#00E5FF]' : 'text-[#8A99A5]'}`} />
                  <div className="flex flex-col md:items-center">
                    <span className="text-xs font-bold text-[#F7F9FA] block">University</span>
                    <span className="text-[10px] text-[#8A99A5] mt-0.5 md:mt-1 leading-tight">Academic Console Telemetry</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#F7F9FA]">
                Workspace Credentials Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#8A99A5]">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. key.developer@careerdna.io"
                  className="w-full pl-10 pr-4 py-3 bg-[#0B0F12] border border-[#1E262F] rounded-lg text-[#F7F9FA] placeholder-[#8A99A5]/60 focus:border-[#00E5FF] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#F7F9FA]">
                Secure Credentials Passcode
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#8A99A5]">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#0B0F12] border border-[#1E262F] rounded-lg text-[#F7F9FA] placeholder-[#8A99A5]/60 focus:border-[#00E5FF] focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-[#FF5252]/10 border border-[#FF5252]/30 rounded-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5252] animate-ping flex-shrink-0" />
                <p className="text-xs text-[#FF5252] font-semibold">{error}</p>
              </div>
            )}

            {/* Form CTA Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-[#00E5FF] text-[#0B0F12] font-bold rounded-xl hover:bg-[#00E5FF]/90 transition-all shadow-[0_4px_20px_rgba(0,229,255,0.2)] flex items-center justify-center gap-2 group"
            >
              <span>Initialize Secure Workspace</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Footer Trajectory Info */}
        <div className="p-4 bg-[#0B0F12] border-t border-[#1E262F] text-center">
          <p className="text-[10px] text-[#8A99A5]">
            CareerDNA utilizes cryptographic evidence pipelines. Zero black-box ranking algorithms.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
