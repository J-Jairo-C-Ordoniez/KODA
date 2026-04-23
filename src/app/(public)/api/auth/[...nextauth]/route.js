import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthService } from "@/modules/auth/sevices/auth.service";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "ejemplo@gmail.com" },
        password: { label: "Password", type: "password", placeholder: "@EJ123456789" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const authService = new AuthService();
          const user = await authService.authenticateUser(credentials.email, credentials.password);

          if (user) {
            return {
              id: user.userId.toString(),
              name: user.name,
              email: user.email,
              image: user.avatar,
            };
          }
          return null;
        } catch (error) {
          throw new Error(error.message);
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_key_12345"
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
