import { useState } from 'react';
import { GateLog } from '../types';
import { Truck, Plus, Search, Trash2, Edit2, CheckCircle2, Clock } from 'lucide-react';

interface GateSystemViewProps {
  gateLogs: GateLog[];
  onCreateGateLog: (item: Partial<GateLog>) => Promise<void>;
  onUpdateGateLog: (id: string, item: Partial<GateLog>) => Promise<void>;
  onDeleteGateLog: (id: string) => Promise<void>;
}

export function GateSystemView({ gateLogs, onCreateGateLog, onUpdateGateLog, onDeleteGateLog }: GateSystemViewProps) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<GateLog | null>(null);

  // Form states
  const [truckNo, setTruckNo] = useState('');
  const [driverName, setDriverName] = useState('');
  const [containerNo, setContainerNo] = useState('');
  const [type, setType] = useState<'Gate In' | 'Gate Out'>('Gate In');
  const [status, setStatus] = useState<'Completed' | 'In Terminal' | 'Pending'>('In Terminal');
  const [eirRef, setEirRef] = useState('');

  const filtered = gateLogs.filter(g => {
    const match = g.truckNo.toLowerCase().includes(search.toLowerCase()) || g.containerNo.toLowerCase().includes(search.toLowerCase()) || g.driverName.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'All' || g.type === filterType;
    return match && matchType;
  });

  const handleOpenAdd = () => {
    setEditingLog(null);
    setTruckNo(`AA ${Math.floor(1000 + Math.random() * 9000)} ZK`);
    setDriverName('Ahmad Supriyadi');
    setContainerNo(`MSCU${Math.floor(1000000 + Math.random() * 9000000)}`);
    setType('Gate In');
    setStatus('In Terminal');
    setEirRef(`EIR-${Math.floor(800 + Math.random() * 200)}`);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (g: GateLog) => {
    setEditingLog(g);
    setTruckNo(g.truckNo);
    setDriverName(g.driverName);
    setContainerNo(g.containerNo);
    setType(g.type);
    setStatus(g.status);
    setEirRef(g.eirRef);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      truckNo,
      driverName,
      containerNo,
      type,
      status,
      time: new Date().toISOString().replace('T', ' ').substring(0, 16),
      eirRef,
    };
    if (editingLog) {
      await onUpdateGateLog(editingLog.id, payload);
    } else {
      await onCreateGateLog(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/80 via-indigo-900/60 to-purple-950 border border-purple-700/50 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-800/60 border border-purple-600/40 text-purple-200 text-xs font-semibold mb-2">
            <Truck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Gate System & Truck Automation</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Integrasi Sistem Gerbang (Gate In / Gate Out)</h2>
          <p className="text-xs text-purple-300/80 mt-1">
            Pencatatan otomatis truk masuk dan keluar terminal, verifikasi e-EIR, dan identifikasi supir secara real-time.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-semibold text-xs text-white shadow-lg shadow-purple-600/30 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Catat Truk Masuk/Keluar</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-purple-950/60 border border-purple-800/40 p-4 rounded-2xl backdrop-blur-md">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari nopol truk, kontainer, atau supir..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {['All', 'Gate In', 'Gate Out'].map(ft => (
            <button
              key={ft}
              onClick={() => setFilterType(ft)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                filterType === ft ? 'bg-purple-600 text-white shadow' : 'bg-purple-900/40 text-purple-200 hover:bg-purple-900/70'
              }`}
            >
              {ft === 'All' ? 'Semua Gate' : ft}
            </button>
          ))}
        </div>
      </div>

      {/* Gate Logs Table */}
      <div className="rounded-2xl bg-purple-950/60 border border-purple-800/40 backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-800/60 bg-purple-900/40 text-[11px] font-semibold text-purple-300 uppercase">
                <th className="p-4">ID Log / Waktu</th>
                <th className="p-4">Tipe Gate</th>
                <th className="p-4">Nomor Polisi Truk</th>
                <th className="p-4">Nama Supir</th>
                <th className="p-4">Nomor Kontainer</th>
                <th className="p-4">Ref e-EIR</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi CRUD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-800/30 text-xs">
              {filtered.map(g => (
                <tr key={g.id} className="hover:bg-purple-900/20 transition">
                  <td className="p-4">
                    <span className="font-semibold text-white">{g.id}</span>
                    <p className="text-[10px] text-purple-300/70">{g.time}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${g.type === 'Gate In' ? 'bg-blue-900/60 text-blue-300 border border-blue-700/50' : 'bg-purple-900/60 text-purple-300 border border-purple-700/50'}`}>
                      {g.type}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-semibold text-white">{g.truckNo}</td>
                  <td className="p-4 text-purple-200">{g.driverName}</td>
                  <td className="p-4 font-mono text-purple-200">{g.containerNo}</td>
                  <td className="p-4 font-mono text-indigo-300 underline">{g.eirRef}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${g.status === 'Completed' ? 'bg-emerald-950/60 text-emerald-300' : 'bg-amber-950/60 text-amber-300'}`}>
                      {g.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(g)}
                      className="p-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-200 transition"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteGateLog(g.id)}
                      className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 transition"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-purple-300/60 text-xs">
                    Tidak ada catatan gate ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Gate Log */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-purple-950 border border-purple-700/60 rounded-2xl max-w-md w-full shadow-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">{editingLog ? 'Edit Catatan Gate' : 'Catat Truk Masuk / Keluar Baru'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">Tipe Transaksi Gate</label>
                <select
                  value={type}
                  onChange={(e: any) => setType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                >
                  <option value="Gate In">Gate In (Masuk Terminal)</option>
                  <option value="Gate Out">Gate Out (Keluar Terminal)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Nomor Polisi Truk</label>
                  <input
                    type="text"
                    value={truckNo}
                    onChange={(e) => setTruckNo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Nama Supir</label>
                  <input
                    type="text"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Nomor Kontainer</label>
                  <input
                    type="text"
                    value={containerNo}
                    onChange={(e) => setContainerNo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Referensi e-EIR</label>
                  <input
                    type="text"
                    value={eirRef}
                    onChange={(e) => setEirRef(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">Status Gate</label>
                <select
                  value={status}
                  onChange={(e: any) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                >
                  <option value="In Terminal">In Terminal</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-purple-800/40">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-purple-900/50 hover:bg-purple-900 text-purple-200 text-xs font-medium transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow transition"
                >
                  Simpan Catatan Gate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
