import makeRequest from './makeRequest';

export default function getCategories() {
  return makeRequest('categories', 'categories');
}
