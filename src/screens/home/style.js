import { vw } from "react-native-expo-viewport-units"
import { standardText } from "../../styles/textStyle"

export const topPerformers = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: vw(100),
}

export const topPlayerStyle = {
    width: vw(40),
    backgroundColor: 'white'
}

export const leagueTable = {
    ...standardText
}