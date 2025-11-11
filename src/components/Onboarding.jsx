import { useState } from 'react';
import { apiPost } from './Api';

export default function Onboarding({ mode, onDone }) {
  const [form, setForm] = useState(mode === 'startup' ? {
    email: '', company_name: '', product_description: '', image_urls: '', previous_funding: '', full_name: ''
  } : { email: '', full_name: '', company: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (k, v) => setForm({ ...form, [k]: v });

  async function submit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'startup') {
        const payload = {
          email: form.email,
          company_name: form.company_name,
          product_description: form.product_description,
          image_urls: (form.image_urls || '').split(/\s*,\s*/).filter(Boolean),
          previous_funding: form.previous_funding || null,
          full_name: form.full_name || null,
        };
        const res = await apiPost('/api/register/startup', payload);
        onDone({ role: 'startup', ...res });
      } else {
        const payload = { email: form.email, full_name: form.full_name, company: form.company || null };
        const res = await apiPost('/api/register/investor', payload);
        onDone({ role: 'investor', ...res });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#0b0f14] text-white min-h-[60vh] py-10">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-2xl font-semibold">{mode === 'startup' ? 'Startup' : 'Investor'} Registration</h2>
        <p className="text-neutral-400 mt-1">Enter your details to continue</p>
        <form onSubmit={submit} className="mt-6 grid gap-4">
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Email</label>
            <input required type="email" value={form.email} onChange={e=>update('email', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          {mode === 'startup' && (
            <>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Founder Full Name (optional)</label>
                <input type="text" value={form.full_name} onChange={e=>update('full_name', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Company Name</label>
                <input required type="text" value={form.company_name} onChange={e=>update('company_name', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Product Description</label>
                <textarea required rows={5} value={form.product_description} onChange={e=>update('product_description', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Image URLs (comma separated)</label>
                <input type="text" value={form.image_urls} onChange={e=>update('image_urls', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Previous Funding</label>
                <input type="text" value={form.previous_funding} onChange={e=>update('previous_funding', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </>
          )}

          {mode === 'investor' && (
            <>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Full Name</label>
                <input required type="text" value={form.full_name} onChange={e=>update('full_name', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Company / Firm (optional)</label>
                <input type="text" value={form.company} onChange={e=>update('company', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </>
          )}

          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button disabled={loading} className="mt-2 inline-flex justify-center px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60">{loading ? 'Submitting...' : 'Submit'}</button>
        </form>
      </div>
    </div>
  );
}
