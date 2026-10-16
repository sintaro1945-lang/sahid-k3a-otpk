import { useState } from 'react';
import { User, UserRole } from '../types';
import { auth, googleAuthProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { Anchor, Shield, Truck, Container, ArrowRight, Building2, Cpu, Globe, Award } from 'lucide-react';

interface LoginViewProps {
  onLogin: (user: User) => void;
  onOpenWorkflow: () => void;
}

export function LoginView({ onLogin, onOpenWorkflow }: LoginViewProps) {
  const [email, setEmail] = useState('manager@kict.co.id');
  const [password, setPassword] = useState('••••••••');
  const [role, setRole] = useState<UserRole>('Terminal Manager');
  const [name, setName] = useState('Capt. Aris Munandar');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleQuickLogin = (selectedRole: UserRole, defaultEmail: string, defaultName: string) => {
    setRole(selectedRole);
    setEmail(defaultEmail);
    setName(defaultName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ name, role, email });
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const firebaseUser = result.user;
      onLogin({
        name: firebaseUser.displayName || 'Authorized User',
        role: 'Terminal Manager',
        email: firebaseUser.email || 'user@kict.co.id',
      });
    } catch (err: any) {
      console.error('Firebase Google Auth error:', err);
      setErrorMsg(err.message || 'Gagal masuk dengan Google.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white flex flex-col justify-between relative overflow-hidden">
      {/* Background container graphics / glow effects */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Navbar */}
      <header className="relative z-10 border-b border-purple-800/40 bg-purple-950/40 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Anchor className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wide bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              KICT - Kebumen International Container Terminal
            </h1>
            <p className="text-xs text-purple-300/70">Next-Generation Terminal Operating System (TOS) • Neon DB & Firebase</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenWorkflow}
            className="px-4 py-2 text-xs font-medium bg-purple-900/60 hover:bg-purple-800 border border-purple-700/50 rounded-lg transition flex items-center space-x-2 text-purple-200"
          >
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>Alur Kerja & Arsitektur Sistem</span>
          </button>
        </div>
      </header>

      {/* Main Content: Split layout (Company Info + Login Form) */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow">
        {/* Left Column: Company Profile & Highlights */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-700/50 text-purple-300 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Official Terminal Operating System</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Gerbang Logistik & Kontainer Internasional di <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">Pantai Selatan Jawa</span>
          </h2>

          <p className="text-purple-200/80 text-base leading-relaxed">
            Kebumen International Container Terminal (KICT) adalah pelabuhan kontainer modern berteknologi tinggi yang menghubungkan jalur perdagangan maritim nasional dan internasional. Sistem TOS KICT terintegrasi secara online ke database relasional Neon DB PostgreSQL dan Firebase Authentication.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-purple-900/30 border border-purple-800/40 backdrop-blur-sm">
              <Container className="w-6 h-6 text-purple-400 mb-2" />
              <h3 className="font-semibold text-sm">Yard Planning</h3>
              <p className="text-xs text-purple-300/70 mt-1">Pemetaan blok, baris, dan tingkat kontainer real-time.</p>
            </div>
            <div className="p-4 rounded-xl bg-purple-900/30 border border-purple-800/40 backdrop-blur-sm">
              <Truck className="w-6 h-6 text-indigo-400 mb-2" />
              <h3 className="font-semibold text-sm">Gate Automation</h3>
              <p className="text-xs text-purple-300/70 mt-1">Pencatatan truk masuk & keluar otomatis dengan e-EIR.</p>
            </div>
            <div className="p-4 rounded-xl bg-purple-900/30 border border-purple-800/40 backdrop-blur-sm">
              <Globe className="w-6 h-6 text-purple-300 mb-2" />
              <h3 className="font-semibold text-sm">Vessel Berth</h3>
              <p className="text-xs text-purple-300/70 mt-1">Penjadwalan sandar kapal dan alokasi quayside crane.</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 pt-2 text-xs text-purple-300/80">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-purple-400" />
              <span>ISO 9001 & 27001 Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-indigo-400" />
              <span>Secure Neon DB PostgreSQL & Firebase</span>
            </div>
          </div>
        </div>

        {/* Right Column: Login Card */}
        <div className="lg:col-span-5">
          <div className="p-8 rounded-2xl bg-purple-950/60 border border-purple-700/40 backdrop-blur-xl shadow-2xl shadow-purple-950/50">
            <div className="mb-6">
              <h3 className="text-xl font-bold">Masuk ke KICT TOS</h3>
              <p className="text-xs text-purple-300/70 mt-1">Autentikasi Firebase & Neon DB PostgreSQL Terintegrasi.</p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-700/60 text-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            {/* Firebase Google Auth Button */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-purple-100 text-slate-900 font-semibold text-xs shadow-lg flex items-center justify-center space-x-2 transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.17 21.31 7.24 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.12 0 9.87 0 11.7s.43 3.58 1.19 5.12l4.09-2.55z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.24 0 3.17 2.69 1.19 6.58l4.09 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>{loading ? 'Menghubungkan...' : 'Masuk dengan Google (Firebase Auth)'}</span>
              </button>
            </div>

            <div className="relative flex py-2 items-center mb-6">
              <div className="flex-grow border-t border-purple-800/60"></div>
              <span className="flex-shrink mx-4 text-purple-300/60 text-[10px] uppercase">Atau Akses Cepat Demo</span>
              <div className="flex-grow border-t border-purple-800/60"></div>
            </div>

            {/* Quick Role Selection Buttons */}
            <div className="mb-6 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('Terminal Manager', 'manager@kict.co.id', 'Capt. Aris Munandar')}
                  className={`px-3 py-2 text-xs rounded-lg border text-left transition ${
                    role === 'Terminal Manager' ? 'bg-purple-600 border-purple-400 text-white font-semibold' : 'bg-purple-900/40 border-purple-800/60 text-purple-200 hover:bg-purple-900/70'
                  }`}
                >
                  Terminal Manager
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('Gate Officer', 'gate@kict.co.id', 'Hendra Setiawan')}
                  className={`px-3 py-2 text-xs rounded-lg border text-left transition ${
                    role === 'Gate Officer' ? 'bg-purple-600 border-purple-400 text-white font-semibold' : 'bg-purple-900/40 border-purple-800/60 text-purple-200 hover:bg-purple-900/70'
                  }`}
                >
                  Gate Officer
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">Nama Pengguna</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-sm focus:outline-none focus:border-purple-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">Email KICT</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-sm focus:outline-none focus:border-purple-400"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-semibold text-sm shadow-lg shadow-purple-600/40 flex items-center justify-center space-x-2 transition"
                >
                  <span>Masuk ke Terminal System</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-800/40 bg-purple-950/60 backdrop-blur-md px-6 py-4 text-center text-xs text-purple-300/60">
        &copy; 2026 Kebumen International Container Terminal (KICT). All Rights Reserved. Powered by Neon DB PostgreSQL & Firebase.
      </footer>
    </div>
  );
}
