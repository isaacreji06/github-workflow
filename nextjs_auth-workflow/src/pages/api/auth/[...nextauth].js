import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const users = [
  { id: '1', email: 'admin@example.com', password: 'adminpass', name: 'admin' },
  { id: '2', email: 'author@example.com', password: 'authorpass', name: 'author' },
  { id: '3', email: 'consumer@example.com', password: 'consumerpass', name: 'consumer' },
];

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = users.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (!user) return null;
        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.name = user.name;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin", // optional custom signin page
  },
});
