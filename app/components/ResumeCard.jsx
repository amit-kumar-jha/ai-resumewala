// components/ResumeCard.js
import Link from "next/link";

export default function ResumeCard({ resume }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">{resume.title}</h2>
      <p className="text-gray-600 mb-4">{resume.summary}</p>
      <Link href={`/resumes/${resume._id}`}>
        <div className="text-blue-600 hover:underline">Edit Resume</div>
      </Link>
    </div>
  );
}
