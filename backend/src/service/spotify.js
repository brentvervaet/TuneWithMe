const SpotifyWebApi = require('spotify-web-api-node');
const config = require('config');

const SPOTIFY_CLIENT_ID = config.get('spotify.clientId');
const SPOTIFY_CLIENT_SECRET = config.get('spotify.clientSecret');

const spotifyApi = new SpotifyWebApi({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
});

const id = '2YkCLlweAXqQAN2Z5vs4id';

const getTrackOfTheDay = async () => {

  // Retrieve an access token
  const data = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(data.body['access_token']);
  console.log('Access token retrieved:', data.body['access_token']);

  // Get the top 50 tracks
  const response = await spotifyApi.getPlaylistTracks(id, {
    limit: 50,
  });
  const tracks = response.body.items;
  //Pick a random track
  const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];

  const track = {
    name: randomTrack.track.name,
    artists: randomTrack.track.artists.map(artist => artist.name).join(', '),
    id: randomTrack.track.id,
    date: new Date().toISOString().split('T')[0],
  }

  if (!track) {
    throw ServiceError.notFound(`track not found`);
  }
  return track;

};

module.exports = { getTrackOfTheDay };