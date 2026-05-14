import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const authMiddleware = withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    if (path === "/dashboard") {
      switch (token?.role) {
        case "superAdmin":
          return NextResponse.redirect(new URL("/dashboard/admin/metrics", req.url));
        case "admin":
        case "owner":
          return NextResponse.redirect(new URL("/dashboard/business", req.url));
        case "employee":
          return NextResponse.redirect(new URL("/dashboard/employee/sales", req.url));
        default:
          return NextResponse.redirect(new URL("/home", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
