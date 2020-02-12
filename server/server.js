import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import config from '../config'
import template from '../templates/template.react'
import userApi from './routes/user.routes'
import postApi from './routes/post.routes'

const { node_env, port, mongoUri } = config

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing
app.use(cors())

const CURRENT_WORKING_DIR = process.cwd()
app.use('/build', express.static(path.join(CURRENT_WORKING_DIR, 'build')))

app.use('/', userApi)
app.use('/', postApi)

app.get('*', (request, response) => {
    response.send( template() )
})

mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', () => {
    throw new Error('Unable to connect to database !')
})
mongoose.connection.once('open', () => {
    console.log('Successfully connected to database !')
})

app.listen(port, function() {
    console.log(`Server is running on port ${port} in ${node_env} mode...`)
})
