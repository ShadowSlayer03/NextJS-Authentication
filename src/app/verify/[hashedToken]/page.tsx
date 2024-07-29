"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import base64url from "base64url"; // Ensure you have this library installed
import { Button, Spinner } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";

const VerifyPage = () => {
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const params = useParams();
  const encodedToken = params.hashedToken as string; // Explicitly assert the type as string

  useEffect(() => {
    console.log("Encoded token in useEffect", encodedToken);

    if (encodedToken) {
      const decodedToken = base64url.decode(encodedToken);
      setToken(decodedToken);
    } else {
      setToken("");
    }
  }, [encodedToken]);

  const verifyUserEmail = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/users/verify", { token });
      console.log("Verify User Response:", response.data);
      setVerified(true);
      toast.success(response.data.message);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error: any) {
      setError(true);
      console.log("Error Verifying the User:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-md p-6 bg-[#18181a] rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Verify Your Email</h1>
        {loading ? (
          <div className="flex items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : verified ? (
          <div className="text-green-600 text-center">
            <h2 className="text-md">Verification successful!</h2>
          </div>
        ) : error ? (
          <div className="text-red-600 text-center">
            <h2 className="text-md">Error verifying email. Please try again.</h2>
          </div>
        ) : (
          <div>
            <Button
              color="primary"
              variant="shadow"
              className="w-full"
              onClick={verifyUserEmail}
            >
              Verify Email
            </Button>
          </div>
        )}
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default VerifyPage;
