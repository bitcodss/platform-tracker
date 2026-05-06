import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import ChartCard from '../components/ChartCard';
import { categoryClusterData, categoryTableData } from '../data/mockData';

const DARK_TOOLTIP = {
  contentStyle: { background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: '#fff', fontSize: 12 },
  cursor: { fill: 'rgba(255,255,255,0.03)' },
};

const TOP_BADGE = {
  Lazada:  { color: '#6B75E8', bg: 'rgba(107,117,232,0.15)' },
  Shopee:  { color: '#EE4D2D', bg: 'rgba(238,77,45,0.15)'   },
  TikTok:  { color: '#69C9D0', bg: 'rgba(105,201,208,0.15)' },
  Temu:    { color: '#FA6338', bg: 'rgba(250,99,56,0.15)'   },
};

const CLUSTER_INSIGHTS = [
  { cluster: 'Electronics', leader: 'Lazada',     insight: 'Highest basket size. Male-dominant buyers aged 35-44.' },
  { cluster: 'Fashion',     leader: 'TikTok Shop',insight: 'Fastest growing. Driven by female 18-34 via social commerce.' },
  { cluster: 'FMCG',        leader: 'Shopee',     insight: 'High frequency, lower basket. Strong repeat-purchase behavior.' },
  { cluster: 'Lifestyle',   leader: 'Shopee',     insight: 'Home & living leads. Temu gaining share on price-sensitive items.' },
];

const CLUSTER_COLORS = { Electronics: '#6B75E8', Fashion: '#f472b6', FMCG: '#2AD4C4', Lifestyle: '#FA6338' };

export default function CategoryDeepDive() {
  return (
    <div className="p-6 space-y-5">
      <ChartCard title="Avg Basket Size by Category Cluster (฿)" subtitle="Electronics · Fashion · FMCG · Lifestyle">
        <ResponsiveContainer width="100%" height={270}>
          <BarChart data={categoryClusterData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="cluster" tick={{ fontSize: 12, fill: '#888' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={v => `฿${v}`} tick={{ fontSize: 11, fill: '#555' }} axisLine={false} tickLine={false} />
            <Tooltip {...DARK_TOOLTIP} formatter={v => `฿${v}`} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#888' }} />
            <Bar dataKey="Shopee"     fill="#EE4D2D" radius={[4,4,0,0]} maxBarSize={22} />
            <Bar dataKey="Lazada"     fill="#6B75E8" radius={[4,4,0,0]} maxBarSize={22} />
            <Bar dataKey="TikTokShop" fill="#69C9D0" radius={[4,4,0,0]} maxBarSize={22} name="TikTok Shop" />
            <Bar dataKey="Temu"       fill="#FA6338" radius={[4,4,0,0]} maxBarSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Cluster Insight Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {CLUSTER_INSIGHTS.map(c => (
          <div key={c.cluster} className="rounded-xl p-4 card-glow" style={{ background: '#111111' }}>
            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: `${CLUSTER_COLORS[c.cluster]}18`, color: CLUSTER_COLORS[c.cluster] }}>
              {c.cluster}
            </span>
            <p className="text-sm font-semibold text-white/70 mt-2.5">
              Leader: <span className="text-white">{c.leader}</span>
            </p>
            <p className="text-[11px] text-white/35 mt-1.5 font-light leading-relaxed">{c.insight}</p>
          </div>
        ))}
      </div>

      {/* Category Table */}
      <ChartCard title="Category Level Comparison — Avg Basket Size (฿)">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/[0.06]">
                {['Category', 'Cluster', 'Shopee', 'Lazada', 'TikTok Shop', 'Temu', 'Leader'].map(h => (
                  <th key={h} className="text-left py-2.5 px-3 text-white/30 font-medium uppercase tracking-wider text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categoryTableData.map((row, i) => {
                const badge = TOP_BADGE[row.top] || TOP_BADGE.Shopee;
                return (
                  <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3 font-medium text-white/70">{row.category}</td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{ background: `${CLUSTER_COLORS[row.cluster]}18`, color: CLUSTER_COLORS[row.cluster] }}>
                        {row.cluster}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[#EE4D2D]/80">฿{row.Shopee}</td>
                    <td className="py-3 px-3 text-[#6B75E8]/80">฿{row.Lazada}</td>
                    <td className="py-3 px-3 text-[#69C9D0]/80">฿{row.TikTok}</td>
                    <td className="py-3 px-3 text-[#FA6338]/80">฿{row.Temu}</td>
                    <td className="py-3 px-3">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: badge.bg, color: badge.color }}>
                        {row.top}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
