//general modules
import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';

//castom modules
import config from '../config';
import template from '../templates/template.react';
import userApi from './routes/user.routes';
import educationApi from './routes/education.routes';
import postApi from './routes/post.routes';
import movieApi from './routes/movie.routes';
import musicApi from './routes/music.routes';
import bookApi from './routes/book.routes';
import otherApi from './routes/other.routes';

//server side rendering
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheets } from '@material-ui/core/styles';
import RootComponent from '../client/RootComponent';
import paletteController from '../client/PaletteController';

//mobile detection before sending template
import isMobile from 'ismobilejs';

//initialize express server
const app = express();

//parse body params and attache them to req.body
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());

//secure apps by setting various HTTP headers
app.use(helmet());

//enable CORS - Cross Origin Resource Sharing
app.use(cors());

//serving static files
// eslint-disable-next-line no-undef
const CURRENT_WORKING_DIR = process.cwd();
app.use('/build', express.static(path.join(CURRENT_WORKING_DIR, 'build')));

//api endpoints
app.use('/', userApi);
app.use('/', educationApi);
app.use('/', postApi);
app.use('/', musicApi);
app.use('/', movieApi);
app.use('/', bookApi);
app.use('/', otherApi);

//sending template with ssr markup, css and bundeled client code at every endpoint
app.get('*', (request, response) => {
  const deviceCheck = isMobile(request.headers['user-agent']).any;
  const palette = request.cookies.OneProjectPalette;
  if(palette) {
    paletteController.choosePalette(palette);
  } else {
    paletteController.choosePalette('dark blue');
  }
  const sheets = new ServerStyleSheets();
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter location={request.url}>
        <RootComponent isMobile={deviceCheck} palette={palette}/>
      </StaticRouter>
    )
  );
  const css = sheets.toString();
  response.send( template(markup, css, deviceCheck, config.trackingId) );
});

//select a server depending on the environment  
if(config.nodeEnv === 'development') {
  const httpServer = http.createServer(app);
  httpServer.listen(config.port, () => {
    console.log('\x1b[36m', `Launching mode: ${config.nodeEnv}`);
    console.log('\x1b[36m', `Server is running on url: http://${config.host}:${config.port}`);
  });
} else {
  //read credentials for enabling secure connection
  const privateKey  = fs.readFileSync(path.join(CURRENT_WORKING_DIR, './certificates/root.key'), 'utf8');
  const certificate = fs.readFileSync(path.join(CURRENT_WORKING_DIR, './certificates/root.cert'), 'utf8');
  const credentials = { key: privateKey, cert: certificate };
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(config.securePort, () => {
    console.log('\x1b[36m', `Launching mode: ${config.nodeEnv}`);
    console.log('\x1b[36m', `Server is running on url: https://${config.host}:${config.securePort}`);
  });
}
