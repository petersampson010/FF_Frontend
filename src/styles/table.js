import { vh, vw } from "react-native-expo-viewport-units"
import { $electricBlueHighlight, $standardWhite } from "./global"

export const tableRow = {
    flexDirection: "row",
    height: vh(5),
    borderBottomWidth: 1,
    borderColor: $electricBlueHighlight,
    // paddingTop: vh(1),
    justifyContent: 'space-evenly',
}

export const tableElement3 = {
    width: vw(30),
    color: $standardWhite
}

export const tableElement9 = {
    width: vw(8),
    height: vh(5),
    paddingTop: vh(1.5),
    color: $standardWhite,
    borderRightWidth: 1,
    borderRightColor: $electricBlueHighlight
}

export const tableElement1 = {
    paddingTop: vh(1.5),
    width: vw(20),
    justifyContent: 'center',
    color: $standardWhite,
}