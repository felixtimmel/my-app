const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const path = require('path');
const cron = require('node-cron');
require('dotenv').config();
const compression = require('compression')
const { getLyricsUrl, getLyrics } = require('./lyrics');
const { updateSpotifyToken } = require('./refresh_token_job');
let uid = null;
const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_KEY; // Your client id
const client_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET; // Your secret
const redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
let clientUrl = 'http://localhost:3000';
if(process.env.NODE_ENV === 'production') {
  clientUrl = 'http://localhost:8888';
}


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';

const app = express();

// const whitelist = ['https://accounts.spotify.com','http://localhost:3000']
// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log('@@@@@@@@@@@@@@origin:', origin)
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
app.use(compression())

app.use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  console.log('process.env.NODE_ENV:&&&&&&&&&&', process.env.NODE_ENV)
  app.use(express.static(path.join(__dirname, '..', 'build')));
  // Handle React routing, return all requests to React app
  // app.get('/*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '..', 'build/index.html'));
  // });
}

app.get('/send_uid', function (req, res) {
  uid = req.query.uid;
  updateSpotifyToken(uid, client_id, client_secret);
})

app.get('/spotify-login', function(req, res) {

  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = 'streaming user-read-private user-read-email user-read-playback-state user-modify-playback-state playlist-modify-public user-top-read user-library-read user-read-recently-played';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        const access_token = body.access_token;
        const refresh_token = body.refresh_token;
        // SpotifyClass.setToken(access_token, refresh_token);
        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(`${clientUrl}/loged_in_spotify#` +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

cron.schedule('*/55 * * * *', () => {
  // I think this is not a good think to do here for the client but it work for now:
  if (uid) {
    updateSpotifyToken(uid, client_id, client_secret);
  }
  console.log('running a task every 55 minutes');
});

app.get('/get_lyrics', (req, res) => {
  const artist = req.query.artist;
  const song = req.query.song;
  return getLyricsUrl(song, artist)
  .then(url => getLyrics(url))
  .then(lyrics => res.json({ lyrics }));
})

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

console.log('Listening on 8888');
app.listen(process.env.PORT || 8888);
