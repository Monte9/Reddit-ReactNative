export default class RedditClient {
  // this is so you don't have to read Reddits API documentation
  constructor(token) {
    this.baseUrl = 'https://oauth.reddit.com/'
    this.defaultHeaders = {
        'Authorization': `bearer ${token}`,
    }
  }

  getPosts = (endpoint) => this.fetchfromAPI(this.baseUrl + endpoint)
  getRandom = () => this.fetchfromAPI(this.baseUrl + 'random')

  fetchfromAPI = url => (
    fetch(url, {
      headers: this.defaultHeaders
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error)
    })
  )
}
