import User from '../user/schema';
import Base from '../base';

const Tweet = `

extend type Query {
    Tweet(_id: ID!): Tweet
    Tweets(limit: Int, skip: Int, sort_field: String, sort_order: String): [Tweet]
    TweetsMeta: Meta
}

extend type Mutation {
    createTweet (author_id: ID, body: String): Tweet
    deleteTweet(id: ID!): Tweet
    markTweetRead(id: ID!): Boolean
}

type Tweet {
    _id: ID!
    id: ID
    # The tweet text. No more than 140 characters!
    body: String
    # When the tweet was published
    date: Date
    # Who published the tweet
    Author: User
    # Views, retweets, likes, etc
}
`;

export default () => [Tweet, User, Base];
