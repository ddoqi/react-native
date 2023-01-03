import React from "react";
// import { StatusBar } from "expo-status-bar";
import {
  // StyleSheet,
  Text,
  View,
  // Button,
  TextInput,
  // SafeAreaView,
  // ScrollView,
  // Alert,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
// import { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Tabs from "./components/Tabs";

export default function Todo({
  todo,
  setEdit,
  deleteTodo,
  isDoneChange,
  editTodo,
  setEditText,
  // editText,
}) {
  const [editText, setEditText] = useState(todo.text);

  return (
    <TodoBox key={todo.id}>
      <View style={{ flexDirection: "row" }}>
        {/* ~~~~~~~~ todo.isEdit이 true라면, 전자가 false라면 후자가 뜨도록 세팅 ~~~~~~~ */}
        {/* 수정중이면 input창이 열릴거고 */}
        {/* 수정중이 아니면(false면)  */}
        {todo.isEdit ? (
          <TextInput
            style={{ backgroundColor: "white", flex: 1 }}
            // value={editText}로 해놓으면
            // 다시 input열었을때, 이전 텍스트가 남아있음
            value={editText}
            // defaultValue={todo.text}
            onChangeText={setEditText}
            //event를 안넘겨주려고
            onSubmitEditing={() => editTodo(todo.id)}
          />
        ) : (
          <Text
            style={{
              textDecorationLine: todo.isDone ? "line-through" : "none",
            }}
          >
            {todo.text}
          </Text>
        )}

        <View
          style={{
            flex: "1",
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: 90,
            }}
          >
            {/* --------isDone 변경되는버튼-------------- */}
            <TouchableOpacity>
              <AntDesign
                name="checksquare"
                size={24}
                color="black"
                onPress={() => {
                  isDoneChange(todo.id);
                }}
              />
            </TouchableOpacity>
            {/* -----------Editing버튼---------------*/}
            <TouchableOpacity onPress={() => setEdit(todo.id)}>
              <FontAwesome name="pencil-square-o" size={24} color="black" />
            </TouchableOpacity>
            {/* ~~~~~~~~~~~~~~~~~~~삭제버튼~~~~~~~~~~~~~~~~ */}
            <TouchableOpacity onPress={() => deleteTodo(todo.id)}>
              <FontAwesome name="trash-o" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TodoBox>
  );
}

const TodoBox = styled.View`
  border: 1px solid black;
  background-color: lightgray;
  justify-content: space-evenly;
  margin: 10px;
  padding: 10px;
`;
