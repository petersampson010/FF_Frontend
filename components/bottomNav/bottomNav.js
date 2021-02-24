import React, { Component } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { navContainer, navButton } from './style';
import NavSection from './navSection';

class BottomNav extends Component {
    state = {  }

    render() {
        const pages = ['Home', 'PickTeam', 'Points', 'Transfers'];
        return ( 
            <View style={navContainer}>
                {pages.map((p,i)=>
                <NavSection 
                key={i}
                navigate={this.props.navigate} 
                page={p}/>
                )}
            </View>
         );
    }
}
 
export default BottomNav;