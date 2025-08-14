import { View, Text, Platform } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { CardContext } from "./providers/Providers";

export default function cart() {
  const  {items}  = useContext(CardContext);

  return (
    <View>
      <Text>cart: {items.length}</Text>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
