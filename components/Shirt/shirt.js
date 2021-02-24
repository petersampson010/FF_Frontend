import React, { Component } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Svg, { Ellipse } from "react-native-svg";
import { $pitchGreen } from "../../styles/global";
import { ellipse2, rect2, rect3, rect4, playerName, playerNumber, rect, rectStack, rect5, c6 } from "./style";

function Shirt(props) {
  return (
    <TouchableWithoutFeedback onPress={()=>props.openModal(props.player)}>
      <View style={rectStack}>
        <View style={rect2}></View>
        <View style={rect3}></View>
        <View style={rect}>
          <Text style={playerName}>{props.player.last_name}</Text>
          <Text style={playerNumber}>10</Text>
        </View>
        <Svg viewBox="0 0 33 32.47" style={ellipse2}>
          <Ellipse
            stroke="rgba(230, 230, 230,1)"
            strokeWidth={0}
            cx={17}
            cy={16}
            rx={17}
            ry={16}
            fill={$pitchGreen}
          ></Ellipse>
        </Svg>
        <View style={rect4}></View>
        {(props.captain || props.vCaptain) ? <View style={rect5}></View> : null}
        {props.captain ? <Text style={c6}>C</Text> : null}
        {props.vCaptain ? <Text style={c6}>VC</Text> : null}

      </View>
    </TouchableWithoutFeedback>
  );
}

export default Shirt;