import { useState, useEffect } from 'react';
import { User } from '../types';
import { Anchor, Cpu, LogOut, Shield, Clock } from 'lucide-react';

interface NavbarProps {
  user: User;
  onLogout: () => void;
  onOpenWorkflow: () => void;
}

export function Navbar({ user, onLogout, onOpenWorkflow }: NavbarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 border-b border-purple-800/40 bg-purple-950/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-md shadow-purple-500/30">
          <Anchor className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-bold text-sm tracking-wide bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            KICT - Kebumen International Container Terminal
          </h1>
          <p className="text-[10px] text-purple-300/70">Terminal Operating System • Online DB: Neon PostgreSQL</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Live Clock */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-purple-900/30 border border-purple-800/40 text-xs text-purple-200">
          <Clock className="w-3.5 h-3.5 text-purple-400" />
          <span>{time.toLocaleTimeString('id-ID')} WIB</span>
        </div>

        {/* Workflow & Architecture button */}
        <button
          onClick={onOpenWorkflow}
          className="px-3 py-1.5 text-xs font-medium bg-purple-900/60 hover:bg-purple-800 border border-purple-700/50 rounded-lg transition flex items-center space-x-1.5 text-purple-200"
        >
          <Cpu className="w-3.5 h-3.5 text-purple-400" />
          <span className="hidden sm:inline">Alur Kerja & Arsitektur</span>
        </button>

        {/* User Info & Role Badge */}
        <div className="flex items-center space-x-3 pl-4 border-l border-purple-800/40">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-white">{user.name}</p>
            <p className="text-[10px] text-purple-300">{user.role}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center font-bold text-xs text-white border border-purple-500">
            {user.name.charAt(0)}
          </div>
          <button
            onClick={onLogout}
            title="Keluar"
            className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
