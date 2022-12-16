import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(process.env.NEXT_PUBLIC_HOST + "/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        console.log(res);

        const json = await res.json();
        let token = json.accessToken;
        let parsed = parseJwt(token);

        let user = {
          username:
            parsed[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
            ],
          token: json.accessToken,
          role: parsed[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ],
        };

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;

      return session;
    },
  },

  session: { jwt: true },
  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },
};

function parseJwt(token) {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  } catch {
    return "";
  }
}

export default NextAuth(authOptions);
