//@ts-check
import React, { Fragment } from 'react';
// @ts-ignore
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Header';
import Tweet from './Tweet';
// import { userFragment } from '../fragments';

const GET_TWEETS = gql`
  query {
    tweet: Tweets {
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

export default function App({ currentUser }) {
  return (
    <Query query={GET_TWEETS}>
      {({ data, loading, error }) => {
        if (loading) return <div>LOADING ...</div>;
        if (error) return <p>ERROR</p>;

        console.log('========>', data);
        return (
          <Fragment>
            <Header currentUser={currentUser} />
            {data.tweet.map(tweet => (
              <Tweet key={tweet.id} tweet={tweet} />
            ))}
          </Fragment>
        );
      }}
    </Query>
  );
}

App.defaultProps = {
  currentUser: {
    id: 'user1',
    username: 'johndoe',
    full_name: 'John Doe',
    avatar_url:
      'https://material-ui-1dab0.firebaseapp.com/build/fa158bc2d4774f4ae14cbbec7730af23.jpg'
  }
};
