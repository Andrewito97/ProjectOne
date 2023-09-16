/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();

const config = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  securePort: process.env.SECURE_PORT,
  host: process.env.HOST,
  trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
  usersMongoUri: process.env.MONGO_URI_USERS,
  educationMongoUri: process.env.MONGO_URI_EDUCATION,
  postsMongoUri: process.env.MONGO_URI_POSTS,
  musicMongoUri: process.env.MONGO_URI_MUSIC,
  moviesMongoUri: process.env.MONGO_URI_MOVIES,
  booksMongoUri: process.env.MONGO_URI_BOOKS,
  jwtSecret: process.env.JSON_WEB_TOKEN_SECRET,
  sendgridKey: process.env.SENDGRID_API_KEY,
  supportEmail: process.env.SUPPORT_EMAIL,
  adminEmail: process.env.ADMIN_EMAIL,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  facebookAppId: process.env.FACEBOOK_APP_ID,
  testNewUserEmail: process.env.TEST_NEW_USER_EMAIL,
  testNewUserPassword: process.env.TEST_NEW_USER_PASSWORD,
  testExistingUserEmail: process.env.TEST_EXISTING_USER_EMAIL,
  testExistingUserPassword: process.env.TEST_EXISTING_USER_PASSWORD,
};

export default config;
