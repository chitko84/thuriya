import { useMemo, useState } from 'react';
import { ArrowDownToLine, Bell, Check, ChevronRight, Filter, LayoutDashboard, Plus, Search } from 'lucide-react';
import BrandLogo from './BrandLogo';

function MiniChart({ values }) {
  return (
    <div className="flex h-28 items-end gap-3 rounded-xl border border-black/10 bg-white p-4">
      {values.map((value, index) => (
        <div key={`${value}-${index}`} className="flex flex-1 flex-col items-center gap-2">
          <div className="w-full rounded-t-xl bg-black transition-all" style={{ height: `${Math.max(18, value)}%` }} />
          <span className="text-[11px] font-semibold text-[#6F6F6F]">{value}%</span>
        </div>
      ))}
    </div>
  );
}

function SearchFilters({ query, setQuery, filter, setFilter }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <label className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          className="w-full rounded-xl border border-black/10 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-black"
        />
      </label>
      <label className="relative">
        <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777]" />
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="w-full rounded-xl border border-black/10 bg-white py-2.5 pl-9 pr-8 text-sm outline-none transition focus:border-black"
        >
          <option>All</option>
          <option>Open</option>
          <option>Review</option>
          <option>Featured</option>
          <option>Completed</option>
        </select>
      </label>
    </div>
  );
}

