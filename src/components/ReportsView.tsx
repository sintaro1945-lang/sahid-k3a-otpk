import { useState } from 'react';
import { KictAllData } from '../types';
import { BarChart3, FileSpreadsheet, FileText, Download, CheckCircle, ShieldCheck } from 'lucide-react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface ReportsViewProps {
  data: KictAllData;
}

export function ReportsView({ data }: ReportsViewProps) {
  const [reportType, setReportType] = useState<'containers' | 'gateLogs' | 'vessels' | 'equipment' | 'billings'>('containers');
  const [successMsg, setSuccessMsg] = useState('');

  const exportToExcel = () => {
    let dataset: any[] = [];
    let filename = 'KICT_Report';

    if (reportType === 'containers') {
      dataset = data.containers;
      filename = 'KICT_Yard_Containers';
    } else if (reportType === 'gateLogs') {
      dataset = data.gateLogs;
      filename = 'KICT_Gate_Logs';
    } else if (reportType === 'vessels') {
      dataset = data.vessels;
      filename = 'KICT_Vessel_Berths';
    } else if (reportType === 'equipment') {
      dataset = data.equipment;
      filename = 'KICT_Equipment_Tracking';
    } else if (reportType === 'billings') {
      dataset = data.billings;
      filename = 'KICT_Billing_Invoices';
    }

    const worksheet = XLSX.utils.json_to_sheet(dataset);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`);

    setSuccessMsg(`Berhasil mengekspor ${filename}.xlsx ke format Excel!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const exportToPDF = () => {
    const doc = new jsPDF() as any;
    let title = 'Laporan KICT TOS';
    let dataset: any[] = [];
    let columns: string[] = [];

    if (reportType === 'containers') {
      title = 'Laporan Yard Kontainer - KICT';
      dataset = data.containers.map(c => [c.number, c.size, c.type, c.status, `Blok ${c.block}-R${c.row}-T${c.tier}`, c.weight, c.consignee]);
      columns = ['No Kontainer', 'Ukuran', 'Tipe', 'Status', 'Lokasi', 'Berat', 'Consignee'];
    } else if (reportType === 'gateLogs') {
      title = 'Laporan Gate Sistem & Truk - KICT';
      dataset = data.gateLogs.map(g => [g.id, g.type, g.truckNo, g.driverName, g.containerNo, g.time, g.status]);
      columns = ['ID', 'Tipe', 'Nopol Truk', 'Supir', 'Kontainer', 'Waktu', 'Status'];
    } else if (reportType === 'vessels') {
      title = 'Laporan Jadwal Sandar Kapal - KICT';
      dataset = data.vessels.map(v => [v.name, v.voyage, v.operator, v.berth, v.eta, v.etd, v.status]);
      columns = ['Nama Kapal', 'Voyage', 'Operator', 'Dermaga', 'ETA', 'ETD', 'Status'];
    } else if (reportType === 'equipment') {
      title = 'Laporan Alat Berat & Crane - KICT';
      dataset = data.equipment.map(e => [e.code, e.type, e.status, e.operator, e.task, e.location, e.fuelOrBattery]);
      columns = ['Kode', 'Tipe', 'Status', 'Operator', 'Task', 'Lokasi', 'BBM/Baterai'];
    } else if (reportType === 'billings') {
      title = 'Laporan Tagihan & Keuangan - KICT';
      dataset = data.billings.map(b => [b.id, b.customer, b.serviceType, b.amount, b.due, b.status]);
      columns = ['ID Invoice', 'Pelanggan', 'Layanan', 'Jumlah', 'Jatuh Tempo', 'Status'];
    }

    doc.setFontSize(16);
    doc.setTextColor(75, 0, 130);
    doc.text(title, 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Dicetak pada: ${new Date().toLocaleString('id-ID')} | KICT Terminal Operating System`, 14, 28);

    doc.autoTable({
      startY: 35,
      head: [columns],
      body: dataset,
      theme: 'grid',
      headStyles: { fillColor: [88, 28, 135] },
      styles: { fontSize: 8 },
    });

    doc.save(`KICT_Report_${reportType}_${new Date().toISOString().split('T')[0]}.pdf`);

    setSuccessMsg(`Berhasil mengunduh Laporan PDF (${reportType})!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/80 via-indigo-900/60 to-purple-950 border border-purple-700/50 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-800/60 border border-purple-600/40 text-purple-200 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
            <span>Laporan & Ekspor Data Otomatis</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Generator Laporan Operasional KICT</h2>
          <p className="text-xs text-purple-300/80 mt-1">
            Ekspor laporan komprehensif ke format PDF dan Excel (.xlsx) secara instan untuk audit dan manajemen terminal.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 text-xs flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Report Selection Card */}
      <div className="p-6 rounded-2xl bg-purple-950/60 border border-purple-800/40 backdrop-blur-md space-y-6">
        <div>
          <label className="block text-xs font-semibold text-purple-200 mb-2">Pilih Kategori Laporan:</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { id: 'containers', label: 'Yard Kontainer', count: `${data.containers.length} Item` },
              { id: 'gateLogs', label: 'Gate & Truk', count: `${data.gateLogs.length} Log` },
              { id: 'vessels', label: 'Jadwal Kapal', count: `${data.vessels.length} Kapal` },
              { id: 'equipment', label: 'Alat Berat', count: `${data.equipment.length} Unit` },
              { id: 'billings', label: 'Billing & Tagihan', count: `${data.billings.length} Invoice` },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setReportType(item.id as any)}
                className={`p-4 rounded-xl border text-left transition ${
                  reportType === item.id
                    ? 'bg-purple-600 border-purple-400 text-white shadow-lg'
                    : 'bg-purple-900/30 border-purple-800/60 text-purple-200 hover:bg-purple-900/60'
                }`}
              >
                <div className="font-bold text-sm">{item.label}</div>
                <div className="text-[11px] opacity-80 mt-1">{item.count}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-purple-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs text-purple-300">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Format ekspor sesuai dengan standar pelaporan internasional ISPS Code & Pelindo.</span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={exportToExcel}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs shadow-lg flex items-center justify-center space-x-2 transition"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Ekspor ke Excel (.xlsx)</span>
            </button>
            <button
              onClick={exportToPDF}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs shadow-lg flex items-center justify-center space-x-2 transition"
            >
              <FileText className="w-4 h-4" />
              <span>Cetak / Ekspor PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
