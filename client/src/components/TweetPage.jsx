import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { LinearProgress } from '@material-ui/core';

import Tweet from './Tweet';
import { userFragment } from '../fragments';

const GET_TWEET = gql`
  query TweetPageQuery($tweetId: ID!) {
    tweet: Tweet(_id: $tweetId) {
      id
      body
      date
      Author {
        id
        username
        first_name
        last_name
      }
    }
  }
`;

export default function TweetPage({ tweetId }) {
  // const { tweetId } = props.match.params;
  console.log('TweetPage has loaded', tweetId);
  // console.log('the props on tweet page are', props);

  return (
    <Query query={GET_TWEET} variable={{ tweetId }}>
      {({ data, loading, error }) => {
        if (loading) return <LinearProgress />;
        if (error) return <p>ERROR: {error.message}</p>;

        return <Tweet key={data.tweet.id} tweet={data.tweet} />;
      }}
    </Query>
  );
}
