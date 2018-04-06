import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {DrawerNavigator} from 'react-navigation';

import Home from '../components/Home.js'
import Login from '../components/Login.js'
import Registration from '../components/Registration.js'
import UserListing from '../components/UserListing.js'
import SideMenu from '../SideMenu/SideMenu';


export default  DrawerNavigator({
  Home: {
    screen: Home,
  },
  Login: {
    screen: Login,
  },
  Registration: {
    screen: Registration,
  },
  UserListing: {
    screen: UserListing,
  },
},
{
  contentComponent: SideMenu,
  drawerWidth: 300,
  // headerMode: 'none',
  initialRouteName: 'Login',
},
{
  // define customComponent here
  contentComponent: props => 
  <ScrollView>
    <DrawerItems {...props} />
    <Text>Your Own Footer Area After</Text>
  </ScrollView>
});
