import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  // Button,
  // TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
  // TouchableOpacity,
} from "react-native";
import styled from "styled-components";
// import { AntDesign } from "@expo/vector-icons";
// import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import Tabs from "./components/Tabs";
import Todo from "./components/Todo";
import {
  query,
  collection,
  doc,
  orderBy,
  addDoc,
  getDoc,
  // getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

import { dbService } from "./firebase";
// import { async } from "@firebase/util";

//---------------------------스따또--------------------
export default function App() {
  const [todos, setTodos] = useState([]);
  console.log("todos:", todos);
  const [text, setText] = useState("");
  // 이 cate 스테이트는 add할때도 쓰이고, 메뉴바 색깔바뀔때, todos뽑아올때 if문에서 걸림
  // 탑버튼을 클릭핼때, setCate가 됭께
  const [cate, setCate] = useState("js");

  // isEdit을 state로 만들어주고, 파베에 굳이 넣을필요 없지않나

  //데이터 저장하기

  //기본 함수들-------------------------
  const addTodo = async () => {
    const newTodo = {
      // id: Date.now(),
      text,
      isDone: false,
      isEdit: false,
      cate,
      createdAt: Date.now(),
    };
    // addDoc은 document(dbService,"todos","콜랙션id~~")
    // 요렇게 안하고, collection만지정해도된다.
    // document로 하면 특정 다큐먼트의 id까지 지정해줘야하는데,
    // collection은 자동으로 랜덤으로 지정해준다.
    await addDoc(collection(dbService, "todos"), newTodo);
    // 배열로 [] 감싸주는거 잊지말긔!!!!!!!!!!!
    // setTodos([...todos, newTodo]);
    setText("");
  };

  const isDoneChange = async (id) => {
    // 1. id를 매개변수로 받는다.
    // 2. id에 해당하는 배열의 요소를 찾는다.
    // 3. 그 배열의 요소의 isDone 값을 토글링한 후에 setTodos.
    // const newTodos = [...todos];
    // const findInd = newTodos.findIndex((todo) => todo.id === id);
    // newTodos[findInd].isDone = !newTodos[findInd].isDone;
    // setTodos(newTodos);
    const idx = todos.findIndex((todo) => todo.id === id);
    await updateDoc(doc(dbService, "todos", id), {
      isDone: !todos[idx].isDone,
    });
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
        onPress: async () => {
          // const newTodos = todos.filter((todo) => todo.id !== id);
          // setTodos(newTodos);
          await deleteDoc(doc(dbService, "todos", id));
        },
      },
    ]);
  };

  // 메뉴바 부분에 cate바꿔주는것
  // AsyncStorage쓰려고 비동기로 만들기
  const setCateAction = async (cat) => {
    setCate(cat);
    // await AsyncStorage.setItem("category", cat);
    // category의 category부분을 받아온 cat으로 업데이트 해주는 것
    await updateDoc(doc(dbService, "category", "currentCategory"), {
      category: cat,
    });
  };

  // 버튼을 눌렀을때 isEdit의 상태를 바꿔주는 함수
  const setEdit = async (id) => {
    // const newTodos = [...todos];
    // const idx = newTodos.findIndex((todo) => todo.id === id);
    // newTodos[idx].isEdit = !newTodos[idx].isEdit;
    // setTodos(newTodos);
    const idx = todos.findIndex((todo) => todo.id === id);

    await updateDoc(doc(dbService, "todos", id), {
      isEdit: !todos[idx].isEdit,
    });
  };

  // 수정된 edit내용을 저장해주는 함수
  const editTodo = async (id) => {
    // const newTodos = [...todos];
    // const idx = newTodos.findIndex((todo) => todo.id === id);
    // // 해당 객체의 text부분을 바꿔주는 작업
    // newTodos[idx].text = editText;
    // newTodos[idx].isEdit = false;
    // setTodos(newTodos);
    await updateDoc(doc(dbService, "todos", id), {
      text: editText,
      isEdit: false,
    });
  };

  // 현재의 최신 todos를 AsyncStorage에 저장
  // todos가 바뀔때마다 saveTodos함수가 실행되면서, AsyncStorage에 데이터 저장된다.
  // useEffect(() => {
  //   const saveTodos = async () => {
  //     await AsyncStorage.setItem("todos", JSON.stringify(todos));
  //   };
  //   // todos에 아무 데이터도 없을땐 saveTodos를 할 필요가 없으니
  //   // if문으로 앞에서 걸러주기
  //   if (todos.length > 0) saveTodos();
  // }, [todos]);

  // 새로고침 발생시 AsyncStorage에서 todos 데이터와 category 데이터를 가져온다.

  // 컴포넌트생명주기함수 => 리액트의 사이드이팩트를 처리한다
  // 1) 사이드이팩트 : 외부 요인으로 인해서 내부의 state가 변경됐을때, 그것을 핸들링하기위해 useEffect를 사용
  // 2) app.js가 마운트되거나 언마운트될때 특정 로직을 실행시키고 싶어서
  // 함수형 컴포넌트
  useEffect(() => {
    // < 파이어베이스연결하기전 AsyncStorage로 한것 >----------------
    // const getData = async () => {
    //   const resp_todos = await AsyncStorage.getItem("todos"); // todos 배열
    //   // const resp_cat = await AsyncStorage.getItem("category"); // undefined / null
    //   // AsyncStorage에서 가져온 데이터를 state에 꽂아주는 작업
    //   setTodos(JSON.parse(resp_todos));
    //   console.log("getData실행");
    //   // setCate(resp_cat ?? "js");
    // };
    // getData();
    // < 파이어베이스연결하기전 AsyncStorage로 한것 >----------------
    // ----------------------------------------------
    // onSnapshot을 이용해서 todos의 변경이 생길때마다, todos콜랙션 안의
    // 모든 다큐먼트들을 불러와서 setTodos를 하기 위한 작업
    const q = query(
      collection(dbService, "todos"),
      orderBy("createdAt", "desc")
    );
    // 웹소켓 통신??
    onSnapshot(q, (snapshot) => {
      console.log("snapshot실행??");
      const newTodos = snapshot.docs.map((doc) => {
        const newTodo = {
          id: doc.id,
          ...doc.data(), // doc.data() : { text, createdAt, ...  }
        };
        return newTodo;
      });
      // 파베에서 뽑아온 newTodo를 state에 셋스테이트 해주깅
      setTodos(newTodos);
    });

    const getCategory = async () => {
      // Read (단일 데이터 읽기)
      const snapshot = await getDoc(
        doc(dbService, "category", "currentCategory")
      );
      console.log("스냅샷.id:", snapshot.id); //결과값 : currentCategory
      console.log("스냅샷.data:", snapshot.data()); //결과값 : {"category": "js"}
      setCate(snapshot.data().category);
      console.log("cate:", cate);
    };
    getCategory();
    // return unSubscribe;
  }, []);

  // filteredTodos 여기엔 cate가 같은 애들만 담기니까
  // const filteredTodos = todos?.filter((item)=>item.cate=cate)
  // map을 돌리면, 이미 걸러져있으니 if문을 쓸필요 x

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {/* 메인페이지메뉴바3개 컴포넌트화*/}
      <Tabs setCateAction={setCateAction} cate={cate} />
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
          // 버튼이란게 없고, 엔터를 치면 addTodo가 되거찌
          onSubmitEditing={addTodo}
          onChangeText={setText}
          value={text}
        />
      </View>
      <Text>text:{text}</Text>
      <View style={Hr.View} />
      {/* ~~~~~~~~~~ 이 컴포넌트에서 cate에 해당하는 넘들을 걸러줌 ~~~~~~~~~~ */}
      <ScrollView>
        {/* filter를 쓰면 가벼워지는 이유??
        ㅋㅋㅋㅋㅋㅋㅋㅋㅋ
        */}
        {/* 함수형 프로그래밍은 로직을 최대한 다른 함수에서 실행하는걸 좋아한다?? */}
        {/* 함수형 프로그래밍에서는 하나의 함수는 하나의 로직만 작동하게 하는게 베스트다 */}
        {todos.map((todo) => {
          if (cate === todo.cate) {
            return (
              // map을 돌렸기때문에, key값을 부여해주기
              <Todo
                key={todo.id}
                todo={todo}
                setEdit={setEdit}
                deleteTodo={deleteTodo}
                isDoneChange={isDoneChange}
                editTodo={editTodo}
                setEditText={setEditText}
              />
            );
          }
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

// 스타일 부분~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const InputText = styled.TextInput`
  width: 350px;
  height: 40px;
  border: 2px solid black;
  margin: 10px;
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
