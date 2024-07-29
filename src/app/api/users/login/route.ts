import { z } from "zod";
import dbConnect from "@/db/dbConnect";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dbConnect();

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export interface TokenInfo {
  id: string;
  username: string;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User Does Not Exist!" },
        { status: 400 }
      );
    }

    console.log(user);
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Password Invalid!" }, { status: 400 });
    }

    // JWT Token is signed and sent to the user/client.
    // This ensures that whenever the user wants to access protected routes, the token will be used for authorization.
    // Now to store this token on the client side we can use localStorage but are prone to XSS. So better use HTTP-only cookies.

    const tokenData: TokenInfo = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Log In Success!",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
