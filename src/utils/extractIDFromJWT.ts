import { z } from "zod";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";
import { TokenInfo } from "@/app/api/users/login/route";

// Define a Zod schema for the token
const tokenSchema = z.string().min(1, "Token is required");

export const extractIDFromJWT = (request: NextRequest):string => {
  try {
    const token = request.cookies.get("token")?.value || "";
    tokenSchema.parse(token);

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

    if(!decodedToken){
      throw new Error("JWT decoding failed! Token Not Provided or Invalid!")
    }

    if (typeof decodedToken === "string") {
      throw new Error("Invalid token payload");
    }

    const userDetails = decodedToken as JwtPayload & TokenInfo;
    console.log("Decoded JWT:", userDetails);
    
    return userDetails.id;
  } catch (error: any) {
    throw new Error(`Error decrypting JWT: ${error.message}`);
  }
};
