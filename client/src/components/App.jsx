// //@ts-check
// import React from 'react';
// // @ts-ignore
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

// import Header from './Header';
// import TweetPage from './TweetPage';
// import HomePage from './HomePage';
// import { userFragment } from '../fragments';

// function App({ data: { currentUser } }) {
//   return (
//     <Router>
//       <div>
//         <Header currentUser={currentUser} />
//         <Route exact path="/" component={HomePage} />
//         <Route exact path="/:id" component={TweetPage} />
//       </div>
//     </Router>
//   );
// }

// const query = gql`
//   ${userFragment}

//   query appQuery {
//     currentUser: User {
//       ...UserFields
//     }
//   }
// `;

// export default graphql(query)(App);
