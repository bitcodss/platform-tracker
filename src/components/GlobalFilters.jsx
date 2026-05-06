import { SlidersHorizontal } from 'lucide-react';
import { REGIONS, GENDERS, AGE_GROUPS, CATEGORIES } from '../data/mockData';

const FILTER_DEFS = [
  { label: 'Region', key: 'region', options: REGIONS },
  { label: 'Category', key: 'category', options: CATEGORIES },
  { label: 'Gender', key: 'gender', options: GENDERS },
  { label: 'Age Group', key: 'age', options: AGE_GROUPS },
];

export default function GlobalFilters({ filters, onChange }) {
  const sel = (key, val) => onChange({ ...filters, [key]: val });
  const hasActive = Object.entries(filters).some(([, v]) => !v.startsWith('All') && v !== 'All');

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1.5 text-white/75 text-xs font-medium">
        <SlidersHorizontal size={13} />
        <span>Filters</span>
      </div>

      {FILTER_DEFS.map(({ label, key, options }) => (
        <div key={key} className="flex items-center gap-1.5">
          <label className="text-[11px] text-white/90">{label}</label>
          <select
            className="text-xs bg-[#2a2a2a] border border-white/20 text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-teal/60 cursor-pointer appearance-none pr-6 hover:border-white/40 transition-colors"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23666' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
            value={filters[key]}
            onChange={e => sel(key, e.target.value)}
          >
            {options.map(o => <option key={o} className="bg-[#161616]">{o}</option>)}
          </select>
        </div>
      ))}

      {hasActive && (
        <button
          className="ml-1 text-[11px] text-teal hover:text-teal-light transition-colors"
          onClick={() => onChange({ region: 'All Regions', category: 'All Categories', gender: 'All', age: 'All Ages' })}
        >
          Reset
        </button>
      )}
    </div>
  );
}
