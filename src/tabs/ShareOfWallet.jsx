import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar, Cell
} from 'recharts';
import {
  walletValueData, walletVolumeData, overlapData, basketSizeByPlatform
} from '../data/mockData';

const COLORS = { Shopee: '#EE4D2D', Lazada: '#0F146D', 'TikTok Shop': '#555', Temu: '#FA6338' };

export default function ShareOfWallet() {
  return (
    <div className="p-6 space-y-6">
      {/* Value vs Volume */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Wallet Share — Value (฿/month)</h3>
          <p className="text-xs text-gray-400 mb-4">Average THB spend per platform</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={walletValueData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `฿${v}`} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
              <Tooltip formatter={v => `฿${v}`} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {walletValueData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Wallet Share — Volume (% of orders)</h3>
          <p className="text-xs text-gray-400 mb-4">Share of total orders per platform</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={walletVolumeData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
              <Tooltip formatter={v => `${v}%`} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {walletVolumeData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Multi-platform Overlap */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">Multi-Platform Buyer Overlap</h3>
        <p className="text-xs text-gray-400 mb-4">% of active buyers purchasing on each platform combination in the same month</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={overlapData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="combo" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} />
            <Tooltip formatter={v => `${v}%`} />
            <Bar dataKey="pct" fill="#6366f1" radius={[4, 4, 0, 0]} name="Buyer %" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Single Platform', value: '30%', desc: 'Shopee or Lazada only' },
            { label: '2-Platform', value: '55%', desc: 'Cross-shop between 2 platforms' },
            { label: '3+ Platforms', value: '15%', desc: 'Heavy multi-platform users' },
            { label: 'Shopee Overlap', value: '61%', desc: 'Shopee buyers also use another platform' },
          ].map(s => (
            <div key={s.label} className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
              <p className="text-xs text-indigo-500 font-medium">{s.label}</p>
              <p className="text-2xl font-bold text-indigo-700 mt-1">{s.value}</p>
              <p className="text-xs text-indigo-400 mt-0.5">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Basket Size by Gender */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">Avg Basket Size by Platform × Gender (฿)</h3>
        <p className="text-xs text-gray-400 mb-4">Demographic breakdown — N=500 male, N=500 female</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={basketSizeByPlatform} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="platform" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={v => `฿${v}`} tick={{ fontSize: 11 }} />
            <Tooltip formatter={v => `฿${v}`} />
            <Legend />
            <Bar dataKey="male" fill="#3B82F6" name="Male" radius={[4, 4, 0, 0]} />
            <Bar dataKey="female" fill="#EC4899" name="Female" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
