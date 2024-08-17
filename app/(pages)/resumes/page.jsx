// app/resumes/page.js

"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ResumeCard from "@app/components/ResumeCard";
// import ResumeCard from '../../components/ResumeCard';

export default function ResumeList() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/signin");
    } else {
      fetchResumes();
    }
  }, [session, status]);

  const fetchResumes = async () => {
    const res = await fetch("/api/resumes", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      setResumes(data);
    } else {
      // Handle 401 error
      console.error("Unauthorized access");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">My Resumes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((resume) => (
          <ResumeCard key={resume._id} resume={resume} />
        ))}
      </div>
      <div className="mt-8">
        <a
          href="/resumes/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Create New Resume
        </a>
      </div>
    </div>
  );
}
