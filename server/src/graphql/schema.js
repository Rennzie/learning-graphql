import { makeExecutableSchema } from 'graphql-tools';
import Base from './base';
import Category from './category/schema';
import Tweet from './tweet/schema';
import User from './user/schema';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs: [Base, Category, Tweet, User],
  resolvers,
  logging: { log: err => console.log(err)}
});

