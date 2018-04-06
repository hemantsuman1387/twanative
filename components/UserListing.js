import React, { Component } from 'react';
import {
  Alert, AppRegistry, SectionList, FlatList, Platform, Button, StyleSheet, Text, View, Image, TextInput, TouchableHighlight,
  TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, ListView, ScrollView, KeyboardAvoidingView,
  BackHandler 
} from 'react-native';


class UserListingScreen extends React.Component {
  state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    }),
  };
  componentDidMount() {
    return fetch('http://203.100.77.137:4142/api/users/all')
      .then(
        (response) => response.json()
      )
      .then(
        (responseJson) => {
          this.setState({
            dataSource: responseJson.results,
          }, function () {

          });

        })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  } 

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    console.log(NavigationActions, '111'); 
    const navigateAction = NavigationActions.navigate({
      routeName: 'Home'
    });
    this.props.navigation.dispatch(navigateAction);
    // this.props.navigation.goBack();
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: 'bold', fontSize: 30 }}>User Listing</Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => <Text>{item.username}, {item.email}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 5,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default UserListingScreen