import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Route, Switch } from 'react-router-dom';

import HomePage from './HomePage';
import TweetPage from './TweetPage';
import Header from './Header';
import Tweet from './Tweet';
// import { userFragment } from '../fragments';

export default function App({ currentUser }) {
  return (
    <Fragment>
      <Header currentUser={currentUser} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/tweet/:tweetId"
          render={props => <TweetPage {...props} tweetId={props.match.params.tweetId} />}
        />
      </Switch>
    </Fragment>
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
