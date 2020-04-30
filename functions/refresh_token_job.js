
const request = require('request');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
require("firebase/firestore");
require('dotenv').config();

let functionsConfig;

if (process.env.NODE_ENV === 'production') {
  functionsConfig = {
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    credential: admin.credential.cert(require('./dev-bin/music-lyrics-service-account-file.json')),
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    apiKey: functions.config().config.api_key,
    authDomain: functions.config().config.auth_domain,
    messagingSenderId: functions.config().config.messaging_id,
    appId: functions.config().config.app_id,
    measurementId: functions.config().config.measurment_id
  }
}

const devConfig = {
  credential: admin.credential.cert(require('./dev-bin/music-lyrics-service-account-file.json')),
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASURMENT_ID,
};


const app = admin.initializeApp(process.env.NODE_ENV === 'production' ? functionsConfig : devConfig)
const db = app.firestore();

const updateSpotifyToken = async(uid, client_id, client_secret) => {
  let refresh_token;
  try {
    const user = await db.collection('users').doc(uid).get();
    if (user.exists) {
      refresh_token = user.data().refresh_token;
      if (refresh_token) {
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
            db.collection('users').doc(uid).update({
              access_token,
            }).then(() => console.log('Spotify access_token document successfully updated !'))
          }
        });
      }
    }
  } catch(err) {
    console.log('ERROR', err);
  }
}



module.exports = { updateSpotifyToken };