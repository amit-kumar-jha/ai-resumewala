// app/api/resumes/route.js

// import Resume from "@/models/Resume";
import { connectToDB } from "@lib/mongodb";
import Resume from "@models/Resume";
import { getServerSession } from "next-auth";
// import { getSession } from "next-auth/react";
// import { getSession } from "next-auth/react";

export async function GET(req) {
  await connectToDB();
  const session = await getServerSession(req);

  console.log("Session:", session);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const resumes = await Resume.find({ user: session.user.id });
  return new Response(JSON.stringify(resumes), { status: 200 });
}

export async function POST(res) {
  await connectToDB();
  const session = await getServerSession(res);
  console.log("Session:", session.user._id);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const newResume = new Resume({ ...body, user: session.user.id });
  await newResume.save();

  return new Response(JSON.stringify(newResume), { status: 201 });
}
