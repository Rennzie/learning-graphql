import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

console.log('process.env.VERSION', process.env.VERSION);
console.log('process.env.PLATFORM', process.env.PLATFORM);
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

// Note: about to write first queries using react-apollos Query component and hooks I think?

// client
//   .query({
//     query: gql`
//       query {
//         Users {
//           id
//           first_name
//           last_name
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

// Note: about to start the first bit of the graphql client side tutorial

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
