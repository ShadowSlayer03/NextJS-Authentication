import dbConnect from "@/db/dbConnect";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Logged Out Successfully!",
      success: true,
    });

    const tokenCookie = request.cookies.get("token");

    if (!tokenCookie || tokenCookie.value.length === 0) {
      return NextResponse.json({ error: "User Already Logged Out!" }, { status: 400 });
    }

    response.cookies.set("token", "", {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
