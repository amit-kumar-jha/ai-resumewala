// components/Sidebar.js
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-full md:w-1/4 bg-blue-700 text-white min-h-screen p-6">
      <div>
        {" "}
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <ul>
          <li className="mb-4">
            <Link href="/profile">
              <div className="block p-4 hover:bg-blue-600 rounded-lg">
                Profile
              </div>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/resumes">
              <div className="block p-4 hover:bg-blue-600 rounded-lg">
                Manage Resumes
              </div>
            </Link>
          </li>
        </ul>
      </div>
      {/* Logout Button */}
      <div className="absolute bottom-0 md:w-1/4 left-0 w-full">
        <button
          onClick={() => signOut({ callbackUrl: "/signin" })}
          className="w-full flex items-center p-4 hover:bg-blue-600 rounded-lg"
        >
          {/* <MdLogout className="mr-2 text-2xl" /> Logout Icon */}
          Logout
        </button>
      </div>
    </aside>
  );
}
