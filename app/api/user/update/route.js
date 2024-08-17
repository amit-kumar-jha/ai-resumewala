// pages/api/user/update.js
// import clientPromise from '../../../lib/mongodb';
import { connectToDB } from "@lib/mongodb";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { email } = req.body;
    const client = await connectToDB();
    const db = client.db("resume-builder");

    const updateResult = await db
      .collection("users")
      .updateOne({ email: session.user.email }, { $set: { email } });

    if (updateResult.modifiedCount === 1) {
      res.status(200).json({ message: "Profile updated" });
    } else {
      res.status(500).json({ message: "Failed to update profile" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
