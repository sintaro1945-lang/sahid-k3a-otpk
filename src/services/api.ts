import { KictAllData } from '../types';

const API_BASE = '/api/kict';

const defaultData: KictAllData = {
  containers: [
    { id: 'CONT-9001', number: 'MSCU7829104', size: '40ft', type: 'HC', status: 'Full', block: 'A', row: '04', tier: '02', weight: '28.4t', consignee: 'PT Kebumen Sejahtera', hazard: false, arrivalDate: '2026-10-14' },
    { id: 'CONT-9002', number: 'TGHU4412901', size: '20ft', type: 'DV', status: 'Empty', block: 'B', row: '02', tier: '01', weight: '2.3t', consignee: 'Global Logistik Indo', hazard: false, arrivalDate: '2026-10-15' },
    { id: 'CONT-9003', number: 'OOLU9923841', size: '40ft', type: 'RF', status: 'Full', block: 'C', row: '01', tier: '03', weight: '31.0t', consignee: 'Jawa Food Industries', hazard: true, arrivalDate: '2026-10-13' },
    { id: 'CONT-9004', number: 'CMAU1102934', size: '20ft', type: 'DV', status: 'Full', block: 'A', row: '05', tier: '01', weight: '19.8t', consignee: 'Samudra Makmur', hazard: false, arrivalDate: '2026-10-15' },
    { id: 'CONT-9005', number: 'HLBU5567823', size: '40ft', type: 'HC', status: 'Empty', block: 'D', row: '03', tier: '02', weight: '3.8t', consignee: 'Kebumen Exportindo', hazard: false, arrivalDate: '2026-10-12' },
  ],
  gateLogs: [
    { id: 'GATE-501', truckNo: 'AA 8812 ZK', driverName: 'Slamet Riyadi', containerNo: 'MSCU7829104', type: 'Gate In', time: '2026-10-15 08:30', status: 'Completed', eirRef: 'EIR-881' },
    { id: 'GATE-502', truckNo: 'B 9182 UY', driverName: 'Budi Santoso', containerNo: 'TGHU4412901', type: 'Gate Out', time: '2026-10-15 09:15', status: 'Completed', eirRef: 'EIR-882' },
    { id: 'GATE-503', truckNo: 'R 1429 EA', driverName: 'Joko Widodo', containerNo: 'OOLU9923841', type: 'Gate In', time: '2026-10-15 10:00', status: 'In Terminal', eirRef: 'EIR-883' },
    { id: 'GATE-504', truckNo: 'AA 9931 BC', driverName: 'Supriyanto', containerNo: 'CMAU1102934', type: 'Gate Out', time: '2026-10-15 11:20', status: 'Pending', eirRef: 'EIR-884' },
  ],
  vessels: [
    { id: 'VSL-101', name: 'MV. KEBUMEN JAYA V.04', voyage: 'KJ-042', eta: '2026-10-16 14:00', etd: '2026-10-17 18:00', berth: 'Berth 01', status: 'Scheduled', operator: 'Samudra Lines', crns: ['QC-01', 'QC-02'] },
    { id: 'VSL-102', name: 'MV. JAVA STAR', voyage: 'JS-881', eta: '2026-10-15 06:00', etd: '2026-10-15 22:00', berth: 'Berth 02', status: 'Berthed', operator: 'Interoceanic', crns: ['QC-03'] },
    { id: 'VSL-103', name: 'MV. PACIFIC CARRIER', voyage: 'PC-109', eta: '2026-10-12 10:00', etd: '2026-10-13 14:00', berth: 'Berth 01', status: 'Completed', operator: 'Pacific Shipping', crns: ['QC-01'] },
  ],
  equipment: [
    { id: 'EQ-01', code: 'QC-01', type: 'Quayside Crane', status: 'Active', operator: 'Ahmad Fauzi', task: 'Loading MV. JAVA STAR', fuelOrBattery: '85%', location: 'Berth 02' },
    { id: 'EQ-02', code: 'QC-02', type: 'Quayside Crane', status: 'Standby', operator: 'Dedi Kurniawan', task: 'Standby for MV. KEBUMEN JAYA', fuelOrBattery: '90%', location: 'Berth 01' },
    { id: 'EQ-03', code: 'RS-01', type: 'Reach Stacker', status: 'Active', operator: 'Wahyu Hidayat', task: 'Stacking Block A', fuelOrBattery: '65%', location: 'Yard Block A' },
    { id: 'EQ-04', code: 'RS-02', type: 'Reach Stacker', status: 'Active', operator: 'Rian Pratama', task: 'Transfer to Gate In', fuelOrBattery: '72%', location: 'Gate Area' },
    { id: 'EQ-05', code: 'RTG-01', type: 'Rubber Tyred Gantry', status: 'Maintenance', operator: 'Technician Team', task: 'Routine Hydraulic Check', fuelOrBattery: '40%', location: 'Workshop' },
  ],
  eirs: [
    { id: 'EIR-881', containerNo: 'MSCU7829104', truckNo: 'AA 8812 ZK', date: '2026-10-15 08:30', condition: 'Good', sealNo: 'SL-99281', inspector: 'Officer Hendra', remarks: 'No structural dents observed.' },
    { id: 'EIR-882', containerNo: 'TGHU4412901', truckNo: 'B 9182 UY', date: '2026-10-15 09:15', condition: 'Minor Scratch', sealNo: 'SL-99282', inspector: 'Officer Joko', remarks: 'Scratched on right sidewall.' },
    { id: 'EIR-883', containerNo: 'OOLU9923841', truckNo: 'R 1429 EA', date: '2026-10-15 10:00', condition: 'Good', sealNo: 'SL-99283', inspector: 'Officer Rina', remarks: 'Refrigerated unit operational (-18C).' },
  ],
  billings: [
    { id: 'INV-2026-001', customer: 'PT Kebumen Sejahtera', serviceType: 'Lifting & Storage', amount: 'Rp 12.500.000', status: 'Paid', date: '2026-10-14', due: '2026-10-21' },
    { id: 'INV-2026-002', customer: 'Global Logistik Indo', serviceType: 'Gate Pass & Handling', amount: 'Rp 4.200.000', status: 'Pending', date: '2026-10-15', due: '2026-10-22' },
    { id: 'INV-2026-003', customer: 'Jawa Food Industries', serviceType: 'Reefer Monitoring & Storage', amount: 'Rp 18.900.000', status: 'Paid', date: '2026-10-13', due: '2026-10-20' },
  ]
};

