import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Stacks from "./Stacks";

const Stack = createNativeStackNavigator();
export default function Root() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: "난 root의 뒤로야",
      }}
    >
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Stacks" component={Stacks} />
    </Stack.Navigator>
  );
}
