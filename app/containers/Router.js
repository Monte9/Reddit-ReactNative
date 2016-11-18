import React, { Component } from 'react'
import { StyleSheet, Text, Image, View } from 'react-native'
import { Router, Scene, Modal, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'

import Login from './Login'
import Posts from './Posts'
import Random from './Random'

// This is for the "icon" prop on tabe Scenes
class TabIcon extends Component {
  render(){
    return (
      <View style={styles.tabBarIcon}>
        <Image
          style={styles.tabBarIconImage}
          source={require('../img/posts.png')}/>
        <Text style={{color: this.props.selected ? 'red' :'black', padding: 5}}>{this.props.tabBarText}</Text>
      </View>
    );
  }
}

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key={'tabs'} hideNavBar={true} tabs={true} tabBarStyle={styles.tabBar} direction={'vertical'}>
            <Scene
               key={'posts'}
               component={Posts}
               subreddit={'hot'}
               title={'Reddit Posts'}
               tabBarText="Posts"
               passProps={true}
               icon={TabIcon}
               style={{paddingTop: 64}}/>
            <Scene
              key={'random'}
              component={Random}
              subreddit={'random'}
              title={'Reddit Random'}
              tabBarText="Random"
              passProps={true}
              icon={TabIcon}
              style={{paddingTop: 64}}/>
          </Scene>
          <Scene key={'login'} direction={'vertical'} title={'Login'} panHandlers={null}>
            <Scene key={'loginContent'} title={'Reddit Login'} component={Login} style={{paddingTop: 64}} panHandlers={null} />
          </Scene>
        </Scene>
      </Router>
    )
  }
}

let styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0.5,
    borderColor: '#b7b7b7',
    backgroundColor: '#fff',
    opacity: 1,
    height: 64,
  },
  tabBarIcon: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  tabBarIconImage: {
    height: 24,
    width: 24,
  }
})

export default connect()(AppRouter)
