import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import Tabs from "./Tabs";
import Stacks from "./Stacks";

const Stack = createNativeStackNavigator();

// 두개의 다른 네비게이터를 합치는 용도로 Root를 쓰고 있음
export default function Root() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/*  Tabs : bottom-tab있고, bottom 프레스에 따라 설정한 screen을 컴포넌트로 뿜어냄 */}
      <Stack.Screen name="Tabs" component={Tabs} />
      {/* Stacks는 내가 누를때 호출돼 */}
      <Stack.Screen name="Stacks" component={Stacks} />
    </Stack.Navigator>
  );
}
