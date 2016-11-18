import React, { Component, PropTypes } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { postsActionCreators } from '../redux'

import Post from '../components/Post'

const mapStateToProps = (state) => ({
  token: state.user.token,
  posts: state.posts.subreddits.hot,
  postsError: state.posts.error,
  postsTimestamp: state.posts.timestamp,
  isFetchingPosts: state.posts.isFetching
})

class Posts extends Component {
  componentDidMount() {
    const { token, dispatch, subreddit } = this.props

    if(token === null) {
      Actions.login()
    }
    dispatch(postsActionCreators.fetchPosts(subreddit))
  }

  componentWillReceiveProps(nextProps) {
    const { token, dispatch, subreddit } = this.props

    if (!token && nextProps.token) {
      dispatch(postsActionCreators.fetchPosts(subreddit))
    }
  }

  renderPosts = () => {
    // can use this to render posts in the ScrollView
    return <View/>
  }

  /**
   * Using a ScrollView
   * https://facebook.github.io/react-native/docs/using-a-scrollview.html
   */
  render() {
    return (
      <View>
        <ScrollView>
          {this.renderPosts()}
        </ScrollView>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  error: {
    flex: 1,
    backgroundColor: 'red',
    padding: 15
  },
  loading: {
    flex: 1,
    backgroundColor: '#eee',
    padding: 15
  }
})

export default connect(mapStateToProps)(Posts)
