import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      tenantId: string | null;
      role: string;
      tenantSlug: string | null;
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string;
    tenantId: string | null;
    role: string;
    tenantSlug: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    tenantId: string | null;
    role: string;
    tenantSlug: string | null;
  }
}
