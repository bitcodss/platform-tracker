import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import KPICard from '../components/KPICard';
import ChartCard from '../components/ChartCard';
import { kpis, marketShareData, monthlyTrend } from '../data/mockData';

const DARK_TOOLTIP = {
  contentStyle: { background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontSize: 12 },
  cursor: { stroke: 'rgba(255,255,255,0.08)' },
};

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
  const r = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="700">{value}%</text>;
};

export default function ExecutiveSummary() {
  return (
    <div className="p-6 space-y-5">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Avg Order Frequency" value={kpis.totalFrequency} unit="orders/mo" subtitle="Per active buyer" trend={8} accent="teal" />
        <KPICard title="Avg Basket Size" value={`฿${kpis.avgBasketSize}`} subtitle="Per order, all platforms" trend={5} accent="terra" />
        <KPICard title="Active Buyers" value={kpis.activeBuyers} unit={`/ ${kpis.totalRespondents}`} subtitle="Purchased in last 30 days" trend={3} accent="purple" />
        <KPICard title="Platforms Tracked" value="4" subtitle="Lazada · Shopee · TikTok · Temu" accent="blue" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Market Share" subtitle="Order volume share by platform">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={marketShareData} cx="50%" cy="50%" outerRadius={105} innerRadius={50}
                dataKey="value" labelLine={false} label={renderLabel}>
                {marketShareData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip {...DARK_TOOLTIP} formatter={v => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center -mt-1">
            {marketShareData.map(p => (
              <span key={p.name} className="flex items-center gap-1.5 text-xs text-white/95">
                <span className="w-2 h-2 rounded-full" style={{ background: p.fill }} />
                {p.name}
                <strong className="text-white/95">{p.value}%</strong>
              </span>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Monthly Trend" subtitle="Avg order frequency per platform">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlyTrend} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#aaa' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#aaa' }} axisLine={false} tickLine={false} />
              <Tooltip {...DARK_TOOLTIP} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#bbb' }} />
              <Line type="monotone" dataKey="Shopee"    stroke="#EE4D2D" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Lazada"    stroke="#6B75E8" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="TikTokShop" stroke="#69C9D0" strokeWidth={2} dot={false} name="TikTok Shop" />
              <Line type="monotone" dataKey="Temu"      stroke="#FA6338" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Platform Summary Table */}
      <ChartCard title="Platform At-a-Glance">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['Platform', 'Market Share', 'Avg Basket', 'Freq/mo', 'Top Category', 'Core Buyer'].map(h => (
                  <th key={h} className="text-left py-2.5 px-3 text-white/90 font-medium uppercase tracking-wider text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Shopee',     color: '#EE4D2D', share: '38%', basket: '฿580', freq: '4.8', cat: 'Fashion / FMCG',    profile: 'Female, 25-34' },
                { name: 'Lazada',     color: '#6B75E8', share: '27%', basket: '฿890', freq: '3.2', cat: 'Electronics',       profile: 'Male, 35-44'   },
                { name: 'TikTok Shop',color: '#69C9D0', share: '22%', basket: '฿520', freq: '3.8', cat: 'Fashion / Beauty',  profile: 'Female, 18-34' },
                { name: 'Temu',       color: '#FA6338', share: '13%', basket: '฿380', freq: '2.1', cat: 'General / Value',   profile: 'Mixed, 25-44'  },
              ].map(row => (
                <tr key={row.name} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-3">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: row.color, boxShadow: `0 0 6px ${row.color}80` }} />
                      <span className="font-semibold text-white/95">{row.name}</span>
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold" style={{ color: row.color }}>{row.share}</td>
                  <td className="py-3 px-3 text-white/85">{row.basket}</td>
                  <td className="py-3 px-3 text-white/85">{row.freq}</td>
                  <td className="py-3 px-3 text-white/95">{row.cat}</td>
                  <td className="py-3 px-3 text-white/90">{row.profile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
