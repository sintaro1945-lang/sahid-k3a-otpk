import { LayoutDashboard, Grid, Truck, Ship, Wrench, FileText, Receipt, BarChart3 } from 'lucide-react';

export type ActiveTab = 'dashboard' | 'yard' | 'gate' | 'vessel' | 'equipment' | 'eir' | 'billing' | 'reports';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Analitik', icon: LayoutDashboard },
    { id: 'yard', label: 'Yard Planning', icon: Grid },
    { id: 'gate', label: 'Gate System', icon: Truck },
    { id: 'vessel', label: 'Vessel Berth Planning', icon: Ship },
    { id: 'equipment', label: 'Crane & Equipment', icon: Wrench },
    { id: 'eir', label: 'e-EIR Kondisi Kontainer', icon: FileText },
    { id: 'billing', label: 'Billing & Tagihan', icon: Receipt },
    { id: 'reports', label: 'Laporan & Ekspor', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-purple-950/90 border-r border-purple-800/40 flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="p-4">
        <p className="text-[10px] font-semibold tracking-wider text-purple-400 uppercase mb-3 px-2">Modul Operasional TOS</p>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-purple-200/80 hover:bg-purple-900/50 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 m-4 rounded-xl bg-purple-900/20 border border-purple-800/30">
        <div className="flex items-center space-x-2 text-xs font-semibold text-purple-300 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Sistem KICT Online</span>
        </div>
        <p className="text-[10px] text-purple-300/70">Database: Neon PostgreSQL Active. All services synchronized.</p>
      </div>
    </aside>
  );
}
