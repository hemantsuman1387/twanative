import React, { Component } from 'react';
import t from 'tcomb-form-native';
import {
  Button, StyleSheet, Text, View, TouchableHighlight, ScrollView, KeyboardAvoidingView, BackHandler,
  TouchableOpacity, TextInput, Picker, keyboardShouldPersistTaps
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationActions } from 'react-navigation';

import Header from './Header.js';
import Loader from './Loader';

const Form = t.form.Form;


const questions = t.enums({
  name: '',
  mname: ''
}, 'questions');


function customQuestionTemplate(locals) {
  var error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={{ flex: 1, color: '#a00' }}>
        {locals.error}
      </Text>
    ) : null;

  return (
    <View>
      <View style={styles.inputSection}>
        <Icon style={styles.inputIcon} name="key" size={20} color="#000" />
        <Picker
          style={styles.inputForm}
          selectedValue={locals.value}
          onValueChange={locals.onChange}
        >
          <Picker.Item label="SECUERITY QUESTION" />
          <Picker.Item label="Your Name222" value="name" />
          <Picker.Item label="Your Mother Name" value="mname" />

        </Picker>
      </View>
      {error}
    </View>
  );
}
function customFieldsTemplate(locals) {

  var error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={{ flex: 1, color: '#a00' }}>
        {locals.error}
      </Text>
    ) : null;

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
      </View>
      {error}
    </View>
  );
}



class Registration extends React.Component {

  static navigationOptions = {
    title: 'Registration',
  };

  constructor(props) {
    super(props)
    this.state = { loading: false, value: {} };
    this.state.headerTitle = 'New User';

    // this._onPress = this._onPress.bind(this);
    // this.customQuestionTemplate = customQuestionTemplate.bind(this);

    //username validation
    var userName = t.refinement(t.String, val => this.requiredField(val));
    userName.getValidationErrorMessage = val => {
      if (!this.requiredField(val)) {
        return 'user name required!';
      }
    };

    //question validation
    var questions = t.refinement(t.String, val => this.requiredField(val));
    questions.getValidationErrorMessage = val => {
      if (!this.requiredField(val)) {
        return 'questions required!';
      }
    };

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

    //confirm password validation
    var rePassword = t.refinement(t.String, val => this.requiredField(val) && this.matchPassword(val));
    rePassword.getValidationErrorMessage = val => {
      if (!this.requiredField(val)) {
        return 'confirm password required!';
      }
      else if (!this.matchPassword(val)) {
        return 'password doesn\'t match';
      }
    };

    //Answer validation
    var Answer = t.refinement(t.String, val => this.requiredField(val));
    Answer.getValidationErrorMessage = val => {
      if (!this.requiredField(val)) {
        return 'answer required!';
      }
    };


    //set form
    this.User = t.struct({
      username: userName,
      email: Email,
      password: Password,
      re_password: rePassword,
      question: questions,
      answer: Answer
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

  //match confirm password check 
  matchPassword = (val) => {
    // console.warn('ooo',this.state);
    if (val == this.state.value.password) {
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

    // this.setState({
    //   loading: true
    // });

    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    console.warn(value);
    //for clear the form after success
    // this.clearForm();
    if (value) { // if validation fails, value will be null
      console.warn(value); // value here is an instance of Person

      fetch("http://203.100.77.137:4142/api/users/signup", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value)
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (value) {
          if (value.status) {
            this.setState({
              loading: false,
            });
          } else {
            this.setState({
              loading: false,
            });
          }
          console.warn('1111', value)
        });

    } else {
      this.setState({
        loading: false,
      });
    }
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
        username: {
          label: 'USERNAME',
          help: 'user',
          // error: 'username required!',
          template: customFieldsTemplate
        },
        email: {
          label: 'EMAIL',
          help: 'at',
          // error: 'email required!',
          template: customFieldsTemplate
        },
        password: {
          label: 'PASSWORD',
          help: 'lock',
          // error: 'password required!',
          template: customFieldsTemplate
        },
        re_password: {
          label: 'RE-PASSWORD',
          help: 'lock',
          // error: 'password required!',
          template: customFieldsTemplate
        },
        question: {
          label: 'Question',
          template: customQuestionTemplate,
          // error: 'question required!',
        },
        answer: {
          label: 'ANSWER',
          help: 'unlock',
          // error: 'answer required!',
          template: customFieldsTemplate
        },
      },
    };

    return (
      <ScrollView keyboardShouldPersistTaps='always' >
        <Loader loading={this.state.loading} />
        <Header headerTitle={this.state.headerTitle} />
        <View style={styles.container} >
          {/* <Text style={{ fontWeight: 'bold', fontSize: 30 }}>User Registration1</Text> */}
          <Form ref="form"
            options={this.options}
            value={this.state.value}
            onChange={this.onChangeForm}
            type={this.User} />

          <TouchableHighlight style={styles.button} onPress={this._onPress.bind(this)} underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>Registration</Text>
          </TouchableHighlight>
          {/* <View style={{ height: 100 }} /> */}

        </View>
      </ScrollView>

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
    alignSelf: 'center',

  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
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

export default Registration