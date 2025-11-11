import { Menu, Search } from 'lucide-react';

export default function Navbar({ onAdmin }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between text-neutral-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500" />
          <span className="font-semibold">FundFlow</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a className="hover:text-white transition" href="#">Startups</a>
          <a className="hover:text-white transition" href="#">Investors</a>
          <a className="hover:text-white transition" href="#" onClick={onAdmin}>Admin</a>
        </nav>
        <button className="md:hidden p-2 rounded-lg hover:bg-white/10"><Menu size={20} /></button>
      </div>
    </header>
  );
}
