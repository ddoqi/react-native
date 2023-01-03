import { Text, TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();
// route라는 프롭스를 통해 params를 받을 수 있다.
const One = ({ route: { params }, navigation: { navigate } }) => {
  console.log("params:", params);
  return (
    <TouchableOpacity onPress={() => navigate("two")}>
      <View>
        <Text>One</Text>
      </View>
    </TouchableOpacity>
  );
};

const Two = ({ navigation: { navigate, setOptions } }) => {
  return (
    <>
      <TouchableOpacity onPress={() => navigate("three")}>
        <View>
          <Text>Two</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setOptions({ title: "변경된 제목!" })}>
        <Text>set options</Text>
      </TouchableOpacity>
    </>
  );
};

const Three = ({ navigation: { goBack, reset } }) => {
  return (
    <>
      <TouchableOpacity onPress={() => goBack()}>
        <View>
          <Text>Three</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          reset({
            index: 1,
            routes: [{ name: "three" }, { name: "two" }],
          })
        }
      >
        <Text>Reset Navigation</Text>
      </TouchableOpacity>
    </>
  );
};

export default function Stacks() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "red",
        headerBackTitle: "뒤로~",
        presentation: "modal",
        animation: "flip",
      }}
    >
      <Stack.Screen name="one" component={One} />
      <Stack.Screen name="two" component={Two} />
      {/* 페이지 개별적으로 주고싶을땐, 스크린에 options를 주면 된다.  */}
      <Stack.Screen
        options={{
          presentation: "modal",
        }}
        name="three"
        component={Three}
      />
    </Stack.Navigator>
  );
}
