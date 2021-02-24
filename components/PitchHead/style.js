import { vh, vw } from "react-native-expo-viewport-units";
import { $darkBlue } from "../../styles/global";

export const pitchHead = {
    position: 'absolute',
    top: vh(0),
    // height: vh(2),
    backgroundColor: $darkBlue,
    zIndex: 20,
    flex: 1,
    width: vw(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
}