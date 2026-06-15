import { useState } from 'react';
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  Compass,
  GraduationCap,
  HeartPulse,
  Lightbulb,
  Mail,
  Map,
  Menu,
  Sparkles,
  Target,
  Users,
  X,
} from 'lucide-react';
import BrandLogo from './BrandLogo';
import { WORKSPACES } from '../data/workspaceData';
import chitKoKoPhoto from '../../chit_ko_ko.jpg';
import kyawZinWinPhoto from '../../kzw.jpeg';
import winYanNaingPhoto from '../../winyananinghtut.jpg';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'features', label: 'Features' },
  { id: 'trending', label: 'Trending Talent', view: 'trending_talent' },
  { id: 'students', label: 'Students' },
  { id: 'employers', label: 'Employers' },
  { id: 'talentbank', label: 'Talentbank' },
  { id: 'contact', label: 'Contact' },
];

const teamMembers = [
  {
    name: 'Chit Ko Ko',
    email: 'chitko.ko@student.aiu.edu.my',
    linkedin: 'https://www.linkedin.com/in/chit-ko-ko-0b30a3299/',
    github: 'https://github.com/chitko84',
    image: chitKoKoPhoto,
  },
  {
    name: 'Kyaw Zin Win',
    email: 'kyawzin.win@student.aiu.edu.my',
    linkedin: 'https://www.linkedin.com/in/kyaw-zin-win-8aa9913a0/',
    github: 'https://github.com/KyawZinWin999333',
    image: kyawZinWinPhoto,
  },
  {
    name: 'Win Yan Naing Htut',
    email: 'yannaing.htut@student.aiu.edu.my',
    linkedin: 'https://www.linkedin.com/in/win-yan-naing-htut-1152191b4/',
    github: 'https://github.com/noor-yannaing',
    image: winYanNaingPhoto,
  },
];

const trustBadges = [
  'Career OS Platform',
  'Built for Talentbank',
  'Student + Employer Ecosystem',
];

const featureCards = [
  {
    icon: Sparkles,
    title: 'My Strengths',
    text: 'Helps students understand their strongest skills and areas to improve.',
  },
  {
    icon: HeartPulse,
    title: 'Career Health Check',
    text: 'Shows what may be holding a student back from job readiness.',
  },
  {
    icon: Map,
    title: 'Future Me',
    text: 'Shows a simple career roadmap for the next 1, 3, and 5 years.',
  },
  {
    icon: Lightbulb,
    title: 'Hidden Opportunities',
    text: 'Suggests roles students may not realize they qualify for.',
  },
  {
    icon: Compass,
    title: 'Career Coach',
    text: 'Gives clear weekly actions to improve employability.',
  },
  {
    icon: Target,
    title: 'Best-Fit Candidates',
    text: 'Helps employers discover suitable talent faster.',
  },
];

const studentSteps = [
  'Create profile',
  'Add skills and resume',
  'See strengths',
  'Discover career paths',
  'Follow weekly career actions',
  'Match with opportunities',
];

const employerSteps = [
  'Create company profile',
  'Post roles',
  'View student matches',
  'Compare best-fit candidates',
  'Invite candidates',
];

