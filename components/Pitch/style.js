import {vw, vh} from 'react-native-expo-viewport-units';
import { $darkBlue, $pitchGreen } from '../../styles/global';

export const subHead= {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
}

export const scrollContainer = {
    height: vh(150)
}

export const pitchContainer = {
    flex: 1,
    width: vw(100),
    height: vh(75),
    backgroundColor: $darkBlue,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 37,
    zIndex: 0
}

export const pitch = {
    flex: 14,
    flexDirection: 'row',
    height: vh(70),
    marginTop: vh(1)
}
export const starters = {
    flex: 1
}
export const positionRow = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
}

export const subs = {
    position: 'relative',
    height: vh(11),
    backgroundColor: 'grey',
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-evenly"
}

export const slideButton = {
    height: vh(7),
    width: vh(2),
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: 20,
    // backgroundColor: $luminousGreen
}

export const slideButtonContainer = {
    flex: 1,
    justifyContent: 'center',
    height: vh(60),
    // width: vw(5),
    backgroundColor: 'green',
    // alignItems: 'right',
}

export const fullPitch = {
    top: 0,
    left: 0,
    width: 397,
    height: 622,
    position: "absolute",
    backgroundColor: $pitchGreen,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,1)"
  }

export const halfwayLine = {
    top: 44,
    left: 0,
    width: 393,
    height: 3,
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)"
  }

  export const semiCircle = {
    top: 0,
    left: 140,
    width: 110,
    height: 95,
    position: "absolute"
  }

  export const rect4Stack = {
    width: 337,
    height: 95,
    marginTop: 171
  }

  export const ellipse2 = {
    top: 0,
    left: 100,
    width: 73,
    height: 43,
    position: "absolute"
  } 
  
  export const penBox = {
    top: 24,
    left: 27,
    width: 221,
    height: 95,
    position: "absolute",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,1)",
    backgroundColor: $pitchGreen
  }
  export const ellipse2Stack = {
    width: 221,
    height: 122,
    marginTop: 234,
    marginLeft: 58
  }
  export const smallPenBox = {
    top: 579,
    left: 150,
    width: 96,
    height: 43,
    position: "absolute",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,1)"
  }


