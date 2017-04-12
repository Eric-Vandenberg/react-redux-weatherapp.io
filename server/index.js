const path = require('path');
const axios = require('axios');
const webpack = require('webpack');
const express = require('express');
const bodyParser = require('body-parser');
const historyApiFallback = require('connect-history-api-fallback');
const WepackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const WebpackDevConfig = require('./webpack/webpack.development.config.js');

const development = process.env.NODE_ENV !== 'production';

if (development) {
  const dotenv = require('dotenv').config();
}

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/darksky', (req, res) => {
  const ROOT_WEATHER_URL = `https://api.darksky.net/forecast/${process.env.WEATHER_API}`;

  try {
    const coords = `${req.query.lat},${req.query.lng}`;
    const weatherURL = `${ROOT_WEATHER_URL}/${coords}`;

    axios.get(weatherURL)
        .then((response) => {
          if (response.status !== 200) {
            res.status(response.status).json({'message': 'Bad response from Dark Sky server'});
          }
          return response.data;
        })
        .then((payload) => {
          res.status(200).json(payload);
        })
        .catch((err) => {
          return err;
        });
  } catch (err) {
    res.status(500).json({
      'message': 'Errors occurs requesting Dark Sky API',
      'details': err
    });
  }
});

if (development) {
  const compiler = webpack(WebpackDevConfig);

  const middleware = WepackDevMiddleware(compiler, {
    publicPath: WebpackDevConfig.output.publicPath,
    contentBase: path.resolve(process.cwd(), 'src/www'),
    hot: true,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(historyApiFallback({
      verbose: false
  }));

  app.use(middleware);
  app.use(WebpackHotMiddleware(compiler));
  app.get('/', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(path.resolve(process.cwd(), 'dist')));
  app.get('/', function response(req, res) {
    res.sendFile(path.join(process.cwd(), 'dist/index.html'));
  });
}

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.info(`==> 🌎  Server starting on http://localhost:${port} ...`);
  }
});
