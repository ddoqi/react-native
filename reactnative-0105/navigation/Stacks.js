import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Detail from "../screen/Detail";
import { Text, TouchableOpacity } from "react-native";
import Login from "../screen/Login";
import { authService } from "../firebase";
import { signOut } from "firebase/auth";
import ReviewDetail from "../screen/ReviewDetail";
import ReviewEdit from "../screen/ReviewEdit";

// Stacks : 로그인/로그아웃 || 아래탭
const Stack = createNativeStackNavigator();
export default function Stacks({
  // Each screen component in your app is provided with the navigation prop automatically.
  navigation: { goBack, navigate, setOptions },
}) {
  const handleAuth = () => {
    if (!!authService.currentUser?.uid) {
      signOut(authService)
        .then(() => {
          console.log("로그아웃 성공!!");
          // navigation 안에 setOptions라고 자체 내장되어있음
          // setOptions :update the screen's options
          setOptions({ headerRight: null });
        })
        .catch((err) => alert(err));
    } else {
      navigate("Login");
    }
  };
  return (
    // screenOptions : Default options to use for the screens in the navigator.
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "left",
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Text>난 Stack에 있는 뒤로</Text>
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
      {/* 요 아래 애들이 라우터 설정이랑 같은 원리 같음 */}
      {/* 다른 곳에서 navigate 쓸때보면 Stacks의 screen 이름 말함 */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ReviewDetail" component={ReviewDetail} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="ReviewEdit" component={ReviewEdit} />
    </Stack.Navigator>
  );
}
