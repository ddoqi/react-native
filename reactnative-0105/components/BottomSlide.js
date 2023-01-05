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

export default function BottomSlide({ movie }) {
  return (
    <BottomContentOneView>
      <BottomOneImg
        source={{
          uri: getImgPath(movie.poster_path),
        }}
      />
      <BottomOneContent>
        <View>
          <Text>{movie.title}</Text>
          <Text>{movie.release_date}</Text>
          <Text>
            {movie.overview.slice(0, 150)}
            {movie.overview.length > 120 && "..."}
          </Text>
        </View>
      </BottomOneContent>
    </BottomContentOneView>
  );
}

const BottomContentOneView = styled.View`
  /* margin: 10px; */
  border: 1px solid green;
  flex-direction: row;
`;

const BottomOneImg = styled.Image`
  width: 80px;
  height: 120px;
`;

const BottomOneContent = styled.View`
  border: 1px solid red;
  margin-left: 10px;
  width: 300px;
  flex-direction: row;
  align-items: center;
`;
