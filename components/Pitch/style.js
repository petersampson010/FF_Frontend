import {vw, vh} from 'react-native-expo-viewport-units';
import { $darkBlue, $pitchGreen } from '../../styles/global';

export const subHead= {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
}

export const scrollContainer = {
    height: vh(70)
}

export const pitchContainer = {
    flex: 1,
    width: vw(100),
    height: vh(55),
    backgroundColor: $darkBlue,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 37,
    zIndex: 0
}

export const pitch = {
    flex: 14,
    flexDirection: 'row',
    height: vh(52),
    marginTop: vh(1)
}
export const starters = {
    flex: 1,
    marginTop: vh(3)
}
export const positionRow = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
}

export const subs = {
    position: 'relative',
    height: vh(11),
    backgroundColor: 'grey',
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-evenly"
}

export const pitchImage = {
  flex: 14,
  height: vh(50)
}
