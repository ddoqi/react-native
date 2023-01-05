import { getImgPath } from "../util";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import styled from "@emotion/native";

export default function MidSlide({ movie }) {
  return (
    <MidContentOneView>
      <MidOneImg
        source={{
          uri: getImgPath(movie.poster_path),
        }}
      />
      <MidMovieContent>
        <View>
          <Text>⭐️{movie.vote_average} /10 </Text>
          <Text>{movie.title}</Text>
        </View>
      </MidMovieContent>
    </MidContentOneView>
  );
}

const MidContentOneView = styled.View`
  border: 1px solid green;
  /* margin: 10px; */
  height: 180px;
  width: 110px;
  align-items: center;
`;
const MidOneImg = styled.Image`
  width: 80px;
  height: 120px;
`;
const MidMovieContent = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;
