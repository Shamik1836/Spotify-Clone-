import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;

  //aLLOW THE REQUESTS IF THE FOLLOWING IS TRUE
  //1) the token exists
  // 2)It's a requestr for next-auth ession and provider fetching
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }
  //Redirect them to login if they don't have and are requesting a protected route

  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
