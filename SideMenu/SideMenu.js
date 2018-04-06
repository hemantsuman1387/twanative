import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './SideMenu.style';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import profileImage from '../images/user-default-profile.png';

class SideMenu extends React.Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <View style={styles.imageContainer}>
              <Image source={profileImage} style={styles.profileImage} />
            </View>
            <Text style={styles.profileName}>
              Profile Name
            </Text>
          </View>
          <View>
            {/* <Text style={styles.sectionHeadingStyle}>
              Section 1
            </Text> */}
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Home')}>
                Home
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Login')}>
                Login
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Registration')}>
                Registration
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('UserListing')}>
                User Listing
              </Text>
            </View>
          </View>
         </ScrollView>
        <View style={styles.footerContainer}>
          <Text>This is my fixed footer</Text>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;


