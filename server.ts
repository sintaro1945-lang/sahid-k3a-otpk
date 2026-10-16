import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './src/db/index.ts';
import { containers, gateLogs, vessels, equipment, eirs, billings, users } from './src/db/schema.ts';
import { eq } from 'drizzle-orm';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Seed initial data if tables are empty
async function seedDatabase() {
  try {
    const existingContainers = await db.select().from(containers);
    if (existingContainers.length === 0) {
      console.log('Seeding KICT PostgreSQL database with initial terminal data...');
      
      await db.insert(containers).values([
        { containerId: 'CONT-9001', number: 'MSCU7829104', size: '40ft', type: 'HC', status: 'Full', block: 'A', row: '04', tier: '02', weight: '28.4t', consignee: 'PT Kebumen Sejahtera', hazard: false, arrivalDate: '2026-10-14' },
        { containerId: 'CONT-9002', number: 'TGHU4412901', size: '20ft', type: 'DV', status: 'Empty', block: 'B', row: '02', tier: '01', weight: '2.3t', consignee: 'Global Logistik Indo', hazard: false, arrivalDate: '2026-10-15' },
        { containerId: 'CONT-9003', number: 'OOLU9923841', size: '40ft', type: 'RF', status: 'Full', block: 'C', row: '01', tier: '03', weight: '31.0t', consignee: 'Jawa Food Industries', hazard: true, arrivalDate: '2026-10-13' },
        { containerId: 'CONT-9004', number: 'CMAU1102934', size: '20ft', type: 'DV', status: 'Full', block: 'A', row: '05', tier: '01', weight: '19.8t', consignee: 'Samudra Makmur', hazard: false, arrivalDate: '2026-10-15' },
        { containerId: 'CONT-9005', number: 'HLBU5567823', size: '40ft', type: 'HC', status: 'Empty', block: 'D', row: '03', tier: '02', weight: '3.8t', consignee: 'Kebumen Exportindo', hazard: false, arrivalDate: '2026-10-12' },
      ]);

      await db.insert(gateLogs).values([
        { logId: 'GATE-501', truckNo: 'AA 8812 ZK', driverName: 'Slamet Riyadi', containerNo: 'MSCU7829104', type: 'Gate In', time: '2026-10-15 08:30', status: 'Completed', eirRef: 'EIR-881' },
        { logId: 'GATE-502', truckNo: 'B 9182 UY', driverName: 'Budi Santoso', containerNo: 'TGHU4412901', type: 'Gate Out', time: '2026-10-15 09:15', status: 'Completed', eirRef: 'EIR-882' },
        { logId: 'GATE-503', truckNo: 'R 1429 EA', driverName: 'Joko Widodo', containerNo: 'OOLU9923841', type: 'Gate In', time: '2026-10-15 10:00', status: 'In Terminal', eirRef: 'EIR-883' },
        { logId: 'GATE-504', truckNo: 'AA 9931 BC', driverName: 'Supriyanto', containerNo: 'CMAU1102934', type: 'Gate Out', time: '2026-10-15 11:20', status: 'Pending', eirRef: 'EIR-884' },
      ]);

      await db.insert(vessels).values([
        { vesselId: 'VSL-101', name: 'MV. KEBUMEN JAYA V.04', voyage: 'KJ-042', eta: '2026-10-16 14:00', etd: '2026-10-17 18:00', berth: 'Berth 01', status: 'Scheduled', operator: 'Samudra Lines' },
        { vesselId: 'VSL-102', name: 'MV. JAVA STAR', voyage: 'JS-881', eta: '2026-10-15 06:00', etd: '2026-10-15 22:00', berth: 'Berth 02', status: 'Berthed', operator: 'Interoceanic' },
        { vesselId: 'VSL-103', name: 'MV. PACIFIC CARRIER', voyage: 'PC-109', eta: '2026-10-12 10:00', etd: '2026-10-13 14:00', berth: 'Berth 01', status: 'Completed', operator: 'Pacific Shipping' },
      ]);

      await db.insert(equipment).values([
        { equipId: 'EQ-01', code: 'QC-01', type: 'Quayside Crane', status: 'Active', operator: 'Ahmad Fauzi', task: 'Loading MV. JAVA STAR', fuelOrBattery: '85%', location: 'Berth 02' },
        { equipId: 'EQ-02', code: 'QC-02', type: 'Quayside Crane', status: 'Standby', operator: 'Dedi Kurniawan', task: 'Standby for MV. KEBUMEN JAYA', fuelOrBattery: '90%', location: 'Berth 01' },
        { equipId: 'EQ-03', code: 'RS-01', type: 'Reach Stacker', status: 'Active', operator: 'Wahyu Hidayat', task: 'Stacking Block A', fuelOrBattery: '65%', location: 'Yard Block A' },
        { equipId: 'EQ-04', code: 'RS-02', type: 'Reach Stacker', status: 'Active', operator: 'Rian Pratama', task: 'Transfer to Gate In', fuelOrBattery: '72%', location: 'Gate Area' },
        { equipId: 'EQ-05', code: 'RTG-01', type: 'Rubber Tyred Gantry', status: 'Maintenance', operator: 'Technician Team', task: 'Routine Hydraulic Check', fuelOrBattery: '40%', location: 'Workshop' },
      ]);

      await db.insert(eirs).values([
        { eirId: 'EIR-881', containerNo: 'MSCU7829104', truckNo: 'AA 8812 ZK', date: '2026-10-15 08:30', condition: 'Good', sealNo: 'SL-99281', inspector: 'Officer Hendra', remarks: 'No structural dents observed.' },
        { eirId: 'EIR-882', containerNo: 'TGHU4412901', truckNo: 'B 9182 UY', date: '2026-10-15 09:15', condition: 'Minor Scratch', sealNo: 'SL-99282', inspector: 'Officer Joko', remarks: 'Scratched on right sidewall.' },
        { eirId: 'EIR-883', containerNo: 'OOLU9923841', truckNo: 'R 1429 EA', date: '2026-10-15 10:00', condition: 'Good', sealNo: 'SL-99283', inspector: 'Officer Rina', remarks: 'Refrigerated unit operational (-18C).' },
      ]);

      await db.insert(billings).values([
        { billId: 'INV-2026-001', customer: 'PT Kebumen Sejahtera', serviceType: 'Lifting & Storage', amount: 'Rp 12.500.000', status: 'Paid', date: '2026-10-14', due: '2026-10-21' },
        { billId: 'INV-2026-002', customer: 'Global Logistik Indo', serviceType: 'Gate Pass & Handling', amount: 'Rp 4.200.000', status: 'Pending', date: '2026-10-15', due: '2026-10-22' },
        { billId: 'INV-2026-003', customer: 'Jawa Food Industries', serviceType: 'Reefer Monitoring & Storage', amount: 'Rp 18.900.000', status: 'Paid', date: '2026-10-13', due: '2026-10-20' },
      ]);

      console.log('Database seeding completed successfully.');
    }
  } catch (err) {
    console.error('Database seed error (tables might not exist yet):', err);
  }
}

