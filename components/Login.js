import React, { Component } from 'react';
import {
  Button, StyleSheet, Text, View, Image, TouchableHighlight, BackHandler, ScrollView,
  Platform, TextInput, KeyboardAvoidingView, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FormLabel, FormInput } from 'react-native-elements';
import t from 'tcomb-form-native';
import { NavigationActions } from 'react-navigation';
import logo from '../images/logo.png';

const Form = t.form.Form;

class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props)
    // this._onPress = this.onPress.bind(this)
    this.state = { loading: false, value: {} };

    //email validation
    var Email = t.refinement(t.String, val =>this.requiredField(val) && this.validEmail(val));
    Email.getValidationErrorMessage = val => {
      if (!this.requiredField(val)) {
        return 'email required!';
      }
      else if (!this.validEmail(val)) {
        return 'Invalid email address';
      }
    };

    //password validation
    var Password = t.refinement(t.String, val => this.requiredField(val));
    Password.getValidationErrorMessage = val => {
      if (!this.requiredField(val)) {
        return 'password required!';
      }
    };

    this.UserLogin = t.struct({
      email: Email,
      password: Password,
    });

    

  }

  //required field check
  requiredField = (val) => {
    if (val) {
      return true;
    } else {
      return false;
    }
  }

  //valid email check 
  validEmail = (val) => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
    const checkEmailValid = reg.test(val);
    if (checkEmailValid) {
      return true;
    } else {
      return false;
    }
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Home'
    });
    this.props.navigation.dispatch(navigateAction);
    // this.props.navigation.goBack();
    return true;
  }

  _onPress = () => {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    console.warn(value);
    if (value) { // if validation fails, value will be null
      console.warn(value); // value here is an instance of Person
    }
  }

  customFieldsTemplate = (locals) => {
    var error =
      locals.hasError && locals.error ? (
        <Text accessibilityLiveRegion="polite" style={{ flex: 1, color: '#a00' }}>
          {locals.error}
        </Text>
      ) : null;
  
      if(locals.label == 'PASSWORD'){
            var submitArrow = <Icon onPress={this._onPress.bind(this)} style={styles.inputIcon} name="long-arrow-right" size={20} color="#000" />;
      } else {
        var submitArrow = null;
      }
  
    return (
      <View>
        <View style={styles.inputSection}>
          <Icon style={styles.inputIcon} name={locals.help} size={20} color="#000" />
          <TextInput
            style={styles.inputForm}
            placeholder={locals.label}
            // value={locals.value}
            onChangeText={value => locals.onChange(value)}
            // onChange={locals.onChangeNative}
            // onChangeText={(searchString) => { this.setState({ searchString }) }}
            underlineColorAndroid="transparent"
          />
          {submitArrow}
        </View>
        {error}
      </View>
    );
  }

  onChangeForm = (value) => {
    this.setState({ value });
  }

  clearForm() {
    // clear content from all textbox
    this.setState({ value: null });
  }
  
  render() {

    //set form options
    this.options = {
      fields: {
        email: {
          label: 'EMAIL',
          help: 'at',
          template: this.customFieldsTemplate
        },
        password: {
          label: 'PASSWORD',
          help: 'lock',
          template: this.customFieldsTemplate
        },
      },
    };

    return (
      <ScrollView>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={{ height: 30 }} />
          <Image source={logo} style={{ width: 150, height: 250, alignSelf: 'center' }} />
          <Text style={styles.title}>THIRD WITNESS</Text>
          <Form ref="form"
            onChange={this.onChangeForm}
            value={this.state.value}
            options={this.options}
            type={this.UserLogin} />
          {/* <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight> */}
          <Text style={styles.newText}>FORGOT PASSWORD</Text>
          <Text onPress={() => {
            this.props.navigation.navigate('Registration');
          }} style={styles.newText}>
            NEW USER
            </Text>
          {/* <View style={{ height: 100 }} /> */}
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
    alignSelf: 'center',
    alignItems: 'stretch',
    justifyContent: 'center',
    flexDirection: 'column',
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
  },
  newText: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'normal',
    marginTop: 10
  },
  inputForm: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    //backgroundColor: '#fff',
    color: '#000',
    borderWidth: 0,
  },
  inputSection: {
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputIcon: {
    padding: 10,
  }
});

export default Login