import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log("Path from middleware",path);
  
  let isPublicPath = false;

  switch (path) {
    case "/login":
      isPublicPath = true;
      break;
    case "/signup":
      isPublicPath = true;
      break;
    case "/verify":
      isPublicPath = true;
      break;
    default:
      break;
  }

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  } else if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/signup", "/profile", "/verify"],
};
