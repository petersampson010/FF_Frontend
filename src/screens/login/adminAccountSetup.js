import React, { Component } from 'react';
import { View, Text, Button, Switch } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { setAdminUser } from '../../actions';
import { fetchAllAdminUsers, postAdminUser } from '../../functions/APIcalls'; 
import { showMessage } from "react-native-flash-message";
import { screenContainer } from '../../styles/global';
import { loginHead, switchText, textLabel } from './style';
import { inputFieldContainerCenter, inputFieldLarge, input } from '../../styles/input';

class AdminAccountSetupScreen extends Component {

  state = {
    aUserObj: {
      email: '',
      password: '',
      rePassword: '',
      clubName: '',
      terms: false
    },
  }
  
  formChange = (id, entry) => {
    if (id==='email') {
      this.setState({...this.state, aUserObj: {...this.state.aUserObj, email: entry}})
    } else if (id==='password') {
      this.setState({...this.state, aUserObj: {...this.state.aUserObj, password: entry}})
    } else if (id==='clubName') {
      this.setState({...this.state, aUserObj: {...this.state.aUserObj, clubName: entry}})
    } else {
      this.setState({...this.state, aUserObj: {...this.state.aUserObj, rePassword: entry}})
    }
  }
  
  toggleSwitch = () => {
    this.setState({
      ...this.state, 
      aUserObj: {
        ...this.state.aUserObj, 
        terms: !this.state.aUserObj.terms
      }
    })
  }

  checkValidAccount = (allAdminUsers) => {
    if (this.checkEmail(allAdminUsers) && this.checkPassword()) {
      return true;
    } else {
      return false;
    }
  }

  checkEmail = allAdminUsers => {
    let valid = true;
    // loop1:
    for (let i=0;i<allAdminUsers.length;i++) {
      let user = allAdminUsers[i];
      if (user.email===this.state.aUserObj.email) {
        showMessage({
          message: "Email already exists, please try again or go back and try to login using this email",
          description: "If you need a sub-section of error",
          type: "warning"
        });
        valid = false;
        break;
      } else if (user.club_name===this.state.aUserObj.clubName) {
        showMessage({
          message: "Club Name already in use, please try again or go back and try to login",
          description: "If you need a sub-section of error",
          type: "warning"
        });
        valid = false;
        break;
      }
    }
    return valid;
  }

  checkPassword = () => {
    if (this.state.aUserObj.password===this.state.aUserObj.rePassword) {
      return true;
    } else {
      showMessage({
        message: "Passwords do not match, please try again!",
        description: "If you need a sub-section of error",
        type: "warning"
      });
      return false;
    }
  }
  
  handleSubmit = async() => {
    try {
      let allAdminUsers = await fetchAllAdminUsers();
      let validAccount = this.checkValidAccount(allAdminUsers);
      if (validAccount) {
        let adminUser = await postAdminUser(this.state.aUserObj);
        this.props.setAdminUser(adminUser);
        this.props.navigation.navigate('ClubSetup');
      }
    } catch(e) {
      showMessage({
        message: "Fail: Network Issue, please try again later",
        type: "danger"
      });
      console.warn(e);
    }
    return;
  }

  render() {
    return (
      <View style={screenContainer}>
            <View style={inputFieldContainerCenter}>
              <Text style={loginHead}>Admin Account Setup</Text>
              <Text style={textLabel}>Enter your email address</Text>
              <View style={inputFieldLarge}>
                <TextInput style={input}
                value={this.state.aUserObj.email} 
                onChangeText={value => this.formChange('email', value)}
                placeholder="email@address.com"
                placeholderTextColor='#d1d2d6'
                autoCapitalize="words"
                />
              </View>
              <Text style={textLabel}>Enter your club name</Text>
              <View style={inputFieldLarge}>
                <TextInput style={input}
                value={this.state.aUserObj.teamName} 
                onChangeText={value => this.formChange('clubName', value)}
                placeholder="Club de sunday futbol"
                placeholderTextColor='#d1d2d6'
                />
              </View>
              <Text style={textLabel}>Enter your password</Text>
              <View style={inputFieldLarge}>
                <TextInput style={input}
                value={this.state.aUserObj.password} 
                onChangeText={value => this.formChange('password', value)}
                placeholder="Password"
                placeholderTextColor='#d1d2d6'
                autoCapitalize="none"
                secureTextEntry={true}
                />
              </View>
              <Text style={textLabel}>Re-enter your password</Text>
              <View style={inputFieldLarge}>
                <TextInput style={input}
                value={this.state.aUserObj.rePassword} 
                onChangeText={value => this.formChange('rePassword', value)}
                placeholder="Password"
                placeholderTextColor='#d1d2d6'
                autoCapitalize="none"
                secureTextEntry={true}
                />
              </View>
              <Text style={textLabel}>I agree to terms and conditions...</Text>
              <Switch 
              value={this.state.aUserObj.terms} 
              onValueChange={this.toggleSwitch}/>
              <Button title="Sign up" onPress={this.handleSubmit}/>
            </View>
          </View>
      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      //       <Text>Admin Account Setup Screen</Text>
      //       <View>
      //         <Text>Email</Text>
      //         <TextInput 
      //         value={this.state.aUserObj.email} 
      //         onChange={el => this.formChange('email', el.nativeEvent.text)}
      //         autoCapitalize = 'words'/>
      //         <Text>Password</Text>
      //         <TextInput 
      //         value={this.state.aUserObj.password} 
      //         onChange={el => this.formChange('password', el.nativeEvent.text)}
      //         autoCapitalize = 'words'/>
      //         <Text>Re-enter Password</Text>
      //         <TextInput 
      //         value={this.state.aUserObj.rePassword} 
      //         onChange={el => this.formChange('rePassword', el.nativeEvent.text)}
      //         autoCapitalize = 'words'/>
      //         <Text>Club Name</Text>
      //         <TextInput 
      //         value={this.state.aUserObj.clubName} 
      //         onChange={el => this.formChange('clubName', el.nativeEvent.text)}
      //         autoCapitalize = 'words'/>
      //         <Switch 
      //         value={this.state.aUserObj.terms} 
      //         onValueChange={this.toggleSwitch}/>
      //       </View>
      //       <Button title="Sign in" onPress={this.handleSubmit}/>
      //     </View>
    
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAdminUser: aUser => dispatch(setAdminUser(aUser)),
  }
}

export default connect(null, mapDispatchToProps)(AdminAccountSetupScreen);