import * as XLSX from 'xlsx';
import { respondents } from '../data/respondents';

const COLUMNS = [
  'resp_id', 'region', 'gender', 'age', 'age_group',
  'platform', 'category', 'basket_thb', 'freq_monthly',
  'multi_platform', 'survey_month',
];

const HEADERS = {
  resp_id: 'Respondent ID',
  region: 'Region',
  gender: 'Gender',
  age: 'Age',
  age_group: 'Age Group',
  platform: 'Platform',
  category: 'Product Category',
  basket_thb: 'Avg Basket Size (THB)',
  freq_monthly: 'Order Frequency / Month',
  multi_platform: 'Multi-Platform Buyer',
  survey_month: 'Survey Month',
};

export function exportCSV() {
  const header = COLUMNS.map(c => HEADERS[c]).join(',');
  const rows = respondents.map(r =>
    COLUMNS.map(c => {
      const v = String(r[c]);
      return v.includes(',') ? `"${v}"` : v;
    }).join(',')
  );
  const csv = [header, ...rows].join('\n');
  download(new Blob([csv], { type: 'text/csv;charset=utf-8;' }), 'platform_tracker_data.csv');
}

export function exportXLSX() {
  const wsData = [
    COLUMNS.map(c => HEADERS[c]),
    ...respondents.map(r => COLUMNS.map(c => r[c])),
  ];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Column widths
  ws['!cols'] = COLUMNS.map(c =>
    c === 'resp_id' ? { wch: 14 } :
    c === 'region' ? { wch: 20 } :
    c === 'category' ? { wch: 22 } :
    { wch: 16 }
  );

  // Header row style (bold)
  COLUMNS.forEach((_, ci) => {
    const cell = ws[XLSX.utils.encode_cell({ r: 0, c: ci })];
    if (cell) cell.s = { font: { bold: true }, fill: { fgColor: { rgb: 'E8F0FE' } } };
  });

  XLSX.utils.book_append_sheet(wb, ws, 'Raw Data');

  // Summary sheet
  const platforms = ['Shopee', 'Lazada', 'TikTok Shop', 'Temu'];
  const summary = platforms.map(p => {
    const rows = respondents.filter(r => r.platform === p);
    return {
      Platform: p,
      'N (respondents)': rows.length,
      'Avg Basket (THB)': Math.round(rows.reduce((s, r) => s + r.basket_thb, 0) / rows.length),
      'Avg Freq/Month': +(rows.reduce((s, r) => s + r.freq_monthly, 0) / rows.length).toFixed(1),
    };
  });
  const ws2 = XLSX.utils.json_to_sheet(summary);
  ws2['!cols'] = [{ wch: 14 }, { wch: 16 }, { wch: 18 }, { wch: 18 }];
  XLSX.utils.book_append_sheet(wb, ws2, 'Summary');

  XLSX.writeFile(wb, 'platform_tracker_data.xlsx');
}

export async function exportSPSS() {
  const res = await fetch('/api/export/spss');
  if (!res.ok) throw new Error('SPSS export server unavailable');
  const blob = await res.blob();
  download(blob, 'platform_tracker_data.sav');
}

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
