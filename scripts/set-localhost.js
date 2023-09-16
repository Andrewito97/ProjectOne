/* eslint-disable no-undef */
const dotenv = require('dotenv');
const { networkInterfaces } = require('os');
const fs = require('fs');

const nets = networkInterfaces();
for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    if (net.family === 'IPv4' && !net.internal) {
      const confEnv = dotenv.parse(fs.readFileSync('.env'));
      if(confEnv.HOST != net.address) {
        confEnv.HOST = net.address;
        fs.open('.env', 'w+', 666, ( error, fd ) => {
          if(error) console.warn(error);
          for(let key in confEnv) {
            fs.write( fd, `${key}=${confEnv[key]}\r\n`, null, 'utf8', (error) => {
              if(error) console.warn(error);
            });
          }
        });
      }
    }
  }
}