import data from './db/seeds';
import { dataloaders as userDataloaders } from './graphql/user/resolvers';

import User from './models/User';
// import User from './models/User';
// import User from './models/User';

export default ( request ) => ({
  author_id: 10, // should come from the request for an authentified user
  datastore: data,
  dataloaders: {
    ...userDataloaders(data)
  },
  User
});
