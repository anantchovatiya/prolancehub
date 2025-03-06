import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import Employee from "@/models/Employee";
import connectDB from "@/db/connectDB";
import getrole from "@/actions/getrole";

export const authOptions = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      const role = await getrole();
      await connectDB();

      let currentUser;
      if (role === "freelancer") {
        currentUser = await User.findOne({ email: profile.email });
        if (!currentUser) {
          currentUser = new User({
            email: profile.email,
            username: profile.email.split("@")[0],
            name: profile.name,
            profileImage: profile.picture,
          });
          await currentUser.save();
        }
      } else if (role === "employer") {
        currentUser = await Employee.findOne({ email: profile.email });
        if (!currentUser) {
          currentUser = new Employee({
            email: profile.email,
            name: profile.name,
          });
          await currentUser.save();
        }
      }

      return true;
    },

    async session({ session, user }) {
      await connectDB();
      const role = await getrole();
      session.user.role = role || "freelancer"; // Default role

      if (session.user.role === "freelancer") {
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.name = dbUser.username;
        }
      } else if (session.user.role === "employer") {
        const dbUser = await Employee.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.name = dbUser.name;
        }
      }

      return session;
    },
  },
  async redirect({ url, baseUrl }) {
    return baseUrl; // Redirects to home page (`/`)
  }
});

export { authOptions as GET, authOptions as POST };
