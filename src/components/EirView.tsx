import { useState } from 'react';
import { EirRecord } from '../types';
import { FileText, Plus, Search, Trash2, Edit2, ShieldCheck } from 'lucide-react';

interface EirViewProps {
  eirs: EirRecord[];
  onCreateEir: (item: Partial<EirRecord>) => Promise<void>;
  onUpdateEir: (id: string, item: Partial<EirRecord>) => Promise<void>;
  onDeleteEir: (id: string) => Promise<void>;
}

export function EirView({ eirs, onCreateEir, onUpdateEir, onDeleteEir }: EirViewProps) {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEir, setEditingEir] = useState<EirRecord | null>(null);

  // Form states
  const [containerNo, setContainerNo] = useState('');
  const [truckNo, setTruckNo] = useState('');
  const [condition, setCondition] = useState<'Good' | 'Minor Scratch' | 'Major Damage' | 'Sealed'>('Good');
  const [sealNo, setSealNo] = useState('');
  const [inspector, setInspector] = useState('');
  const [remarks, setRemarks] = useState('');

  const filtered = eirs.filter(e => e.containerNo.toLowerCase().includes(search.toLowerCase()) || e.truckNo.toLowerCase().includes(search.toLowerCase()) || e.inspector.toLowerCase().includes(search.toLowerCase()));

  const handleOpenAdd = () => {
    setEditingEir(null);
    setContainerNo(`MSCU${Math.floor(1000000 + Math.random() * 9000000)}`);
    setTruckNo(`AA ${Math.floor(1000 + Math.random() * 9000)} ZK`);
    setCondition('Good');
    setSealNo(`SL-${Math.floor(10000 + Math.random() * 90000)}`);
    setInspector('Officer Hendra');
    setRemarks('Pemeriksaan fisik standar lolos tanpa kendala.');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (e: EirRecord) => {
    setEditingEir(e);
    setContainerNo(e.containerNo);
    setTruckNo(e.truckNo);
    setCondition(e.condition);
    setSealNo(e.sealNo);
    setInspector(e.inspector);
    setRemarks(e.remarks);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      containerNo,
      truckNo,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      condition,
      sealNo,
      inspector,
      remarks,
    };
    if (editingEir) {
      await onUpdateEir(editingEir.id, payload);
    } else {
      await onCreateEir(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/80 via-indigo-900/60 to-purple-950 border border-purple-700/50 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-800/60 border border-purple-600/40 text-purple-200 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>Electronic Equipment Interchange Receipt (e-EIR)</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Pencatatan Kondisi Fisik Kontainer & e-EIR</h2>
          <p className="text-xs text-purple-300/80 mt-1">
            Berita acara digital serah terima kontainer, nomor seal, dan pencatatan kondisi fisik saat masuk atau keluar terminal.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-semibold text-xs text-white shadow-lg shadow-purple-600/30 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Buat e-EIR Baru</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center bg-purple-950/60 border border-purple-800/40 p-4 rounded-2xl backdrop-blur-md">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari nomor kontainer, truk, atau inspektur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
          />
        </div>
      </div>

      {/* e-EIR Table */}
      <div className="rounded-2xl bg-purple-950/60 border border-purple-800/40 backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-800/60 bg-purple-900/40 text-[11px] font-semibold text-purple-300 uppercase">
                <th className="p-4">ID e-EIR / Waktu</th>
                <th className="p-4">Nomor Kontainer</th>
                <th className="p-4">Nomor Polisi Truk</th>
                <th className="p-4">Nomor Seal</th>
                <th className="p-4">Kondisi Fisik</th>
                <th className="p-4">Inspektur</th>
                <th className="p-4">Catatan / Remarks</th>
                <th className="p-4 text-right">Aksi CRUD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-800/30 text-xs">
              {eirs.map(eir => (
                <tr key={eir.id} className="hover:bg-purple-900/20 transition">
                  <td className="p-4">
                    <span className="font-bold text-white">{eir.id}</span>
                    <p className="text-[10px] text-purple-300/70">{eir.date}</p>
                  </td>
                  <td className="p-4 font-mono font-semibold text-purple-200">{eir.containerNo}</td>
                  <td className="p-4 font-mono text-white">{eir.truckNo}</td>
                  <td className="p-4 font-mono text-indigo-300">{eir.sealNo}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${eir.condition === 'Good' ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50' : 'bg-amber-950/60 text-amber-300 border border-amber-800/50'}`}>
                      {eir.condition}
                    </span>
                  </td>
                  <td className="p-4 text-purple-200">{eir.inspector}</td>
                  <td className="p-4 text-purple-300/80">{eir.remarks}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(eir)}
                      className="p-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-200 transition"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteEir(eir.id)}
                      className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 transition"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {eirs.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-purple-300/60 text-xs">
                    Tidak ada catatan e-EIR.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit e-EIR */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-purple-950 border border-purple-700/60 rounded-2xl max-w-md w-full shadow-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">{editingEir ? 'Edit e-EIR' : 'Buat e-EIR Baru'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
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
                  <label className="block text-xs font-medium text-purple-200 mb-1">Nomor Truk</label>
                  <input
                    type="text"
                    value={truckNo}
                    onChange={(e) => setTruckNo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Kondisi Fisik</label>
                  <select
                    value={condition}
                    onChange={(e: any) => setCondition(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                  >
                    <option value="Good">Good (Baik)</option>
                    <option value="Minor Scratch">Minor Scratch (Goresan)</option>
                    <option value="Major Damage">Major Damage (Rusak)</option>
                    <option value="Sealed">Sealed (Tersegel)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Nomor Seal</label>
                  <input
                    type="text"
                    value={sealNo}
                    onChange={(e) => setSealNo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">Nama Inspektur</label>
                <input
                  type="text"
                  value={inspector}
                  onChange={(e) => setInspector(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">Catatan / Remarks</label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                  rows={2}
                  required
                />
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
                  Simpan e-EIR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
