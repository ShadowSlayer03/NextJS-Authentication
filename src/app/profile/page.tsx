"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Skeleton,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/users/profile");
      console.log("User Details from Response", response.data);
      setData(response.data.user);
      toast.success(response.data.message);
    } catch (error: any) {
      console.log("Error Occurred while Getting the Profile:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log("Log Out Response", response.data);
      toast.success(response.data.message);
      setTimeout(() => {
        router.replace("/login");
      }, 1000);
    } catch (error: any) {
      console.log("Error Logging Out:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Skeleton isLoaded={!loading}>
            <img
              alt="profile avatar"
              height={40}
              width={40}
              src="https://via.placeholder.com/40"
              className="rounded-full"
            />
          </Skeleton>
          <div className="flex flex-col">
            <Skeleton isLoaded={!loading}>
              <p className="text-md">{data?.username || "Loading..."}</p>
            </Skeleton>
            <Skeleton isLoaded={!loading}>
              <p className="text-small text-default-500">
                {data?.email || "Loading..."}
              </p>
            </Skeleton>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <Skeleton isLoaded={!loading}>
            <p>Verified: {data?.isVerified ? "Yes" : "No"}</p>
          </Skeleton>
          <Skeleton isLoaded={!loading}>
            <p>Admin: {data?.isAdmin ? "Yes" : "No"}</p>
          </Skeleton>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button color="warning" onClick={logout} disabled={loading}>
            Logout
          </Button>
        </CardFooter>
      </Card>
      <Toaster position="top-right" />
    </div>
  );
};

export default ProfilePage;
