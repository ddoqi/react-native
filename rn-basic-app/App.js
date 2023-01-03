import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
  SafeAreaView,
} from "react-native";
// import uuid from "react-native-uuid";

export default function App() {
  const initialTodo = ["똥싸기"];
  const [newTodo, setNewtodo] = useState("");
  const [todoList, setTodoList] = useState(initialTodo);
  function buttonHandler() {
    Alert.alert(
      "New TodoList 저장",
      "새로운 투두리스트를 저장하시겠습니까?",
      [
        {
          text: "네",
          onPress: () => {
            setTodoList([...todoList, newTodo]);
            setNewtodo("");
          },
        },
        {
          text: "아니요",
          onPress: () => alert("취소되었습니다"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ color: "green", fontSize: 20 }}>리액트 네이티브</Text>
      <Text>Hello ~~~ 꿔까 </Text>
      <Image
        style={{ width: 100, height: 100, borderRadius: 30 }}
        source={require("./assets/test2.jpg")}
      />
      <TextInput
        style={{ backgroundColor: "yellow", width: 120 }}
        onChangeText={setNewtodo}
        value={newTodo}
        placeholder="새로운 Todo 입력하기"
      />
      <Button title="추가하기" onPress={buttonHandler} />
      <Text> newTodo : {newTodo}</Text>

      <View>
        <Text> ❤️ 나의 TodoList ❤️ </Text>
        {todoList.map((item) => {
          return <Text key={item.id}>☑️ {item}</Text>;
        })}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