const imageCards = [
  {
    title: 'Students building direction',
    src: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Career fair conversations',
    src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Teamwork and mentoring',
    src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80',
  },
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function GatewayPortal({ setCurrentView }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (id) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  const handleNav = (link) => {
    if (link.view) {
      setCurrentView(link.view);
      setMenuOpen(false);
      return;
    }
    goTo(link.id);
  };

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#141414] font-sans">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#F7F5EF]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <BrandLogo />

          <nav className="hidden items-center gap-6 text-sm font-semibold text-[#3A3A3A] lg:flex">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => handleNav(link)} className="transition hover:text-black">
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              onClick={() => setCurrentView('auth_modal')}
              className="rounded-full border border-black/15 px-4 py-2 text-sm font-bold transition hover:border-black hover:bg-white"
            >
              Launch Platform
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="rounded-full border border-black/10 bg-white p-2 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-black/10 bg-[#F7F5EF] px-5 py-4 lg:hidden">
            <div className="grid gap-3">
              {navLinks.map((link) => (
                <button key={link.id} onClick={() => handleNav(link)} className="text-left text-sm font-semibold">
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => setCurrentView('auth_modal')}
                className="mt-2 rounded-full bg-black px-5 py-3 text-sm font-bold text-white"
              >
                Launch Platform
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="scroll-mt-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
            <div className="space-y-8">
              <div className="inline-flex flex-wrap gap-2">
                {trustBadges.map((badge) => (
                  <span key={badge} className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-bold text-[#454545] shadow-sm">
                    {badge}
                  </span>
                ))}
              </div>

              <div className="space-y-5">
                <p className="text-sm font-extrabold uppercase tracking-[0.28em] text-[#8A6F2A]">Thuriya</p>
                <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight text-black md:text-7xl">
                  Find your path. Build your future.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[#4A4A4A]">
                  Thuriya helps students understand their strengths, discover career paths, and take the next step with confidence.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setCurrentView('auth_modal')}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-4 text-sm font-extrabold text-white shadow-xl shadow-black/15 transition hover:-translate-y-0.5 hover:bg-[#252525]"
                >
                  Explore Platform <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setCurrentView('admin_panel')}
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-6 py-4 text-sm font-extrabold text-black transition hover:-translate-y-0.5 hover:border-black"
                >
                  Judge Admin View
                </button>
                <button
                  onClick={() => goTo('features')}
                  className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white px-6 py-4 text-sm font-extrabold text-black transition hover:-translate-y-0.5 hover:border-black"
                >
                  View Features
                </button>
              </div>

              <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8A6F2A]">Quick Access</p>
                <div className="mt-3 grid gap-2 text-xs text-[#454545] sm:grid-cols-2">
                  <span>Candidate Workspace</span>
                  <span>Employer Workspace</span>
                  <span>University Workspace</span>
                  <span>Admin Workspace</span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <button onClick={() => setCurrentView('candidate_panel')} className="rounded-2xl border border-black/10 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <Users className="mb-3 h-5 w-5" />
                  <span className="block text-sm font-extrabold">Try Student View</span>
                  <span className="text-xs text-[#5C5C5C]">Career guidance and readiness</span>
                </button>
                <button onClick={() => setCurrentView('employer_panel')} className="rounded-2xl border border-black/10 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <Briefcase className="mb-3 h-5 w-5" />
                  <span className="block text-sm font-extrabold">Try Employer View</span>
                  <span className="text-xs text-[#5C5C5C]">Best-fit candidate matching</span>
                </button>
                <button onClick={() => setCurrentView('university_panel')} className="rounded-2xl border border-black/10 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <GraduationCap className="mb-3 h-5 w-5" />
                  <span className="block text-sm font-extrabold">View University Insights</span>
                  <span className="text-xs text-[#5C5C5C]">Student readiness insights</span>
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] bg-black shadow-2xl shadow-black/25">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1100&q=80"
                  alt="Students collaborating on career planning"
                  className="h-[520px] w-full object-cover opacity-90"
                />
              </div>
              <div className="absolute bottom-5 left-5 right-5 rounded-3xl bg-white/92 p-5 shadow-2xl backdrop-blur">
                <p className="text-sm font-black text-black">Your Future. Made Clear.</p>
                <p className="mt-1 text-sm leading-6 text-[#505050]">
                  What career fits me? What should I do next? What opportunities am I not seeing?
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black py-10 text-white">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 lg:grid-cols-3 lg:px-8">
            {imageCards.map((image) => (
              <div key={image.title} className="relative h-64 overflow-hidden rounded-3xl">
                <img src={image.src} alt={image.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-5 left-5 right-5 text-lg font-extrabold">{image.title}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="scroll-mt-24 bg-white py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#8A6F2A]">About</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-black">A clearer map from student life to work.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {[
                ['Problem', 'Many students do not know what career path to choose, what skills they are missing, or how to prepare for their first job.'],
                ['Solution', 'Thuriya gives them a clear map: strengths, gaps, career paths, next steps, and relevant opportunities.'],
                ['Who it helps', 'Students, employers, and universities who want a simpler way to understand readiness and fit.'],
                ['Why it matters', 'Better guidance helps students move with confidence and helps employers discover suitable talent faster.'],
              ].map(([title, text]) => (
                <article key={title} className="rounded-3xl border border-black/10 bg-[#F7F5EF] p-6 shadow-sm">
                  <h3 className="text-lg font-black text-black">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#4B4B4B]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 bg-[#F7F5EF] py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#8A6F2A]">Features</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-black">Simple questions. Useful answers.</h2>
              <p className="mt-4 text-lg leading-8 text-[#4B4B4B]">
                Thuriya is designed around the questions real students ask: What career fits me? What skills am I missing? Where could I be in 5 years?
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featureCards.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article key={feature.title} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-black text-black">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#4B4B4B]">{feature.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="students" className="scroll-mt-24 bg-black py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="space-y-5">
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#D8B866]">For Students</p>
              <h2 className="text-4xl font-black tracking-tight">From unsure to ready.</h2>
              <p className="text-lg leading-8 text-white/70">
                Students can turn skills, projects, and goals into a practical career plan they can act on every week.
              </p>
              <button onClick={() => setCurrentView('candidate_panel')} className="rounded-full bg-white px-6 py-4 text-sm font-extrabold text-black transition hover:bg-[#F7F5EF]">
                Try Student View
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {studentSteps.map((step, index) => (
                <div key={step} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <span className="text-xs font-black text-[#D8B866]">Step {index + 1}</span>
                  <p className="mt-2 text-lg font-extrabold">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="employers" className="scroll-mt-24 bg-white py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {employerSteps.map((step, index) => (
                <div key={step} className="rounded-3xl border border-black/10 bg-[#F7F5EF] p-5 shadow-sm">
                  <span className="text-xs font-black text-[#8A6F2A]">Step {index + 1}</span>
                  <p className="mt-2 text-lg font-extrabold text-black">{step}</p>
                </div>
              ))}
            </div>
            <div className="space-y-5">
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#8A6F2A]">For Employers</p>
              <h2 className="text-4xl font-black tracking-tight text-black">Find candidates who fit your role.</h2>
              <p className="text-lg leading-8 text-[#4B4B4B]">
                Employers can review student matches, compare strengths, and invite promising candidates without sorting through unclear profiles.
              </p>
              <button onClick={() => setCurrentView('employer_panel')} className="rounded-full bg-black px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#252525]">
                Try Employer View
              </button>
            </div>
          </div>
        </section>

        <section id="talentbank" className="scroll-mt-24 bg-[#F7F5EF] py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div className="space-y-5">
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#8A6F2A]">Built for Talentbank Career OS</p>
              <h2 className="text-4xl font-black tracking-tight text-black">Aligned with a better career marketplace.</h2>
              <button onClick={() => setCurrentView('university_panel')} className="rounded-full border border-black bg-black px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#252525]">
                View University Insights
              </button>
            </div>
            <div className="rounded-[2rem] bg-black p-8 text-white shadow-2xl">
              <p className="text-lg leading-8 text-white/80">
                Talentbank is building Asia's Career OS: a better career marketplace that connects students, candidates, universities, and employers.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {[
                  'Talentbank connects universities and employers.',
                  'The platform focuses on Career OS and career marketplace workflows.',
                  'Teams are expected to build candidate and employer experiences.',
                  'The product should be production-ready in the build phase.',
                  'Thuriya helps users see career paths, skill gaps, and realistic next steps.',
                ].map((fact) => (
                  <div key={fact} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#D8B866]" />
                    <p className="text-sm leading-6 text-white/78">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#8A6F2A]">Complete Module Map</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-black">Career tools for candidates, employers, and universities.</h2>
              <p className="mt-4 text-lg leading-8 text-[#4B4B4B]">
                Each workspace includes focused pages for daily work: applications, hiring, internships, student progress, partnerships, and reporting.
              </p>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {[
                ['Candidate Workspace', WORKSPACES.candidate.pages],
                ['Employer Workspace', WORKSPACES.employer.pages],
                ['University Workspace', WORKSPACES.university.pages],
              ].map(([title, pages]) => (
                <article key={title} className="rounded-3xl border border-black/10 bg-[#F7F5EF] p-6">
                  <h3 className="text-xl font-black text-black">{title}</h3>
                  <div className="mt-4 grid gap-2">
                    {pages.map((page, index) => (
                      <div key={page.id} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm">
                        <span className="font-bold text-black">{index + 1}. {page.label}</span>
                        <span className="text-xs font-black text-[#8A6F2A]">Open</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 bg-white py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.22em] text-[#8A6F2A]">Contact</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-black">Talk to the Thuriya team.</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {teamMembers.map((member) => (
                <article key={member.email} className="flex min-h-[390px] flex-col justify-between rounded-[2rem] border border-black/10 bg-[#F7F5EF] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <div>
                    <div className="overflow-hidden rounded-3xl border border-black/10 bg-white">
                      <img
                        src={member.image}
                        alt={`${member.name} profile`}
                        className="aspect-[4/5] w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <h3 className="mt-5 text-2xl font-black text-black">{member.name}</h3>
                    <a href={`mailto:${member.email}`} className="mt-4 flex items-center gap-3 rounded-2xl bg-white p-4 text-sm font-bold text-black transition hover:bg-black hover:text-white">
                      <Mail className="h-5 w-5 flex-shrink-0" />
                      <span className="break-all">{member.email}</span>
                    </a>
                  </div>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="rounded-2xl bg-white p-4 text-center text-sm font-bold text-black transition hover:bg-black hover:text-white">
                      LinkedIn
                    </a>
                    <a href={member.github} target="_blank" rel="noreferrer" className="rounded-2xl bg-white p-4 text-center text-sm font-bold text-black transition hover:bg-black hover:text-white">
                      GitHub
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1fr_1.4fr] lg:px-8">
          <div>
            <BrandLogo variant="dark" />
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">Your Future. Made Clear.</p>
            <p className="mt-6 text-xs font-bold text-[#D8B866]">Built for Talentbank Career OS 2026</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm font-black">Quick links</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/70">
                {navLinks.map((link) => (
                  <button key={link.id} onClick={() => handleNav(link)} className="hover:text-white">
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-black">Workspace access</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-white/70">
                <button onClick={() => setCurrentView('auth_modal')} className="hover:text-white">Launch Platform</button>
                <button onClick={() => setCurrentView('candidate_panel')} className="hover:text-white">Student View</button>
                <button onClick={() => setCurrentView('employer_panel')} className="hover:text-white">Employer View</button>
                <button onClick={() => setCurrentView('university_panel')} className="hover:text-white">University Insights</button>
                <button onClick={() => setCurrentView('admin_panel')} className="hover:text-white">Admin Judge View</button>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl px-5 text-xs text-white/45 lg:px-8">
          Copyright 2026 Thuriya. Built for Talentbank Career OS 2026.
        </div>
      </footer>
    </div>
  );
}
