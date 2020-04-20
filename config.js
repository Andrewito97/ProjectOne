require('dotenv').config();

const config = {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    mainMongoUri: 'mongodb://localhost:27017/OneProjectMain', //process.env.MONGO_URI,
    musicMongoUri: 'mongodb://localhost:27017/OneProjectMusic',
    movieMongoUri: 'mongodb://localhost:27017/OneProjectMovie',
    jwtSecret: process.env.JSON_WEB_TOKEN_SECRET,
    sendgridKey: process.env.SENDGRID_API_KEY
};

export default config;   
