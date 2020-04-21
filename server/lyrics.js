const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

const getLyricsUrl = async(song, artist) => {
  try {
    const { data } = await axios.get(`https://api.genius.com/search?q=${song}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_GENIUS_TOKEN}`
      },
    })
    const { hits } = data.response;
    return hits
      .filter(hit => hit.result.primary_artist.name.replace(/’/g, '') === artist.replace(/'/g, ''))[0]
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