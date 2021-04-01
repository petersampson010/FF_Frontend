import React, { Component } from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { getNameOfNavPage } from '../../functions/reusable';
import { $electricBlue } from '../../styles/global';
import { navSectionBackground, navSectionContainer, navText } from './style';


class NavSection extends Component {
    state = {  }

    currentPage = page => getNameOfNavPage(this.props.navigation.dangerouslyGetState())===page

    render() { 
        return (
            <TouchableOpacity onPress={()=>this.props.navigation.navigate(this.props.page)}>
                <View style={navSectionBackground}>
                    <View style={{...navSectionContainer, backgroundColor: this.currentPage(this.props.page) ? $electricBlue : null, borderWidth: this.currentPage(this.props.page) ? 1 : 0}}>
                        <Text style={navText}>{this.props.page}</Text>
                    </View>
                </View>
            </TouchableOpacity>
         );
    }
}
 
export default NavSection;