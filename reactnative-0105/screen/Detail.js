import React, { useEffect, useState } from "react";
import { ActivityIndicator, Linking, StyleSheet } from "react-native";
import styled from "@emotion/native";

import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { getImgPath } from "../util";
import { useQuery } from "react-query";
import { getDetail } from "../api";
import ReviewModal from "../components/ReviewModal";
import { authService, dbService } from "../firebase";
import { FlatList } from "react-native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import ReviewCard from "../components/ReviewCard";

export default function Detail({
  navigation: { navigate },
  route: {
    params: { movieId },
  },
}) {
  // getDetail라는 함수가 실행됐을때, ["Detail", movieId] 이 쿼리키가 getDetail에 매개변수로
  // 넘어간다는 것
  // getDetail : 클릭한 영화 상세페이지 데이터 요청하는거(api.js에 있음)
  const { data, isLoading } = useQuery(["Detail", movieId], getDetail);

  const [reviews, setReviews] = useState([]);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleAdding = async () => {
    const isLogin = !!authService.currentUser;
    if (!isLogin) {
      navigate("Login");
      return;
    }
    setIsOpenModal(true);
  };

  const openYoutube = async (key) => {
    const url = `https://www.youtube.com/watch?v=${key}`;
    await Linking.openURL(url);
  };

  useEffect(() => {
    const q = query(
      collection(dbService, "reviews"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newReviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(newReviews);
    });
    return unsubscribe;
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
      <AddReview onPress={handleAdding}>
        <TempText>Add Review</TempText>
      </AddReview>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          marginBottom: 50,
          justifyContent: "flex-start",
        }}
        keyExtractor={(item) => item.id}
        horizontal
        data={reviews}
        ItemSeparatorComponent={HSeprator}
        renderItem={({ item }) => {
          if (item.movieId === movieId) {
            return <ReviewCard review={item} />;
          }
        }}
      />
      <ReviewModal
        movieId={movieId}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
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
`;
const TempText = styled.Text`
  font-size: 20px;
`;

const HSeprator = styled.View`
  width: 10px;
`;
