import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import KPICard from '../components/KPICard';
import { kpis, marketShareData, monthlyTrend } from '../data/mockData';

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, value }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="600">
      {value}%
    </text>
  );
};

export default function ExecutiveSummary() {
  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Avg Order Frequency" value={kpis.totalFrequency} unit="orders/mo" subtitle="Per active buyer" trend={8} color="blue" />
        <KPICard title="Avg Basket Size" value={`฿${kpis.avgBasketSize}`} subtitle="Per order across all platforms" trend={5} color="orange" />
        <KPICard title="Active Buyers" value={kpis.activeBuyers} unit={`/ ${kpis.totalRespondents}`} subtitle="Purchased in last 30 days" trend={3} color="green" />
        <KPICard title="Platform Coverage" value="4" unit="platforms" subtitle="Lazada · Shopee · TikTok · Temu" color="purple" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Share Pie */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Market Share by Platform (Order Volume)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={marketShareData} cx="50%" cy="50%" outerRadius={100}
                dataKey="value" labelLine={false} label={renderCustomLabel}>
                {marketShareData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {marketShareData.map(p => (
              <span key={p.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: p.fill }} />
                {p.name} — <strong>{p.value}%</strong>
              </span>
            ))}
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Monthly Order Frequency Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlyTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Shopee" stroke="#EE4D2D" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Lazada" stroke="#0F146D" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="TikTokShop" stroke="#555" strokeWidth={2} dot={false} name="TikTok Shop" />
              <Line type="monotone" dataKey="Temu" stroke="#FA6338" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Platform Summary Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Platform At-a-Glance</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                {['Platform', 'Market Share', 'Avg Basket (฿)', 'Avg Freq/mo', 'Primary Category', 'Buyer Profile'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-xs text-gray-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Shopee', color: '#EE4D2D', share: '38%', basket: '฿580', freq: '4.8', cat: 'Fashion / FMCG', profile: 'Female, 25-34' },
                { name: 'Lazada', color: '#0F146D', share: '27%', basket: '฿890', freq: '3.2', cat: 'Electronics', profile: 'Male, 35-44' },
                { name: 'TikTok Shop', color: '#010101', share: '22%', basket: '฿520', freq: '3.8', cat: 'Fashion / Beauty', profile: 'Female, 18-34' },
                { name: 'Temu', color: '#FA6338', share: '13%', basket: '฿380', freq: '2.1', cat: 'General / Low-price', profile: 'Mixed, 25-44' },
              ].map(row => (
                <tr key={row.name} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-2.5 px-3">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: row.color }} />
                      <span className="font-medium">{row.name}</span>
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold" style={{ color: row.color }}>{row.share}</td>
                  <td className="py-2.5 px-3">{row.basket}</td>
                  <td className="py-2.5 px-3">{row.freq}</td>
                  <td className="py-2.5 px-3 text-gray-600">{row.cat}</td>
                  <td className="py-2.5 px-3 text-gray-500">{row.profile}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
