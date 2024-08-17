// app/resumes/[id]/page.js

"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ResumeEditor({ params }) {
  const { id } = params;
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resume, setResume] = useState({ title: "", summary: "" });

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/signin");
    } else if (id !== "new") {
      fetchResume();
    }
  }, [session, status, id]);

  const fetchResume = async () => {
    const res = await fetch(`/api/resumes/${id}`);
    const data = await res.json();
    setResume(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResume((prevResume) => ({
      ...prevResume,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = id === "new" ? "POST" : "PUT";
    await fetch(`/api/resumes/${id}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resume),
    });

    router.push("/resumes");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">
        {id === "new" ? "Create Resume" : "Edit Resume"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={resume.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Summary</label>
          <textarea
            name="summary"
            value={resume.summary}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          {id === "new" ? "Create" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
