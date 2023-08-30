
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  expires: {
    type: Date
  },

  sessionToken: {
    type: String,
    required: true
  },

  accessToken: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  
});

export default mongoose.models.Session || mongoose.model('Session', sessionSchema);

