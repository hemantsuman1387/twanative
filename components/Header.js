import React, { Component } from 'react';
import {
  Button, Text, View, StyleSheet, ImageBackground, TouchableOpacity
} from 'react-native';

import { NavigationActions } from 'react-navigation';

class Header extends React.Component {

  constructor(props) {
    super(props)
  }

  backPressed = () => {
    // alert('121');
    const navigateAction = NavigationActions.navigate({
      routeName: 'Home'
    });
    this.props.navigation.dispatch(navigateAction);
    // this.props.navigation.goBack();
    return true;
  }

  render() {
    return (
      <View style={styles.header}>
        <Text onPress={this.backPressed} > BACK1 </Text>
        <Text style={{alignSelf:'center'}}>{this.props.headerTitle}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 50, backgroundColor: '#DDDDDD',
    padding: 10, alignSelf: 'stretch'
  },
});

export default Header