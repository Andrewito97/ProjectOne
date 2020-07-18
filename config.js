/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();

const config = {
	nodeEnv: process.env.NODE_ENV,
	port: process.env.PORT,
	securePort: process.env.SECURE_PORT,
	host: process.env.HOST,
	mainMongoUri: process.env.MONGO_URI_MAIN,
	musicMongoUri: process.env.MONGO_URI_MUSIC,
	movieMongoUri: process.env.MONGO_URI_MOVIES,
	jwtSecret: process.env.JSON_WEB_TOKEN_SECRET,
	sendgridKey: process.env.SENDGRID_API_KEY,
	supportEmail: process.env.SUPPORT_EMAIL,
	googleClientId: process.env.GOOGLE_CLIENT_ID,
	facebookAppId: process.env.FACEBOOK_APP_ID,
	testEmail: process.env.TEST_EMAIL,
	testPassword: process.env.TEST_PASSWORD,
	testPasswordChanged: process.env.TEST_PASSWORD_CHANGED,
	googleTestEmail: process.env.GOOGLE_TEST_EMAIL,
	googleTestPassword: process.env.GOOGLE_TEST_PASSWORD,
	facebookTestEmail: process.env.FACEBOOK_TEST_EMAIL,
	facebookTestPassword: process.env.FACEBOOK_TEST_PASSWORD
};

export default config;   
