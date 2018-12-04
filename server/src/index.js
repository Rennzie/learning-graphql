/**
 * Set up an Express server
 * which conects to mongoDB and listens on PORT 4000
*/

import User from './models/User';
import Tweet from './models/Tweet';
import Category from './models/Category';

import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';

import schema from './graphql/schema';
// import context from './context';

import mongoose from 'mongoose';
import { PORT, DB_URI } from './config/environments';

const app = express();

console.log(PORT, DB_URI);

mongoose.connect(
  DB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
/**
  * MUST USE DATA LOADERS IN PRODUCTIONS AS IT REDUCES NUMBER OF CALLS SIGNIFICANTLY
  * It does this by cahcing the results of like arguments so only make a single call to the DB
  * Dataloaders are used in the context and passed a datastore as an argument
 */
app.use(
  '/graphql',
  graphqlHTTP((request) => {
    const startTime = Date.now();
    return {
      schema: schema,
      context: { User, Tweet, Category },
      graphiql: true,
      extensions: ({ document, variables, operationName, result }) => ({
        timing: `${Date.now() - startTime} ms`,
        // document: document,
        // variables: variables,
        // operationName: operationName
      })
    };
  })
);

app.listen(PORT, () => console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`));
