import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      phonenumber: string | undefined;
      governmentID: string | undefined;
      address: string | undefined;
    } & DefaultSession["user"];
  }
}
