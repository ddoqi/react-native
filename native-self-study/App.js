import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//---------------------------스따또--------------------
export default function App() {
  const initialState = [
    { id: 1, text: " 똥싸기", isDone: false, cate: "js", isEdit: false },
    {
      id: 2,
      text: " 리액트 재미떠",
      isDone: false,
      cate: "react",
      isEdit: false,
    },
    {
      id: 3,
      text: " 코딩테스트 재미없떠 ",
      isDone: false,
      cate: "ct",
      isEdit: false,
    },
  ];
  const [todos, setTodos] = useState(initialState);
  const [text, setText] = useState("");
  // 이 cate 스테이트는 add할때도 쓰이고, 메뉴바 색깔바뀔때, todos뽑아올때 if문에서 걸림
  const [cate, setCate] = useState("js");
  const [editText, setEditText] = useState("");

  //데이터 저장하기

  //기본 함수들-------------------------
  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      text,
      isDone: false,
      isEdit: false,
      cate,
    };
    // 배열로 [] 감싸주는거 잊지말긔!!!!!!!!!!!
    setTodos([...todos, newTodo]);
  };

  const isDoneChange = (id) => {
    // 1. id를 매개변수로 받는다.
    // 2. id에 해당하는 배열의 요소를 찾는다.
    // 3. 그 배열의 요소의 isDone 값을 토글링한 후에 setTodos.
    const newTodos = [...todos];
    const findInd = newTodos.findIndex((todo) => todo.id === id);
    newTodos[findInd].isDone = !newTodos[findInd].isDone;
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    Alert.alert("todo ", "정말삭제?", [
      {
        text: "취소",
        style: "cancel",
        onPress: () => console.log("취소"),
      },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          const newTodos = todos.filter((todo) => todo.id !== id);
          setTodos(newTodos);
        },
      },
    ]);
  };

  // 메뉴바 부분에 cate바꿔주는것
  // AsyncStorage쓰려고 비동기로 만들기
  const setCateAction = async (cat) => {
    setCate(cat);
    await AsyncStorage.setItem("category", cat);
  };

  // 버튼을 눌렀을때 isEdit의 상태를 바꿔주는 함수
  const setEdit = (id) => {
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    newTodos[idx].isEdit = !newTodos[idx].isEdit;
    setTodos(newTodos);
  };

  // 수정된 edit내용을 저장해주는 함수
  const editTodo = (id) => {
    const newTodos = [...todos];
    const idx = newTodos.findIndex((todo) => todo.id === id);
    // 해당 객체의 text부분을 바꿔주는 작업
    newTodos[idx].text = editText;
    newTodos[idx].isEdit = false;
    setTodos(newTodos);
  };

  // 현재의 최신 todos를 AsyncStorage에 저장
  // todos가 바뀔때마다 saveTodos함수가 실행되면서, AsyncStorage에 데이터 저장된다.
  useEffect(() => {
    const saveTodos = async () => {
      await AsyncStorage.setItem("todos", JSON.stringify(todos));
    };
    // todos에 아무 데이터도 없을땐 saveTodos를 할 필요가 없으니
    // if문으로 앞에서 걸러주기
    if (todos.length > 0) saveTodos();
  }, [todos]);

  // 새로고침 발생시 AsyncStorage에서 todos 데이터와 category 데이터를 가져온다.
  useEffect(() => {
    const getData = async () => {
      const resp_todos = await AsyncStorage.getItem("todos"); // todos 배열
      const resp_cat = await AsyncStorage.getItem("category"); // undefined / null
      // AsyncStorage에서 가져온 데이터를 state에 꽂아주는 작업
      setTodos(JSON.parse(resp_todos));
      setCategory(resp_cat ?? "js");
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {/*~~~~~~~~~~~~~~~~~~~ 메인페이지 이동 버튼 3개 ~~~~~~~~~~~~~~~~~~~~~*/}
      <View
        style={{
          margin: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* ~~~~~~~~~~~~ java Script 버튼~~~~~~~~~~~~~~ */}
        <TouchableOpacity
          onPress={() => {
            setCateAction("js");
          }}
        >
          <TobButton
            style={{
              backgroundColor: cate == "js" ? "lightblue" : "lightgray",
            }}
          >
            <Text>JavaScript</Text>
          </TobButton>
        </TouchableOpacity>

        {/* ~~~~~~~~~~~~ react 버튼~~~~~~~~~~~~~~ */}
        <TouchableOpacity
          onPress={() => {
            setCateAction("react");
          }}
        >
          <TobButton
            style={{
              backgroundColor: cate == "react" ? "lightblue" : "lightgray",
            }}
          >
            <Text>React</Text>
          </TobButton>
        </TouchableOpacity>

        {/* ~~~~~~~~~ Coding Test버튼 ~~~~~~~~~ */}
        <TouchableOpacity
          onPress={() => {
            setCateAction("ct");
          }}
        >
          <TobButton
            style={{
              backgroundColor: cate == "ct" ? "lightblue" : "lightgray",
            }}
          >
            <Text>Coding Test</Text>
          </TobButton>
        </TouchableOpacity>
      </View>
      <View style={Hr.View} />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/*~~~~~~~~~~~~~~~~~~~~ input창~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <InputText
          placeholder="Enter your task"
          onSubmitEditing={addTodo}
          onChangeText={setText}
          value={text}
        />
      </View>
      <Text>text:{text}</Text>
      <View style={Hr.View} />
      {/* ~~~~~~~~~~ 이 컴포넌트에서 cate에 해당하는 넘들을 걸러줌 ~~~~~~~~~~ */}
      <ScrollView>
        {todos.map((todo) => {
          if (cate === todo.cate) {
            return (
              <TodoBox key={todo.id}>
                <View style={{ flexDirection: "row" }}>
                  {/* ~~~~~~~~ todo.isEdit이 true라면, 전자가 false라면 후자가 뜨도록 세팅 ~~~~~~~ */}
                  {todo.isEdit ? (
                    <TextInput
                      style={{ backgroundColor: "white", flex: 1 }}
                      value={editText}
                      onChangeText={setEditText}
                      onSubmitEditing={() => editTodo(todo.id)}
                    />
                  ) : (
                    <Text
                      style={{
                        textDecorationLine: todo.isDone
                          ? "line-through"
                          : "none",
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
                        <FontAwesome
                          name="pencil-square-o"
                          size={24}
                          color="black"
                        />
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
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const TobButton = styled.View`
  background-color: gray;
  border: 1px solid black;
  width: 100;
  height: 50;
  justify-content: center;
  align-items: center;
`;

const InputText = styled.TextInput`
  width: 350;
  height: 40;
  border: 2px solid black;
  margin: 10px;
`;

const TodoBox = styled.View`
  border: 1px solid black;
  background-color: lightgray;
  justify-content: space-evenly;
  margin: 10px;
  padding: 10px;
`;

const Hr = StyleSheet.create({
  View: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "black",
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
