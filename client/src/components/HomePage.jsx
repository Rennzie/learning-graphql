//@ts-check
import React, { Fragment } from 'react';

import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { LinearProgress } from '@material-ui/core';

import Tweet from './Tweet';
import { USER_INFO } from '../fragments';

const GET_TWEETS = gql`
  query {
    tweet: Tweets {
      id
      body
      date
      Author {
        ...UserFields
      }
    }
  }
  ${USER_INFO}
`;

export default function HomePage() {
  return (
    <Query query={GET_TWEETS}>
      {({ data, loading, error }) => {
        if (loading) return <LinearProgress />;
        if (error) return <p>ERROR: {error.message} </p>;

        return (
          <Fragment>
            {data.tweet.map(tweet => (
              <Tweet key={tweet.id} tweet={tweet} />
            ))}
          </Fragment>
        );
      }}
    </Query>
  );
}

//   <div>
//     {loading && <LinearProgress />}
//     {!loading && tweets.map(tweet => <Tweet key={tweet.id} tweet={tweet} />)}
//   </div>