function UpdateForm({ page, formValues, setFormValues, handleSubmit, compact = false }) {
  return (
    <form onSubmit={handleSubmit} className={`rounded-2xl border border-black/10 bg-white p-5 shadow-sm ${compact ? '' : 'h-full'}`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-black text-black">Add or update</h2>
        <Plus className="h-5 w-5 text-black" />
      </div>
      <div className="space-y-3">
        {page.form.map((field) => (
          <label key={field} className="block">
            <span className="mb-1 block text-xs font-bold text-[#555]">{field}</span>
            <input
              value={formValues[field]}
              onChange={(event) => setFormValues((current) => ({ ...current, [field]: event.target.value }))}
              placeholder={`Enter ${field.toLowerCase()}`}
              className="w-full rounded-xl border border-black/10 px-3 py-3 text-sm outline-none transition focus:border-black"
            />
          </label>
        ))}
      </div>
      <button type="submit" className="mt-4 w-full rounded-xl bg-black px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#292929]">
        Save changes
      </button>
    </form>
  );
}

function DataTable({ rows, management = false, setRows, setNotice, setFormValues, setEditingKey, page }) {
  return (
    <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-[#F7F5EF] text-xs uppercase tracking-wider text-[#666]">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Focus</th>
            <th className="p-3">Status</th>
            <th className="p-3">Next step</th>
            {management && <th className="p-3 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-black/10">
          {rows.map((row, index) => (
            <tr key={`${row[0]}-${index}`} className="bg-white">
              {row.map((cell) => (
                <td key={cell} className="p-3 text-[#333]">{cell}</td>
              ))}
              {management && (
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        const rowKey = row.join('|');
                        setRows((current) => current.map((item) => (item.join('|') === rowKey ? [item[0], item[1], item[2], 'Featured'] : item)));
                        setNotice(`${row[0]} marked as featured.`);
                      }}
                      className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-bold hover:border-black"
                    >
                      Feature
                    </button>
                    <button
                      onClick={() => {
                        if (setFormValues && page) {
                          setFormValues(Object.fromEntries(page.form.map((field, fieldIndex) => [field, row[fieldIndex] || ''])));
                        }
                        if (setEditingKey) {
                          setEditingKey(row.join('|'));
                        }
                        setNotice(`${row[0]} is ready to edit.`);
                      }}
                      className="rounded-full border border-black/10 px-3 py-1.5 text-xs font-bold hover:border-black"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        const rowKey = row.join('|');
                        setRows((current) => current.filter((item) => item.join('|') !== rowKey));
                      }}
                      className="rounded-full bg-black px-3 py-1.5 text-xs font-bold text-white"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FeatureBody({ page, rows, setRows, filteredRows, query, setQuery, filter, setFilter, formValues, setFormValues, setEditingKey, handleSubmit, setNotice }) {
  const marketplacePages = ['jobs', 'candidate-search', 'matching', 'internships', 'opportunities', 'reengagement'];
  const planningPages = ['paths', 'life', 'workforce', 'simulator', 'growth', 'curriculum', 'industry', 'research', 'partnerships'];
  const riskPages = ['risk', 'retention', 'diversity', 'readiness'];
  const analyticsPages = ['salary', 'analytics', 'graduates', 'alumni', 'reports'];
  const profilePages = ['resume', 'profile', 'company'];
  const isManagementPage = page.label.startsWith('Manage') || page.id === 'trending-talent-management';

  if (page.id === 'coach') {
    return (
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_380px]">
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black">Conversation</h2>
          <div className="mt-5 space-y-4">
            {rows.map((row, index) => (
              <div key={`${row[0]}-${index}`} className={`max-w-[82%] rounded-2xl p-4 ${index % 2 ? 'ml-auto bg-black text-white' : 'bg-[#F7F5EF] text-black'}`}>
                <p className="text-sm font-black">{row[0]}</p>
                <p className="mt-1 text-sm opacity-80">{row[2]}</p>
              </div>
            ))}
          </div>
        </div>
        <UpdateForm page={page} formValues={formValues} setFormValues={setFormValues} handleSubmit={handleSubmit} />
      </section>
    );
  }

  if (profilePages.includes(page.id)) {
    return (
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <UpdateForm page={page} formValues={formValues} setFormValues={setFormValues} handleSubmit={handleSubmit} />
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black">Preview</h2>
          <div className="mt-5 rounded-2xl border border-black/10 bg-[#F7F5EF] p-6">
            <p className="text-2xl font-black">{rows[0]?.[0]}</p>
            <p className="mt-2 text-sm font-semibold text-[#555]">{rows[0]?.[1]} · {rows[0]?.[2]}</p>
            <div className="mt-6 grid gap-3">
              {rows.map((row) => (
                <div key={row.join('-')} className="rounded-xl bg-white p-4">
                  <p className="font-black">{row[0]}</p>
                  <p className="mt-1 text-sm text-[#555]">{row[3]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (riskPages.includes(page.id)) {
    return (
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black">Risk and progress view</h2>
            <SearchFilters query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} />
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {page.chart.map((value, index) => (
              <div key={value} className="rounded-2xl border border-black/10 bg-[#F7F5EF] p-5">
                <p className="text-4xl font-black">{value}%</p>
                <div className="mt-4 h-2 rounded-full bg-white">
                  <div className="h-2 rounded-full bg-black" style={{ width: `${value}%` }} />
                </div>
                <p className="mt-3 text-sm font-semibold text-[#555]">{rows[index]?.[0] || 'Progress area'}</p>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <DataTable rows={filteredRows} />
          </div>
        </div>
        <UpdateForm page={page} formValues={formValues} setFormValues={setFormValues} handleSubmit={handleSubmit} />
      </section>
    );
  }

  if (marketplacePages.includes(page.id) && !isManagementPage) {
    return (
      <section className="space-y-5">
        <div className="flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-black">Browse and shortlist</h2>
          <SearchFilters query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} />
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredRows.map((row) => (
            <article key={row.join('-')} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
              <p className="text-lg font-black">{row[0]}</p>
              <p className="mt-2 text-sm font-semibold text-[#555]">{row[1]}</p>
              <p className="mt-4 text-sm leading-6 text-[#555]">{row[3]}</p>
              <button onClick={() => setNotice(`${row[0]} saved for review.`)} className="mt-5 rounded-full bg-black px-4 py-2 text-sm font-extrabold text-white">Save</button>
            </article>
          ))}
        </div>
        <UpdateForm page={page} formValues={formValues} setFormValues={setFormValues} handleSubmit={handleSubmit} compact />
      </section>
    );
  }

  if (planningPages.includes(page.id)) {
    return (
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black">Plan options</h2>
          <div className="mt-5 space-y-4">
            {rows.map((row, index) => (
              <div key={row.join('-')} className="grid gap-4 rounded-2xl border border-black/10 bg-[#F7F5EF] p-5 md:grid-cols-[70px_1fr]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black font-black text-white">{index + 1}</div>
                <div>
                  <p className="text-lg font-black">{row[0]}</p>
                  <p className="mt-1 text-sm font-semibold text-[#555]">{row[1]} · {row[2]}</p>
                  <p className="mt-3 text-sm text-[#555]">{row[3]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <UpdateForm page={page} formValues={formValues} setFormValues={setFormValues} handleSubmit={handleSubmit} />
      </section>
    );
  }

  if (analyticsPages.includes(page.id)) {
    return (
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-black">Overview</h2>
          <div className="mt-5">
            <MiniChart values={page.chart} />
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {page.chart.map((value, index) => (
              <div key={value} className="rounded-2xl bg-[#F7F5EF] p-4">
                <p className="text-3xl font-black">{value}%</p>
                <p className="mt-1 text-sm text-[#555]">{rows[index]?.[0] || 'Activity'}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <DataTable rows={filteredRows} />
          <UpdateForm page={page} formValues={formValues} setFormValues={setFormValues} handleSubmit={handleSubmit} compact />
        </div>
      </section>
    );
  }

  if (isManagementPage) {
    return (
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-black">Manage records</h2>
            <SearchFilters query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} />
          </div>
          <DataTable rows={filteredRows} management setRows={setRows} setNotice={setNotice} setFormValues={setFormValues} setEditingKey={setEditingKey} page={page} />
        </div>
        <UpdateForm page={page} formValues={formValues} setFormValues={setFormValues} handleSubmit={handleSubmit} />
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_0.9fr]">
      <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg font-black text-black">Current work</h2>
          <SearchFilters query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} />
        </div>
        <DataTable rows={filteredRows} />
      </div>
      <div className="space-y-5">
        <UpdateForm page={page} formValues={formValues} setFormValues={setFormValues} handleSubmit={handleSubmit} />
        <div className="rounded-2xl border border-black/10 bg-[#F7F5EF] p-5">
          <h2 className="text-lg font-black text-black">Progress</h2>
          <p className="mt-1 text-sm text-[#666]">A simple view of recent movement.</p>
          <div className="mt-4">
            <MiniChart values={page.chart} />
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkspacePage({ page }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [formValues, setFormValues] = useState(() => Object.fromEntries(page.form.map((field) => [field, ''])));
  const [rows, setRows] = useState(page.records);
  const [notice, setNotice] = useState('');
  const [editingKey, setEditingKey] = useState(null);

  const filteredRows = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return rows;
    return rows.filter((row) => row.join(' ').toLowerCase().includes(text));
  }, [query, rows]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const values = page.form.map((field) => formValues[field]?.trim() || 'Not set');
    const nextRow = [values[0], values[1] || filter, values[2] || 'New', 'Review'];
    if (editingKey) {
      setRows((current) => current.map((row) => (row.join('|') === editingKey ? nextRow : row)));
      setNotice('Updated. Your workspace has been saved.');
      setEditingKey(null);
    } else {
      setRows((current) => [nextRow, ...current]);
      setNotice('Saved. Your workspace has been updated.');
    }
    setFormValues(Object.fromEntries(page.form.map((field) => [field, ''])));
  };

  const handlePrimaryAction = () => {
    if (page.id === 'resume') {
      setNotice('Resume prepared. Use your browser print menu to save it as a PDF.');
      return;
    }
    setNotice('Action completed. The next step has been added to your list.');
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#F7F5EF] px-3 py-1 text-xs font-bold text-[#555]">
              <page.icon className="h-4 w-4 text-black" />
              Workspace page
            </div>
            <h1 className="text-3xl font-black tracking-tight text-black">{page.label}</h1>
            <p className="mt-3 text-base leading-7 text-[#565656]">{page.purpose}</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePrimaryAction}
              className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#292929]"
            >
              {page.id === 'resume' ? <ArrowDownToLine className="h-4 w-4" /> : <Check className="h-4 w-4" />}
              {page.id === 'resume' ? 'Download PDF' : 'Complete action'}
            </button>
          </div>
        </div>
        {notice && (
          <div className="mt-5 rounded-xl border border-black/10 bg-[#F7F5EF] px-4 py-3 text-sm font-semibold text-black">
            {notice}
          </div>
        )}
      </section>

      <FeatureBody
        page={page}
        rows={rows}
        setRows={setRows}
        filteredRows={filteredRows}
        query={query}
        setQuery={setQuery}
        filter={filter}
        setFilter={setFilter}
        formValues={formValues}
        setFormValues={setFormValues}
        setEditingKey={setEditingKey}
        handleSubmit={handleSubmit}
        setNotice={setNotice}
      />

      <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-black text-black">Suggested next steps</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {page.nextSteps.map((step) => (
            <button
              type="button"
              key={step}
              onClick={() => setNotice(`${step} added to your list.`)}
              className="flex items-center justify-between rounded-xl border border-black/10 bg-white p-4 text-left text-sm font-semibold text-black transition hover:border-black"
            >
              <span>{step}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function WorkspaceShell({ workspace, setCurrentView }) {
  const [activePageId, setActivePageId] = useState(workspace.pages[0].id);
  const activePage = workspace.pages.find((page) => page.id === activePageId) || workspace.pages[0];

  return (
    <div className="min-h-screen bg-[#F7F5EF] text-black">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-shrink-0 border-r border-black/10 bg-white p-5 lg:flex lg:flex-col">
          <BrandLogo />
          <nav className="mt-8 flex-1 space-y-1">
            {workspace.pages.map((page) => {
              const Icon = page.icon;
              const active = page.id === activePageId;
              return (
                <button
                  key={page.id}
                  onClick={() => setActivePageId(page.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold transition ${
                    active ? 'bg-black text-white' : 'text-[#4A4A4A] hover:bg-[#F7F5EF] hover:text-black'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{page.label}</span>
                </button>
              );
            })}
          </nav>
          <button
            onClick={() => setCurrentView('gateway')}
            className="mt-6 rounded-xl border border-black/10 px-4 py-3 text-sm font-extrabold text-black transition hover:border-black"
          >
            Back to public site
          </button>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-black/10 bg-white/95 px-5 py-4 backdrop-blur">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6B6254]">
                  <LayoutDashboard className="h-4 w-4" />
                  {workspace.name}
                </div>
                <p className="mt-1 max-w-4xl text-sm leading-6 text-[#5B5B5B]">{workspace.welcome}</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm font-bold text-black transition hover:border-black">
                  <Bell className="h-4 w-4" />
                  Updates
                </button>
                <button
                  onClick={() => setCurrentView('auth_modal')}
                  className="rounded-xl bg-black px-4 py-2.5 text-sm font-extrabold text-white transition hover:bg-[#292929]"
                >
                  Switch workspace
                </button>
              </div>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {workspace.pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setActivePageId(page.id)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold ${
                    page.id === activePageId ? 'bg-black text-white' : 'border border-black/10 bg-white text-black'
                  }`}
                >
                  {page.label}
                </button>
              ))}
            </div>
          </header>

          <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-8">
            <WorkspacePage key={activePage.id} page={activePage} />
          </main>
        </div>
      </div>
    </div>
  );
}
