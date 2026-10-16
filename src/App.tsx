import { useState, useEffect } from 'react';
import { User, KictAllData, Container, GateLog, Vessel, Equipment, EirRecord, BillingInvoice } from './types';
import { fetchAllData, createItem, updateItem, deleteItem } from './services/api';
import { LoginView } from './components/LoginView';
import { Navbar } from './components/Navbar';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { YardPlanningView } from './components/YardPlanningView';
import { GateSystemView } from './components/GateSystemView';
import { VesselBerthView } from './components/VesselBerthView';
import { EquipmentTrackingView } from './components/EquipmentTrackingView';
import { EirView } from './components/EirView';
import { BillingView } from './components/BillingView';
import { ReportsView } from './components/ReportsView';
import { WorkflowArchitectureModal } from './components/WorkflowArchitectureModal';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
  const [data, setData] = useState<KictAllData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await fetchAllData();
      setData(res);
    } catch (e) {
      console.error('Failed to load KICT data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Generic CRUD wrappers
  const handleCreate = async (collection: string, payload: any) => {
    await createItem(collection, payload);
    await loadData();
  };

  const handleUpdate = async (collection: string, id: string, payload: any) => {
    await updateItem(collection, id, payload);
    await loadData();
  };

  const handleDelete = async (collection: string, id: string) => {
    await deleteItem(collection, id);
    await loadData();
  };

  if (!user) {
    return (
      <>
        <LoginView onLogin={(u) => setUser(u)} onOpenWorkflow={() => setIsWorkflowOpen(true)} />
        <WorkflowArchitectureModal isOpen={isWorkflowOpen} onClose={() => setIsWorkflowOpen(false)} />
      </>
    );
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-purple-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          <p className="text-xs text-purple-300">Memuat Sistem KICT TOS & Neon PostgreSQL...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white flex flex-col">
      <Navbar user={user} onLogout={() => setUser(null)} onOpenWorkflow={() => setIsWorkflowOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-6 overflow-y-auto">
          {activeTab === 'dashboard' && <DashboardView data={data} onNavigate={setActiveTab} />}
          {activeTab === 'yard' && (
            <YardPlanningView
              containers={data.containers}
              onCreateContainer={(item) => handleCreate('containers', item)}
              onUpdateContainer={(id, item) => handleUpdate('containers', id, item)}
              onDeleteContainer={(id) => handleDelete('containers', id)}
            />
          )}
          {activeTab === 'gate' && (
            <GateSystemView
              gateLogs={data.gateLogs}
              onCreateGateLog={(item) => handleCreate('gateLogs', item)}
              onUpdateGateLog={(id, item) => handleUpdate('gateLogs', id, item)}
              onDeleteGateLog={(id) => handleDelete('gateLogs', id)}
            />
          )}
          {activeTab === 'vessel' && (
            <VesselBerthView
              vessels={data.vessels}
              onCreateVessel={(item) => handleCreate('vessels', item)}
              onUpdateVessel={(id, item) => handleUpdate('vessels', id, item)}
              onDeleteVessel={(id) => handleDelete('vessels', id)}
            />
          )}
          {activeTab === 'equipment' && (
            <EquipmentTrackingView
              equipment={data.equipment}
              onCreateEquipment={(item) => handleCreate('equipment', item)}
              onUpdateEquipment={(id, item) => handleUpdate('equipment', id, item)}
              onDeleteEquipment={(id) => handleDelete('equipment', id)}
            />
          )}
          {activeTab === 'eir' && (
            <EirView
              eirs={data.eirs}
              onCreateEir={(item) => handleCreate('eirs', item)}
              onUpdateEir={(id, item) => handleUpdate('eirs', id, item)}
              onDeleteEir={(id) => handleDelete('eirs', id)}
            />
          )}
          {activeTab === 'billing' && (
            <BillingView
              billings={data.billings}
              onCreateBilling={(item) => handleCreate('billings', item)}
              onUpdateBilling={(id, item) => handleUpdate('billings', id, item)}
              onDeleteBilling={(id) => handleDelete('billings', id)}
            />
          )}
          {activeTab === 'reports' && <ReportsView data={data} />}
        </main>
      </div>

      <WorkflowArchitectureModal isOpen={isWorkflowOpen} onClose={() => setIsWorkflowOpen(false)} />
    </div>
  );
}
