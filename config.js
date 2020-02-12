require('dotenv').config()

const config = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI 
}

export default config