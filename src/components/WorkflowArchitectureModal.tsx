import { X, Cpu, Workflow, Database, Server, Layout, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface WorkflowArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WorkflowArchitectureModal({ isOpen, onClose }: WorkflowArchitectureModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-purple-950 border border-purple-700/60 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-purple-950/80 text-white p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2.5 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300">
            <Workflow className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Alur Kerja Operasional & Arsitektur Sistem KICT</h2>
            <p className="text-xs text-purple-300/70">Kebumen International Container Terminal (KICT) Terminal Operating System</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Operational Workflow Section */}
          <div>
            <h3 className="text-sm font-semibold text-purple-300 uppercase tracking-wider mb-4 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>1. Alur Kerja Operasional Terminal (Operational Workflow)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <div className="p-4 rounded-xl bg-purple-900/30 border border-purple-800/50">
                <div className="text-purple-400 font-bold text-xs mb-1">LANGKAH 01</div>
                <h4 className="font-semibold text-sm mb-1">Gate In & Truck</h4>
                <p className="text-[11px] text-purple-300/70">Truk kontainer masuk gerbang, pencatatan nomor polisi, supir, dan kontainer otomatis.</p>
              </div>

              <div className="p-4 rounded-xl bg-purple-900/30 border border-purple-800/50">
                <div className="text-purple-400 font-bold text-xs mb-1">LANGKAH 02</div>
                <h4 className="font-semibold text-sm mb-1">e-EIR & Kondisi</h4>
                <p className="text-[11px] text-purple-300/70">Pemeriksaan kondisi fisik kontainer, nomor seal, dan penerbitan e-Equipment Interchange Receipt.</p>
              </div>

              <div className="p-4 rounded-xl bg-purple-900/30 border border-purple-800/50">
                <div className="text-purple-400 font-bold text-xs mb-1">LANGKAH 03</div>
                <h4 className="font-semibold text-sm mb-1">Yard Stacking</h4>
                <p className="text-[11px] text-purple-300/70">Penempatan kontainer ke blok yard, row, tier menggunakan Reach Stacker / RTG.</p>
              </div>

              <div className="p-4 rounded-xl bg-purple-900/30 border border-purple-800/50">
                <div className="text-purple-400 font-bold text-xs mb-1">LANGKAH 04</div>
                <h4 className="font-semibold text-sm mb-1">Vessel Berth</h4>
                <p className="text-[11px] text-purple-300/70">Penjadwalan sandar kapal, alokasi Quayside Crane untuk proses bongkar muat (loading/discharge).</p>
              </div>

              <div className="p-4 rounded-xl bg-purple-900/30 border border-purple-800/50">
                <div className="text-purple-400 font-bold text-xs mb-1">LANGKAH 05</div>
                <h4 className="font-semibold text-sm mb-1">Billing & Exit</h4>
                <p className="text-[11px] text-purple-300/70">Penerbitan tagihan operasional, pelunasan, dan gate out kontainer keluar terminal.</p>
              </div>
            </div>
          </div>

          {/* System Architecture Section */}
          <div>
            <h3 className="text-sm font-semibold text-purple-300 uppercase tracking-wider mb-4 flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>2. Arsitektur Sistem & Teknologi (System Architecture)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-purple-900/40 border border-purple-700/50">
                <div className="flex items-center space-x-2 mb-2 text-purple-200 font-semibold text-sm">
                  <Layout className="w-4 h-4 text-purple-400" />
                  <span>Frontend (React SPA)</span>
                </div>
                <p className="text-xs text-purple-300/80 leading-relaxed">
                  Dibangun menggunakan React 19, TypeScript, dan Tailwind CSS. Menyediakan antarmuka responsif bernuansa ungu kontainer, manajemen state real-time, dan modul laporan berstandar industri dengan ekspor PDF & Excel otomatis.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-900/40 border border-purple-700/50">
                <div className="flex items-center space-x-2 mb-2 text-purple-200 font-semibold text-sm">
                  <Server className="w-4 h-4 text-indigo-400" />
                  <span>Backend (Node.js & Express)</span>
                </div>
                <p className="text-xs text-purple-300/80 leading-relaxed">
                  Menjalankan server Express pada Node.js dengan REST API lengkap untuk mendukung operasi CRUD penuh pada modul Yard, Gate, Vessel, Equipment, e-EIR, dan Billing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-900/40 border border-purple-700/50">
                <div className="flex items-center space-x-2 mb-2 text-purple-200 font-semibold text-sm">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <span>Database (Neon DB / PostgreSQL)</span>
                </div>
                <p className="text-xs text-purple-300/80 leading-relaxed">
                  Terhubung secara online ke real database PostgreSQL (Neon DB) dengan persistensi data yang andal, aman, dan mendukung transaksi operasional berkecepatan tinggi.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-900/20 border border-purple-800/40 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              <span className="text-xs text-purple-200 font-medium">KICT TOS siap beroperasi untuk mendukung efisiensi pelabuhan kontainer kelas dunia.</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold bg-purple-600 hover:bg-purple-500 rounded-lg text-white transition"
            >
              Tutup Panduan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
