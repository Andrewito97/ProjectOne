require('dotenv').config();

const config = {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    mainMongoUri: process.env.MONGO_URI_MAIN,
    musicMongoUri: process.env.MONGO_URI_MUSIC,
    movieMongoUri: process.env.MONGO_URI_MOVIES,
    jwtSecret: process.env.JSON_WEB_TOKEN_SECRET,
    sendgridKey: process.env.SENDGRID_API_KEY,
    googleClientId: '800934464956-9ao5gmg2mabmeaqa7fhfourqqlgkjjp4.apps.googleusercontent.com',
    facebookAppId: '1747391518737093',
    testEmail: process.env.TEST_EMAIL,
    testPassword: process.env.TEST_PASSWORD,
    testPasswordChanged: process.env.TEST_PASSWORD_CHANGED,
    googleTestEmail: process.env.GOOGLE_TEST_EMAIL,
    googleTestPassword: process.env.GOOGLE_TEST_PASSWORD,
    facebookTestEmail: process.env.FACEBOOK_TEST_EMAIL,
    facebookTestPassword: process.env.FACEBOOK_TEST_PASSWORD
};

export default config;   
