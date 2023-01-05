import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screen/Movies";
import My from "../screen/My";

// 아래탭
const Tab = createBottomTabNavigator();

export default function Tabs() {
  console.log("Tabs 호출 ㅇㅅㅇ ");
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          // title: Generic title that can be used as a fallback(대비책) for headerTitle and tabBarLabel.
          title: "Tabs - Movie스크린 호출",
          // Title string of a tab displayed in the tab bar
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
