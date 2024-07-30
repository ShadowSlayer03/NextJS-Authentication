import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/db/dbConnect";
import { extractIDFromJWT } from "@/utils/extractIDFromJWT";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    const userID = extractIDFromJWT(request);
    const user = await User.findById(userID).select("-password -verifyTokenExpiry");
    
    if (!user) {
      return NextResponse.json({ message: "User Not Found!" }, { status: 400 });
    }

    return NextResponse.json({ message: "Profile Found!", user }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ message: "Error fetching profile!", error: error.message }, { status: 500 });
  }
}
