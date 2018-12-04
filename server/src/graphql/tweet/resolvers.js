export const Query = {
  Tweets: async (_, __, context) => {
    return await context.Tweet.find();
  },

  Tweet: async (_, { _id }, context) => {
    return await context.Tweet.findById(_id);
  }
  // (_, { limit = 5, skip = 0 }, context) =>
  //   Promise.resolve(
  //     context.datastore.tweets
  //       .slice()
  //       .sort((a, b) => b.date - a.date)
  //       .slice(skip, skip + limit)
  //   ),

  // Tweet: (_, { id }, context) =>
  //   Promise.resolve(context.datastore.tweets.find(tweet => tweet.id === id))
};

export const Mutation = {
  createTweet: async (_, body, context) => {
    return await context.Tweet.create(body);

    // const nextTweetId =
    // context.datastore.tweets.reduce((id, tweet) => {
    //   return Math.max(id, tweet.id);
    // }, -1) + 1;
    // const newTweetStats = {
    //   tweet_id: nextTweetId,
    //   views: 0,
    //   likes: 0,
    //   retweets: 0,
    //   responses: 0
    // };
    // const newTweet = {
    //   id: nextTweetId,
    //   date: new Date(),
    //   author_id: context.author_id,
    //   body
    // };
    //
    // context.datastore.tweets.push(newTweet);
    // context.datastore.stats.push(newTweetStats);
    // return Promise.resolve(newTweet);
  }
};

export const Tweet = {
  Author: async (tweet, __, context) => await context.User.findById(tweet.author_id)
  // context.dataloaders.userById.load(tweet.author_id)
};
