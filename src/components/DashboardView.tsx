import { KictAllData } from '../types';
import { Container, Truck, Ship, Wrench, TrendingUp, DollarSign, Activity, CheckCircle, Clock } from 'lucide-react';

interface DashboardViewProps {
  data: KictAllData;
  onNavigate: (tab: any) => void;
}

export function DashboardView({ data, onNavigate }: DashboardViewProps) {
  const totalContainers = data.containers.length;
  const fullContainers = data.containers.filter(c => c.status === 'Full').length;
  const activeVessels = data.vessels.filter(v => v.status === 'Berthed').length;
  const activeCranes = data.equipment.filter(e => e.status === 'Active').length;
  const pendingGates = data.gateLogs.filter(g => g.status === 'In Terminal' || g.status === 'Pending').length;
  const totalRevenue = data.billings.filter(b => b.status === 'Paid').reduce((acc, curr) => {
    const num = parseInt(curr.amount.replace(/[^0-9]/g, '')) || 0;
    return acc + num;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/80 via-indigo-900/60 to-purple-950 border border-purple-700/50 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-800/60 border border-purple-600/40 text-purple-200 text-xs font-semibold mb-2">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Terminal Live Status: Optimal & Secure</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Dashboard Produktivitas KICT TOS</h2>
          <p className="text-xs text-purple-300/80 mt-1">
            Pantauan real-time yard, gate, kapal sandar, alat bongkar muat, dan laporan keuangan terminal.
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => onNavigate('yard')}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 font-semibold text-xs text-white shadow-lg shadow-purple-600/30 transition flex items-center space-x-2"
          >
            <Container className="w-4 h-4" />
            <span>Kelola Yard</span>
          </button>
          <button
            onClick={() => onNavigate('gate')}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs text-white shadow-lg shadow-indigo-600/30 transition flex items-center space-x-2"
          >
            <Truck className="w-4 h-4" />
            <span>Gate System</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-purple-950/60 border border-purple-800/40 backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-purple-300">Total Kontainer Yard</span>
            <div className="p-2 rounded-xl bg-purple-900/50 text-purple-300">
              <Container className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{totalContainers} TEUs</div>
          <p className="text-[11px] text-purple-300/70 mt-1">{fullContainers} Full, {totalContainers - fullContainers} Empty</p>
        </div>

        <div className="p-5 rounded-2xl bg-purple-950/60 border border-purple-800/40 backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-purple-300">Kapal Sandar (Berthed)</span>
            <div className="p-2 rounded-xl bg-indigo-900/50 text-indigo-300">
              <Ship className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{activeVessels} Kapal</div>
          <p className="text-[11px] text-indigo-300/70 mt-1">{data.vessels.length} Total Jadwal Minggu Ini</p>
        </div>

        <div className="p-5 rounded-2xl bg-purple-950/60 border border-purple-800/40 backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-purple-300">Alat Aktif (Crane & RS)</span>
            <div className="p-2 rounded-xl bg-purple-900/50 text-purple-300">
              <Wrench className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{activeCranes} Unit</div>
          <p className="text-[11px] text-purple-300/70 mt-1">Quayside Cranes & Reach Stackers</p>
        </div>

        <div className="p-5 rounded-2xl bg-purple-950/60 border border-purple-800/40 backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-purple-300">Pendapatan Terverifikasi</span>
            <div className="p-2 rounded-xl bg-emerald-950/50 text-emerald-300">
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">Rp {totalRevenue.toLocaleString('id-ID')}</div>
          <p className="text-[11px] text-emerald-300/70 mt-1">{data.billings.filter(b => b.status === 'Paid').length} Invoice Lunas</p>
        </div>
      </div>

      {/* Recent Activities & Quick Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gate Logs Summary */}
        <div className="p-6 rounded-2xl bg-purple-950/60 border border-purple-800/40 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <Truck className="w-4 h-4 text-purple-400" />
              <span>Aktivitas Gate Terbaru</span>
            </h3>
            <button onClick={() => onNavigate('gate')} className="text-xs text-purple-300 hover:text-white underline">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3">
            {data.gateLogs.slice(0, 4).map(gate => (
              <div key={gate.id} className="p-3 rounded-xl bg-purple-900/30 border border-purple-800/40 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-xs text-white">{gate.truckNo}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${gate.type === 'Gate In' ? 'bg-blue-900/60 text-blue-300' : 'bg-purple-900/60 text-purple-300'}`}>
                      {gate.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-300/70 mt-0.5">Kontainer: {gate.containerNo} • Supir: {gate.driverName}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-purple-300/80">{gate.time}</span>
                  <p className="text-[10px] text-emerald-400 font-semibold">{gate.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vessel Schedule Summary */}
        <div className="p-6 rounded-2xl bg-purple-950/60 border border-purple-800/40 backdrop-blur-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-white flex items-center space-x-2">
              <Ship className="w-4 h-4 text-indigo-400" />
              <span>Jadwal Sandar Kapal (Vessel Berth)</span>
            </h3>
            <button onClick={() => onNavigate('vessel')} className="text-xs text-purple-300 hover:text-white underline">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3">
            {data.vessels.slice(0, 4).map(vsl => (
              <div key={vsl.id} className="p-3 rounded-xl bg-purple-900/30 border border-purple-800/40 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-xs text-white">{vsl.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${vsl.status === 'Berthed' ? 'bg-emerald-900/60 text-emerald-300' : 'bg-indigo-900/60 text-indigo-300'}`}>
                      {vsl.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-300/70 mt-0.5">Voyage: {vsl.voyage} • Lokasi: {vsl.berth}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-purple-300/80">ETA: {vsl.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
