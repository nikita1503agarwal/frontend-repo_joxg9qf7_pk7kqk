import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Onboarding from './components/Onboarding';
import StartupDashboard from './components/StartupDashboard';
import AdminPanel from './components/AdminPanel';
import { apiGet } from './components/Api';

function App() {
  const [mode, setMode] = useState(null); // 'startup' | 'investor'
  const [session, setSession] = useState(() => {
    try { return JSON.parse(localStorage.getItem('session')||'null'); } catch { return null; }
  });
  const [view, setView] = useState('home');

  useEffect(() => { if (session) localStorage.setItem('session', JSON.stringify(session)); }, [session]);

  useEffect(() => {
    // preflight backend
    apiGet('/test').catch(()=>{});
  }, []);

  const onRegisterClick = (m) => { setMode(m); setView('onboard'); };
  const onAdmin = (e) => { e?.preventDefault(); setView('admin'); };

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white">
      <Navbar onAdmin={onAdmin} />

      {view === 'home' && (
        <>
          <Hero onRegister={onRegisterClick} />
          {!session && (
            <div className="max-w-6xl mx-auto px-6 py-10">
              <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <h3 className="text-xl font-semibold">Get Started</h3>
                <p className="text-neutral-300 mt-1">Choose how you'd like to join the platform.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button onClick={()=>onRegisterClick('startup')} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500">Register as Startup</button>
                  <button onClick={()=>onRegisterClick('investor')} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500">Register as Investor</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {view === 'onboard' && (
        <Onboarding mode={mode} onDone={(s)=>{ setSession(s); setView('home'); }} />
      )}

      {session?.role === 'startup' && (
        <StartupDashboard startupId={session.startup_id} user={session} />
      )}

      {view === 'admin' && (
        <AdminPanel />
      )}

      <footer className="text-center text-neutral-400 py-10">© {new Date().getFullYear()} FundFlow</footer>
    </div>
  );
}

export default App
