import { useState } from 'react';
import { LayoutDashboard, PieChart, Grid3X3, Database, Activity } from 'lucide-react';
import GlobalFilters from './components/GlobalFilters';
import ExecutiveSummary from './tabs/ExecutiveSummary';
import ShareOfWallet from './tabs/ShareOfWallet';
import CategoryDeepDive from './tabs/CategoryDeepDive';
import RawData from './tabs/RawData';
import './index.css';

const TABS = [
  { id: 'executive', label: 'Executive Summary', icon: LayoutDashboard, component: ExecutiveSummary },
  { id: 'wallet', label: 'Share of Wallet', icon: PieChart, component: ShareOfWallet },
  { id: 'category', label: 'Category Deep-Dive', icon: Grid3X3, component: CategoryDeepDive },
  { id: 'rawdata', label: 'Raw Data & Export', icon: Database, component: RawData },
];

const PLATFORMS = [
  { name: 'Lazada', color: '#6B75E8' },
  { name: 'Shopee', color: '#EE4D2D' },
  { name: 'TikTok', color: '#69C9D0' },
  { name: 'Temu', color: '#FA6338' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('executive');
  const [filters, setFilters] = useState({
    region: 'All Regions',
    category: 'All Categories',
    gender: 'All',
    age: 'All Ages',
  });

  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component;
  const hasActiveFilter = Object.entries(filters).some(([, v]) => !v.startsWith('All') && v !== 'All');

  return (
    <div className="min-h-screen bg-[#0A0A0A] bg-mesh flex flex-col">

      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal to-teal-dark flex items-center justify-center teal-glow">
              <Activity size={16} className="text-black" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-wide">Online Platform Tracker</h1>
              <p className="text-[11px] text-white/40 mt-0.5 font-light">Thailand E-Commerce · N=1,000 · 2025</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {PLATFORMS.map(p => (
              <span key={p.name}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}40` }}>
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="border-b border-white/[0.06] bg-[#0A0A0A]/60 backdrop-blur-sm sticky top-[65px] z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-0 no-scrollbar">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-xs font-medium border-b-2 whitespace-nowrap transition-all cursor-pointer bg-transparent ${
                    active
                      ? 'border-teal text-teal'
                      : 'border-transparent text-white/40 hover:text-white/70 hover:border-white/20'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Global Filters */}
      <div className="max-w-7xl w-full mx-auto px-6 pt-5">
        <GlobalFilters filters={filters} onChange={setFilters} />
      </div>

      {/* Active Filter Pills */}
      {hasActiveFilter && (
        <div className="max-w-7xl w-full mx-auto px-6 pt-3">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-white/40">Filtered by:</span>
            {Object.entries(filters)
              .filter(([, v]) => !v.startsWith('All') && v !== 'All')
              .map(([k, v]) => (
                <span key={k} className="bg-teal/10 text-teal border border-teal/25 px-2.5 py-0.5 rounded-full">
                  {v}
                </span>
              ))}
            <span className="text-white/25 ml-1">(mock — UI demo)</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl w-full mx-auto flex-1">
        {ActiveComponent && <ActiveComponent filters={filters} />}
      </main>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto px-6 py-5 border-t border-white/[0.05] mt-8">
        <p className="text-[11px] text-white/25 text-center font-light">
          Online Platform Tracking · Thailand · N=1,000 · Prototype — data is illustrative
        </p>
      </footer>
    </div>
  );
}
