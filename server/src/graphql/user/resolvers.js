// import DataLoader from 'dataloader';

// import User from '../../models/User';

function createAndSendToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  };
  const token = jwt.sign(payload, SECRET, { expiresIn: '6h' });
  return token;
}

export const Query = {
  User: async (root, { _id }, context) => {
    return await context.User.findById(_id);
  },

  Users: async (_, __, context) => {
    return await context.User.find();
  }
};

export const Mutation = {
  login: async (_, { email }, { User }) => {
    const user = await User.findOne({ email: email });

    if (user) return createAndSendToken(user);
  }
};

// export const User = {
//   full_name: author =>
//     Promise.resolve(`${author.first_name} ${author.last_name}`)
// };

// export const getUsersById = datastore => ids =>
//   Promise.resolve(
//     ids.map(id => datastore.users.find(user => user.id === id)),
//     datastore.users.filter(user => ids.includes(user.id)),
//   );
//
// export const dataloaders = datastore => ({
//   userById: new DataLoader(getUsersById(datastore))
// });
