import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || "fallback_secret_key" });
  const url = req.nextUrl.clone();
  const path = url.pathname;

  // Acceso a API Privada
  if (path.startsWith("/api/") && !path.startsWith("/api/auth") && !path.startsWith("/api/public")) {
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    // Si la API es de un tenant específico, valida que quien la llama sea de ese tenant o SuperAdmin
    const urlParts = path.split("/");
    const firstParam = urlParts[2]; // /api/[tenantId]/... => tenantId
    if (firstParam !== "saas" && firstParam !== "auth") {
      if (token.role !== "superAdmin" && token.tenantId !== firstParam) {
        return NextResponse.json({ error: "Acceso denegado a este negocio" }, { status: 403 });
      }
    }
  }

  // Protección de Dashboard
  if (path.startsWith("/dashboard")) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    // TODO: Si hay lógicas de validación de estado de suspensión
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
