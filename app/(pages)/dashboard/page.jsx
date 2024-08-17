// // pages/dashboard.js
// "use client";
// // pages/dashboard.js
// import { getSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// // import { useRouter } from 'next/router';

// export default function Dashboard() {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUser = async () => {
//       const session = await getSession();
//       if (!session) {
//         router.push("/login");
//       } else {
//         setUser(session.user);
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [router]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="flex flex-col md:flex-row">
//         {/* Sidebar */}
//         <div className="w-full md:w-1/4 bg-blue-700 text-white min-h-screen p-6">
//           <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
//           <ul>
//             <li className="mb-4">
//               <a
//                 href="/profile"
//                 className="block p-4 hover:bg-blue-600 rounded-lg"
//               >
//                 Profile
//               </a>
//             </li>
//             <li className="mb-4">
//               <a
//                 href="/resumes"
//                 className="block p-4 hover:bg-blue-600 rounded-lg"
//               >
//                 Manage Resumes
//               </a>
//             </li>
//             {/* Add more links as needed */}
//           </ul>
//         </div>

//         {/* Main Content */}
//         <div className="w-full md:w-3/4 p-8">
//           <div className="bg-white shadow-lg rounded-lg p-6">
//             <h1 className="text-3xl font-bold mb-4">Welcome, {user.email}</h1>
//             <p className="text-gray-600 mb-8">Role: {user.role}</p>

//             {/* Stats Section */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-semibold mb-2">Total Resumes</h2>
//                 <p className="text-3xl font-bold">5</p>
//               </div>
//               <div className="bg-green-500 text-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-semibold mb-2">Resumes Reviewed</h2>
//                 <p className="text-3xl font-bold">3</p>
//               </div>
//               <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-xl font-semibold mb-2">Pending Reviews</h2>
//                 <p className="text-3xl font-bold">2</p>
//               </div>
//             </div>

//             {/* Recent Activity Section */}
//             <div className="mt-12">
//               <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
//               <ul className="space-y-4">
//                 <li className="p-4 bg-gray-100 rounded-lg shadow-sm">
//                   <p className="text-sm text-gray-600">
//                     You created a new resume on 15th August 2024
//                   </p>
//                 </li>
//                 <li className="p-4 bg-gray-100 rounded-lg shadow-sm">
//                   <p className="text-sm text-gray-600">
//                     You updated your profile on 10th August 2024
//                   </p>
//                 </li>
//                 {/* Add more activity logs as needed */}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import ActivityLog from "@app/components/ActivityLog";
import LoadingSpinner from "@app/components/LoadingSpinner";
import Sidebar from "@app/components/Sidebar";
import StatsCard from "@app/components/StatsCard";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import StatsCard from "../components/StatsCard";
// import ActivityLog from "../components/ActivityLog";
// import LoadingSpinner from "../components/LoadingSpinner";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession();
      if (!session) {
        router.push("/signin");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">Welcome, {user.email}</h1>
          <p className="text-gray-600 mb-8">Role: {user.role}</p>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatsCard title="Total Resumes" value={5} color="bg-blue-500" />
            <StatsCard
              title="Resumes Reviewed"
              value={3}
              color="bg-green-500"
            />
            <StatsCard
              title="Pending Reviews"
              value={2}
              color="bg-yellow-500"
            />
          </div>

          {/* Recent Activity Section */}
          <ActivityLog />
        </div>
      </main>
    </div>
  );
}
