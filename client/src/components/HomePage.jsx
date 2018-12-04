// import React from 'react';
// import { graphql } from 'react-apollo';
// import { gql } from 'graphql-tag';
// import { LinearProgress } from '@material-ui/core';

// import Tweet from './Tweet';
// import { userFragment } from '../fragments';

// export const HomePage = ({ data: { loading, tweets } }) => (
//   <div>
//     {loading && <LinearProgress />}
//     {!loading && tweets.map(tweet => <Tweet key={tweet.id} tweet={tweet} />)}
//   </div>
// );

// const query = gql`
//   ${userFragment}

//   query homePageQuery {
//     tweets: Tweets(limit: 10, sort_field: "date", sort_order: "desc") {
//       id
//       body
//       date
//       Author {
//         ...UserFields
//       }
//     }
//   }
// `;

// export default graphql(query)(HomePage);
