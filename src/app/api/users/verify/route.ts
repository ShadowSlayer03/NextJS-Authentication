import { z } from "zod";
import dbConnect from "@/db/dbConnect";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

const tokenSchema = z.object({
    token: z.string().min(1, { message: "Verification Token is required" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body using Zod
    const { token } = tokenSchema.parse(body);
    console.log("Token Provided:",token);

    const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

    console.log("User",user);
    
    if (!user) {
      return NextResponse.json({ error: "User Does Not Exist! Check Token." }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    const savedUser = await user.save();
    console.log(savedUser);

    return NextResponse.json({ message: "User Verified Successfully!", savedUser }, { status: 201 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
