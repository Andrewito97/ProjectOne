require('dotenv').config()

const config = {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JSON_WEB_TOKEN_SECRET,
    sendgridKey: process.env.SENDGRID_API_KEY
}

export default config