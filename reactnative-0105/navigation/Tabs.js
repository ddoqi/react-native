import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screen/Movies";
import My from "../screen/My";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  console.log("Tabs가 호출되었다면 쏴리질러~~~");
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          title: "Tabs - Movie스크린 호출",
          tabBarLabel: "Movies",
        }}
      />
      <Tab.Screen
        name="My"
        component={My}
        options={{ title: "Tabs안에서 My 스크린 호출", tabBarLabel: "My" }}
      />
    </Tab.Navigator>
  );
}
