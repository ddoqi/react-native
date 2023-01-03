import { StatusBar } from "expo-status-bar";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
// import Stacks from "./components/Stacks";
// import Tabs from "./navigation/Tabs";
import Root from "./navigation/Root";
import { useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "./theme";

export default function App() {
  // dark일 경우 isDark가 true가 나올 것
  const isDark = useColorScheme() === "dark";
  console.log("isDark:", isDark);
  return (
    // 스타일-컴포넌트 쓸때 props.theme으로 해서 원하는 테마에 접근할 수 있다.
    // darkTheme,lightTheme는 theme.js에서 임의로 만들어준 넘들
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      // DarkTheme,DefaultTheme는 리액트네비게이션에서 제공하는것
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        {/* <Stacks /> */}
        {/* <Tabs /> */}
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
