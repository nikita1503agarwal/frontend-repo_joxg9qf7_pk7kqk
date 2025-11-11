import { useEffect, useState } from 'react';
import { apiGet, apiPost } from './Api';

export default function AdminPanel() {
  const [email, setEmail] = useState('admin@example.com');
  const [name, setName] = useState('Admin');
  const [admin, setAdmin] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [reports, setReports] = useState([]);
  const [pending, setPending] = useState([]);

  async function bootstrap() {
    const res = await apiPost('/api/admin/bootstrap', { email, full_name: name });
    setAdmin(res);
    loadAll();
  }

  async function loadAll() {
    const a = await apiGet('/api/admin/analytics');
    setAnalytics(a);
    const r = await apiGet('/api/admin/reports');
    setReports(r.items || []);
    const p = await (await fetch((import.meta.env.VITE_BACKEND_URL||'') + '/api/startups?status=pending')).json();
    setPending(p.items || []);
  }

  async function approve(id, action) {
    await apiPost(`/api/admin/startups/${id}/${action}`, {});
    await loadAll();
  }

  useEffect(() => { loadAll(); }, []);

  return (
    <div className="bg-[#0b0f14] text-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold">Admin Panel</h2>
        {!admin && (
          <div className="mt-4 p-4 rounded-lg border border-white/10 bg-white/5">
            <div className="grid sm:grid-cols-3 gap-3">
              <input className="bg-white/5 border border-white/10 rounded-lg px-3 py-2" placeholder="Admin Email" value={email} onChange={e=>setEmail(e.target.value)} />
              <input className="bg-white/5 border border-white/10 rounded-lg px-3 py-2" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} />
              <button onClick={bootstrap} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500">Become Admin</button>
            </div>
          </div>
        )}

        {analytics && (
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            <Card title="Users" value={analytics.users} />
            <Card title="Startups" value={analytics.startups} />
            <Card title="Investors" value={analytics.investors} />
            <Card title="Total Funds" value={`$${Number(analytics.total_funds||0).toLocaleString()}`} />
          </div>
        )}

        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Pending Startup Listings</h3>
            <div className="grid gap-3">
              {pending.map((s) => (
                <div key={s.id} className="p-4 rounded-lg border border-white/10 bg-white/5">
                  <div className="font-medium">{s.company_name}</div>
                  <div className="text-sm text-neutral-400 line-clamp-2">{s.product_description}</div>
                  <div className="mt-3 flex gap-2">
                    <button onClick={()=>approve(s.id, 'approve')} className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500">Approve</button>
                    <button onClick={()=>approve(s.id, 'reject')} className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Reports</h3>
            <div className="grid gap-3">
              {reports.map((r) => (
                <div key={r.id} className="p-4 rounded-lg border border-white/10 bg-white/5">
                  <div className="font-medium">{r.reason}</div>
                  <div className="text-sm text-neutral-400">{r.target_type} {r.target_id ? `#${r.target_id}`: ''}</div>
                  <div className="text-xs text-neutral-500 mt-1">status: {r.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="p-5 rounded-xl border border-white/10 bg-white/5">
      <div className="text-sm text-neutral-400">{title}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}
