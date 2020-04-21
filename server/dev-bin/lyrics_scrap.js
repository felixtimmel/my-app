const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

/**
 * run 'node server/dev-bin/lyrics_scrap.js' to launch runScript
 * This will scap the lyrics for Pump it up from Joe Budden
 * @param {*} song 
 * @param {*} artist 
 */

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
      .filter(hit => hit.result.primary_artist.name === artist)[0]
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

// const getLyricsTest = async (songId) => {
//   const result = await axios.get(`https://genius.com/${songId}`);
//   const html = result.data;
//   const $ = cheerio.load(html);
//   const lyrics = $('.lyrics').text().replace(/\[.*\]/g, '');
//   return lyrics;
// }

const runScript = async () => {
  const url = await getLyricsUrl('pump it up', 'Joe Budden');
  console.log(await getLyrics(url))
  // const lycris = await getLyrics('https://genius.com/Joe-budden-pump-it-up-lyrics');
  // console.log('lycris:', lycris)
}

runScript()