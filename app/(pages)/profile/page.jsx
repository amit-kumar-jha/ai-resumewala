// pages/profile.js
"use client";
import { data } from "autoprefixer";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
// import { useRouter } from "next/router";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const { data: session } = useSession();

  console.log(session);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await getSession();
      console.log(session);
      if (session) {
        setUser(session.user);
        setEmail(session.user.email);
        setRole(session.user.role);
        setLoading(false);
      } else {
        console.log("signin");
        // router.push("/signin");
      }
    };
    fetchUser();
  }, [router]);

  const handleUpdate = async () => {
    const res = await fetch("/api/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      alert("Profile updated successfully");
    } else {
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Role</label>
          <input
            type="text"
            value={role}
            readOnly
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}
