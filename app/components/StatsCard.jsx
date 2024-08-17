// components/StatsCard.js
export default function StatsCard({ title, value, color }) {
  return (
    <div className={`${color} text-white p-6 rounded-lg shadow-md`}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
