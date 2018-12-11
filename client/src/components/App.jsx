import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from './HomePage';
import TweetPage from './TweetPage';
import Header from './Header';
import Login from './Login';

export default function App({ currentUser }) {
  return (
    <Fragment>
      <Header currentUser={currentUser} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route path="/tweet/:tweetId" component={TweetPage} />
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
