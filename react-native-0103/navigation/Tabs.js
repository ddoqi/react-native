import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screen/Movies";
import My from "../screen/My";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import DARK_COLOR from "../colors";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const isDark = useColorScheme() === "dark";
  console.log("isDark:", isDark);
  return (
    // <Tab.Navigator initialRouteName="My">
    // <Tab.Navigator screenOptions={
    //    { title:"한번에 제목 변경"}
    // }>
    // <Tab.Navigator sceneContainerStyle={{ backgroundColor: "green" }}>
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? DARK_COLOR : GREEN_COLOR,
      }}
    >
      {/* title,  tabBarLabel,tabBarLabelPosition: "beside-icon" */}
      {/* tabBarIcon */}
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          title: "개별 제목 변경(영화)",
          //   headerTitleAlign: "left", <-ios는 기본값이 center
          tabBarLabel: "Movies",
          tabBarLabelPosition: "beside-icon",
          tabBarBadge: "우왕",
          tabBarIcon: (color, size) => {
            // tabBarIcon은 콜백함수로 https://icons.expo.fyi/ 여기서 아이콘 받아와서 붙여넣기할수있음
            // color, size를 그대로써주기(상속받은 것)
            return (
              <MaterialIcons name="local-movies" size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={My}
        options={{
          title: "개별 제목 변경(내가 작성한 댓글)",
          tabBarLabel: "My",
        }}
      />
    </Tab.Navigator>
  );
}
