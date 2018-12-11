// in Header.js
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';

import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@material-ui/core';
import ModeEditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';

import { USER_INFO } from '../fragments';

import Auth from '../lib/Auth';

const styleSheet = theme => ({
  title: {
    margin: '0 auto'
  }
});

const GET_USER = gql`
  query LoggedInUserQuery($userId: ID!) {
    user: User(_id: $userId) {
      ...UserFields
    }
  }
  ${USER_INFO}
`;

function Header({ classes, currentUser }) {
  return (
    <Fragment>
      {localStorage.getItem('token') ? (
        <Query query={GET_USER} variables={{ userId: Auth.currentUserId() }}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>ERROR: {error.message}</p>;

            return (
              <AppBar position="static" color="default">
                <Toolbar>
                  {<Avatar alt={data.user.full_name} src={data.user.avatar_url} />}
                  <Typography type="title" color="inherit">
                    Home
                  </Typography>
                  <IconButton>
                    <ModeEditIcon />
                  </IconButton>
                  <Typography component={Link} to="/login">
                    Log Out
                  </Typography>
                </Toolbar>
              </AppBar>
            );
          }}
        </Query>
      ) : (
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography type="title" color="inherit">
              Home
            </Typography>
            <IconButton>
              <ModeEditIcon />
            </IconButton>
            <Typography component={Link} to="/login">
              Login
            </Typography>
          </Toolbar>
        </AppBar>
      )}
    </Fragment>
  );
}

// Header.propTypes = {
//   classes: PropTypes.object.isRequired,
//   currentUser: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     username: PropTypes.string.isRequired,
//     full_name: PropTypes.string.isRequired,
//     avatar_url: PropTypes.string.isRequired
//   })
// };

export default withStyles(styleSheet)(Header);
