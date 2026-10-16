import { useState } from 'react';
import { Vessel } from '../types';
import { Ship, Plus, Search, Trash2, Edit2, Anchor, Calendar } from 'lucide-react';

interface VesselBerthViewProps {
  vessels: Vessel[];
  onCreateVessel: (item: Partial<Vessel>) => Promise<void>;
  onUpdateVessel: (id: string, item: Partial<Vessel>) => Promise<void>;
  onDeleteVessel: (id: string) => Promise<void>;
}

export function VesselBerthView({ vessels, onCreateVessel, onUpdateVessel, onDeleteVessel }: VesselBerthViewProps) {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVessel, setEditingVessel] = useState<Vessel | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [voyage, setVoyage] = useState('');
  const [eta, setEta] = useState('2026-10-18 10:00');
  const [etd, setEtd] = useState('2026-10-19 16:00');
  const [berth, setBerth] = useState('Berth 01');
  const [status, setStatus] = useState<'Scheduled' | 'Berthed' | 'Completed'>('Scheduled');
  const [operator, setOperator] = useState('Samudra Lines');

  const filtered = vessels.filter(v => v.name.toLowerCase().includes(search.toLowerCase()) || v.voyage.toLowerCase().includes(search.toLowerCase()));

  const handleOpenAdd = () => {
    setEditingVessel(null);
    setName(`MV. KEBUMEN EXPRESS V.0${Math.floor(5 + Math.random() * 5)}`);
    setVoyage(`KE-${Math.floor(100 + Math.random() * 900)}`);
    setEta('2026-10-18 12:00');
    setEtd('2026-10-19 20:00');
    setBerth('Berth 01');
    setStatus('Scheduled');
    setOperator('Samudra Lines');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (v: Vessel) => {
    setEditingVessel(v);
    setName(v.name);
    setVoyage(v.voyage);
    setEta(v.eta);
    setEtd(v.etd);
    setBerth(v.berth);
    setStatus(v.status);
    setOperator(v.operator);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      voyage,
      eta,
      etd,
      berth,
      status,
      operator,
      crns: ['QC-01', 'QC-02']
    };
    if (editingVessel) {
      await onUpdateVessel(editingVessel.id, payload);
    } else {
      await onCreateVessel(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/80 via-indigo-900/60 to-purple-950 border border-purple-700/50 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-800/60 border border-purple-600/40 text-purple-200 text-xs font-semibold mb-2">
            <Ship className="w-3.5 h-3.5 text-indigo-400" />
            <span>Vessel Berth Planning & Scheduling</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Penjadwalan Sandar Kapal (Vessel Berth)</h2>
          <p className="text-xs text-purple-300/80 mt-1">
            Alokasi dermaga, jadwal kedatangan/keberangkatan (ETA/ETD), serta penugasan crane bongkar muat kapal.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-semibold text-xs text-white shadow-lg shadow-purple-600/30 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Jadwalkan Kapal Baru</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center bg-purple-950/60 border border-purple-800/40 p-4 rounded-2xl backdrop-blur-md">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari nama kapal atau voyage..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
          />
        </div>
      </div>

      {/* Vessels Table */}
      <div className="rounded-2xl bg-purple-950/60 border border-purple-800/40 backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-800/60 bg-purple-900/40 text-[11px] font-semibold text-purple-300 uppercase">
                <th className="p-4">Nama Kapal & Voyage</th>
                <th className="p-4">Operator / Shipping Line</th>
                <th className="p-4">Alokasi Dermaga</th>
                <th className="p-4">ETA (Estimated Time Arrival)</th>
                <th className="p-4">ETD (Estimated Time Departure)</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi CRUD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-800/30 text-xs">
              {vessels.map(v => (
                <tr key={v.id} className="hover:bg-purple-900/20 transition">
                  <td className="p-4">
                    <span className="font-semibold text-white flex items-center space-x-2">
                      <Ship className="w-4 h-4 text-indigo-400" />
                      <span>{v.name}</span>
                    </span>
                    <p className="text-[10px] text-purple-300/70">Voyage: {v.voyage}</p>
                  </td>
                  <td className="p-4 text-purple-200">{v.operator}</td>
                  <td className="p-4 font-semibold text-purple-300">{v.berth}</td>
                  <td className="p-4 text-purple-200">{v.eta}</td>
                  <td className="p-4 text-purple-200">{v.etd}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${v.status === 'Berthed' ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50' : v.status === 'Scheduled' ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-800/50' : 'bg-purple-950/60 text-purple-300'}`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(v)}
                      className="p-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-200 transition"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteVessel(v.id)}
                      className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 transition"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {vessels.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-purple-300/60 text-xs">
                    Tidak ada jadwal kapal.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Vessel */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-purple-950 border border-purple-700/60 rounded-2xl max-w-md w-full shadow-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">{editingVessel ? 'Edit Jadwal Kapal' : 'Jadwal Sandar Kapal Baru'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">Nama Kapal</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Nomor Voyage</label>
                  <input
                    type="text"
                    value={voyage}
                    onChange={(e) => setVoyage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Operator / Line</label>
                  <input
                    type="text"
                    value={operator}
                    onChange={(e) => setOperator(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">ETA (Kedatangan)</label>
                  <input
                    type="text"
                    value={eta}
                    onChange={(e) => setEta(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">ETD (Keberangkatan)</label>
                  <input
                    type="text"
                    value={etd}
                    onChange={(e) => setEtd(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Dermaga (Berth)</label>
                  <select
                    value={berth}
                    onChange={(e) => setBerth(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                  >
                    <option value="Berth 01">Berth 01</option>
                    <option value="Berth 02">Berth 02</option>
                    <option value="Berth 03">Berth 03</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Status Kapal</label>
                  <select
                    value={status}
                    onChange={(e: any) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Berthed">Berthed (Sandar)</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
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
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
