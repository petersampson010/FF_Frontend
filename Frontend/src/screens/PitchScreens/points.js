import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/header/header';
import Pitch from '../../components/Pitch/pitch';
import { getCaptain, getVCaptain, playersArrayToObj, getNameOfNavPage } from '../../functions/reusable';
import BottomNav from '../../components/bottomNav/bottomNav';
import { pitchContainer } from '../../components/Pitch/style';
import { screenContainer } from '../../styles/global';


class PointsScreen extends Component {

    state = {  }

    getNavState = () => this.props.navigation.dangerouslyGetState();

    componentDidMount() {
        // console.log(this.props.records);
    }

    render() { 
        return ( 
            <View style={screenContainer}>
                <ScrollView style={pitchContainer}>
                    {this.props.gwLatest ? 
                    <Pitch
                    type="points"
                    modalType="playerProfile"
                    update={()=>console.log('do nothing')}
                    clickFcn={()=>console.log('do nothing')}
                    captain={getCaptain(this.props.starters, this.props.records)}
                    vCaptain={getVCaptain(this.props.starters, this.props.records)}
                    /> : <Text>No Games played yet, come back soon!</Text>}
                </ScrollView>
                <BottomNav navigation={this.props.navigation}/>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        gwLatest: state.gameweek.gwLatest,
        subs: state.players.lastGw.subs,
        starters: state.players.lastGw.starters,
        records: state.joiners.records,
        league: state.homeGraphics.league
    }
}
 
export default connect(mapStateToProps)(PointsScreen);