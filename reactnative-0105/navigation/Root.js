import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stacks from "./Stacks";

const Stack = createNativeStackNavigator();
export default function Root() {
  return (
    // 첨에 Tabs가 띄워짐
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: "난 root에 있는 뒤로야",
      }}
    >
      <Stack.Screen name="Tabs" component={Tabs} />
      {/* 이 Stacks가 다른 페이지로 이동하는 것을 가능하게 해준다.*/}
      <Stack.Screen name="Stacks" component={Stacks} />
    </Stack.Navigator>
  );
}
