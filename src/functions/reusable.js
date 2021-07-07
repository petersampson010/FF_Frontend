import { fetchPlayerById, fetchUserById } from "./APIcalls";

export const positionString = (num) => {
    switch(num) {
        case '1':
            return "Goalkeeper";
        case '2': 
            return "Defender";
        case '3': 
            return "Midfielder";
        case '4':
            return "Forward";
        default:
            return;
    }
}

export const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const fullName = player => {
    if (player) {
        return capitalize(player.first_name) + ' ' + capitalize(player.last_name)
    } else {
        return player
    }
}

export const availability = avail => {
    switch(avail) {
        // available
        case 'a':
            return true;
        // unavailable
        case 'u':
            return false;
        default: 
            return true;
    }
}

export const playersArrayToObj = arr => {
    let obj = {
        '1': [],
        '2': [],
        '3': [],
        '4': []
    };
    for (let i=0;i<arr.length;i++) {
        obj[arr[i].position].push(arr[i]);
    }
    return obj;
}

export const playersObjToArray = obj => {
    return Object.values(obj).flat(Infinity);
}

export const getCaptain = (players, puJoiners) => {
    console.log(players);
    // console.log(puJoiners);
    let playerId = puJoiners.find(x=>x.captain===true).player_id;
    // console.log('player id: ' + playerId);
    let player = players.find(x=>x.player_id===playerId);
    // console.log(player);
    return player;
}

export const getVCaptain = (players, puJoiners) => {
    let playerId = puJoiners.find(x=>x.vice_captain===true).player_id;
    let player = players.find(x=>x.player_id===playerId);
    return player;
}

export const isCaptain = (player, puJoiners) => {
    let puJoiner = puJoiners.find(x=>x.player_id===player.player_id);
    return puJoiner.captain;
}

export const isVCaptain = (player, puJoiners) => {
    let puJoiner = puJoiners.find(x=>x.player_id===player.player_id);
    return puJoiner.vice_captain;
}

export const getPuJ = (player, puJoiners) => {
    let puJoiner = puJoiners.find(x=>x.player_id===player.player_id);
    return puJoiner;
}

export const getPuId = (player, puJoiners) => {
    let puJoiner = puJoiners.find(x=>x.player_id===player.player_id);
    return puJoiner.pu_id;
}

export const addSubAttributeToPlayersArray = (team, allPuJ, count) => {
    return team.map(player => { 
        let sub;
        let puJ = getPuJ(player, allPuJ);
        if (puJ) {
            sub = puJ.sub
        } else {
            sub = count>0 ? false : true;
            count--;
        }
        return {...player, sub}})
}

export const playerIds = players => players.map(x=>x.player_id);

export const displayDate = date => {
    let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    return new Intl.DateTimeFormat('en-us', options).format(Date.parse(date));
}

export const subOrTransfer = type => {
    switch(type) {
        case 'transfers':
            return 'TRANSFER';
        case 'points':
            return '';
        case 'pickTeam':
            return 'SUB';
        default: 
            return '';
    }
}

export const getNameOfNavPage = navState => navState.routes[navState.index].name;