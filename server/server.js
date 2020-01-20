import express from 'express'
import path from 'path'
import config from '../config'
import template from '../templates/template.react'
import userApi from './routes/user.routes'
import postApi from './routes/post.routes'


const app = express()
const CURRENT_WORKING_DIR = process.cwd()
app.use('/build', express.static(path.join(CURRENT_WORKING_DIR, 'build')))

app.use('/', userApi)
app.use('/', postApi)

app.get('*', (request, response) => {
    response.send( template() )
})


const { node_env, port } = config
app.listen(port, function() {
    console.log(`Server is running on port ${port} in ${node_env} mode...`)
})
