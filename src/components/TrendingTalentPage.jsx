import { useMemo, useState } from 'react';
import { ArrowLeft, Briefcase, GraduationCap, MapPin, Search, SlidersHorizontal, Star, X } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { TRENDING_TALENT } from '../data/trendingTalent';

export default function TrendingTalentPage({ setCurrentView }) {
  const [query, setQuery] = useState('');
  const [field, setField] = useState('All fields');
  const [location, setLocation] = useState('All locations');
  const [sort, setSort] = useState('match');
  const [selectedProfile, setSelectedProfile] = useState(null);

  const fields = ['All fields', ...new Set(TRENDING_TALENT.map((person) => person.field))];
  const locations = ['All locations', ...new Set(TRENDING_TALENT.map((person) => person.location))];

  const filteredTalent = useMemo(() => {
    const text = query.trim().toLowerCase();
    return TRENDING_TALENT
      .filter((person) => {
        const matchesText = !text || [person.name, person.field, person.organization, person.interest, ...person.skills].join(' ').toLowerCase().includes(text);
        const matchesField = field === 'All fields' || person.field === field;
        const matchesLocation = location === 'All locations' || person.location === location;
        return matchesText && matchesField && matchesLocation;
      })
      .sort((a, b) => {
        if (sort === 'newest') return new Date(b.joined) - new Date(a.joined);
        return b.score - a.score;
      });
  }, [field, location, query, sort]);

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-black">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#F7F5EF]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <BrandLogo />
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentView('gateway')} className="hidden rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold transition hover:border-black md:inline-flex">
              Back to Home
            </button>
            <button onClick={() => setCurrentView('auth_modal')} className="rounded-full bg-black px-4 py-2 text-sm font-extrabold text-white transition hover:bg-[#292929]">
              Launch Platform
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
          <button onClick={() => setCurrentView('gateway')} className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#555] transition hover:text-black">
            <ArrowLeft className="h-4 w-4" />
            Back to public site
          </button>

          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.24em] text-[#8A6F2A]">Trending Talent</p>
              <h1 className="mt-4 max-w-4xl text-5xl font-black leading-none tracking-tight md:text-7xl">
                Trending Potential Employees
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4A4A4A]">
                Discover emerging talent with strong skills, career momentum, and high employer interest.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm">
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <p className="text-3xl font-black">{TRENDING_TALENT.length}</p>
                  <p className="mt-1 text-sm font-semibold text-[#555]">People currently featured</p>
                </div>
                <div>
                  <p className="text-3xl font-black">85-96%</p>
                  <p className="mt-1 text-sm font-semibold text-[#555]">Match score range</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-black/10 bg-white">
          <div className="mx-auto grid max-w-7xl gap-3 px-5 py-5 lg:grid-cols-[1fr_220px_220px_180px] lg:px-8">
            <label className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name or skill"
                className="w-full rounded-2xl border border-black/10 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-black"
              />
            </label>
            <select value={field} onChange={(event) => setField(event.target.value)} className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-black">
              {fields.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={location} onChange={(event) => setLocation(event.target.value)} className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-black">
              {locations.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold outline-none transition focus:border-black">
              <option value="match">Sort by match score</option>
              <option value="newest">Sort by newest profile</option>
            </select>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <div className="space-y-4">
            {filteredTalent.map((person) => (
              <article key={person.id} className="rounded-3xl border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
                <div className="grid gap-5 lg:grid-cols-[70px_1.4fr_1fr_130px] lg:items-center">
                  <div className="flex items-center gap-4 lg:block">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-lg font-black text-white lg:mx-auto">#{person.rank}</div>
                    <img src={person.image} alt={`${person.name} profile`} className="h-16 w-16 rounded-2xl border border-black/10 bg-[#F7F5EF] object-cover lg:mx-auto lg:mt-3" />
                  </div>

                  <div>
                    <h2 className="text-xl font-black">{person.name}</h2>
                    <div className="mt-2 flex flex-wrap gap-3 text-sm font-semibold text-[#555]">
                      <span className="inline-flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {person.field}</span>
                      <span className="inline-flex items-center gap-1.5"><GraduationCap className="h-4 w-4" /> {person.organization}</span>
                      <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {person.location}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {person.skills.map((skill) => (
                        <span key={skill} className="rounded-full border border-black/10 bg-[#F7F5EF] px-3 py-1 text-xs font-bold text-black">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8A6F2A]">Career Interest</p>
                    <p className="mt-1 font-black">{person.interest}</p>
                    <p className="mt-3 text-sm leading-6 text-[#555]">{person.reason}</p>
                  </div>

                  <div className="flex items-center justify-between gap-4 lg:block lg:text-right">
                    <div>
                      <p className="text-3xl font-black">{person.score}%</p>
                      <p className="text-xs font-bold text-[#555]">Match Score</p>
                    </div>
                    <button onClick={() => setSelectedProfile(person)} className="rounded-full bg-black px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#292929]">
                      View Profile
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredTalent.length === 0 && (
            <div className="rounded-3xl border border-black/10 bg-white p-10 text-center">
              <SlidersHorizontal className="mx-auto h-8 w-8 text-[#777]" />
              <h2 className="mt-4 text-xl font-black">No matches found</h2>
              <p className="mt-2 text-sm text-[#555]">Try a broader skill, field, or location.</p>
            </div>
          )}
        </section>
      </main>

      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <img src={selectedProfile.image} alt={`${selectedProfile.name} profile`} className="h-20 w-20 rounded-3xl border border-black/10 bg-[#F7F5EF]" />
                <div>
                  <h2 className="text-3xl font-black">{selectedProfile.name}</h2>
                  <p className="mt-1 text-sm font-semibold text-[#555]">{selectedProfile.interest}</p>
                  <p className="mt-2 text-sm text-[#555]">{selectedProfile.education}</p>
                </div>
              </div>
              <button onClick={() => setSelectedProfile(null)} className="rounded-full border border-black/10 p-2 transition hover:border-black">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {[
                ['Skills', selectedProfile.skills],
                ['Projects', selectedProfile.projects],
                ['Career Strengths', selectedProfile.strengths],
                ['Suggested Roles', selectedProfile.suggestedRoles],
              ].map(([title, items]) => (
                <section key={title} className="rounded-2xl border border-black/10 bg-[#F7F5EF] p-5">
                  <h3 className="font-black">{title}</h3>
                  <div className="mt-3 space-y-2">
                    {items.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm font-semibold text-[#333]">
                        <Star className="h-4 w-4 fill-black text-black" />
                        {item}
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <button className="mt-6 w-full rounded-2xl bg-black px-5 py-4 text-sm font-extrabold text-white transition hover:bg-[#292929]">
              Contact Interest
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
