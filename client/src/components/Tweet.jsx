import React from 'react';
// import PropTypes from 'prop-types';
import { Card, CardContent } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { Link } from 'react-router-dom';

const styleSheet = theme => ({
  link: {
    textDecoration: 'none'
  },
  container: {
    display: 'flex',
    flexDirection: 'row'
  },
  avatar: {
    marginRight: '0.5rem'
  },
  fullName: {
    color: theme.palette.text.secondary,
    fontWeight: 'bold',
    marginRight: '0.5rem'
  },
  userName: {
    color: theme.palette.text.secondary,
    marginRight: '0.5rem'
  },
  separator: {
    color: theme.palette.text.secondary,
    marginRight: '0.5rem'
  },
  date: {
    color: theme.palette.text.secondary
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem'
  },
  icon: {
    marginRight: '0.5rem'
  },
  stats: {
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

// NOTE: next up is fetching a single tweet using a variable

function Tweet({ classes, tweet, showDetailsLink }) {
  return (
    <Link to={`/tweet/${tweet.id}`}>
      <Card>
        <CardContent>
          {/* <Avatar alt={tweet.Author.full_name} src={tweet.Author.avatar_url} /> */}
          <div>
            <span>{tweet.Author.full_name}</span>
            <span>{tweet.Author.username}</span>
            <span> - </span>
            <span>{distanceInWordsToNow(tweet.date)}</span>
            <Typography component="p">{tweet.body}</Typography>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Tweet.propTypes = {
//   classes: PropTypes.object.isRequired,
//   //   showDetailsLink: PropTypes.bool,
//   tweet: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     body: PropTypes.string.isRequired,
//     date: PropTypes.string.isRequired,
//     Author: PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       username: PropTypes.string.isRequired,
//       full_name: PropTypes.string.isRequired,
//       avatar_url: PropTypes.string.isRequired
//     }).isRequired,
//     Stats: PropTypes.shape({
//       views: PropTypes.number.isRequired,
//       likes: PropTypes.number.isRequired,
//       retweets: PropTypes.number.isRequired,
//       responses: PropTypes.number.isRequired
//     }).isRequired
//   }).isRequired
// };

export default withStyles(styleSheet)(Tweet);
