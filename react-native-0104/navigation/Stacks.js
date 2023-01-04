import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Detail from "../screen/Detail";
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native";

const Stack = createNativeStackNavigator();

export default function Stacks() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "left",
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Text>뒤로</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}

// import React from "react";
// import { Text, TouchableOpacity, View } from "react-native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator();
// const One = ({ navigation: { navigate } }) => {
//   return (
//     <>
//       <TouchableOpacity onPress={() => navigate("two")}>
//         <View>
//           <Text> 난 Stack안의 One 이야 </Text>
//         </View>
//       </TouchableOpacity>
//     </>
//   );
// };
// const Two = ({ navigation: { goBack } }) => {
//   return (
//     <>
//       <TouchableOpacity onPress={() => goBack()}>
//         <View>
//           <Text>난 Stack안의 Two야 </Text>
//         </View>
//       </TouchableOpacity>
//     </>
//   );
// };

// export default function Stacks() {
//   console.log("Stacks도 호출됐다면 쏴리질러~~~~");
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerBackTitle: "난 Stacks의 뒤로~",
//         // presentation: "modal",
//         animation: "flip",
//       }}
//     >
//       {/* Stacks도 내가 누를때마다 호출이 된다.*/}
//       {/* 뭘 누를때마다? One,Two 컴포넌트를 누를때마다 */}
//       <Stack.Screen name="one" component={One} />
//       <Stack.Screen name="two" component={Two} />
//     </Stack.Navigator>
//   );
// }
