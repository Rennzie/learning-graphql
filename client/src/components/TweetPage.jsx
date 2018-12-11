import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { LinearProgress } from '@material-ui/core';

import Tweet from './Tweet';
import { USER_INFO } from '../fragments';

const GET_TWEET = gql`
  query TweetPageQuery($tweetId: ID!) {
    tweet: Tweet(_id: $tweetId) {
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

export default function TweetPage({ match }) {
  return (
    <Query query={GET_TWEET} variables={{ tweetId: match.params.tweetId }}>
      {({ data, loading, error }) => {
        if (loading) return <LinearProgress />;
        if (error) return <p>ERROR: {error.message}</p>;

        return <Tweet key={data.tweet.id} tweet={data.tweet} />;
      }}
    </Query>
  );
}
