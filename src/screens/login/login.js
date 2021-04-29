import React, { Component } from 'react';
import { View, Text, Button, Switch, TouchableHighlightBase, TextInput } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import { loginUser, loginAdminUser, resetTeamPlayers } from '../../actions';
import { fetchUserByEmail, fetchAdminUserByEmail, fetchAllPlayersByAdminUserId, 
  fetchStartersByUserId, fetchSubsByUserId, fetchAllPlayerUserJoinersByUserId, 
  fetchAllUsersByAdminUserId, fetchAllGamesByAdminUserId, fetchLeague, fetchLatestGameweekFromAdminUserId, fetchPGJoinersFromUserIdAndGameweekId, fetchUGJoiner, fetchUGJoiners, fetchPlayerById, fetchUserById, fetchAdminUserById } 
  from '../../functions/APIcalls'; 
import { screenContainer } from '../../styles/global';
import { loginHead, switchText, textLabel } from './style';
import { input, inputFieldLarge, inputFieldContainerCenter } from '../../styles/input';


class LoginScreen extends Component {


  // EVENTUALLY YOU NEED A CLEAR BREAK BETWEEN LOGGED IN AND NOT 
  // shouldnt be able to go back to login once logged in 
  // just have a log out button 
  // this will clear up the glitch where we had to reset team players as it was rendering double triple players
  
  state = {
    userObj: {
      email: '',
      password: ''
    },
    admin: false,
    loginComplete: false
  }
  
  formChange = (id, entry) => {
    this.setState({...this.state, 
      userObj: {...this.state.userObj,
        [id]: entry
      }
    })
  }
  
  toggleSwitch = () => {
    this.setState({
      ...this.state, userObj: {...this.state.userObj, terms: !this.state.userObj.terms}
    })
  }

  toggleAdmin = () => {
    this.setState({
      ...this.state, admin: !this.state.admin
    })
  }

  handleSubmit = () => {
    if (this.state.admin) {
      this.handleAdminSubmit();
    } else {
      this.handleUserSubmit();
    }
  }

  handleAdminSubmit = async() => {
    try {
      let aUser = await fetchAdminUserByEmail(this.state.userObj);
      this.handleAdminReturn(aUser);
    } catch(e) {
      console.warn(e);
    }
  }
  
  handleUserSubmit = async() => {
    try {
      let user = await fetchUserByEmail(this.state.userObj);
      this.handleUserReturn(user);
    } catch(e) {
      console.warn(e);
    }
  }
    
  handleUserReturn = async(user) => {
    try {
      if (user !== undefined && user !== null) {
        let clubPlayers = await fetchAllPlayersByAdminUserId(user.admin_user_id);
        let aUser = await fetchAdminUserById(user.admin_user_id);
        let starters = await fetchStartersByUserId(user.user_id);
        let subs = await fetchSubsByUserId(user.user_id);
        let puJoiners = await fetchAllPlayerUserJoinersByUserId(user.user_id);
        let league = await fetchLeague(user.admin_user_id);
        let gameweek = await fetchLatestGameweekFromAdminUserId(user.admin_user_id);
        console.log(gameweek);
        if (gameweek) {
          let pgJoiners = await fetchPGJoinersFromUserIdAndGameweekId(user.user_id, gameweek.gameweek_id);
          console.log(pgJoiners.length)
          if (pgJoiners.length<1) {
            await this.props.loginUser(user, aUser, clubPlayers, starters, subs, puJoiners, league, gameweek, [], [], null, null, null);
          } else {
            let ugJoiners = await fetchUGJoiners(user.admin_user_id, gameweek.gameweek_id);
            let latestUG = await fetchUGJoiner(user.user_id, gameweek.gameweek_id);
            console.log(pgJoiners[0]);
            let pg = pgJoiners.sort((a,b)=>a.total_points-b.total_points)[0];
            console.log(pg);
            let topPlayer = {
              pg,
              player: await fetchPlayerById(pg.player_id)
            };
            let ug = ugJoiners.sort((a,b)=>b.total_points-a.total_points)[0];
            let topUser = {
              ug,
              user: await fetchUserById(ug.user_id)
            };
            await this.props.loginUser(user, aUser, clubPlayers, starters, subs, puJoiners, league, gameweek, pgJoiners, ugJoiners, latestUG, topPlayer, topUser);
          }
        } else {
          await this.props.loginUser(user, aUser, clubPlayers, starters, subs, puJoiners, league, null, [], [], null, null, null);
        }
        this.props.navigation.navigate('Home');
      } else {
        // this.setState({email: 'A',
        // password: 'A'});
        showMessage({
          message: "Login failed, please try again",
          type: "danger"
        })
      }
    } catch(e) {
      console.warn(e);
    }
  }

  handleAdminReturn = async(aUser) => {
    try {
      if (aUser !== undefined && aUser !== null) {
        let clubPlayers = await fetchAllPlayersByAdminUserId(aUser.admin_user_id);
        let allUsers = await fetchAllUsersByAdminUserId(aUser.admin_user_id);
        let games = await fetchAllGamesByAdminUserId(aUser.admin_user_id);
        await this.props.loginAdminUser(aUser, clubPlayers, allUsers, games);
        this.props.navigation.navigate('AdminHome');
      } else {
        // this.setState({email: 'A',
        // password: 'A'});
        showMessage({
          message: "Login failed, please try again",
          type: "danger"
        })
      }
    } catch(e) {
      console.warn(e);
    }
  }

    render() {
        return (
          <View style={screenContainer}>
            <View style={inputFieldContainerCenter}>
              <Text style={loginHead}>{this.state.admin ? 'Admin Account Login' : 'User Account Login'}</Text>
              <Switch value={this.state.admin} onValueChange={this.toggleAdmin} />
              <Text style={switchText}>Switch Admin/User Login</Text>
              <Text style={textLabel}>Enter your email address</Text>
              <View style={inputFieldLarge}>
                <TextInput style={input}
                value={this.state.userObj.email} 
                onChangeText={value => this.formChange('email', value)}
                placeholder="email@address.com"
                placeholderTextColor='#d1d2d6'
                autoCapitalize="none"
                />
              </View>
              <Text style={textLabel}>Enter your password</Text>
              <View style={inputFieldLarge}>
                <TextInput style={input}
                value={this.state.userObj.password} 
                onChangeText={value => this.formChange('password', value)}
                placeholder="Password"
                placeholderTextColor='#d1d2d6'
                autoCapitalize="none"
                secureTextEntry={true}
                />
              </View>
              
              <Button title="Sign in" onPress={this.handleSubmit}/>
            </View>
          </View>
        );
    }
  }

  const mapStateToProps = state => {
    return {
      loginComplete: state.loginComplete
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      loginUser: (user, aUser, clubPlayers, starters, subs, puJoiners, league, gameweek, pgJoiners, ugJoiners, latestUG, topPlayer, topUser) => dispatch(loginUser(user, aUser, clubPlayers, starters, subs, puJoiners, league, gameweek, pgJoiners, ugJoiners, latestUG, topPlayer, topUser)),
      loginAdminUser: (aUser, clubPlayers, allUsers, games) => dispatch(loginAdminUser(aUser, clubPlayers, allUsers, games)),
      resetTeamPlayers: () => dispatch(resetTeamPlayers()),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);