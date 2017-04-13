# react-redux-weatherapp.io

See a [working demo](http://www.weatherapp.io)


## Features
* React, Redux, Webpack2, PostCSS
* Components styled with [React Toolbox (Material Design)](http://react-toolbox.com/#/components)
* SVG animation with [Vivus](https://github.com/maxwellito/vivus)
* Express server wrapping Webpack2 for Development & Production
* Weather stats automatically display based on user IP address
* Proxied API to avoid CORS issues
* Environment variables configured for Development & Production

## Pre-Reqs

### Clone this repository
```
git clone https://github.com/Eric-Vandenberg/react-redux-weatherapp.io
```

### Setup API_KEY environment variable

You'll need an API KEY from [Dark Sky Weather API](https://darksky.net/dev/register).

Once you have an API KEY, create a `.env` file in the root of the project.

In this file (react-redux-weatherapp.io/.env) set...
```
WEATHER_API=<YOUR_API_KEY>
```

### Register on Heroku to Deploy (for Production)

Sign up for a free account at [Heroku](https://signup.heroku.com/)

That's it!  Now you're ready to run the app.


## Usage (Development)

### Install
```
yarn
```

### Run app with hot module replacement
```
yarn start
```


## Heroku Deployment (Production)

All from the root of your project...

### Login to your Heroku account
```
heroku login
```

### Create a Heroku Application
```
heroku create
```

### Set Environment Variable
```
heroku config:set WEATHER_API=<YOUR_API_KEY>
```

### Push to Deploy
```
git push heroku
```


## Issues

1. React PropTypes have been abstracted to it's own npm package
  * The console in development will show an error
  * Warning: Accessing PropTypes via the main React package is deprecated. Use the prop-types package from npm instead.
  * This is under development within this project and it's dependencies React-Toolbox

## Contributing

PRs and issues reporting are always welcome 😎

## License

MIT


