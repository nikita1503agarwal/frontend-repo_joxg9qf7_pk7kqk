import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero({ onRegister }) {
  return (
    <div className="relative min-h-[80vh] w-full bg-[#0b0f14] text-white overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 flex flex-col items-center text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Fund the Future
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="mt-4 max-w-2xl text-neutral-300">
          A modern platform for startups to showcase products and for investors to commit capital.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="mt-8 flex flex-wrap gap-4 justify-center">
          <button onClick={() => onRegister('startup')} className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-900/30">
            Register as a Startup
          </button>
          <button onClick={() => onRegister('investor')} className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 transition shadow-lg shadow-emerald-900/30">
            Register as an Investor
          </button>
        </motion.div>
      </div>
    </div>
  );
}
