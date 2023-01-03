import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "@emotion/native";

const SectionTitle = styled.Text`
  font-size: 30px;
  color: ${(props) => props.theme.title};
`;

export default function Moives({ navigation: { navigate } }) {
  return (
    <View>
      <SectionTitle>Movies</SectionTitle>
      <TouchableOpacity
        onPress={() =>
          navigate("Stacks", { screen: "one", params: { id: 123 } })
        }
      >
        <Text>go to one screen</Text>
      </TouchableOpacity>
    </View>
  );
}