// API Routes
app.get('/api/kict/all', async (req, res) => {
  try {
    const cList = await db.select().from(containers);
    const gList = await db.select().from(gateLogs);
    const vList = await db.select().from(vessels);
    const eList = await db.select().from(equipment);
    const eirList = await db.select().from(eirs);
    const bList = await db.select().from(billings);

    res.json({
      containers: cList,
      gateLogs: gList,
      vessels: vList,
      equipment: eList,
      eirs: eirList,
      billings: bList,
    });
  } catch (error: any) {
    console.error('Failed to fetch all data from PostgreSQL:', error);
    res.status(500).json({ error: error.message || 'Database error' });
  }
});

// Containers CRUD
app.get('/api/kict/containers', async (req, res) => {
  try {
    const data = await db.select().from(containers);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/kict/containers', async (req, res) => {
  try {
    const containerId = `CONT-${Date.now().toString().slice(-4)}`;
    const [newItem] = await db.insert(containers).values({ containerId, ...req.body }).returning();
    res.json(newItem);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/kict/containers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.update(containers).set(req.body).where(eq(containers.containerId, id)).returning();
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/kict/containers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(containers).where(eq(containers.containerId, id));
    res.json({ success: true, id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Gate Logs CRUD
app.get('/api/kict/gateLogs', async (req, res) => {
  try {
    const data = await db.select().from(gateLogs);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/kict/gateLogs', async (req, res) => {
  try {
    const logId = `GATE-${Date.now().toString().slice(-4)}`;
    const [newItem] = await db.insert(gateLogs).values({ logId, ...req.body }).returning();
    res.json(newItem);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/kict/gateLogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.update(gateLogs).set(req.body).where(eq(gateLogs.logId, id)).returning();
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/kict/gateLogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(gateLogs).where(eq(gateLogs.logId, id));
    res.json({ success: true, id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Vessels CRUD
app.get('/api/kict/vessels', async (req, res) => {
  try {
    const data = await db.select().from(vessels);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/kict/vessels', async (req, res) => {
  try {
    const vesselId = `VSL-${Date.now().toString().slice(-4)}`;
    const [newItem] = await db.insert(vessels).values({ vesselId, ...req.body }).returning();
    res.json(newItem);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/kict/vessels/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.update(vessels).set(req.body).where(eq(vessels.vesselId, id)).returning();
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/kict/vessels/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(vessels).where(eq(vessels.vesselId, id));
    res.json({ success: true, id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Equipment CRUD
app.get('/api/kict/equipment', async (req, res) => {
  try {
    const data = await db.select().from(equipment);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/kict/equipment', async (req, res) => {
  try {
    const equipId = `EQ-${Date.now().toString().slice(-4)}`;
    const [newItem] = await db.insert(equipment).values({ equipId, ...req.body }).returning();
    res.json(newItem);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/kict/equipment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.update(equipment).set(req.body).where(eq(equipment.equipId, id)).returning();
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/kict/equipment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(equipment).where(eq(equipment.equipId, id));
    res.json({ success: true, id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// eirs CRUD
app.get('/api/kict/eirs', async (req, res) => {
  try {
    const data = await db.select().from(eirs);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/kict/eirs', async (req, res) => {
  try {
    const eirId = `EIR-${Date.now().toString().slice(-4)}`;
    const [newItem] = await db.insert(eirs).values({ eirId, ...req.body }).returning();
    res.json(newItem);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/kict/eirs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.update(eirs).set(req.body).where(eq(eirs.eirId, id)).returning();
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/kict/eirs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(eirs).where(eq(eirs.eirId, id));
    res.json({ success: true, id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// billings CRUD
app.get('/api/kict/billings', async (req, res) => {
  try {
    const data = await db.select().from(billings);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/api/kict/billings', async (req, res) => {
  try {
    const billId = `INV-${Date.now().toString().slice(-4)}`;
    const [newItem] = await db.insert(billings).values({ billId, ...req.body }).returning();
    res.json(newItem);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/api/kict/billings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.update(billings).set(req.body).where(eq(billings.billId, id)).returning();
    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/api/kict/billings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(billings).where(eq(billings.billId, id));
    res.json({ success: true, id });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Vite middleware in development
async function setupVite() {
  await seedDatabase();

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }
}

setupVite().then(() => {
  app.listen(PORT, () => {
    console.log(`KICT TOS PostgreSQL Server running on port ${PORT}`);
  });
});
