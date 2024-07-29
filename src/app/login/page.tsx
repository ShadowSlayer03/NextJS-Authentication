// This page will be shown when the user has signed up and wants to login.

"use client";

import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Link } from "@nextui-org/react";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleChange = (name: string, value: string) => {
    setUser({ ...user, [name]: value });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login response:", response.data);
      toast.success(response.data.message);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      router.push("/profile");
    } catch (error: any) {
      console.log("Login Error:", error);
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-black w-screen h-screen flex items-center justify-center">
      <div className="bg-[#18181a] p-8 rounded-lg shadow-lg min-w-[50%] md:min-w-[30%] flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-white mb-10">
          NextAuth - Log In
        </h1>
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
          onClick={handleLogin}
          isDisabled={buttonDisabled}
          isLoading={loading}
        >
          {loading ? "Logging In..." : "Log In"}
        </Button>
        <Link
          underline="hover"
          className="text-sm"
          href="/signup"
        >
          Don't have an account? Signup
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
