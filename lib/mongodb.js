//require('dotenv').config({ path: '.env.local' });
import mongoose from 'mongoose';

//const MONGODB_URI = 'mongodb://localhost:27017/arzo-users-db';
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      const Sacerdote = require('server/models/sacerdote');

      Sacerdote.collection.indexExists('parroquia', async (err, indexExists) => {
        if (err) {
          console.error('Error checking index:', err);
        } else if (!indexExists) {
          try {
            await Sacerdote.createIndexes({ parroquia: 1 });
            console.log('Index created successfully');
          } catch (error) {
            console.error('Error creating index:', error);
          }
        }
      });

      console.log('Connected to MongoDB Atlas successfully');
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  console.log('Connected to local database successfully');
  return cached.conn;
}

export default dbConnect;
