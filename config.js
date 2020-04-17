require('dotenv').config();

const config = {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    //'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
    jwtSecret: process.env.JSON_WEB_TOKEN_SECRET,
    sendgridKey: process.env.SENDGRID_API_KEY
};

export default config;