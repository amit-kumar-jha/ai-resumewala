import { hash } from "bcryptjs";

import { connectToDB } from "@lib/mongodb";
import User from "@models/User";
// import { connectToDB } from "@/lib/mongodb";

export const POST = async (req, res) => {
  try {
    await connectToDB();

    const body = await req.json();

    const { email, password, role } = body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new Response("User already exists", {
        status: 400,
      });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return new Response(JSON.stringify(newUser), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to create a new user", {
      status: 500,
    });
  }
};
