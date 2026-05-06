import { useState } from 'react';
import { Download, FileSpreadsheet, Database, CheckCircle, Clock, Loader, FileDown } from 'lucide-react';
import ChartCard from '../components/ChartCard';
import { regionData } from '../data/mockData';
import { respondents } from '../data/respondents';
import { exportCSV, exportXLSX, exportSPSS } from '../utils/exportUtils';

const totalQuota     = regionData.reduce((s, r) => s + r.n, 0);
const totalCompleted = regionData.reduce((s, r) => s + r.completed, 0);

const PREVIEW_COLS = ['resp_id','region','gender','age','platform','category','basket_thb','freq_monthly'];
const COL_LABELS   = {
  resp_id:'ID', region:'Region', gender:'Gender', age:'Age',
  platform:'Platform', category:'Category', basket_thb:'Basket (฿)', freq_monthly:'Freq/mo',
};

export default function RawData() {
  const [status, setStatus] = useState({ csv: 'idle', xlsx: 'idle', spss: 'idle' });

  async function handleExport(type) {
    setStatus(s => ({ ...s, [type]: 'loading' }));
    try {
      if (type === 'csv')       exportCSV();
      else if (type === 'xlsx') exportXLSX();
      else if (type === 'spss') await exportSPSS();
      setStatus(s => ({ ...s, [type]: 'done' }));
      setTimeout(() => setStatus(s => ({ ...s, [type]: 'idle' })), 2500);
    } catch {
      setStatus(s => ({ ...s, [type]: 'error' }));
      setTimeout(() => setStatus(s => ({ ...s, [type]: 'idle' })), 3000);
    }
  }

  const btnContent = (type, labels) => {
    const s = status[type];
    if (s === 'loading') return <><Loader size={14} className="animate-spin" />{labels.loading}</>;
    if (s === 'done')    return <><CheckCircle size={14} />{labels.done}</>;
    if (s === 'error')   return <span className="opacity-70">{labels.error}</span>;
    return <>{labels.icon}{labels.default}</>;
  };

  return (
    <div className="p-6 space-y-5">
      {/* Fieldwork Progress */}
      <ChartCard title="Fieldwork Progress by Region" subtitle="Target N=200 per region · 5 regions · Total N=1,000">
        <div className="flex items-end justify-between mb-5">
          <div>
            <span className="text-4xl font-bold text-gradient">{totalCompleted}</span>
            <span className="text-lg text-white/65 ml-1">/ {totalQuota}</span>
            <p className="text-[11px] text-white/90 mt-1 font-light">Total completed interviews</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-[#4ade80]">{Math.round(totalCompleted / totalQuota * 100)}%</span>
            <p className="text-[11px] text-white/90 mt-1 font-light">Overall completion</p>
          </div>
        </div>

        {/* Overall bar */}
        <div className="w-full h-1.5 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="h-1.5 rounded-full" style={{ width: `${totalCompleted / totalQuota * 100}%`, background: 'linear-gradient(90deg,#2AD4C4,#5BE0D4)' }} />
        </div>

        <div className="space-y-4">
          {regionData.map(r => {
            const pct  = Math.round(r.completed / r.n * 100);
            const done = r.completed >= r.n;
            return (
              <div key={r.region}>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2">
                    {done
                      ? <CheckCircle size={13} className="text-[#4ade80]" />
                      : <Clock size={13} className="text-amber-400" />
                    }
                    <span className="text-sm text-white/85">{r.region}</span>
                  </div>
                  <span className="text-xs text-white/90">{r.completed}/{r.n} <span className="text-white/95 font-medium">({pct}%)</span></span>
                </div>
                <div className="w-full h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <div className="h-1 rounded-full transition-all"
                    style={{ width: `${pct}%`, background: done ? 'linear-gradient(90deg,#2AD4C4,#5BE0D4)' : '#f59e0b' }} />
                </div>
              </div>
            );
          })}
        </div>
      </ChartCard>

      {/* Export Zone */}
      <ChartCard title="Data Export Zone" subtitle={`Real file download · N=${respondents.length} sample respondents`}>
        {/* Preview Table */}
        <div className="overflow-x-auto rounded-lg mb-5" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                {PREVIEW_COLS.map(c => (
                  <th key={c} className="text-left py-2.5 px-3 text-white/65 font-medium uppercase tracking-wider text-[10px]">{COL_LABELS[c]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {respondents.slice(0, 8).map(row => (
                <tr key={row.resp_id} className="border-t hover:bg-white/[0.02] transition-colors" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                  {PREVIEW_COLS.map(c => (
                    <td key={c} className={`py-2 px-3 whitespace-nowrap ${c === 'resp_id' ? 'font-mono text-white/85' : 'text-white/85'}`}>
                      {c === 'basket_thb' ? `฿${row[c].toLocaleString()}` : row[c]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-3 py-2" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <p className="text-[10px] text-white/85">Showing 8 of {respondents.length} · Full dataset downloaded</p>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { type: 'xlsx', icon: <FileSpreadsheet size={14} />, label: 'Excel (.xlsx)', loading: 'Generating…', done: 'Downloaded!', error: 'Failed', bg: 'rgba(74,222,128,0.1)', border: 'rgba(74,222,128,0.25)', color: '#4ade80' },
            { type: 'spss', icon: <Download size={14} />,        label: 'SPSS (.sav)',   loading: 'Generating…', done: 'Downloaded!', error: 'Server unavailable', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.25)', color: '#60a5fa' },
            { type: 'csv',  icon: <FileDown size={14} />,        label: 'CSV (.csv)',    loading: 'Generating…', done: 'Downloaded!', error: 'Failed', bg: 'rgba(42,212,196,0.1)', border: 'rgba(42,212,196,0.25)', color: '#2AD4C4' },
          ].map(b => (
            <button
              key={b.type}
              onClick={() => handleExport(b.type)}
              disabled={status[b.type] === 'loading'}
              className="flex items-center justify-center gap-2 text-xs font-semibold py-3 px-4 rounded-xl transition-all cursor-pointer disabled:opacity-50"
              style={{ background: b.bg, border: `1px solid ${b.border}`, color: b.color }}
            >
              {btnContent(b.type, { icon: b.icon, default: b.label, loading: b.loading, done: b.done, error: b.error })}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-white/85 mt-3 text-center font-light">
          XLSX: Raw Data + Summary sheets · SPSS: variable & value labels · CSV: plain text
        </p>
      </ChartCard>

      {/* Data Dictionary */}
      <ChartCard title="Data Dictionary">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { var: 'resp_id',        type: 'String',      desc: 'Unique respondent ID (R0001–R1000)' },
            { var: 'region',         type: 'Categorical', desc: '5-region Thailand classification' },
            { var: 'gender',         type: 'Categorical', desc: 'Male / Female — 50:50 quota (coded 1/2)' },
            { var: 'age',            type: 'Numeric',     desc: 'Age in years (18–65)' },
            { var: 'age_group',      type: 'Categorical', desc: '18-24 / 25-34 / 35-44 / 45-54 / 55+' },
            { var: 'platform',       type: 'Categorical', desc: 'Primary platform: Shopee / Lazada / TikTok / Temu' },
            { var: 'category',       type: 'Categorical', desc: 'Product category purchased most recently' },
            { var: 'basket_thb',     type: 'Numeric',     desc: 'Average spend per order (THB)' },
            { var: 'freq_monthly',   type: 'Numeric',     desc: 'Orders placed per month' },
            { var: 'multi_platform', type: 'Categorical', desc: 'Bought on 2+ platforms in same month (Yes/No)' },
            { var: 'survey_month',   type: 'String',      desc: 'Survey wave (e.g. Jun-2025)' },
          ].map(v => (
            <div key={v.var} className="flex items-start gap-2 text-xs py-1">
              <code className="text-[11px] px-1.5 py-0.5 rounded font-mono shrink-0 text-teal"
                style={{ background: 'rgba(42,212,196,0.1)' }}>{v.var}</code>
              <span className="text-white/85 shrink-0 text-[10px] mt-0.5">{v.type}</span>
              <span className="text-white/95 font-light">{v.desc}</span>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
