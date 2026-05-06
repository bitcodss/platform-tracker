import { Filter } from 'lucide-react';
import { REGIONS, GENDERS, AGE_GROUPS, CATEGORIES } from '../data/mockData';

export default function GlobalFilters({ filters, onChange }) {
  const sel = (key, val) => onChange({ ...filters, [key]: val });

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex flex-wrap items-center gap-3 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium mr-2">
        <Filter size={14} />
        <span>Filters</span>
      </div>

      {[
        { label: 'Region', key: 'region', options: REGIONS },
        { label: 'Category', key: 'category', options: CATEGORIES },
        { label: 'Gender', key: 'gender', options: GENDERS },
        { label: 'Age', key: 'age', options: AGE_GROUPS },
      ].map(({ label, key, options }) => (
        <div key={key} className="flex items-center gap-1.5">
          <label className="text-xs text-gray-500">{label}</label>
          <select
            className="text-sm border border-gray-200 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            value={filters[key]}
            onChange={e => sel(key, e.target.value)}
          >
            {options.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      ))}

      {Object.values(filters).some(v => !v.startsWith('All') && v !== 'All') && (
        <button
          className="ml-auto text-xs text-blue-600 hover:underline"
          onClick={() => onChange({ region: 'All Regions', category: 'All Categories', gender: 'All', age: 'All Ages' })}
        >
          Reset filters
        </button>
      )}
    </div>
  );
}
