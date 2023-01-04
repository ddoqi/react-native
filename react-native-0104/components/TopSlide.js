import { getImgPath } from "../util";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";

export default function TopSlide({ movie }) {
  const { navigate } = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigate("Stacks", { screen: "Detail", params: { movieId: movie.id } });
      }}
    >
      <TopKingView>
        <TopBackImg
          // 로컬에 있는 이미지를 가져올땐 require을 쓰는 것
          // source={require("../pictures/test1.png")}
          // 웹상의 이미지 가져오려면
          // source={{uri : url주소}}
          source={{
            uri: getImgPath(movie.backdrop_path),
          }}
          resizeMode="stretch"
        >
          {/* LinearGradient : 사진 그라데이션 주는 것 */}
          {/* StyleSheet.absoluteFill : 배경이랑 구성요소를 겹치게해서 사용하고 싶을때 */}
          {/* absolute, left,right,top,bottom을 0으로 하면 겹치게 되는데 */}
          {/* 너무 번거로우니, 한방에 해줄수 있는게  absoluteFill*/}
          <LinearGradient
            colors={["transparent", "black"]}
            style={StyleSheet.absoluteFill}
          />

          <TopMidView>
            <TopMidImg
              source={{
                uri: getImgPath(movie.poster_path),
              }}
            />
            <TopMidTextAreaView>
              <View>
                <Text style={styles.topMidText}>{movie.title}</Text>
                <Text style={styles.topMidText}>
                  ⭐️ {movie.vote_average} /10
                </Text>
                <Text style={styles.topMidText}>
                  {movie.overview.slice(0, 150)}
                  {movie.overview.length > 150 && "..."}
                </Text>
              </View>
            </TopMidTextAreaView>
          </TopMidView>
        </TopBackImg>
      </TopKingView>
    </TouchableOpacity>
  );
}

const TopKingView = styled.View`
  border: 1px solid black;
  width: 100%;
  height: 300px;
`;

const TopBackImg = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const TopMidView = styled.View`
  border: 1px solid black;
  width: 100%;
  height: 150px;
  /* background-color: green; */
  flex-direction: row;
  margin-top: 150px;
`;

const TopMidImg = styled.Image`
  height: 130px;
  width: 100px;
  margin: 10px;
`;

const TopMidTextAreaView = styled.View`
  border: 1px solid black;
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 15px;
  margin-left: 5px;
`;

const styles = StyleSheet.create({
  topMidText: {
    color: "white",
  },
});
