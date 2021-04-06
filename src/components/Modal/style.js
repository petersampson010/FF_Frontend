import { $baseBlue, $chocolateBlack, $coral, $darkBlue, $electricBlue, $electricBlueHighlight, $luminousGreen, $standardWhite, $zaGreen } from "../../styles/global";
import {vw, vh} from 'react-native-expo-viewport-units';


export const modal  = {
    position: "absolute",
    top: vh(20),
    backgroundColor: $darkBlue,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: $zaGreen,
    alignItems: 'center', 
    padding: vh(3)
}

export const buttons = {
    // flex: 1,
    flexDirection: 'row',

}

export const button = {
    width: vw(30)
}

export const modalTextContainer = {
    alignItems: 'center', 
}

export const closeModalContainer = {
    position: 'absolute',
    bottom: vh(2),
    width: vw(70),
    paddingTop: 20,
    borderTopColor: $zaGreen,
    borderTopWidth: 1,
    alignItems: 'center'
}

export const captainBox = {
    elevation: 8,
    width: vw(30),
    marginVertical: vh(1),
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
}
