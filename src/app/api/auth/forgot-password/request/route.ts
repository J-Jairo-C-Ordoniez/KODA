import { AuthService } from "@/core/modules/auth/sevices/auth.service";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const authService = new AuthService();
    const result = await authService.requestPasswordReset(email);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
