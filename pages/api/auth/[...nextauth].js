import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';

import {MongooseAdapter} from 'next-auth-mongoose-adapter';
import mongoose from 'mongoose';
//import clientPromise from 'lib/mongodb';
import User from '@models/user';
import Session from '@models/session';
import dbConnect from '@lib/mongodb';
import { allowedUsers } from './allowedUsers';



const MONGODB_URI = process.env.MONGODB_URI

export default NextAuth ( {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongooseAdapter(MONGODB_URI),


/*{ 
,
  adapter: MongooseAdapter(process.env.MONGODB_URI),

  session: {
    strategy: 'jwt',
  },
*/
  callbacks: {
    session: async (session, user) => {
      if (user) { // Check if user is not undefined
        console.log("User", user);
        session.user._id = user._id; // Assuming _id exists on user object
      } else {
        console.error("User object is undefined in session callback");
      }
        console.log("Sesión", session);
      return (session);
    },

    signIn: async (user, account, profile) => {
      console.log(allowedUsers)
      if (user.email && allowedUsers.includes(user.email)) {
        return true; // Continue the sign-in process
      }
      console.error('Access Denied: You are not allowed to access this application.');
   return false
    },
  
    jwt: async (token, user) => {
      console.log("JWT callback - User:", user, "Token:", token);
      if (user && user._id) {
        token._id = user._id;
      }
      return (token);
    },
  },
/*
  debug: false,

  session: {
    strategy: 'jwt',
  },

  jwt: {
    secret: 'SECRETO',
  },


  model: User,

  sessionModel: Session,
}*/
})