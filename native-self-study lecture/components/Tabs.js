import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";

export default function Tabs({ setCateAction, cate }) {
  return (
    <>
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
              backgroundColor: cate === "js" ? "lightblue" : "grey",
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
              backgroundColor: cate === "react" ? "lightblue" : "grey",
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
              backgroundColor: cate == "ct" ? "lightblue" : "grey",
            }}
          >
            <Text>Coding Test</Text>
          </TobButton>
        </TouchableOpacity>
      </View>
    </>
  );
}

const TobButton = styled.View`
  border: 1px solid black;
  width: 100px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;
