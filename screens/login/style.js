import { vh, vw } from "react-native-expo-viewport-units"
import { $arylideYellow, $inputBlue, $luminousGreen, $skobeloff } from "../../styles/global"

export const inputField = {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: $inputBlue,
    height: vh(6), 
    width: vw(70),
    marginBottom: vh(3)
}

export const inputFieldsContainer = {
    alignItems: 'center',
    flex: 1,
    paddingTop: vh(5),
    paddingBottom: vh(25)
}

export const loginHead = {
    color: $arylideYellow,
    fontSize: 20,
    marginBottom: vh(7),
    fontFamily: 'Avenir Next',

}

export const switchText = {
    fontFamily: 'Avenir Next',
    color: 'white',
    paddingBottom: vh(3),

}

export const textLabel = {
    fontFamily: 'Avenir Next',
    width: vw(70),
    color: 'white',
    fontSize: 18,
    textAlign: 'left',

}

export const input = {
    fontFamily: 'Avenir Next',
    color: 'white',
    height: vh(6),
    fontSize: 16,
    marginLeft: vw(2)
}