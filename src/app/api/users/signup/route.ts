import { z } from "zod";
import bcrypt from "bcryptjs";
import dbConnect from "@/db/dbConnect";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/utils/mailer";

dbConnect();

const createUserSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, email } = createUserSchema.parse(body);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      var existingUserObj = existingUser.toObject();
      delete existingUserObj.password;
      delete existingUserObj.verifyToken;
      delete existingUserObj.verifyTokenExpiry;
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "User Already Exists!", existingUserObj },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    // Send email to User
    await sendEmail({ email, emailType: "VERIFY", userID: savedUser._id });

    return NextResponse.json(
      { message: "User created successfully!", savedUser },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
