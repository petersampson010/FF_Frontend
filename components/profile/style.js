import { vh, vw } from "react-native-expo-viewport-units";

export const profile = {
    width: vw(15),
    height: vh(11),
    resizeMode: 'cover',
    borderRadius: 30,
}

export const profileContainer = {
    height: vh(40),

}

export const profileFlexContainer = {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
}

export const playerInfo = {
    flex: 1,
    flexDirection: 'row',
}

export const playerImg = {
    flex: 1,
}

export const playerBio = {

    color: 'white',
    flex: 3,
    flexDirection: 'column'
}

export const playerStats = {
    flex: 1,
    height: vh(5),
    flexDirection: 'row',
}

export const buttons = {
    flex: 1,
    flexDirection: 'row'
}