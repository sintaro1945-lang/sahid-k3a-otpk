import { pgTable, serial, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const containers = pgTable('containers', {
  id: serial('id').primaryKey(),
  containerId: text('container_id').notNull().unique(),
  number: text('number').notNull(),
  size: text('size').notNull(),
  type: text('type').notNull(),
  status: text('status').notNull(),
  block: text('block').notNull(),
  row: text('row').notNull(),
  tier: text('tier').notNull(),
  weight: text('weight').notNull(),
  consignee: text('consignee').notNull(),
  hazard: boolean('hazard').default(false).notNull(),
  arrivalDate: text('arrival_date').notNull(),
});

export const gateLogs = pgTable('gate_logs', {
  id: serial('id').primaryKey(),
  logId: text('log_id').notNull().unique(),
  truckNo: text('truck_no').notNull(),
  driverName: text('driver_name').notNull(),
  containerNo: text('container_no').notNull(),
  type: text('type').notNull(),
  time: text('time').notNull(),
  status: text('status').notNull(),
  eirRef: text('eir_ref').notNull(),
});

export const vessels = pgTable('vessels', {
  id: serial('id').primaryKey(),
  vesselId: text('vessel_id').notNull().unique(),
  name: text('name').notNull(),
  voyage: text('voyage').notNull(),
  eta: text('eta').notNull(),
  etd: text('etd').notNull(),
  berth: text('berth').notNull(),
  status: text('status').notNull(),
  operator: text('operator').notNull(),
});

export const equipment = pgTable('equipment', {
  id: serial('id').primaryKey(),
  equipId: text('equip_id').notNull().unique(),
  code: text('code').notNull(),
  type: text('type').notNull(),
  status: text('status').notNull(),
  operator: text('operator').notNull(),
  task: text('task').notNull(),
  fuelOrBattery: text('fuel_or_battery').notNull(),
  location: text('location').notNull(),
});

export const eirs = pgTable('eirs', {
  id: serial('id').primaryKey(),
  eirId: text('eir_id').notNull().unique(),
  containerNo: text('container_no').notNull(),
  truckNo: text('truck_no').notNull(),
  date: text('date').notNull(),
  condition: text('condition').notNull(),
  sealNo: text('seal_no').notNull(),
  inspector: text('inspector').notNull(),
  remarks: text('remarks').notNull(),
});

export const billings = pgTable('billings', {
  id: serial('id').primaryKey(),
  billId: text('bill_id').notNull().unique(),
  customer: text('customer').notNull(),
  serviceType: text('service_type').notNull(),
  amount: text('amount').notNull(),
  status: text('status').notNull(),
  date: text('date').notNull(),
  due: text('due').notNull(),
});
