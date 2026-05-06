import { Download, FileSpreadsheet, Database, CheckCircle, Clock } from 'lucide-react';
import { regionData } from '../data/mockData';

const totalQuota = regionData.reduce((s, r) => s + r.n, 0);
const totalCompleted = regionData.reduce((s, r) => s + r.completed, 0);

export default function RawData() {
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

        {/* Overall progress bar */}
        <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${totalCompleted / totalQuota * 100}%` }}
          />
        </div>

        <div className="space-y-3">
          {regionData.map(r => {
            const pct = Math.round(r.completed / r.n * 100);
            const done = r.completed >= r.n;
            return (
              <div key={r.region}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    {done
                      ? <CheckCircle size={14} className="text-green-500" />
                      : <Clock size={14} className="text-amber-500" />
                    }
                    <span className="text-sm text-gray-700">{r.region}</span>
                  </div>
                  <span className="text-xs text-gray-500">{r.completed}/{r.n} ({pct}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all ${done ? 'bg-green-500' : 'bg-amber-400'}`}
                    style={{ width: `${pct}%` }}
                  />
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
        <p className="text-xs text-gray-400 mb-5">Download the full dataset or filtered subset based on active filters</p>

        {/* Preview Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-100 mb-5">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                {['Resp_ID', 'Region', 'Gender', 'Age', 'Platform', 'Category', 'Basket_THB', 'Freq_Monthly', 'Month'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-gray-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'R0001', region: 'Bkk', gender: 'F', age: '28', platform: 'Shopee', cat: 'Fashion', basket: '650', freq: '5', month: 'Jun-25' },
                { id: 'R0002', region: 'North', gender: 'M', age: '35', platform: 'Lazada', cat: 'Electronics', basket: '1,240', freq: '2', month: 'Jun-25' },
                { id: 'R0003', region: 'NE', gender: 'F', age: '22', platform: 'TikTok', cat: 'Beauty', basket: '480', freq: '6', month: 'Jun-25' },
                { id: 'R0004', region: 'South', gender: 'M', age: '41', platform: 'Temu', cat: 'General', basket: '320', freq: '3', month: 'Jun-25' },
                { id: 'R0005', region: 'C&W', gender: 'F', age: '31', platform: 'Shopee', cat: 'FMCG', basket: '420', freq: '8', month: 'Jun-25' },
              ].map(row => (
                <tr key={row.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="py-1.5 px-3 font-mono text-gray-500">{row.id}</td>
                  <td className="py-1.5 px-3">{row.region}</td>
                  <td className="py-1.5 px-3">{row.gender}</td>
                  <td className="py-1.5 px-3">{row.age}</td>
                  <td className="py-1.5 px-3 font-medium">{row.platform}</td>
                  <td className="py-1.5 px-3">{row.cat}</td>
                  <td className="py-1.5 px-3">฿{row.basket}</td>
                  <td className="py-1.5 px-3">{row.freq}x</td>
                  <td className="py-1.5 px-3 text-gray-400">{row.month}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-3 py-2 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-400">Showing 5 of {totalCompleted} records · Filtered by active selections</p>
          </div>
        </div>

        {/* Download Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors">
            <FileSpreadsheet size={16} />
            Download Excel (.xlsx)
          </button>
          <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors">
            <Download size={16} />
            Download SPSS (.sav)
          </button>
          <button className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-colors">
            <Download size={16} />
            Download CSV (.csv)
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-3 text-center">
          Files include all variables: demographics, platform usage, category spend, frequency data per respondent
        </p>
      </div>

      {/* Data Dictionary */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Data Dictionary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { var: 'Resp_ID', type: 'String', desc: 'Unique respondent identifier' },
            { var: 'Region', type: 'Categorical', desc: '5-region classification (Thailand)' },
            { var: 'Gender', type: 'Categorical', desc: 'Male / Female (50:50 quota)' },
            { var: 'Age', type: 'Numeric', desc: 'Age in years (18-65)' },
            { var: 'Platform', type: 'Categorical', desc: 'Lazada / Shopee / TikTok Shop / Temu' },
            { var: 'Category', type: 'Categorical', desc: 'Product category (cluster & sub-level)' },
            { var: 'Basket_THB', type: 'Numeric', desc: 'Avg spend per order in THB' },
            { var: 'Freq_Monthly', type: 'Numeric', desc: 'Orders placed per month' },
            { var: 'Month', type: 'Date', desc: 'Survey wave (MMM-YY)' },
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
