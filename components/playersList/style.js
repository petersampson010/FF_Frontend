import { vh, vw } from "react-native-expo-viewport-units"
import { $electricBlue, $electricBlueHighlight, $luminousGreen, $standardWhite } from "../../styles/global"

export const itemPositionPicker = {
    height: 80,
    width: 200,
}

export const filter = {
    alignItems: 'center',
    backgroudColor: $luminousGreen
}
 
export const playersListContainer = {
    height: vh(150)
}

export const tableRow = {
    // height: vh(2),
    // width: vw(100),
    // flex: 1,
    flexDirection: "row",
    height: vh(5),
    borderBottomWidth: 1,
    borderColor: $electricBlueHighlight,
    paddingTop: vh(1),
    justifyContent: 'space-evenly',
    // backgroundColor: $electricBlue
}

export const tableElement = {
    width: vw(30),
    color: $standardWhite
}