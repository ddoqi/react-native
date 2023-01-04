import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native";
import styled from "@emotion/native";
// import { LinearGradient } from "expo-linear-gradient";
import Swiper from "react-native-swiper";
import { getImgPath } from "../util";
import TopSlide from "../components/TopSlide";
import MidSlide from "../components/MidSlide";
import BottomSlide from "../components/BottomSlide";

//https://api.themoviedb.org/3/movie/now_playing?api_key=968fea3df66896d51a8ee0068c075085&language=en-US&page=1
// 서버에서 어떤 데이터 가져올지 미리 메모해놓기
// backdrop_path : 백그라운드 이미지
// id
// overview
// poster_path
// title
// vote_average
//release_date

export default function Movies({ navigation: { navigate } }) {
  const [nowPlayings, setNowPlayings] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [Upcoming, setUpcoming] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const BASE_URL = "https://api.themoviedb.org/3/movie";
  const API_KEY = "968fea3df66896d51a8ee0068c075085";

  const getNowPlayings = async () => {
    // 받아온 res는 우리가 원하는 json객체가 아닐거고, json()으로 변경해주기
    // 그 res에서 우리는 'result'가 필요
    const { results } = await fetch(
      `${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    ).then((res) => res.json());
    console.log("results", results);
    setNowPlayings(results);
    // 결과값을 잘 받아왔으니, isLoading이 false가 되는 것
  };
  const getTopRated = async () => {
    const { results } = await fetch(
      `${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    ).then((res) => res.json());
    setTopRated(results);
  };

  const getUpcoming = async () => {
    const { results } = await fetch(
      `${BASE_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    ).then((res) => res.json());
    setUpcoming(results);
  };

  // async의 리턴값은 항상 프로미스다.
  const getData = async () => {
    // Promise.all는 배열을 받고,각 배열의 요소는 Promise를 받는다
    // Promise.all : 배열 안의 모든 함수가 끝이나야 그제서야 리턴값을 주는것
    // getNowPlayings(),getTopRated(),getUpcoming() 이 함수들 자체가
    // async 함수니까, 저 함수가 실행된 리턴값 역시 'promise'고
    // 그렇기 때문에 Promise.all의 배열 안에 들어가기 적합한 값이라는 것
    await Promise.all([getNowPlayings(), getTopRated(), getUpcoming()]);
    setIsLoading(false);
  };

  const onRefresh = async () => {
    // clg라고 치면 콘솔로그 나오넹 ㄷ ㄷ
    console.log("리프레쉬가 일어나땅ㅎ,ㅎ");
    // true면 계속 빙글빙글 로딩이됌
    setIsRefreshing(true);
    await getData(); //3개 함수 get 다 받아오는것
    setIsRefreshing(false);
  };

  useEffect(() => {
    getData();
  }, []);

  // loading중일때
  // isLoading가 true라면 ActivityIndicator를 띄울것
  // 아래 찐return말고
  if (isLoading) {
    // ActivityIndicator가 로딩중을 띄워줌
    return (
      <Loader>
        <ActivityIndicator />
      </Loader>
    );
  }

  return (
    <View>
      <Text>Movies</Text>

      {/* data: 어떤 데이터 뽑을건지 */}
      {/* renderItem : 기존 map으로 뽑았던 콜백함수 +) {}객체로 감싸주고, item이라고 받아야 함*/}
      <FlatList
        // scrollview와 다르게 onRefresh만 넣어줘도
        // 알아서 비활성화됏다고, onRefresh되면 활성화된다.
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <>
            <Swiper height="100%" showsPagination={false} autoplay loop>
              {nowPlayings.map((movie) => (
                <TopSlide movie={movie} key={movie.id} />
              ))}
            </Swiper>
            <MidKingView>
              <MidTopTitle>
                <Text>Top Rated Movies</Text>
              </MidTopTitle>
              <FlatList
                contentContainerStyle={{ paddingHorizontal: 10 }}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={topRated}
                renderItem={({ item }) => <MidSlide movie={item} />}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={<View style={{ width: 10 }} />}
              />
            </MidKingView>
            <BottomTopTitle>
              <Text>Upcoming Movies</Text>
            </BottomTopTitle>
          </>
        }
        data={Upcoming}
        renderItem={({ item }) => <BottomSlide movie={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={<View style={{ height: 10 }} />}
      />
      {/* <KingScrollView
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => {
              onRefresh();
            }}
          />
        }
      >
      </KingScrollView> */}
    </View>
  );
}

// ~~~~~~~~~~~~~~~~~~~~~~~  << css부분 >> ~~~~~~~~~~~~~~~~~~₩

const KingScrollView = styled.ScrollView``;
// Mid 부분~~
const MidScrollView = styled.ScrollView``;

const MidKingView = styled.View`
  border: 1px solid black;
  margin-top: 5px;
  height: 230px;
`;

const MidTopTitle = styled.View`
  border: 1px solid blue;
`;
const MidContentKingView = styled.View`
  border: 1px solid red;
  flex-direction: row;
`;
// bottom 부분~~~~~~

const BottomScrollView = styled.ScrollView``;

const BottomKingView = styled.View``;

const BottomTopTitle = styled.View``;

const BottomContentKingView = styled.View`
  border: 2px solid blue;
  flex-direction: column;
`;

// ~~~로딩중~~~
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

//    {/* Mid 부분 */}
//    <MidKingView>
//    <MidTopTitle>
//      <Text>Top Rated Movies</Text>
//    </MidTopTitle>
//    {/*  ScrollView를 안쓰고, FlatList로 리팩토링하는 이유? */}
//    {/* ScrollView는 모든 자식컴포넌트를 렌더링하는데 */}
//    {/* FlatList는 화면에 보여지는 것만 신경쓴다. */}
//    {/* FlatList는 자체에 map이 내장되어 있지만, key대신 keyExtractor를 지정해줘야 한다 */}
//    <FlatList
//      // ItemSeparatorComponent={<View style={{ width: 10 }} />}
//      contentContainerStyle={{ paddingHorizontal: 20 }}
//      horizontal
//      showsHorizontalScrollIndicator={false}
//      data={topRated}
//      renderItem={({ item }) => <MidSlide movie={item} />}
//      keyExtractor={(item) => item.id}
//    />
//    {/* <MidScrollView horizontal={true}>
//      <MidContentKingView>
//        {topRated.map((movie) => (
//          <MidSlide movie={movie} key={movie.id} />
//        ))}
//      </MidContentKingView>
//    </MidScrollView> */}
//  </MidKingView>

// {/* Bottom 부분 */}
// {/* <View>
//   <BottomScrollView>
//     <BottomKingView>
//       <BottomTopTitle>
//         <Text>Upcoming Movies</Text>
//       </BottomTopTitle>
//       <BottomContentKingView>
//         {Upcoming.map((movie) => (
//           <BottomSlide movie={movie} key={movie.id} />
//         ))}
//       </BottomContentKingView>
//     </BottomKingView>
//   </BottomScrollView>
// </View> */}

//-------------------------주석뺄라고 아래
//   {/* Top 부분 */}
//   <Swiper height="100%" showsPagination={false} autoplay loop>
//   {nowPlayings.map((movie) => (
//     <TopSlide movie={movie} key={movie.id} />
//   ))}
// </Swiper>

// {/* Mid 부분 */}
// <MidKingView>
//   <MidTopTitle>
//     <Text>Top Rated Movies</Text>
//   </MidTopTitle>
//   <FlatList
//     // ItemSeparatorComponent={<View style={{ width: 10 }} />}
//     contentContainerStyle={{ paddingHorizontal: 20 }}
//     horizontal
//     showsHorizontalScrollIndicator={false}
//     data={topRated}
//     renderItem={({ item }) => <MidSlide movie={item} />}
//     keyExtractor={(item) => item.id}
//   />
// </MidKingView>

//       <BottomTopTitle>
//         <Text>Upcoming Movies</Text>
//       </BottomTopTitle>
