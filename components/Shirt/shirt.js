import React, { Component } from "react";
import { TouchableWithoutFeedback, Image, ImageBackground } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Svg, { Ellipse } from "react-native-svg";
import { $pitchGreen } from "../../styles/global";
import { ellipse3, rect2, rect3, rect4, playerName, playerNumber, rect, rectStack, rect5, c6, shirtImage, profileContainer } from "./style";

function Shirt(props) {
  const profilePic = { uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fprofile%2520picture%2F&psig=AOvVaw3baCTcli4HKvcmELsm7m7s&ust=1614701067393000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPDxga68j-8CFQAAAAAdAAAAABAD'};
  return (
    // <TouchableWithoutFeedback onPress={()=>props.openModal(props.player)}>
      <View style={profileContainer}>
        <Image source={profilePic} imageStyle={{resizeMode: 'stretch'}} style={{width: '100%', height: '100%'}}/>

      </View>
    // {/* </TouchableWithoutFeedback> */}
  );
}
export default Shirt;