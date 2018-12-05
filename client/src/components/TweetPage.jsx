import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { LinearProgress } from '@material-ui/core';

import Tweet from './Tweet';
import { userFragment } from '../fragments';

export const TweetPage = ({ data: { loading, tweet } }) => (
  <div>
    {loading && <LinearProgress />}
    {!loading && <Tweet tweet={tweet} />}
  </div>
);

const query = gql`
  ${userFragment}

  query tweetPageQuery($id: ID!) {
    tweet: Tweet(id: $id) {
      id
      body
      date
      Author {
        ...UserFields
      }
      Stats {
        views
        likes
        retweets
        responses
      }
    }
  }
`;

export default graphql(query, {
  options: ({ match }) => ({ variables: { _id: match.params.id } })
})(TweetPage);
