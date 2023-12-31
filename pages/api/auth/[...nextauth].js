import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';

import {MongooseAdapter} from 'next-auth-mongoose-adapter';
import mongoose from 'mongoose';
//import clientPromise from 'lib/mongodb';
import User from '@models/user';
import Session from '@models/session';
import dbConnect from '@lib/mongodb';

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
        console.log("Usuario", user); 
        console.log("Sesión", session);
      session.user._id = user._id;
      return Promise.resolve(session);
    },

    signIn: async (user, account, profile) => {
      if (user.email && allowedUsers.includes(user.email)) {
        return true; // Continue the sign-in process
      }
      console.error('Access Denied: You are not allowed to access this application.');
   return true
    },
  
    jwt: async (token, user) => {
      token._id = user._id;
      return Promise.resolve(token);
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