import { useEffect } from "react";
import styled from "@emotion/native";
import { useColorScheme, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { authService } from "../firebase";

// Review 상세페이지는 params로 받아온 review 데이터를 그냥 그대로 뿌려주기만 할뿐임
export default function ReviewDetail({
  navigation,
  route: {
    params: { review, from },
  },
}) {
  // from값이 다른 이유 : 분기처리를 해야하기 때문
  console.log("어디서 왔니~.~ from :", from);
  const onEdit = () => {
    navigation.navigate("ReviewEdit", { review, from });
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: null,
      headerRight: () => {
        if (authService.currentUser) {
          return (
            <TouchableOpacity onPress={onEdit}>
              <AntDesign name="edit" size={24} />
            </TouchableOpacity>
          );
        }
      },
    });
  }, []);

  return (
    <Container>
      <SectionTitle>평점</SectionTitle>

      <Ratings>⭐️ {review.rating} / 10</Ratings>

      <SectionTitle>제목</SectionTitle>

      <Title>{review.title}</Title>

      <SectionTitle>내용</SectionTitle>

      <Content>{review.contents}</Content>
    </Container>
  );
}

export const Container = styled.ScrollView`
  padding: 20px;
`;

export const SectionTitle = styled.Text`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 15px;
`;

export const Ratings = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
`;
export const Title = styled.Text`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
`;
export const Content = styled.Text`
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
`;
