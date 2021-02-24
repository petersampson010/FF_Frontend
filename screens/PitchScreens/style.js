import { vh, vw } from "react-native-expo-viewport-units"
import { $darkBlue } from "../../styles/global"

export const quickView = {
    width: vw(10),
    height: vh(60),
    backgroundColor: 'red'
}

// MENU DRAWER

export const menuDrawerContainer = {
    flex: 1,
    width: vw(100),
    flexDirection: 'row',
    height: vh(60),
}

export const leftDrawerComp = {
    flex: 2,
    opacity: 0,
    backgroundColor: 'blue'
}

export const rightDrawerComp = {
    flex: 8,
    backgroundColor: $darkBlue,
    color: 'white'
}

export const closeDrawer = {
    height: '100%',
    width: '100%',
    backgroundColor: 'red'
}