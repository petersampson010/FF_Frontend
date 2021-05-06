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

    render() { 
        return ( 
            <View style={screenContainer}>
                <ScrollView style={pitchContainer}>
                    {this.props.gwLatest ? 
                    <Pitch
                    type="points"
                    modalType="playerProfile"
                    update={()=>console.log('do nothing')}
                    budget={false}
                    team={playersArrayToObj(this.props.starters)}
                    subs={this.props.subs}
                    clickFcn={()=>console.log('do nothing')}
                    captain={getCaptain(this.props.starters, this.props.puJoiners)}
                    vCaptain={getVCaptain(this.props.starters, this.props.puJoiners)}
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
        subs: state.players.subs,
        starters: state.players.starters,
        puJoiners: state.joiners.puJoiners,
        league: state.homeGraphics.league
    }
}
 
export default connect(mapStateToProps)(PointsScreen);