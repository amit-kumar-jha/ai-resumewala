import { connectToDB } from "@lib/mongodb";
import Resume from "@models/Resume";
import { getServerSession } from "next-auth/next";
// import { getSession } from "next-auth/react";

export async function GET(req, { params }) {
  await connectToDB();
  const session = await getServerSession(req);
  console.log(session);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const resume = await Resume.findById(params.id);
  if (!resume) {
    return new Response("Resume not found", { status: 404 });
  }

  return new Response(JSON.stringify(resume), { status: 200 });
}

export async function POST(req) {
  await connectToDB();
  const session = await getServerSession(req);
  console.log("Session:", session);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const newResume = new Resume({ ...body, user: session.user.id });
  await newResume.save();

  return new Response(JSON.stringify(newResume), { status: 201 });
}

export async function PUT(req, { params }) {
  await connectToDB();
  const session = await getServerSession(req);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const updatedResume = await Resume.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  if (!updatedResume) {
    return new Response("Resume not found", { status: 404 });
  }

  return new Response(JSON.stringify(updatedResume), { status: 200 });
}

export async function DELETE(req, { params }) {
  await connectToDB();
  const session = await getServerSession(req);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  await Resume.findByIdAndDelete(params.id);
  return new Response("Deleted", { status: 204 });
}
