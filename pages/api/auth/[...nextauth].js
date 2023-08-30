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
  adapter: MongooseAdapter(MONGODB_URI)
})

{/* 
,
  adapter: MongooseAdapter(process.env.MONGODB_URI),

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    session: async (session, user) => {
        console.log("Usuario", user); 
        console.log("Sesión", session);
      session.user._id = user._id;
      return Promise.resolve(session);
    },

    signIn: async (user, account, profile) => {
      // Específica la URL de redireccionamiento absoluta
      const redirectUrl = 'http://localhost:3000'; // Cambia esto según tu configuración
      return Promise.resolve(redirectUrl);
    },
  
    redirect: async (url, baseUrl) => {
      // Específica la URL de redireccionamiento absoluta
      const absoluteUrl = 'http://localhost:3000' + url; // Cambia esto según tu configuración
      return Promise.resolve(absoluteUrl);
    },

    jwt: async (token, user) => {
      token._id = user._id;
      return Promise.resolve(token);
    },
  },

  debug: false,

  session: {
    strategy: 'jwt',
  },

  jwt: {
    secret: 'SECRETO',
  },


  model: User,

  sessionModel: Session,
*/}