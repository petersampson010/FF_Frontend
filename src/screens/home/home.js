import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/header/header';
import { displayDate, topPlayer, topUser } from '../../functions/reusable';
import BottomNav from '../../components/bottomNav/bottomNav';
import { $arylideYellow, screenContainer } from '../../styles/global';
import { gwInfo, leagueTable, topPerformers, topPlayerStyle } from './style';
import PlayerGWProfile from '../../components/profile/playerGWProfile';
import UserGWProfile from '../../components/profile/userGWProfile';
import GwScore from '../../components/gwScore/gwScore';
import { tableElement3, tableRow, tableRowHead } from '../../styles/table';
import { headers, sidenote, standardText } from '../../styles/textStyle';
import { vh } from 'react-native-expo-viewport-units';
import { headerText } from '../../components/header/style';
import NoScoreGW from '../../components/noScoreGW/noScoreGW';


class HomeScreen extends Component {
    state = {  }

    componentDidMount() {
        // console.log('****** HOME PAGE REACHED, USER LOGGED IN *******');

        // console.log('***** user:');
        // console.log(this.props.user);

        // console.log('***** latest gw');
        // console.log(this.props.gwLatest);

        // console.log('***** latest starters:');
        // console.log(this.props.latestStaters);

        // console.log('***** latest subs');
        // console.log(this.props.latestSubs);

        // console.log('***** last gw starters');
        // console.log(this.props.lastGwStaters);

        // console.log('***** last gw subs');
        // console.log(this.props.lastGwSubs);

        // console.log('***** END OF LOGS ******');
    }

    renderRows = () => {
        return this.props.league.sort((a,b)=>b.total_points-a.total_points).map((team, i)=>
        <TouchableOpacity key={i}
            style={tableRow}>
            <Text style={{...tableElement3, ...standardText}}>{team.team_name}</Text>
            <Text style={{...tableElement3, ...standardText}}>{team.total_points}</Text>
            {this.props.gwLatest ? <Text style={{...tableElement3, ...standardText}}>{team.gw_points}</Text> : null}
        </TouchableOpacity>);
    }


    render() { 
        const { user, topPlayer } = this.props
        const gwLatest = this.props.gwLatest ? this.props.gwLatest : false;
        return ( 
            <View style={screenContainer}>
                {gwLatest && topPlayer ? 
                <View style={gwInfo}>
                    <GwScore />
                    <Text style={{...sidenote, textAlign: 'right'}}>{displayDate(gwLatest.date)}</Text>
                    <View style={topPerformers}>
                        <View style={topPlayer}>
                            <PlayerGWProfile player={this.props.topPlayer}/>
                        </View>
                        <View style={topPlayerStyle}>
                            <UserGWProfile user={this.props.topUser}/>
                        </View>
                    </View>
                </View> : <NoScoreGW/>}
                <View style={tableRowHead}>
                    <Text style={{...tableElement3, ...standardText}}>Team</Text>
                    <Text style={{...tableElement3, ...standardText}}>Total Points</Text>
                    {gwLatest ? 
                    <Text style={{...tableElement3, ...standardText}}>{gwLatest.opponent} Points</Text>
                    : null}
                </View>
                <ScrollView style={''}>
                    <View style={{paddingBottom: vh(20)}}>
                        {this.renderRows()}
                    </View>
                </ScrollView>
                <BottomNav navigation={this.props.navigation}/>
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        user: state.endUser.user,
        league: state.homeGraphics.league,
        topPlayer: state.homeGraphics.topPlayer,
        topUser: state.homeGraphics.topUser,
        gwLatest: state.gameweek.gwLatest,
        latestStaters: state.players.latest.starters,
        latestSubs: state.players.latest.subs,
        lastGwStaters: state.players.lastGw.starters,
        lastGwSubs: state.players.lastGw.subs,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
