"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { LockOpenOutlined, LockOutlined } from "@mui/icons-material";

function Form({ type }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    if (type === "register") {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/signin");
      }

      if (res.error) {
        toast.error("Something went wrong");
      }
    }
    console.log(data);

    if (type === "login") {
      try {
        const res = await signIn("credentials", {
          ...data,
          redirect: false, // Prevent automatic redirection
        });

        console.log(res, "res");

        if (res.error) {
          toast.error("Invalid email or password.");
        } else if (res.ok) {
          console.log(res);
          toast.success("Login successful!");
          router.push("/dashboard");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        toast.error("An error occurred during login. Please try again.");
      }
    }
  };

  //   console.log(User);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-6">
        {type === "register" ? "Sign Up" : "Sign In"}
      </h1>
      {type === "login" && (
        <>
          <button
            onClick={() => signIn("google")}
            className="w-half px-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mb-4"
          >
            Sign in with Google
          </button>

          {/* <button
            onClick={() => signIn("github")}
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 mb-4"
          >
            Sign in with GitHub
          </button> */}

          <p className="text-center text-gray-600 mb-4">or</p>
        </>
      )}
      <form
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        {type === "register" && (
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Role</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="user"
                value="user"
                {...register("role")}
                defaultChecked
                className="mr-2"
              />
              <label htmlFor="user" className="mr-4">
                User
              </label>

              <input
                type="radio"
                id="admin"
                value="admin"
                {...register("role")}
                className="mr-2"
              />
              <label htmlFor="admin">Admin</label>
            </div>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Email</label>
          <div className="input">
            <input
              type="email"
              {...register("email")}
              className={`input-field ${errors.email ? "border-red-500" : ""}`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Password</label>
          <div className="input">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={` input-field ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {showPassword ? (
              <div
                className="input-icon-wrapper"
                onClick={togglePasswordVisibility}
              >
                <LockOpenOutlined
                  sx={{ color: "#737373", cursor: "pointer" }}
                />
              </div>
            ) : (
              <div
                className="input-icon-wrapper"
                onClick={togglePasswordVisibility}
              >
                <LockOutlined sx={{ color: "#737373", cursor: "pointer" }} />
              </div>
            )}
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {type === "register" ? "Signup" : "Login"}
        </button>
      </form>
      {type === "register" ? (
        <p className="text-center">
          Already have an account?{" "}
          <Link href="/signin" className="link">
            Sign In
          </Link>
        </p>
      ) : (
        <p className="text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="link">
            Register
          </Link>
        </p>
      )}
    </div>
  );
}

export default Form;
