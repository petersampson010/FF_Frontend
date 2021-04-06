import {vw, vh} from 'react-native-expo-viewport-units';
import { $darkBlue, $pitchGreen, $standardWhite } from '../../styles/global';

export const pitchClassContainer = {
    height: vh(65)
}

export const subHead= {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
}

export const pitchContainer = {
    flexDirection: 'row',
    width: vw(100),
    backgroundColor: $darkBlue
}

export const subs = {
    width: vw(100),
    backgroundColor: 'grey',
    borderRadius: 20,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: "space-evenly",
}

export const pitch = {
    flex: 1,
    height: vh(52),
    marginTop: vh(1)
}
export const starters = {
    flex: 1,
    marginTop: vh(3),
    alignItems: 'center'
}
export const positionRow = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
}


export const pitchImage = {
  flex: 14,
  height: vh(50)
}
