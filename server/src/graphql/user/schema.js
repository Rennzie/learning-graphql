import Base from '../base';

const User = `
extend type Query {
    User(_id: ID!): User,
    Users: [ User ]
}
type User {
    _id: ID!
    id: ID
    username: String
    first_name: String
    last_name: String
    full_name: String
    name: String @deprecated
    avatar_url: String
}

extend type Mutation {
    login(email: String): String
}
`;

export default () => [User, Base];
