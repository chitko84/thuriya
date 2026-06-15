import { useState } from 'react';
import { ArrowRight, Briefcase, GraduationCap, ShieldCheck, User } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { QUICK_ACCESS } from '../data/workspaceData';

const copy = {
  candidate: {
    title: 'Set up your career workspace',
    text: 'Add your interests, strengths, and current goal so your workspace starts in the right place.',
    fields: ['Current goal', 'Preferred role', 'Location'],
    icon: User,
  },
  employer: {
    title: 'Set up your hiring workspace',
    text: 'Add your hiring focus and team needs so your workspace reflects the roles you care about.',
    fields: ['Company name', 'Hiring focus', 'Location'],
    icon: Briefcase,
  },
  university: {
    title: 'Set up your university workspace',
    text: 'Add your programme focus and student group so the workspace opens with useful views.',
    fields: ['University name', 'Programme focus', 'Student group'],
    icon: GraduationCap,
  },
  admin: {
    title: 'Set up platform access',
    text: 'Review the ecosystem from a central workspace.',
    fields: ['Team name', 'Focus area', 'Report cycle'],
    icon: ShieldCheck,
  },
};

export default function Onboarding({ selectedRole, setCurrentView }) {
  const role = selectedRole || 'candidate';
  const workspace = QUICK_ACCESS.find((item) => item.role === role) || QUICK_ACCESS[0];
  const content = copy[role] || copy.candidate;
  const Icon = content.icon;
  const [values, setValues] = useState(Object.fromEntries(content.fields.map((field) => [field, ''])));

  return (
    <div className="min-h-screen bg-[#F7F5EF] p-5 text-black">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-4xl items-center justify-center">
        <div className="w-full rounded-3xl border border-black/10 bg-white p-6 shadow-xl md:p-8">
          <div className="flex flex-col gap-4 border-b border-black/10 pb-6 md:flex-row md:items-center md:justify-between">
            <BrandLogo />
            <button onClick={() => setCurrentView('gateway')} className="text-sm font-bold text-[#555] hover:text-black">
              Back to public site
            </button>
          </div>

          <div className="grid gap-8 py-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                <Icon className="h-6 w-6" />
              </div>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-[#6B6254]">{workspace.title}</p>
              <h1 className="mt-3 text-3xl font-black tracking-tight">{content.title}</h1>
              <p className="mt-4 text-base leading-7 text-[#555]">{content.text}</p>
            </div>

            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                setCurrentView(workspace.view);
              }}
            >
              {content.fields.map((field) => (
                <label key={field} className="block">
                  <span className="mb-2 block text-sm font-black">{field}</span>
                  <input
                    value={values[field]}
                    onChange={(event) => setValues((current) => ({ ...current, [field]: event.target.value }))}
                    placeholder={`Enter ${field.toLowerCase()}`}
                    className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-black"
                  />
                </label>
              ))}
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#292929]">
                Open workspace <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
