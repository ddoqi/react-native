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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
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

///나의 주석박스
// state가 새로고침됐을대 계속 state값을 유지할려면
// localStorage에 저장해놓는것
// async storage라는게 잇대
// async storage는 비동기로 써줘야 실행이되는게 잇댕
// npm install @react-native-asynk-storage~~~어쩌구
// todos가 변할때마다 저장을 할거고
// 컴포넌트가 마운트됐다=최초의 렌더링됐다.

// 처음 디펜던시가 잇어도 최초는 무조건 읽는대!!!
// 처음에 얘는 안읽엇으면 좋겟으니
// useEffect(()=>{
//   // 현재의 최신 todos를 어싱크스토리지에 저장
//   const saveTodos =async()=>{
//     // AsyncStorage에 넣을때 stringify로 넣어줘야한다.
//     await AsyncStorage.setItem("todos",JSON.stringify(todos))
//   };
//    if(todos.length > 0) saveTodos()
//    },[todos])
//------------------------------------------------------
//------------------------------------------------------
// useEffect(()=>{
//   const getData =async()=>{
//     const resp_todos=  await AsyncStorage.getItem("todos");
//     const resp_cat=  await AsyncStorage.getItem("category");
//     //배열이나 객체는 Parsing을 해줘야 자쓰가 인지함
//     setTodos(JSON.parse(resp_todos));
//     setCategory(resp_cat)
//   }
//   getData();
//   },[])
//------------------------------------------------------
//------------------------------------------------------
// 1. id값을 받아서 해당 배열 요소를 제외한 나머지를 새로운 배열로 받는다.
// 2. setTodos
// 왜 얕은복사안하고 todos바로쓰나여?
// filter는 이뮤터블 메소드라서 todos에 영향을 미치지 못한다.
// splice,push는 직접 영향을 주지만 Filter는 todos에 영향을 주지 못한다.
//doesitmutate라는 싸이트 들어가심
