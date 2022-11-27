import makeRequest from './makeRequest';

export default function getNewReleases() {
  return makeRequest('new-releases', 'albums');
}
