import { useState } from 'react';
import { Download, FileSpreadsheet, Database, CheckCircle, Clock, Loader } from 'lucide-react';
import { regionData } from '../data/mockData';
import { respondents } from '../data/respondents';
import { exportCSV, exportXLSX, exportSPSS } from '../utils/exportUtils';

const totalQuota = regionData.reduce((s, r) => s + r.n, 0);
const totalCompleted = regionData.reduce((s, r) => s + r.completed, 0);

const PREVIEW_COLS = ['resp_id','region','gender','age','platform','category','basket_thb','freq_monthly','survey_month'];
const COL_LABELS = {
  resp_id: 'Resp_ID', region: 'Region', gender: 'Gender', age: 'Age',
  platform: 'Platform', category: 'Category', basket_thb: 'Basket (฿)',
  freq_monthly: 'Freq/mo', survey_month: 'Month',
};

export default function RawData() {
  const [status, setStatus] = useState({ csv: 'idle', xlsx: 'idle', spss: 'idle' });

  async function handleExport(type) {
    setStatus(s => ({ ...s, [type]: 'loading' }));
    try {
      if (type === 'csv') exportCSV();
      else if (type === 'xlsx') exportXLSX();
      else if (type === 'spss') await exportSPSS();
      setStatus(s => ({ ...s, [type]: 'done' }));
      setTimeout(() => setStatus(s => ({ ...s, [type]: 'idle' })), 2500);
    } catch (err) {
      setStatus(s => ({ ...s, [type]: 'error' }));
      setTimeout(() => setStatus(s => ({ ...s, [type]: 'idle' })), 3000);
      console.error(err);
    }
  }

  const btnLabel = (type, labels) => {
    const s = status[type];
    if (s === 'loading') return <><Loader size={15} className="animate-spin" />{labels.loading}</>;
    if (s === 'done') return <><CheckCircle size={15} />{labels.done}</>;
    if (s === 'error') return <span className="text-red-200">{labels.error}</span>;
    return <>{labels.icon}{labels.default}</>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Fieldwork Progress */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">Fieldwork Progress by Region</h3>
        <p className="text-xs text-gray-400 mb-5">Target N=200 per region · 5 regions · Total N=1,000</p>

        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-3xl font-bold text-gray-800">{totalCompleted}<span className="text-base font-normal text-gray-400">/{totalQuota}</span></p>
            <p className="text-xs text-gray-400 mt-0.5">Total completed interviews</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">{Math.round(totalCompleted / totalQuota * 100)}%</p>
            <p className="text-xs text-gray-400 mt-0.5">Overall completion</p>
          </div>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${totalCompleted / totalQuota * 100}%` }} />
        </div>

        <div className="space-y-3">
          {regionData.map(r => {
            const pct = Math.round(r.completed / r.n * 100);
            const done = r.completed >= r.n;
            return (
              <div key={r.region}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    {done ? <CheckCircle size={14} className="text-green-500" /> : <Clock size={14} className="text-amber-500" />}
                    <span className="text-sm text-gray-700">{r.region}</span>
                  </div>
                  <span className="text-xs text-gray-500">{r.completed}/{r.n} ({pct}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${done ? 'bg-green-500' : 'bg-amber-400'}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Export Zone */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-1">
          <Database size={16} className="text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-700">Data Export Zone</h3>
        </div>
        <p className="text-xs text-gray-400 mb-5">
          Real file download — N={respondents.length} sample respondents · All columns included
        </p>

        {/* Preview Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-100 mb-5">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                {PREVIEW_COLS.map(c => (
                  <th key={c} className="text-left py-2 px-3 text-gray-500 font-medium whitespace-nowrap">{COL_LABELS[c]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {respondents.slice(0, 8).map(row => (
                <tr key={row.resp_id} className="border-t border-gray-50 hover:bg-gray-50">
                  {PREVIEW_COLS.map(c => (
                    <td key={c} className={`py-1.5 px-3 whitespace-nowrap ${c === 'resp_id' ? 'font-mono text-gray-400' : 'text-gray-700'}`}>
                      {c === 'basket_thb' ? `฿${row[c].toLocaleString()}` : row[c]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-3 py-2 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Showing 8 of {respondents.length} records · Full dataset exported on download
            </p>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => handleExport('xlsx')}
            disabled={status.xlsx === 'loading'}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors cursor-pointer"
          >
            {btnLabel('xlsx', {
              icon: <FileSpreadsheet size={15} />,
              default: 'Download Excel (.xlsx)',
              loading: 'Generating…',
              done: 'Downloaded!',
              error: 'Failed — try again',
            })}
          </button>

          <button
            onClick={() => handleExport('spss')}
            disabled={status.spss === 'loading'}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors cursor-pointer"
          >
            {btnLabel('spss', {
              icon: <Download size={15} />,
              default: 'Download SPSS (.sav)',
              loading: 'Generating…',
              done: 'Downloaded!',
              error: 'Server unavailable',
            })}
          </button>

          <button
            onClick={() => handleExport('csv')}
            disabled={status.csv === 'loading'}
            className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-60 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors cursor-pointer"
          >
            {btnLabel('csv', {
              icon: <Download size={15} />,
              default: 'Download CSV (.csv)',
              loading: 'Generating…',
              done: 'Downloaded!',
              error: 'Failed — try again',
            })}
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-3 text-center">
          XLSX includes Raw Data + Summary sheets · SPSS includes variable labels &amp; value codes · CSV plain text
        </p>
      </div>

      {/* Data Dictionary */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Data Dictionary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { var: 'resp_id', type: 'String', desc: 'Unique respondent identifier (R0001–R1000)' },
            { var: 'region', type: 'Categorical', desc: '5-region classification (Thailand)' },
            { var: 'gender', type: 'Categorical', desc: 'Male / Female — 50:50 quota (coded 1/2 in SPSS)' },
            { var: 'age', type: 'Numeric', desc: 'Age in years (18–65)' },
            { var: 'age_group', type: 'Categorical', desc: '18-24 / 25-34 / 35-44 / 45-54 / 55+' },
            { var: 'platform', type: 'Categorical', desc: 'Primary platform: Shopee / Lazada / TikTok Shop / Temu' },
            { var: 'category', type: 'Categorical', desc: 'Product category purchased most recently' },
            { var: 'basket_thb', type: 'Numeric', desc: 'Average spend per order (THB)' },
            { var: 'freq_monthly', type: 'Numeric', desc: 'Number of orders placed per month' },
            { var: 'multi_platform', type: 'Categorical', desc: 'Bought on 2+ platforms in same month (Yes/No)' },
            { var: 'survey_month', type: 'String', desc: 'Survey wave identifier (e.g. Jun-2025)' },
          ].map(v => (
            <div key={v.var} className="flex items-start gap-2 text-xs">
              <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded font-mono shrink-0">{v.var}</code>
              <span className="text-gray-400 shrink-0">{v.type}</span>
              <span className="text-gray-600">{v.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
