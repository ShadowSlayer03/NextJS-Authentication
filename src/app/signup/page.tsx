// This page will be shown when the user wants to sign up.

"use client";

import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Link } from "@nextui-org/react";

const SignUpPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleChange = (name: string, value: string) => {
    setUser({ ...user, [name]: value });
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup response:", response.data);
      toast.success(response.data.message);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      router.push("/login");
    } catch (error: any) {
      console.log("Signup Error:", error);
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-black w-screen h-screen flex items-center justify-center">
      <div className="bg-[#18181a] p-8 rounded-lg shadow-lg min-w-[50%] md:min-w-[30%] flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-white mb-10">
          NextAuth - Sign Up
        </h1>
        <Input
          isRequired
          type="text"
          label="Username"
          color="default"
          variant="bordered"
          placeholder="Enter your username"
          value={user.username}
          name="username"
          onValueChange={(value) => handleChange("username", value)}
        />
        <Input
          isRequired
          type="email"
          label="Email"
          variant="bordered"
          onValueChange={(value) => handleChange("email", value)}
          placeholder="Enter your email"
          description="We'll never share your email with anyone else."
          value={user.email}
          name="email"
        />
        <Input
          isRequired
          type="password"
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          description="The password must have atleast 8 characters."
          onValueChange={(value) => handleChange("password", value)}
          value={user.password}
          name="password"
        />
        <Button
          color="primary"
          variant="shadow"
          className="my-5"
          onClick={handleSignUp}
          isDisabled={buttonDisabled}
          isLoading={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
        <Link
          underline="hover"
          className="text-sm"
          href="/login"
        >
          Already a User? Login
        </Link>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "text-lg",
        }}
      />
    </div>
  );
};

export default SignUpPage;