function getLocalStorageData(): KictAllData {
  try {
    const saved = localStorage.getItem('kict_tos_data');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error(e);
  }
  localStorage.setItem('kict_tos_data', JSON.stringify(defaultData));
  return defaultData;
}

function saveLocalStorageData(data: KictAllData) {
  try {
    localStorage.setItem('kict_tos_data', JSON.stringify(data));
  } catch (e) {
    console.error(e);
  }
}

export async function fetchAllData(): Promise<KictAllData> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const res = await fetch(`${API_BASE}/all`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error('Backend API error');
    const data = await res.json();
    saveLocalStorageData(data);
    return data;
  } catch (e) {
    console.warn('Backend server not reachable, using resilient local store', e);
    return getLocalStorageData();
  }
}

export async function createItem<T>(collection: string, dataItem: Partial<T>): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}/${collection}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataItem),
    });
    if (!res.ok) throw new Error('API create failed');
    return await res.json();
  } catch (e) {
    const all = getLocalStorageData() as any;
    const prefix = collection.toUpperCase().slice(0, 3);
    const newItem = { id: `${prefix}-${Date.now().toString().slice(-4)}`, ...dataItem };
    if (all[collection]) {
      all[collection].unshift(newItem);
      saveLocalStorageData(all);
    }
    return newItem as unknown as T;
  }
}

export async function updateItem<T>(collection: string, id: string, dataItem: Partial<T>): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}/${collection}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataItem),
    });
    if (!res.ok) throw new Error('API update failed');
    return await res.json();
  } catch (e) {
    const all = getLocalStorageData() as any;
    if (all[collection]) {
      const index = all[collection].findIndex((item: any) => item.id === id);
      if (index !== -1) {
        all[collection][index] = { ...all[collection][index], ...dataItem };
        saveLocalStorageData(all);
        return all[collection][index];
      }
    }
    throw new Error('Item not found');
  }
}

export async function deleteItem(collection: string, id: string): Promise<void> {
  try {
    const res = await fetch(`${API_BASE}/${collection}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('API delete failed');
  } catch (e) {
    const all = getLocalStorageData() as any;
    if (all[collection]) {
      all[collection] = all[collection].filter((item: any) => item.id !== id);
      saveLocalStorageData(all);
    }
  }
}
