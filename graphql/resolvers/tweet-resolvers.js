import Tweet from '../../models/Tweet';
import { requireAuth } from '../../services/auth';

export default {
  getTweet: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      return Tweet.findById(_id);
    } catch (err) {
      throw err;
    }
  },
  getTweets: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      global.console.log('The user is: ', user);
      return Tweet.find({}).sort({ createdAt: -1 });
    } catch (err) {
      throw err;
    }
  },
  getUserTweets: async (_, args, { user }) => {
    try {
      // await requireAuth(user);
      return await Tweet.find({ user: user._id }).sort({ createdAt: -1 });
    } catch (err) {
      throw err;
    }
  },
  createTweet: async (_, args, { user }) => {
    try {
      // await requireAuth(user);
      return Tweet.create({ ...args, user: user._id });
    } catch (err) {
      throw err;
    }
  },
  updateTweet: async (_, { _id, ...rest }, { user }) => {
    try {
      // await requireAuth(user);
      const tweet = await Tweet.findOne({ _id, user: user._id });
      if (!tweet) {
        throw new Error('Tweet not found');
      }
      Object.entries(rest).forEach(([key, value]) => {
        tweet[key] = value;
      });
      return tweet.save();
    } catch (err) {
      throw err;
    }
  },
  delateTweet: async (_, { _id }, { user }) => {
    try {
      // await requireAuth(user);
      const tweet = await Tweet.findOne({ _id, user: user._id });
      if (!tweet) {
        throw new Error('Tweet not found');
      }
      await tweet.remove();
      return { message: 'Tweet has been removed successfully' };
    } catch (err) {
      throw err;
    }
  },
};
