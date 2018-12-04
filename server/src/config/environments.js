const PORT = process.env.PORT || 4000;
const ENV =  process.env.NODE_ENV || 'dev';
const DB_URI = `mongodb://localhost/graphqlMarm-${ENV}`;

export {
  PORT,
  ENV,
  DB_URI
};
