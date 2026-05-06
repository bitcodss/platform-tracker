import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { categoryClusterData, categoryTableData } from '../data/mockData';

const platformColors = {
  Shopee: '#EE4D2D', Lazada: '#0F146D', TikTokShop: '#555', Temu: '#FA6338',
};

const topPlatformBadge = {
  Lazada: 'bg-blue-100 text-blue-700',
  Shopee: 'bg-red-100 text-red-600',
  TikTok: 'bg-gray-100 text-gray-700',
  Temu: 'bg-orange-100 text-orange-600',
};

export default function CategoryDeepDive() {
  return (
    <div className="p-6 space-y-6">
      {/* Cluster Bar Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">Avg Basket Size by Category Cluster (฿)</h3>
        <p className="text-xs text-gray-400 mb-4">Grouped by product cluster — Electronics, Fashion, FMCG, Lifestyle</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={categoryClusterData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="cluster" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={v => `฿${v}`} tick={{ fontSize: 11 }} />
            <Tooltip formatter={v => `฿${v}`} />
            <Legend />
            <Bar dataKey="Shopee" fill="#EE4D2D" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Lazada" fill="#0F146D" radius={[4, 4, 0, 0]} />
            <Bar dataKey="TikTokShop" fill="#555" name="TikTok Shop" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Temu" fill="#FA6338" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cluster Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { cluster: 'Electronics', leader: 'Lazada', insight: 'Highest basket size. Male-dominant buyers.' },
          { cluster: 'Fashion', leader: 'TikTok Shop', insight: 'Fastest growing. Driven by female 18-34.' },
          { cluster: 'FMCG', leader: 'Shopee', insight: 'High frequency, lower basket. Repeat purchase.' },
          { cluster: 'Lifestyle', leader: 'Shopee', insight: 'Home & living leads. Growing Temu share.' },
        ].map(c => (
          <div key={c.cluster} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{c.cluster}</p>
            <p className="text-sm font-semibold text-gray-800 mt-1">Leader: <span className="text-indigo-600">{c.leader}</span></p>
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{c.insight}</p>
          </div>
        ))}
      </div>

      {/* Category Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Category Level Comparison — Avg Basket Size (฿)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {['Category', 'Cluster', 'Shopee', 'Lazada', 'TikTok Shop', 'Temu', 'Top Platform'].map(h => (
                  <th key={h} className="text-left py-2.5 px-3 text-xs text-gray-500 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categoryTableData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-gray-800">{row.category}</td>
                  <td className="py-2.5 px-3">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{row.cluster}</span>
                  </td>
                  <td className="py-2.5 px-3 text-red-600">฿{row.Shopee}</td>
                  <td className="py-2.5 px-3 text-blue-800">฿{row.Lazada}</td>
                  <td className="py-2.5 px-3 text-gray-700">฿{row.TikTok}</td>
                  <td className="py-2.5 px-3 text-orange-500">฿{row.Temu}</td>
                  <td className="py-2.5 px-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${topPlatformBadge[row.topPlatform] || 'bg-gray-100 text-gray-600'}`}>
                      {row.topPlatform}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
