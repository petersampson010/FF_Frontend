import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../components/header/header';
import { displayDate, topPlayer, topUser } from '../../functions/reusable';
import BottomNav from '../../components/bottomNav/bottomNav';
import { screenContainer } from '../../styles/global';
import { gwInfo, leagueTable, topPerformers, topPlayerStyle } from './style';
import PlayerGWProfile from '../../components/profile/playerGWProfile';
import UserGWProfile from '../../components/profile/userGWProfile';
import GwScore from '../../components/gwScore/gwScore';
import { tableElement3, tableRow } from '../../styles/table';
import { headers, sidenote, standardText } from '../../styles/textStyle';
import { vh } from 'react-native-expo-viewport-units';
import { headerText } from '../../components/header/style';
import NoScoreGW from '../../components/noScoreGW/noScoreGW';


class HomeScreen extends Component {
    state = {  }

    renderRows = () => {
        return this.props.league.sort((a,b)=>b.total_points-a.total_points).map((team, i)=>
        <TouchableOpacity key={i}
            style={tableRow}>
            <Text style={{...tableElement3, ...standardText}}>{team.team_name}</Text>
            <Text style={{...tableElement3, ...standardText}}>{team.total_points}</Text>
            <Text style={{...tableElement3, ...standardText}}>{team.gw_points}</Text>
        </TouchableOpacity>);
    }


    render() { 
        const { gwLatest, user } = this.props
        console.log(gwLatest);
        return ( 
            <View style={screenContainer}>
                {/* <Text style={headerText}>{user.teamname}</Text> */}
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
                <View style={tableRow}>
                    <Text style={{...tableElement3, ...standardText}}>Team</Text>
                    <Text style={{...tableElement3, ...standardText}}>Total Points</Text>
                    <Text style={{...tableElement3, ...standardText}}>{gwLatest.opponent} Points</Text>
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
        gwLatest: state.gameweek.gwLatest
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
