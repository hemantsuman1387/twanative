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

    // this.state.validEmailErrorMessage = 'Email required!';
    // this._onPress = this._onPress.bind(this);
    // this.customQuestionTemplate = customQuestionTemplate.bind(this);



    //email validation
    var  Email = t.refinement(t.String, email => { });
    Email.getValidationErrorMessage = function (value, path, context) {
      return 'bad age, locale: ' + context.locale;
    };

    //set form
    var User = t.struct({
      username: t.String,
      email: Email,
      // password: this.Password,
      // re_password: this.rePassword,
      // question: questions,
      answer: t.String
    });

    // this.Email.getValidationErrorMessage = email => {
    //   const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; //or any other regexp
    //   const checkEmailValid = reg.test(email);
    //   if (!email) {
    //     return 'email required!';
    //   }
    //   // else if (!checkEmailValid) {
    //   //   return 'Invalid email address';
    //   // }
    // };

    // //password validation
    // this.Password = t.refinement(t.String, Password => { });
    // this.Password.getValidationErrorMessage = Password => {

    //   if (!Password) {
    //     return 'password required!';
    //   }
    // };

    // //confirm password validation
    // this.rePassword = t.refinement(t.String, rePassword => { });
    // this.rePassword.getValidationErrorMessage = rePassword => {
    //   if (!rePassword) {
    //     return 'comfirm password required!';
    //   }
    //   else if (rePassword != this.state.value.password) {
    //     return 'password doesn\'t match';
    //   }
    // };

    //set form options
    var options = {
      fields: {
        username: {
          label: 'USERNAME',
          help: 'user',
          error: 'username required!',
          template: customFieldsTemplate
        },
        email: {
          label: 'EMAIL',
          help: 'at',
          // error: 'password required!',
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
          error: 'question required!',
        },
        answer: {
          label: 'ANSWER',
          help: 'unlock',
          error: 'answer required!',
          template: customFieldsTemplate
        },
      },
    };

    const questions = t.enums({
      name: '',
      mname: ''
    }, 'questions');




    onChangeForm = (value) => {
      this.setState({ value });
    }

    clearForm = () => {
      // clear content from all textbox
      this.setState({ value: null });
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
    console.warn(this.state, value); // value here is an instance of Person
    //for clear the form after success
    // this.clearForm();
    if (value) { // if validation fails, value will be null


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


  render() {

    return (
      <ScrollView keyboardShouldPersistTaps='always' >
        <Loader loading={this.state.loading} />
        <Header headerTitle={this.state.headerTitle} />
        <View style={styles.container} >
          {/* <Text style={{ fontWeight: 'bold', fontSize: 30 }}>User Registration1</Text> */}
          <Form ref="form"
            options={this.options}
            value={this.state.value}
            onChange={onChangeForm}
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