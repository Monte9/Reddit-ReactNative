import React, { Component, PropTypes } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import Decode from 'urldecode'

export default class Post extends Component {
  render() {
    const { key, title, thumbnail, subreddit, url } = this.props

    console.log(thumbnail)

    return (
      <View style={styles.postView}>
        <Image
          style={styles.thumbnail}
          source={{uri: thumbnail}}/>
        <View style={styles.detailView}>
          <Text style={styles.detailText}>{title}</Text>
          <Text style={styles.subText}>/r/{subreddit}</Text>
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  postView: {
    height: 150,
    borderWidth:1,
    borderColor: 'lightgray',
    flexDirection: 'row',
  },
  thumbnail: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    flex: 1,
  },
  detailView: {
    flexDirection: 'column',
    flex: 3,
  },
  detailText: {
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    flexWrap: 'wrap',
  },
  subText: {
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 13,
    color: 'gray',
  }
})
