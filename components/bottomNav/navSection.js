import React, { Component } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { navSectionContainer, navText } from './style';


class NavSection extends Component {
    state = {  }
    render() { 
        return ( 
            <TouchableOpacity onPress={()=>this.props.navigate(this.props.page)}>
                <View style={navSectionContainer}>
                    <Text style={navText}>{this.props.page}</Text>
                </View>
            </TouchableOpacity>
         );
    }
}
 
export default NavSection;