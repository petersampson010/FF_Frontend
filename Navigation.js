import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OpenerScreen from './screens/opener/opener';
import LoginScreen from './screens/login/login';
import AdminAccountSetupScreen from './screens/login/adminAccountSetup';
import ntsScreen1 from './screens/login/nts1';
import ntsScreen2 from './screens/newTeamSetup/nts2';
import ContactUsScreen from './screens/contactUs';
import HomeScreen from './screens/home/home';
import TransfersScreen from './screens/PitchScreens/transfers.js';
import PointsScreen from './screens/PitchScreens/points';
import ClubSetupScreen from './screens/clubSetup';
import PickTeamScreen from './screens/PitchScreens/pickTeam';
import AdminHomeScreen from './screens/adminHome';
import GameEditorScreen from './screens/gameEditor';
import AdminPlayerEditScreen from './screens/adminPlayerEdit';
import { $darkBlue } from './styles/global';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Opener">
        <Stack.Screen name="Opener" component={OpenerScreen} 
        options={{
          title: 'Sunday',
          headerStyle: {backgroundColor: $darkBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="Login" component={LoginScreen} 
        options={{
          title: 'Sunday',
          headerStyle: {backgroundColor: $darkBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="AdminAccountSetup" component={AdminAccountSetupScreen} 
        options={{
          title: 'Sunday',
          headerStyle: {backgroundColor: $darkBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="nts1" component={ntsScreen1} 
        options={{
          title: 'Sunday',
          headerStyle: {backgroundColor: $darkBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="nts2" component={ntsScreen2} 
        options={{
          title: 'Sunday',
          headerStyle: {backgroundColor: $darkBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="ContactUs" component={ContactUsScreen} 
        options={{
          title: 'Sunday',
          headerStyle: {backgroundColor: $darkBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="Home" component={HomeScreen} 
        options={{
          title: 'Sunday',
          headerStyle: {backgroundColor: $darkBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="Transfers" component={TransfersScreen} 
        options={{
          title: 'Sunday',
          headerStyle: {backgroundColor: $darkBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="Points" component={PointsScreen} 
        options={{
          title: 'Sunday',
          headerStyle: {backgroundColor: $darkBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="ClubSetup" component={ClubSetupScreen} 
        options={{
          title: 'Sunday',
          headerStyle: {backgroundColor: $darkBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="PickTeam" component={PickTeamScreen} 
        options={{
          title: 'Sunday',
          headerStyle: {backgroundColor: $darkBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="AdminHome" component={AdminHomeScreen} 
        options={{
          title: 'Sunday',
          headerStyle: {backgroundColor: $darkBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="GameEditor" component={GameEditorScreen} 
        options={{
          title: 'Sunday',
          headerStyle: {backgroundColor: $darkBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="AdminPlayerEdit" component={AdminPlayerEditScreen} 
        options={{
          title: 'Sunday',
          headerStyle: {backgroundColor: $darkBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>


      </Stack.Navigator>
    </NavigationContainer>
    );
}

export default Navigation;