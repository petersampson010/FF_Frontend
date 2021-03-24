import { vh, vw } from 'react-native-expo-viewport-units';
import { $arylideYellow, $baseBlue, $chocolateBlack, $coral, $darkBlue, $darkElectricBlue, $onyx, $platinum, $sage, $seaBlue, $skobeloff } from '../../styles/global';

export const navContainer = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    height: vh(7),
    width: vw(100),
    backgroundColor: $seaBlue,
    top: vh(83)
}

export const navText = {
    margin: 4,
    paddingHorizontal: 6,
    textAlign: "center",
    color: 'white',
    fontSize: 19,
    fontWeight: '500',
    fontFamily: 'Avenir Next',
}

export const navSectionContainer = {
    flex: 1,
    justifyContent: 'center',
    height: vh(7),
    width: vw(25),
    borderRightWidth: 0.2,
    borderRightColor: $darkBlue,
    borderLeftWidth: 0.2,
    borderLeftColor: $darkBlue
}
