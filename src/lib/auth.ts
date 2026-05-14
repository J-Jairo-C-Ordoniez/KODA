import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/infrastructure/db/client";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "ejemplo@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("[AUTH] Faltan credenciales");
          return null;
        }

        try {
          console.log(`[AUTH] Intentando login para: ${credentials.email}`);
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: { tenant: true }
          });

          if (!user) {
            console.log("[AUTH] Usuario no encontrado en la DB");
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            console.log("[AUTH] Contraseña incorrecta");
            return null;
          }

          console.log("[AUTH] Login exitoso");
          return {
            id: user.userId,
            name: user.name,
            email: user.email,
            tenantId: user.tenantId,
            role: user.role,
            tenantSlug: user.tenant?.slug || null
          };
        } catch (error: any) {
          console.error("[AUTH] Error atrapado en authorize:", error);
          throw new Error(error.message || "Ocurrió un problema durante la autenticación.");
        }
      }
    })
  ],
  pages: {
    signIn: '/login', 
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.tenantId = user.tenantId;
        token.role = user.role;
        token.tenantSlug = user.tenantSlug;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.tenantId = token.tenantId as string;
        session.user.role = token.role as string;
        session.user.tenantSlug = token.tenantSlug as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_key",
};
