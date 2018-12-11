import gql from 'graphql-tag';

export const USER_INFO = gql`
  fragment UserFields on User {
    id
    username
    full_name
    avatar_url
  }
`;
