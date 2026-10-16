export type UserRole = 'Terminal Manager' | 'Gate Officer' | 'Yard Planner' | 'Billing Admin' | 'Vessel Coordinator';

export interface User {
  name: string;
  role: UserRole;
  email: string;
}

export interface Container {
  id: string;
  number: string;
  size: '20ft' | '40ft' | '45ft';
  type: 'DV' | 'HC' | 'RF' | 'OT';
  status: 'Full' | 'Empty';
  block: string;
  row: string;
  tier: string;
  weight: string;
  consignee: string;
  hazard: boolean;
  arrivalDate: string;
}

export interface GateLog {
  id: string;
  truckNo: string;
  driverName: string;
  containerNo: string;
  type: 'Gate In' | 'Gate Out';
  time: string;
  status: 'Completed' | 'In Terminal' | 'Pending';
  eirRef: string;
}

export interface Vessel {
  id: string;
  name: string;
  voyage: string;
  eta: string;
  etd: string;
  berth: string;
  status: 'Scheduled' | 'Berthed' | 'Completed';
  operator: string;
  crns: string[];
}

export interface Equipment {
  id: string;
  code: string;
  type: 'Quayside Crane' | 'Reach Stacker' | 'Rubber Tyred Gantry' | 'Terminal Tractor';
  status: 'Active' | 'Standby' | 'Maintenance';
  operator: string;
  task: string;
  fuelOrBattery: string;
  location: string;
}

export interface EirRecord {
  id: string;
  containerNo: string;
  truckNo: string;
  date: string;
  condition: 'Good' | 'Minor Scratch' | 'Major Damage' | 'Sealed';
  sealNo: string;
  inspector: string;
  remarks: string;
}

export interface BillingInvoice {
  id: string;
  customer: string;
  serviceType: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  date: string;
  due: string;
}

export interface KictAllData {
  containers: Container[];
  gateLogs: GateLog[];
  vessels: Vessel[];
  equipment: Equipment[];
  eirs: EirRecord[];
  billings: BillingInvoice[];
}
