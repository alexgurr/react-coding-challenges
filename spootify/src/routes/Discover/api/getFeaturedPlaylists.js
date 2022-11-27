import makeRequest from './makeRequest';

export default function getFeaturedPlaylists() {
  return makeRequest('featured-playlists', 'playlists');
}
