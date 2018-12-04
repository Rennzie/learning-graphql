import {
  Query as TweetQuery,
  Mutation as TweetMutation,
  Tweet
} from './tweet/resolvers';

import {
  Query as CategoryQuery,
  Mutation as CategoryMutation,
  Category
} from './category/resolvers';

// NOTE: removed User from user/resolvers import
import { Query as UserQuery  } from './user/resolvers';
import Date from './scalar/Date';

export default {
  Query: {
    ...TweetQuery,
    ...UserQuery,
    ...CategoryQuery
  },
  Mutation: {
    ...TweetMutation,
    ...CategoryMutation
  },
  Tweet,
  Category,
  // User,
  Date
};
