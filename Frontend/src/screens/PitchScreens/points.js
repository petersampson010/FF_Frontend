import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/header/header';
import Pitch from '../../components/Pitch/pitch';
import { getCaptain, getVCaptain, playersArrayToObj, getNameOfNavPage } from '../../functions/reusable';
import BottomNav from '../../components/bottomNav/bottomNav';
import { pitchContainer } from '../../components/Pitch/style';
import { screenContainer } from '../../styles/global';
import PitchHead from '../../components/PitchHead/pitchHead';



class PointsScreen extends Component {

    state = {  }

    getNavState = () => this.props.navigation.dangerouslyGetState();

    componentDidMount() {

    }

    render() {
        const { starters, subs, records, otherStarters, otherSubs, otherRecords } = this.props;
        console.log(otherStarters);
        const otherTeam = otherStarters.length > 0;
        console.log(otherTeam);
        const selectStarters = otherTeam ? otherStarters : starters;
        const selectSubs = otherTeam ? otherSubs : subs;
        const selectRecords = otherTeam ? otherRecords : records;
        return ( 
            <View style={screenContainer}>
                <PitchHead type="points" otherTeam={otherTeam}/>
                <ScrollView style={pitchContainer}>
                    {this.props.gwLatest ? 
                    <Pitch
                    type="points"
                    modalType="playerProfile"
                    update={()=>console.log('do nothing')}
                    clickFcn={()=>console.log('do nothing')}
                    captain={getCaptain(selectStarters, selectRecords)}
                    vCaptain={getVCaptain(selectStarters, selectRecords)}
                    team={selectStarters}
                    subs={selectSubs}
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
        league: state.homeGraphics.league,
        otherStarters: state.players.otherTeamPoints.starters,
        otherSubs: state.players.otherTeamPoints.subs,
        otherRecords: state.players.otherTeamPoints.records
    }
}
 
export default connect(mapStateToProps)(PointsScreen);