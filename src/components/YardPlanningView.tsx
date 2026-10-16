import { useState } from 'react';
import { Container } from '../types';
import { Grid, Plus, Search, Trash2, Edit2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface YardPlanningViewProps {
  containers: Container[];
  onCreateContainer: (item: Partial<Container>) => Promise<void>;
  onUpdateContainer: (id: string, item: Partial<Container>) => Promise<void>;
  onDeleteContainer: (id: string) => Promise<void>;
}

export function YardPlanningView({ containers, onCreateContainer, onUpdateContainer, onDeleteContainer }: YardPlanningViewProps) {
  const [search, setSearch] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContainer, setEditingContainer] = useState<Container | null>(null);

  // Form states
  const [number, setNumber] = useState('');
  const [size, setSize] = useState<'20ft' | '40ft' | '45ft'>('40ft');
  const [type, setType] = useState<'DV' | 'HC' | 'RF' | 'OT'>('HC');
  const [status, setStatus] = useState<'Full' | 'Empty'>('Full');
  const [block, setBlock] = useState('A');
  const [row, setRow] = useState('01');
  const [tier, setTier] = useState('01');
  const [weight, setWeight] = useState('25.0t');
  const [consignee, setConsignee] = useState('');
  const [hazard, setHazard] = useState(false);

  const filtered = containers.filter(c => {
    const matchSearch = c.number.toLowerCase().includes(search.toLowerCase()) || c.consignee.toLowerCase().includes(search.toLowerCase());
    const matchBlock = selectedBlock === 'All' || c.block === selectedBlock;
    return matchSearch && matchBlock;
  });

  const handleOpenAdd = () => {
    setEditingContainer(null);
    setNumber(`MSCU${Math.floor(1000000 + Math.random() * 9000000)}`);
    setSize('40ft');
    setType('HC');
    setStatus('Full');
    setBlock('A');
    setRow('02');
    setTier('01');
    setWeight('26.5t');
    setConsignee('PT Kebumen Logistik Utama');
    setHazard(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Container) => {
    setEditingContainer(c);
    setNumber(c.number);
    setSize(c.size);
    setType(c.type);
    setStatus(c.status);
    setBlock(c.block);
    setRow(c.row);
    setTier(c.tier);
    setWeight(c.weight);
    setConsignee(c.consignee);
    setHazard(c.hazard);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { number, size, type, status, block, row, tier, weight, consignee, hazard, arrivalDate: new Date().toISOString().split('T')[0] };
    if (editingContainer) {
      await onUpdateContainer(editingContainer.id, payload);
    } else {
      await onCreateContainer(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/80 via-indigo-900/60 to-purple-950 border border-purple-700/50 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-800/60 border border-purple-600/40 text-purple-200 text-xs font-semibold mb-2">
            <Grid className="w-3.5 h-3.5 text-purple-400" />
            <span>Yard Planning & Container Mapping</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Manajemen Tata Letak Yard Kontainer</h2>
          <p className="text-xs text-purple-300/80 mt-1">
            Pengaturan blok (A-D), baris (row), tingkat (tier), serta status muatan kontainer secara real-time.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-semibold text-xs text-white shadow-lg shadow-purple-600/30 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Kontainer Yard</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-purple-950/60 border border-purple-800/40 p-4 rounded-2xl backdrop-blur-md">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari nomor kontainer atau consignee..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['All', 'A', 'B', 'C', 'D'].map(blk => (
            <button
              key={blk}
              onClick={() => setSelectedBlock(blk)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedBlock === blk ? 'bg-purple-600 text-white shadow' : 'bg-purple-900/40 text-purple-200 hover:bg-purple-900/70'
              }`}
            >
              {blk === 'All' ? 'Semua Blok' : `Blok ${blk}`}
            </button>
          ))}
        </div>
      </div>

      {/* Container Grid Table */}
      <div className="rounded-2xl bg-purple-950/60 border border-purple-800/40 backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-800/60 bg-purple-900/40 text-[11px] font-semibold text-purple-300 uppercase">
                <th className="p-4">Nomor Kontainer</th>
                <th className="p-4">Ukuran / Tipe</th>
                <th className="p-4">Status</th>
                <th className="p-4">Lokasi Yard (Blok/Row/Tier)</th>
                <th className="p-4">Berat (Ton)</th>
                <th className="p-4">Consignee</th>
                <th className="p-4">Hazard</th>
                <th className="p-4 text-right">Aksi CRUD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-800/30 text-xs">
              {filtered.map(c => (
                <tr key={c.id} className="hover:bg-purple-900/20 transition">
                  <td className="p-4 font-semibold text-white flex items-center space-x-2">
                    <Grid className="w-4 h-4 text-purple-400" />
                    <span>{c.number}</span>
                  </td>
                  <td className="p-4 text-purple-200">{c.size} • {c.type}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${c.status === 'Full' ? 'bg-indigo-900/60 text-indigo-300 border border-indigo-700/50' : 'bg-purple-900/60 text-purple-300 border border-purple-700/50'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-purple-200 font-mono">Blok {c.block} - R{c.row} - T{c.tier}</td>
                  <td className="p-4 text-purple-200">{c.weight}</td>
                  <td className="p-4 text-purple-200">{c.consignee}</td>
                  <td className="p-4">
                    {c.hazard ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/50 text-[10px]">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Hazmat</span>
                      </span>
                    ) : (
                      <span className="text-purple-300/50 text-[10px]">Normal</span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(c)}
                      className="p-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-200 transition"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteContainer(c.id)}
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
                    Tidak ada kontainer ditemukan pada kriteria pencarian ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Container */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-purple-950 border border-purple-700/60 rounded-2xl max-w-lg w-full shadow-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">{editingContainer ? 'Edit Kontainer Yard' : 'Tambah Kontainer Yard Baru'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Nomor Kontainer</label>
                  <input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Consignee / Pemilik</label>
                  <input
                    type="text"
                    value={consignee}
                    onChange={(e) => setConsignee(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Ukuran</label>
                  <select
                    value={size}
                    onChange={(e: any) => setSize(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                  >
                    <option value="20ft">20 ft</option>
                    <option value="40ft">40 ft</option>
                    <option value="45ft">45 ft</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Tipe</label>
                  <select
                    value={type}
                    onChange={(e: any) => setType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                  >
                    <option value="DV">Dry Van (DV)</option>
                    <option value="HC">High Cube (HC)</option>
                    <option value="RF">Reefer (RF)</option>
                    <option value="OT">Open Top (OT)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e: any) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                  >
                    <option value="Full">Full</option>
                    <option value="Empty">Empty</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Blok Yard</label>
                  <select
                    value={block}
                    onChange={(e) => setBlock(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                  >
                    <option value="A">Blok A</option>
                    <option value="B">Blok B</option>
                    <option value="C">Blok C</option>
                    <option value="D">Blok D</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Row (Baris)</label>
                  <input
                    type="text"
                    value={row}
                    onChange={(e) => setRow(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Tier (Tingkat)</label>
                  <input
                    type="text"
                    value={tier}
                    onChange={(e) => setTier(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Berat Kontainer</label>
                  <input
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center space-x-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={hazard}
                      onChange={(e) => setHazard(e.target.checked)}
                      className="w-4 h-4 rounded bg-purple-900 border-purple-700 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-purple-200 font-medium">Kontainer Berbahaya (Hazmat / DG)</span>
                  </label>
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
                  Simpan Kontainer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
