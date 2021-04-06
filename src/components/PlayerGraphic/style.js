import { vh, vw } from 'react-native-expo-viewport-units';
import { $arylideYellow, $baseBlue, $caretColor } from '../../styles/global';


export const container = {
    alignItems: 'center'
}

export const subContainer = {
    width: vw(18),
    flexDirection:  "row",
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: vw(5)
}

export const playerImage = {
    height: vh(5),
    width: vw(10),
    borderRadius: 50
}

export const playerName = {
    fontSize: 10,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: "800"
}

export const subImage = {
    height: vh(2),
    width: vw(5),
}

export const capText = {
    color: $arylideYellow,
    textAlign: 'center',
    fontWeight: "800"
}