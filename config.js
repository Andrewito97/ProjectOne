require('dotenv').config();

const config = {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    mainMongoUri: process.env.MONGO_URI_MAIN,
    musicMongoUri: process.env.MONGO_URI_MUSIC,
    movieMongoUri: process.env.MONGO_URI_MOVIES,
    jwtSecret: process.env.JSON_WEB_TOKEN_SECRET,
    sendgridKey: process.env.SENDGRID_API_KEY,
    googleClientId: process.env.GOOGLE_CLIENT_ID
};

export default config;   
