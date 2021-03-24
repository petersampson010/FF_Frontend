import { vh, vw } from "react-native-expo-viewport-units"
import { $arylideYellow, $inputBlue, $luminousGreen, $skobeloff } from "../../styles/global"
import { headers, labelText, standardText } from "../../styles/textStyle"

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
    ...headers,
    marginBottom: vh(7),
}

export const switchText = {
    ...standardText,
    paddingBottom: vh(3),
}

export const textLabel = {
    ...labelText,
    width: vw(70),
    textAlign: 'left',
}

export const input = {
    ...standardText,
    height: vh(6),
    marginLeft: vw(2)
}