import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Detail from "../screen/Detail";
import { Text, TouchableOpacity } from "react-native";
import Login from "../screen/Login";
import { authService } from "../firebase";
import { signOut } from "firebase/auth";
import ReviewDetail from "../screen/ReviewDetail";
import ReviewEdit from "../screen/ReviewEdit";

const Stack = createNativeStackNavigator();

export default function Stacks({
  navigation: { goBack, navigate, setOptions },
}) {
  const handleAuth = () => {
    if (!!authService.currentUser?.uid) {
      signOut(authService)
        .then(() => {
          console.log("로그아웃 성공");
          setOptions({ headerRight: null });
        })
        .catch((err) => alert(err));
    } else {
      navigate("Login");
    }
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "left",
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Text>뒤로</Text>
          </TouchableOpacity>
        ),
        headerRight: () => {
          return (
            <TouchableOpacity onPress={handleAuth}>
              <Text>{authService.currentUser ? "로그아웃" : "로그인"}</Text>
            </TouchableOpacity>
          );
        },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ReviewDetail" component={ReviewDetail} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="ReviewEdit" component={ReviewEdit} />
    </Stack.Navigator>
  );
}
