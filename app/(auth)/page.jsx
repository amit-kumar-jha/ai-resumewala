// pages/index.js
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <header className="w-full py-6 bg-blue-600 text-white text-center">
        <h1 className="text-3xl font-bold">AI-Powered Resume Builder</h1>
        <p className="mt-2 text-lg">
          Create your perfect resume with the help of AI
        </p>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-semibold mb-4">
          Get Started with Your Professional Resume
        </h2>
        <p className="mb-8 max-w-md">
          Our AI-driven platform helps you build, optimize, and tailor your
          resume to your dream job in minutes.
        </p>
        <Link href="/signup">
          <div className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Sign Up Now
          </div>
        </Link>
      </main>

      <footer className="w-full py-4 bg-gray-800 text-gray-400 text-center">
        <p>&copy; 2024 Resume Builder. All rights reserved.</p>
      </footer>
    </div>
  );
}
