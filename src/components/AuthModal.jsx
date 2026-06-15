import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, GraduationCap, KeyRound, Lock, Mail, ShieldCheck, User } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { QUICK_ACCESS } from '../data/workspaceData';

const roleIcons = {
  candidate: User,
  employer: Briefcase,
  university: GraduationCap,
  admin: ShieldCheck,
};

export default function AuthModal({ setCurrentView, selectedRole, setSelectedRole }) {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const enterWorkspace = (workspace) => {
    setSelectedRole(workspace.role);
    setEmail(workspace.email);
    setPassword('');
    setError('');
    setMessage('');
    setCurrentView(workspace.view);
  };

  const submit = (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (activeTab === 'forgot') {
      if (!email.trim()) {
        setError('Enter your email address to continue.');
        return;
      }
      setMessage('We prepared a secure reset step for this workspace.');
      setActiveTab('reset');
      return;
    }

    if (!email.trim() || !password.trim()) {
      setError('Enter your email and password to continue.');
      return;
    }

    if (password.length < 10) {
      setError('Use at least 10 characters for a safer password.');
      return;
    }

    if (activeTab === 'reset') {
      setMessage('Your password has been updated.');
      setActiveTab('login');
      return;
    }

    if (!selectedRole) {
      setError('Choose a workspace before continuing.');
      return;
    }

    const account = QUICK_ACCESS.find((item) => item.email === email || item.role === selectedRole);
    setCurrentView(account?.view || 'onboarding');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <BrandLogo />
          <button onClick={() => setCurrentView('gateway')} className="text-sm font-bold text-[#555] transition hover:text-black">
            Back to public site
          </button>
        </div>

        <div className="grid max-h-[calc(92vh-82px)] overflow-y-auto lg:grid-cols-[1.15fr_0.85fr]">
          <section className="border-b border-black/10 p-6 lg:border-b-0 lg:border-r">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#6B6254]">Quick Access</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-black">Choose a workspace</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#555]">
              Enter the platform directly and explore the tools for each audience.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {QUICK_ACCESS.map((workspace) => {
                const Icon = roleIcons[workspace.role];
                return (
                  <article key={workspace.role} className="rounded-2xl border border-black/10 bg-[#F7F5EF] p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-4 text-lg font-black text-black">{workspace.title}</h2>
                    <p className="mt-2 min-h-14 text-sm leading-6 text-[#555]">{workspace.description}</p>
                    <button
                      type="button"
                      onClick={() => enterWorkspace(workspace)}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#292929]"
                    >
                      Enter Workspace <ArrowRight className="h-4 w-4" />
                    </button>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="p-6">
            <div className="grid grid-cols-2 gap-1 rounded-xl border border-black/10 bg-[#F7F5EF] p-1">
              {[
                ['login', 'Sign in'],
                ['register', 'Create account'],
                ['forgot', 'Forgot password'],
                ['reset', 'Reset password'],
              ].map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setActiveTab(id);
                    setError('');
                    setMessage('');
                  }}
                  className={`rounded-lg px-3 py-2 text-xs font-black transition ${
                    activeTab === id ? 'bg-black text-white' : 'text-[#555] hover:text-black'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-black text-black">Workspace</label>
                <div className="grid grid-cols-2 gap-2">
                  {QUICK_ACCESS.map((workspace) => {
                    const Icon = roleIcons[workspace.role];
                    return (
                      <button
                        key={workspace.role}
                        type="button"
                        onClick={() => {
                          setSelectedRole(workspace.role);
                          setEmail(workspace.email);
                        }}
                        className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-xs font-bold transition ${
                          selectedRole === workspace.role ? 'border-black bg-black text-white' : 'border-black/10 bg-white text-black hover:border-black'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {workspace.title.replace(' Workspace', '')}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-black text-black">Email address</span>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="name@careeros.com"
                    className="w-full rounded-xl border border-black/10 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-black"
                  />
                </div>
              </label>

              {activeTab !== 'forgot' && (
                <label className="block">
                  <span className="mb-2 block text-sm font-black text-black">{activeTab === 'reset' ? 'New password' : 'Password'}</span>
                  <div className="relative">
                    {activeTab === 'reset' ? <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777]" /> : <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777]" />}
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-black/10 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-black"
                    />
                  </div>
                </label>
              )}

              {error && <div className="rounded-xl border border-black/10 bg-[#F7F5EF] px-4 py-3 text-sm font-semibold text-black">{error}</div>}
              {message && <div className="rounded-xl border border-black/10 bg-[#F7F5EF] px-4 py-3 text-sm font-semibold text-black">{message}</div>}

              <button type="submit" className="w-full rounded-xl bg-black px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#292929]">
                {activeTab === 'forgot' ? 'Continue' : activeTab === 'reset' ? 'Update password' : activeTab === 'register' ? 'Create account' : 'Sign in'}
              </button>
            </form>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
