import { useEffect, useState } from 'react';
import { apiGet, apiPost } from './Api';

export default function StartupDashboard({ startupId, user }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function load() {
    try {
      setLoading(true);
      const res = await apiGet(`/api/startups/${startupId}/dashboard`);
      setData(res);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [startupId]);

  if (loading) return <Section><p className="text-neutral-400">Loading dashboard...</p></Section>;
  if (error) return <Section><p className="text-red-400">{error}</p></Section>;
  if (!data) return null;

  return (
    <div className="bg-[#0b0f14] text-white py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-semibold">Startup Dashboard</h2>
        <p className="text-neutral-400 mt-1">Real-time interest and funds raised</p>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <Stat title="Total Raised" value={`$${Number(data.total_raised || 0).toLocaleString()}`} />
          <Stat title="Interested Investors" value={data.interested_investors.length} />
          <Stat title="Status" value={data.startup.status} />
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-3">Interested Investors</h3>
          <div className="grid gap-4">
            {data.interested_investors.length === 0 && (
              <div className="p-4 rounded-lg border border-white/10 bg-white/5 text-neutral-300">No investors yet. Share your pitch link to attract interest.</div>
            )}
            {data.interested_investors.map((it) => (
              <div key={it.id} className="p-4 rounded-lg border border-white/10 bg-white/5 flex items-center justify-between">
                <div>
                  <div className="font-medium">{it.investor.full_name || 'Anonymous Investor'}</div>
                  <div className="text-sm text-neutral-400">{it.investor.company || 'Independent'}</div>
                  {it.message && <div className="text-sm mt-1 text-neutral-300">“{it.message}”</div>}
                </div>
                <div className="text-emerald-400 font-semibold">${'{'}Number(it.committed_amount).toLocaleString(){'}'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="p-5 rounded-xl border border-white/10 bg-white/5">
      <div className="text-sm text-neutral-400">{title}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

function Section({ children }) {
  return (
    <div className="bg-[#0b0f14] text-white min-h-[40vh] py-10">
      <div className="max-w-6xl mx-auto px-6">{children}</div>
    </div>
  );
}
