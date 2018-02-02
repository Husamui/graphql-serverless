import User from '../../models/User';
// import { requireAuth } from '../../services/auth';

export default {
  signup: async (_, { fullname, ...rest }) => {
    try {
      const [firstname, ...lastname] = fullname.split(' ');
      const user = await User.create({ firstname, lastname, ...rest });
      return { token: user.createToken() };
    } catch (err) {
      throw err;
    }
  },
  login: async (_, { email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('User not exist!');
      }
      if (!user.authenticateUser(password)) {
        throw new Error('Password not match!');
      }
      return { token: user.createToken() };
    } catch (err) {
      throw err;
    }
  },
  me: async (_, args, { user }) => {
    try {
      console.log('the user is: ', user);
      // const me = await requireAuth(user);
      return user;
    } catch (err) {
      throw err;
    }
  },
};
