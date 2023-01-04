import React, { useEffect, useState } from "react";
import { ActivityIndicator, Linking, StyleSheet } from "react-native";
import styled from "@emotion/native";

import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { getImgPath } from "../util";

export default function Detail({
  navigation: { navigate },
  route: {
    params: { movieId },
  },
}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_KEY = "968fea3df66896d51a8ee0068c075085";
  const BASE_URL = "https://api.themoviedb.org/3/movie";
  const getDetail = async () => {
    const response = await fetch(
      `${BASE_URL}/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
    ).then((res) => res.json());

    setData(response);
    setIsLoading(false);
  };

  const openYoutube = async (key) => {
    const url = `https://www.youtube.com/watch?v=${key}`;
    await Linking.openURL(url);
  };

  useEffect(() => {
    getDetail();
  }, []);

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator />
      </Loader>
    );
  }

  return (
    <Container>
      <View>
        <BackdropImg
          style={StyleSheet.absoluteFill}
          source={{ uri: getImgPath(data.backdrop_path) }}
        />
        <LinearGradient
          style={StyleSheet.absoluteFill}
          colors={["transparent", "black"]}
        />
        <Title>{data.title}</Title>
      </View>
      <Overview>{data.overview}</Overview>
      <YoutubeList>
        {/* date?.vidieo?.results 라고 쓴 이유?? */}
        {/* ?. : undefined여도 에러가 나지 않으면서 undefined를 반환 */}
        {/* ?. 는 존재하지 않아도 괜찮은 녀석들한테만 써야한다. */}
        {/* ?? : let choose = a ?? b */}
        {/* a가 널이나 언디파인드면 뒤를 선택해라 */}
        {data?.videos?.results.map((video) => (
          <Row key={video.key} onPress={() => openYoutube(video.key)}>
            <AntDesign name="youtube" size={24} />
            <VideoName>{video.name}</VideoName>
          </Row>
        ))}
      </YoutubeList>
      <SectionTitle>Reviews</SectionTitle>
      <AddReview onPress={() => {}}>
        <TempText>Add Review</TempText>
      </AddReview>
    </Container>
  );
}
// 로딩중 똥글뱅이 화면 전체 차지하게 해주려고
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Container = styled.ScrollView``;
const View = styled.View`
  height: 400px;
  justify-content: flex-end;
`;
const BackdropImg = styled.Image`
  width: 100%;
  flex: 1;
`;
const Title = styled.Text`
  color: white;
  font-size: 30px;
  font-weight: 600;
  margin-left: 20px;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.upcomingText};
  font-size: 15px;
  font-weight: 400;
  padding: 20px;
  line-height: 20px;
`;
const Row = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 10px;
`;
const VideoName = styled.Text`
  color: ${(props) => props.theme.upcomingText};
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin-left: 10px;
`;
const YoutubeList = styled.View`
  padding-left: 20px;
  padding-right: 20px;
`;

const SectionTitle = styled.Text`
  color: ${(props) => props.theme.upcomingText};
  font-size: 30px;
  margin-top: 20px;
  margin-left: 20px;
  margin-bottom: 20px;
`;
const AddReview = styled.TouchableOpacity`
  margin-left: 20px;
  margin-right: 20px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border-width: 1px;
  align-items: center;
  border-color: ${(props) => props.theme.upcomingText};
`;
const TempText = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.upcomingText};
`;

const HSeprator = styled.View`
  width: 10px;
`;
