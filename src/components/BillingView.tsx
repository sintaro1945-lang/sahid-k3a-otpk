import { useState } from 'react';
import { BillingInvoice } from '../types';
import { Receipt, Plus, Search, Trash2, Edit2, DollarSign } from 'lucide-react';

interface BillingViewProps {
  billings: BillingInvoice[];
  onCreateBilling: (item: Partial<BillingInvoice>) => Promise<void>;
  onUpdateBilling: (id: string, item: Partial<BillingInvoice>) => Promise<void>;
  onDeleteBilling: (id: string) => Promise<void>;
}

export function BillingView({ billings, onCreateBilling, onUpdateBilling, onDeleteBilling }: BillingViewProps) {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBilling, setEditingBilling] = useState<BillingInvoice | null>(null);

  // Form states
  const [customer, setCustomer] = useState('');
  const [serviceType, setServiceType] = useState('Lifting & Storage');
  const [amount, setAmount] = useState('Rp 15.000.000');
  const [status, setStatus] = useState<'Paid' | 'Pending' | 'Overdue'>('Pending');
  const [due, setDue] = useState('2026-10-30');

  const filtered = billings.filter(b => b.customer.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase()) || b.serviceType.toLowerCase().includes(search.toLowerCase()));

  const handleOpenAdd = () => {
    setEditingBilling(null);
    setCustomer('PT Kebumen Mandiri Logistik');
    setServiceType('Lifting, Storage & Gate Pass');
    setAmount('Rp 14.500.000');
    setStatus('Pending');
    setDue('2026-10-30');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (b: BillingInvoice) => {
    setEditingBilling(b);
    setCustomer(b.customer);
    setServiceType(b.serviceType);
    setAmount(b.amount);
    setStatus(b.status);
    setDue(b.due);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      customer,
      serviceType,
      amount,
      status,
      date: new Date().toISOString().split('T')[0],
      due,
    };
    if (editingBilling) {
      await onUpdateBilling(editingBilling.id, payload);
    } else {
      await onCreateBilling(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/80 via-indigo-900/60 to-purple-950 border border-purple-700/50 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-800/60 border border-purple-600/40 text-purple-200 text-xs font-semibold mb-2">
            <Receipt className="w-3.5 h-3.5 text-purple-400" />
            <span>Billing & Operational Invoicing</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Manajemen Tagihan & Keuangan Operasional</h2>
          <p className="text-xs text-purple-300/80 mt-1">
            Pengelolaan tarif penumpukan kontainer, biaya lifting, penerbitan invoice otomatis, dan status pembayaran pelanggan.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 font-semibold text-xs text-white shadow-lg shadow-purple-600/30 transition flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Invoice Baru</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center bg-purple-950/60 border border-purple-800/40 p-4 rounded-2xl backdrop-blur-md">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari nomor invoice, pelanggan, atau layanan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
          />
        </div>
      </div>

      {/* Billing Table */}
      <div className="rounded-2xl bg-purple-950/60 border border-purple-800/40 backdrop-blur-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-purple-800/60 bg-purple-900/40 text-[11px] font-semibold text-purple-300 uppercase">
                <th className="p-4">No. Invoice & Tanggal</th>
                <th className="p-4">Pelanggan / Consignee</th>
                <th className="p-4">Jenis Layanan Operasional</th>
                <th className="p-4">Jumlah Tagihan</th>
                <th className="p-4">Jatuh Tempo</th>
                <th className="p-4">Status Pembayaran</th>
                <th className="p-4 text-right">Aksi CRUD</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-800/30 text-xs">
              {billings.map(b => (
                <tr key={b.id} className="hover:bg-purple-900/20 transition">
                  <td className="p-4">
                    <span className="font-bold text-white">{b.id}</span>
                    <p className="text-[10px] text-purple-300/70">{b.date}</p>
                  </td>
                  <td className="p-4 font-semibold text-purple-200">{b.customer}</td>
                  <td className="p-4 text-purple-200">{b.serviceType}</td>
                  <td className="p-4 font-mono font-bold text-emerald-300">{b.amount}</td>
                  <td className="p-4 text-purple-200">{b.due}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${b.status === 'Paid' ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50' : b.status === 'Pending' ? 'bg-amber-950/60 text-amber-300 border border-amber-800/50' : 'bg-red-950/60 text-red-300 border border-red-800/50'}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(b)}
                      className="p-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 text-purple-200 transition"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteBilling(b.id)}
                      className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-300 transition"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {billings.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-purple-300/60 text-xs">
                    Tidak ada tagihan billing.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add / Edit Billing */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-purple-950 border border-purple-700/60 rounded-2xl max-w-md w-full shadow-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">{editingBilling ? 'Edit Invoice Billing' : 'Buat Invoice Baru'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">Nama Pelanggan / Consignee</label>
                <input
                  type="text"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">Jenis Layanan Operasional</label>
                <input
                  type="text"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Jumlah Tagihan (Rupiah)</label>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Jatuh Tempo</label>
                  <input
                    type="date"
                    value={due}
                    onChange={(e) => setDue(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-purple-200 mb-1">Status Pembayaran</label>
                <select
                  value={status}
                  onChange={(e: any) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-purple-900/40 border border-purple-700/60 text-white text-xs focus:outline-none focus:border-purple-400"
                >
                  <option value="Pending">Pending (Belum Lunas)</option>
                  <option value="Paid">Paid (Lunas)</option>
                  <option value="Overdue">Overdue (Jatuh Tempo)</option>
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
                  Simpan Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
