const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const open = require('open');
const path = require('path');
const { remove } = require('fs-extra');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../webpack.config.js');
const port = process.env.PORT || 3000;

const main = async () => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(pino);

  await applyHotModuleReplacement(app);

  app.get('/env/backendurl', (req, res) => {
    const url = process.env.BACKEND_URL; //"https://kentico-workshop-backend-michalp.azurewebsites.net/api/v2/";
    if(!url.endsWith('/')) url = url + '/';

    res.setHeader('Content-Type', 'text/plain');
    res.send(url);
  });

  app.listen(port, () =>
    console.log('Express server is running on port' + port)
  );
};

async function applyHotModuleReplacement(app) {
  await remove(webpackConfig.output.path);

  const compiler = webpack(webpackConfig);
  app.use(refreshAfterInitialBuild(compiler));
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    writeToDisk: (pathname) => pathname.endsWith('.html'),
  }));
  app.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
  }));
}

function refreshAfterInitialBuild(compiler) {
  const pathToClientHtml = path.join(webpackConfig.output.path, 'index.html');

  return (req, res, next) => {
    // eslint-disable-next-line consistent-return
    compiler.outputFileSystem.readFile(pathToClientHtml, (err) => {
      if (!err) {
        return next();
      }

      const noClientMessage = `File ${pathToClientHtml} does not exist yet.`;
      console.log(noClientMessage);
      res.send(`
        <script>setTimeout(() => self.location.reload(), 3 * 1000)</script>
        <p align="center">${noClientMessage} Initial build takes about 10 s…<br />[If this page turns blank, refresh manually]</p>
      `);
    });
  };
}

main();
