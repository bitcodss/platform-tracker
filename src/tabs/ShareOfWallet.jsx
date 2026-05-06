import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Cell
} from 'recharts';
import ChartCard from '../components/ChartCard';
import { walletValueData, walletVolumeData, overlapData, basketSizeByPlatform } from '../data/mockData';

const DARK_TOOLTIP = {
  contentStyle: { background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontSize: 12 },
  cursor: { fill: 'rgba(255,255,255,0.03)' },
};

const STATS = [
  { label: 'Single Platform', value: '30%', desc: 'Shopee or Lazada only' },
  { label: '2-Platform',      value: '55%', desc: 'Cross-shop between 2 apps' },
  { label: '3+ Platforms',    value: '15%', desc: 'Heavy multi-platform users' },
  { label: 'Shopee Overlap',  value: '61%', desc: 'Shopee buyers also use another app' },
];

export default function ShareOfWallet() {
  return (
    <div className="p-6 space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Wallet Share — Value" subtitle="Average THB spend per platform / month">
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={walletValueData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.04)" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} tickFormatter={v => `฿${v}`} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: '#bbb' }} width={85} axisLine={false} tickLine={false} />
              <Tooltip {...DARK_TOOLTIP} formatter={v => `฿${v}`} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={28}>
                {walletValueData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Wallet Share — Volume" subtitle="Share of total orders per platform">
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={walletVolumeData} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.04)" />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: '#bbb' }} width={85} axisLine={false} tickLine={false} />
              <Tooltip {...DARK_TOOLTIP} formatter={v => `${v}%`} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={28}>
                {walletVolumeData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Overlap */}
      <ChartCard title="Multi-Platform Buyer Overlap" subtitle="% of active buyers purchasing on each combination in the same month">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={overlapData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="combo" tick={{ fontSize: 10, fill: '#aaa' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={v => `${v}%`} tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
            <Tooltip {...DARK_TOOLTIP} formatter={v => `${v}%`} />
            <Bar dataKey="pct" fill="#2AD4C4" radius={[4, 4, 0, 0]} maxBarSize={40} name="Buyer %" />
          </BarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          {STATS.map(s => (
            <div key={s.label} className="rounded-lg p-3" style={{ background: 'rgba(42,212,196,0.06)', border: '1px solid rgba(42,212,196,0.12)' }}>
              <p className="text-[10px] text-teal/60 font-medium uppercase tracking-wider">{s.label}</p>
              <p className="text-2xl font-bold text-teal mt-1">{s.value}</p>
              <p className="text-[10px] text-white/65 mt-0.5 font-light">{s.desc}</p>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Basket by Gender */}
      <ChartCard title="Avg Basket Size by Platform × Gender (฿)" subtitle="N=500 male · N=500 female">
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={basketSizeByPlatform} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="platform" tick={{ fontSize: 12, fill: '#bbb' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={v => `฿${v}`} tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
            <Tooltip {...DARK_TOOLTIP} formatter={v => `฿${v}`} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#bbb' }} />
            <Bar dataKey="male" fill="#60a5fa" name="Male" radius={[4, 4, 0, 0]} maxBarSize={30} />
            <Bar dataKey="female" fill="#f472b6" name="Female" radius={[4, 4, 0, 0]} maxBarSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
