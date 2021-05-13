import { playersObjToArray } from "./functions/reusable";

const initialState = {
    spinner: false,
    endUser: {
        adminUser: {
            active: false,
            aUser: {},  
            allUsers: [],
        },
        user: {},
    },
    players: {
        clubPlayers: [],
        current: {
            starters: [],
            subs: []
        }, 
        lastGw: {
            starters: [],
            subs: []
        }
    },
    joiners: {
        puJoiners: [],
        pgJoiners: [],
        latestUG: null,
    },
    gameweek: {
        games: [],
        gwSelect: null,
        gwLatest: null,
    },
    homeGraphics: {
        league: [],
        topPlayer: null,
        topUser: null
    },
    loginComplete: false,
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGINUSER':
            return {
                ...state,
                endUser: {
                    adminUser: {
                        ...state.endUser.adminUser,
                        aUser: action.aUser
                    },
                    user: action.user,
                },
                players: {
                    clubPlayers: action.clubPlayers,
                    current: {
                        starters: action.starters,
                        subs: action.subs, 
                    }
                },
                joiners: {
                    puJoiners: action.puJoiners,
                    pgJoiners: action.pgJoiners,
                    ugJoiners: action.ugJoiners,
                    latestUG: action.latestUG,
                },
                gameweek: {
                    ...state.gameweeks,
                    gwLatest: action.gameweek,
                },
                homeGraphics: {
                    league: action.league,
                    topPlayer: action.topPlayer,
                    topUser: action.topUser
                },
                loginComplete: true,
            };
        case 'LOGINADMINUSER':
            return {
                ...state, 
                endUser: {
                    ...state.endUser,
                    adminUser: {
                        ...state.endUser.adminUser,
                        aUser: action.aUser,
                        allUsers: action.allUsers
                    }
                },
                players: {
                    ...state.players,
                    clubPlayers: action.clubPlayers
                },
                gameweek: {
                    ...state.gameweek,
                    games: action.games,
                },
                loginComplete: true
            };
        case 'NTS2LOGIN':
            return {
                ...state,
                endUser: {
                    ...state.endUser,
                    user: action.user
                },
                players: {
                    ...state.players,
                    starters: action.starters,
                    subs: action.subs
                },
                joiners: {
                    ...state.joiners,
                    puJoiners: action.puJoiners
                }
            };
        case 'SETADMINUSER':
            return {
                ...state, 
                endUser: {
                    ...state.endUser,
                    adminUser: {
                        ...state.endUser.adminUser,
                        aUser: action.aUser
                    }
                }
            };
        case 'SETCLUBPLAYERS':
            return {
                ...state, 
                players: {
                    ...state.players,
                    clubPlayers: action.players
                }
            };
        case 'SETUSER':
            return {
                ...state, 
                endUser: {
                    ...state.endUser, 
                    user: action.user
                }
            };
        case 'RESETTEAMPLAYERS':
            return {
                ...state, 
                players: {
                    ...state.players,
                    starters: [], 
                    subs: []
                }
            };
        case 'PICKTEAMUPDATE':
            return {
                ...state, 
                players: {
                    ...state.players,
                    starters: playersObjToArray(action.team), 
                    subs: action.subs
                }
            };
        case 'SETGWSELECT':
            return {
                ...state, 
                gameweek: {
                    ...state.gameweek,
                    gwSelect: action.game
                }
            };
        case 'COMPLETEGAME':
            let newGames = state.gameweek.games.map(game=>{
                if (game.gameweek_id===action.id) {
                    return {...game, complete: true};
                } else {
                    return game;
                }
            });
            return {
                ...state, 
                gameweek: {
                    ...state.gameweek,
                    games: newGames
                }
            };
        case 'ADDGAME':
            return {
                ...state, 
                gameweek: {
                    ...state.gameweek,
                    games: [...state.gameweek.games, action.game]
                }
            };
        case 'SETTRANSFERS':
            let starters = action.team.filter(player=>player.sub===false);
            let subs = action.team.filter(player=>player.sub===true);
            return {
                ...state, 
                players: {
                    ...state.players, 
                    starters, 
                    subs
                }
            };
        case 'UPDATEBUDGET':
            return {
                ...state, 
                endUser: {
                    ...state.endUser,
                    user: {
                        ...state.endUser.user,
                        budget: action.budget
                    }
                }
            }
        case 'ADDSPINNER':
            return {
                ...state, 
                spinner: true
            }
        case "REMOVESPINNER":
            return {
                ...state, 
                spinner: false
            }
        default:
            return state;
    }
}

export default rootReducer;