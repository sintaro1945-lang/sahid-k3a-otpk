import { useState } from 'react';
import { Equipment } from '../types';
import { Plus, Search, Trash2, Edit2, BatteryCharging, Wrench, User } from 'lucide-react';

interface EquipmentTrackingViewProps {
  equipment: Equipment[];
  onCreateEquipment: (item: Partial<Equipment>) => Promise<void>;
  onUpdateEquipment: (id: string, item: Partial<Equipment>) => Promise<void>;
  onDeleteEquipment: (id: string) => Promise<void>;
}

export function EquipmentTrackingView({ equipment, onCreateEquipment, onUpdateEquipment, onDeleteEquipment }: EquipmentTrackingViewProps) {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEquip, setEditingEquip] = useState<Equipment | null>(null);

  // Form states
  const [code, setCode] = useState('');
  const [type, setType] = useState<'Quayside Crane' | 'Reach Stacker' | 'Rubber Tyred Gantry' | 'Terminal Tractor'>('Quayside Crane');
  const [status, setStatus] = useState<'Active' | 'Standby' | 'Maintenance'>('Active');
  const [operator, setOperator] = useState('');
  const [task, setTask] = useState('');
  const [fuelOrBattery, setFuelOrBattery] = useState('80%');
  const [location, setLocation] = useState('');

  const filtered = equipment.filter(e => e.code.toLowerCase().includes(search.toLowerCase()) || e.operator.toLowerCase().includes(search.toLowerCase()) || e.task.toLowerCase().includes(search.toLowerCase()));

  const handleOpenAdd = () => {
    setEditingEquip(null);
    setCode(`QC-0${Math.floor(4 + Math.random() * 6)}`);
    setType('Quayside Crane');
    setStatus('Active');
    setOperator('Budi Santoso');
    setTask('Discharging MV. JAVA STAR');
    setFuelOrBattery('88%');
    setLocation('Berth 02');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (e: Equipment) => {
    setEditingEquip(e);
    setCode(e.code);
    setType(e.type);
    setStatus(e.status);
    setOperator(e.operator);
    setTask(e.task);
    setFuelOrBattery(e.fuelOrBattery);
    setLocation(e.location);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { code, type, status, operator, task, fuelOrBattery, location };
    if (editingEquip) {
      await onUpdateEquipment(editingEquip.id, payload);
    } else {
      await onCreateEquipment(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/80 via-indigo-900/60 to-purple-950 border border-purple-700/50 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-800/60 border border-purple-600/40 text-purple-200 text-xs font-semibold mb-2">
            <Wrench className="w-3.5 h-3.5 text-purple-400" />
            <span>Crane & Reach Stacker Tracking</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Pelacakan Pergerakan Crane & Alat Berat</h2>
          <p className="text-xs text-purple-300/80 mt-1">
            Monitoring status operasional Quayside Crane, Reach Stacker, RTG, penugasan operator, dan level bahan bakar secara real-time.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-semibold text-xs text-white shadow-lg shadow-purple-600/30 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Alat Berat</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center bg-purple-950/60 border border-purple-800/40 p-4 rounded-2xl backdrop-blur-md">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari kode alat, operator, atau task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
          />
        </div>
      </div>

      {/* Equipment Table */}
      <div className="rounded-2xl bg-purple-950/60 border border-purple-800/40 backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-800/60 bg-purple-900/40 text-[11px] font-semibold text-purple-300 uppercase">
                <th className="p-4">Kode Alat / Tipe</th>
                <th className="p-4">Status Operasional</th>
                <th className="p-4">Operator Bertugas</th>
                <th className="p-4">Task / Pekerjaan Aktif</th>
                <th className="p-4">Lokasi Lapangan</th>
                <th className="p-4">Bahan Bakar / Baterai</th>
                <th className="p-4 text-right">Aksi CRUD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-800/30 text-xs">
              {equipment.map(eq => (
                <tr key={eq.id} className="hover:bg-purple-900/20 transition">
                  <td className="p-4">
                    <span className="font-bold text-white flex items-center space-x-2">
                      <Wrench className="w-4 h-4 text-purple-400" />
                      <span>{eq.code}</span>
                    </span>
                    <p className="text-[10px] text-purple-300/70">{eq.type}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${eq.status === 'Active' ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50' : eq.status === 'Standby' ? 'bg-blue-950/60 text-blue-300 border border-blue-800/50' : 'bg-amber-950/60 text-amber-300 border border-amber-800/50'}`}>
                      {eq.status}
                    </span>
                  </td>
                  <td className="p-4 text-purple-200">{eq.operator}</td>
                  <td className="p-4 text-purple-200">{eq.task}</td>
                  <td className="p-4 text-purple-300 font-mono">{eq.location}</td>
                  <td className="p-4 text-purple-200 font-mono flex items-center space-x-1.5">
                    <BatteryCharging className="w-3.5 h-3.5 text-purple-400" />
                    <span>{eq.fuelOrBattery}</span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(eq)}
                      className="p-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-200 transition"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteEquipment(eq.id)}
                      className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 transition"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {equipment.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-purple-300/60 text-xs">
                    Tidak ada alat berat terdaftar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Equipment */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-purple-950 border border-purple-700/60 rounded-2xl max-w-md w-full shadow-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">{editingEquip ? 'Edit Alat Berat' : 'Tambah Alat Berat Baru'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Kode Alat</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Tipe Alat</label>
                  <select
                    value={type}
                    onChange={(e: any) => setType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                  >
                    <option value="Quayside Crane">Quayside Crane</option>
                    <option value="Reach Stacker">Reach Stacker</option>
                    <option value="Rubber Tyred Gantry">Rubber Tyred Gantry</option>
                    <option value="Terminal Tractor">Terminal Tractor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Status Operasional</label>
                  <select
                    value={status}
                    onChange={(e: any) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                  >
                    <option value="Active">Active</option>
                    <option value="Standby">Standby</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Bahan Bakar / Baterai</label>
                  <input
                    type="text"
                    value={fuelOrBattery}
                    onChange={(e) => setFuelOrBattery(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">Operator</label>
                <input
                  type="text"
                  value={operator}
                  onChange={(e) => setOperator(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">Task / Tugas Aktif</label>
                <input
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">Lokasi Lapangan</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
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
                  Simpan Alat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
