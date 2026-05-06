import { useState } from 'react';
import { LayoutDashboard, PieChart, Grid3X3, Database } from 'lucide-react';
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

export default function App() {
  const [activeTab, setActiveTab] = useState('executive');
  const [filters, setFilters] = useState({
    region: 'All Regions',
    category: 'All Categories',
    gender: 'All',
    age: 'All Ages',
  });

  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900 m-0">Online Platform Tracker</h1>
            <p className="text-xs text-gray-400 mt-0.5">Thailand E-Commerce Behavior Study · N=1,000 · 2025</p>
          </div>
          <div className="flex items-center gap-2">
            {[
              { name: 'Lazada', color: '#0F146D' },
              { name: 'Shopee', color: '#EE4D2D' },
              { name: 'TikTok', color: '#333' },
              { name: 'Temu', color: '#FA6338' },
            ].map(p => (
              <span key={p.name}
                className="text-xs font-semibold px-2.5 py-1 rounded-full text-white hidden sm:inline-block"
                style={{ background: p.color }}>
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors cursor-pointer bg-transparent ${
                    active
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Global Filters */}
      <div className="max-w-7xl w-full mx-auto">
        <GlobalFilters filters={filters} onChange={setFilters} />
      </div>

      {/* Active Filter Banner */}
      {Object.entries(filters).some(([, v]) => !v.startsWith('All')) && (
        <div className="max-w-7xl w-full mx-auto px-6 pt-3">
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 flex items-center gap-2 flex-wrap text-xs text-blue-700">
            <span className="font-medium">Active filters:</span>
            {Object.entries(filters).filter(([, v]) => !v.startsWith('All') && v !== 'All').map(([k, v]) => (
              <span key={k} className="bg-blue-100 px-2 py-0.5 rounded-full">{v}</span>
            ))}
            <span className="text-blue-400 ml-1">(Mock data — filters shown for UI demonstration)</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl w-full mx-auto flex-1">
        {ActiveComponent && <ActiveComponent filters={filters} />}
      </main>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto px-6 py-4 border-t border-gray-200 mt-6">
        <p className="text-xs text-gray-400 text-center">
          Online Platform Tracking Dashboard · Thailand · N=1,000 · Data is mock/illustrative for prototype purposes
        </p>
      </footer>
    </div>
  );
}
