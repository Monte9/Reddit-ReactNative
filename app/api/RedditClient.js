export default class RedditClient {
  // this is so you don't have to read Reddits API documentation
  constructor(token) {
    this.baseUrl = 'https://oauth.reddit.com/'
    this.defaultHeaders = {
        'Authorization': `bearer ${token}`,
    }
  }

  // use "fetch" to retrieve data from endpoints on the above baseUrl and add the defaultHeaders to your request
  getMoviesFromApiAsync() {
    return fetch(this.baseUrl, {
              method: 'GET',
              headers: this.defaultHeaders
            })
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.movies;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
