import React, { Component } from 'react';
import {
  Button, Text, View, StyleSheet, ImageBackground 
} from 'react-native';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {

    return (

      <View style={styles.container}>
        <ImageBackground
          source={{ uri: 'http://www.thehindu.com/sci-tech/technology/internet/article17759222.ece/alternates/FREE_660/02th-egg-person' }}
          style={styles.image}
        >
          <Text style={styles.paragraph} >
            Welcome to Home Screen
      </Text>
          <Button
            title="Login"
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}
          />
          <Button
            title="Registration"
            onPress={() => {
              this.props.navigation.navigate('Registration');
            }}
          />
          <Button
            title="UserListing"
            onPress={() => {
              this.props.navigation.navigate('UserListing');
            }}
          />
        </ImageBackground>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  image: {
    flexGrow: 1,
    height: null,
    width: null,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    textAlign: 'center',
  },
});

export default Home