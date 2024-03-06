import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID + "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET + "",
    }),
    CredentialsProvider({
      // name: "Kaka",

      credentials: {},
      async authorize(credentials, req) {
        const user = await User.findOne({
          email: credentials.email,
          password: credentials.password,
        });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      session.user.phonenumber = sessionUser.phonenumber;
      session.user.governmentID = sessionUser.governmentID;
      session.user.address = sessionUser.address;
      session.user.image = sessionUser.image;
      session.user.name = sessionUser.name;
      session.user.plan = sessionUser.plan.type ? sessionUser.plan : undefined;
      return session;
    },
    async signIn({ user }) {
      try {
        await connectToDatabase();
        const userExist = await User.findOne({ email: user.email });

        if (!userExist) {
          await User.create({
            email: user.email,
            image: user.image,
            name: user.name,
            favorites: [],
            messages: [],
          });
        }

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
