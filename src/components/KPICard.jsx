export default function KPICard({ title, value, unit, subtitle, trend, color = 'blue' }) {
  const colors = {
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700',
  };

  return (
    <div className={`rounded-xl border p-5 ${colors[color]}`}>
      <p className="text-xs font-medium uppercase tracking-wide opacity-70">{title}</p>
      <div className="mt-2 flex items-end gap-1">
        <span className="text-3xl font-bold">{value}</span>
        {unit && <span className="text-sm font-medium mb-1 opacity-70">{unit}</span>}
      </div>
      {subtitle && <p className="text-xs mt-1 opacity-60">{subtitle}</p>}
      {trend && (
        <p className="text-xs mt-2 font-medium">
          <span className={trend > 0 ? 'text-green-600' : 'text-red-500'}>
            {trend > 0 ? '▲' : '▼'} {Math.abs(trend)}%
          </span>
          <span className="opacity-60 ml-1">vs last month</span>
        </p>
      )}
    </div>
  );
}
