const functions = require('firebase-functions');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();
let geniusToken = process.env.REACT_APP_GENIUS_TOKEN;
if(process.env.NODE_ENV === 'production') {
  geniusToken = functions.config().genius.token;
}


const getLyricsUrl = async(song, artist) => {
  try {
    const { data } = await axios.get(`https://api.genius.com/search?q=${song}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${geniusToken}`
      },
    })
    const { hits } = data.response;
    return hits
      .filter(hit => hit.result.primary_artist.name.toLowerCase().replace(/’/g, '') === artist.toLowerCase().replace(/'/g, ''))[0]
      .result.url;
  } catch(err) {
    console.log('There was an error in the getLyricsUrl call', err)
  }
}

const getLyrics = async (url) => {
  const result = await axios.get(url);
  const html = result.data;
  const $ = cheerio.load(html);
  const lyrics = $('.lyrics').text().replace(/\[.*\]/g, '');
  return lyrics;
}

module.exports = {
  getLyricsUrl,
  getLyrics,
};