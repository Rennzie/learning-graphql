// in Header.js
import React from 'react';
// import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ModeEditIcon from '@material-ui/icons/Edit';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styleSheet = theme => ({
  title: {
    margin: '0 auto'
  }
});

function Header({ classes, currentUser }) {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        {currentUser && <Avatar alt={currentUser.full_name} src={currentUser.avatar_url} />}
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
