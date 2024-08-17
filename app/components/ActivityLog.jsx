// components/ActivityLog.js
export default function ActivityLog() {
  const activities = [
    {
      message: "You created a new resume on 15th August 2024",
    },
    {
      message: "You updated your profile on 10th August 2024",
    },
    // Add more activity logs as needed
  ];

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
      <ul className="space-y-4">
        {activities.map((activity, index) => (
          <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600">{activity.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
