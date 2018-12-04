import mongoose from 'mongoose';
// Use bluebird to make promises easier
mongoose.Promise = require('bluebird');

// connect to Mongo using our dbURI
const { DB_URI } = require('../config/environments');
mongoose.connect(DB_URI, { useNewUrlParser: true });

// Models
import User from '../models/User';
import Tweet from '../models/Tweet';
import Category from '../models/Category';

import subMinutes from 'date-fns/sub_minutes';
import subHours from 'date-fns/sub_hours';
import subDays from 'date-fns/sub_days';
import subMonths from 'date-fns/sub_months';
import moment from 'moment';

const today = new Date();

const tweetIds = [
  '5b91752666708bc8b1622705', '5b91752666708bc8b1622706', '5b91752666708bc8b1622707', '5b91752666708bc8b1622708', '5b91752666708bc8b1622709',
  '5b91752666708bc8b1622710', '5b91752666708bc8b162271a', '5b91752666708bc8b162271b', '5b91752666708bc8b162271c', '5b91752666708bc8b162271d',
  '5b91752666708bc8b162271e', '5b91752666708bc8b162271f', '5b91752666708bc8b1622720', '5b91752666708bc8b1622721', '5b91752666708bc8b1622722'
];

const userIds = [
  '5b91752666708bc8b1622821', '5b91752666708bc8b1622806', '5b91752666708bc8b1622807'
];

const categoryIds = [
  '5b91752766708bc8b1622821', '5b91752766708bc8b1622806', '5b91752766708bc8b1622807'
];

const tweetsData = [
  { _id: tweetIds[1], body: 'Lorem Ipsum', date: subMinutes(today, 1), author_id: userIds[0] },
  { _id: tweetIds[2], body: 'Sic dolor amet', date: subMinutes(today, 25), author_id: userIds[1] },
  { _id: tweetIds[3], body: 'Lorem Ipsum', date: subMinutes(today, 45), author_id: userIds[0] },
  { _id: tweetIds[4], body: 'Sic dolor amet', date: subHours(today, 3), author_id: userIds[1] },
  { _id: tweetIds[5], body: 'Lorem Ipsum', date: subHours(today, 7), author_id: userIds[0] },
  { _id: tweetIds[6], body: 'Sic dolor amet', date: subDays(today, 1), author_id: userIds[1] },
  { _id: tweetIds[7], body: 'Lorem Ipsum', date: subDays(today, 5), author_id: userIds[0] },
  { _id: tweetIds[8], body: 'Sic dolor amet', date: subDays(today, 11), author_id: userIds[1] },
  { _id: tweetIds[9], body: 'Lorem Ipsum', date: subDays(today, 23), author_id: userIds[0] },
  { _id: tweetIds[10], body: 'Sic dolor amet', date: subMonths(today, 3), author_id: userIds[1] }
];

const usersData = [
  {
    _id: userIds[0],
    username: 'johndoe',
    first_name: 'John',
    last_name: 'Doe',
    avatar_url: 'https://material-ui-1dab0.firebaseapp.com/static/images/remy.jpg'
  },
  {
    _id: userIds[1],
    username: 'janedoe',
    first_name: 'Jane',
    last_name: 'Doe',
    avatar_url: 'https://material-ui-1dab0.firebaseapp.com/static/images/uxceo-128.jpg'
  }
];

const categoryData = [
  {
    _id: categoryIds[0],
    farmer_id: '5b91752666708bc8b1622821',
    name: 'Breeding Cows',
    category: 'cows',
    currentMonthDetail: {
      openingTotal: 0,
      period: 'Oct-2018',
      changes: {
        add: 100,
        death: -2,
        sale: -10
      },
      closingTotal: 111
    },
    currentMonthChanges: [
      {
        createdAt: moment().set({'year': 2018, 'month': 10, 'date': 1}),
        reasonForChange: 'add',
        animalsMoved: 50
      }, {
        createdAt: moment().set({'year': 2018, 'month': 10, 'date': 7}),
        reasonForChange: 'theft',
        animalsMoved: -2
      }, {
        createdAt: moment().set({'year': 2018, 'month': 10, 'date': 10}),
        reasonForChange: 'sale',
        animalsMoved: -10
      }, {
        createdAt: moment().set({'year': 2018, 'month': 10, 'date': 12}),
        reasonForChange: 'add',
        animalsMoved: 10
      }, {
        createdAt: moment().set({'year': 2018, 'month': 10, 'date': 15}),
        reasonForChange: 'theft',
        animalsMoved: -1
      }
    ],
    changesArchive: {
      'Oct-2018': [
        {
          createdAt: moment().set({'year': 2018, 'month': 9, 'date': 1}),
          reasonForChange: 'add',
          animalsMoved: 100
        }, {
          createdAt: moment().set({'year': 2018, 'month': 9, 'date': 10}),
          reasonForChange: 'sale',
          animalsMoved: -10
        }, {
          createdAt: moment().set({'year': 2018, 'month': 9, 'date': 20}),
          reasonForChange: 'death',
          animalsMoved: -2
        }, {
          createdAt: moment().set({'year': 2018, 'month': 9, 'date': 28}),
          reasonForChange: 'add',
          animalsMoved: 23
        }
      ]
    }

  }
];


User.collection.drop();
Tweet.collection.drop();
Category.collection.drop();

User.create(usersData)
  .then(users => console.log(`Created ${users.length} new users`))
  .then(() => Tweet.create(tweetsData))
  .then(tweets => console.log(`Created ${tweets.length} new tweets`))
  .then(() => Category.create(categoryData))
  .then(categories => console.log(`Created ${categories.length} new categories`))
  .catch(err => console.log('Seeding error is', err))
  .finally(() => mongoose.connection.close());
