import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@utils/database";
import User from "@models/user";
import { today } from "@internationalized/date";
import { getLocalTimeZone, parseDate } from "@internationalized/date";

export const options = {
  providers: [
    GoogleProvider({
      async profile(profile) {
        const user = await User.findOne({
          email: profile.email,
        });
        return {
          ...profile,
          id: user._id,
          image: profile.picture,
          plan:
            user.plan.type &&
            parseDate(user.plan.lastDay).compare(today(getLocalTimeZone())) > 0
              ? user.plan
              : undefined,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
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
    async jwt({ session, token, trigger, user }) {
      if (trigger === "update") {
        return { ...token, ...session };
      }

      if (user) {
        token.plan = user.plan;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.plan = token.plan;
        session.user.id = token.id;
      }
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
};
