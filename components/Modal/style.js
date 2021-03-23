import { $baseBlue, $coral, $darkBlue, $electricBlue, $electricBlueHighlight, $luminousGreen, $standardWhite } from "../../styles/global";
import {vw, vh} from 'react-native-expo-viewport-units';


export const modal  = {
    position: "absolute",
    top: vh(20),
    backgroundColor: $electricBlue,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: $luminousGreen,
    alignItems: 'center', 
    padding: vh(3)
}

export const buttons = {
    flex: 1,
    flexDirection: 'row' 
}

export const button = {
    width: vw(30)
}

export const modalTextContainer = {
    alignItems: 'center', 
}

export const closeModalContainer = {
    width: vw(70),
    paddingTop: 20,
    borderTopColor: $luminousGreen,
    borderTopWidth: 1,
    alignItems: 'center'
}
