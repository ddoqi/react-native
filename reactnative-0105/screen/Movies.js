import React, { useState } from "react";
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
  Alert,
} from "react-native";
import styled from "@emotion/native";
import Swiper from "react-native-swiper";
import TopSlide from "../components/TopSlide";
import MidSlide from "../components/MidSlide";
import BottomSlide from "../components/BottomSlide";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { getNowPlayings, getTopRated, getUpcoming } from "../api";

export default function Movies({ navigation: { navigate } }) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  // 캐쉬메모리에 등재되어잇는 모든 쿼리키에 접근가능
  const queryClient = useQueryClient();

  // useQuery 부분~~~~~~
  const {
    data: nowPlayingData,
    isLoading: isLoadingNP,
    isRefetching,
  } = useQuery(["Movies", "NowPlaying"], getNowPlayings);
  console.log("isRefetching", isRefetching);

  const { data: topRatedData, isLoading: isLoadingTR } = useQuery(
    ["Movies", "TopRated"],
    getTopRated
  );

  useInfiniteQuery;
  const {
    data: upcomingData,
    isLoading: isLoadingUC,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(["Movies", "Upcoming"], getUpcoming, {
    // fetchNextPage 함수가 실행되면 getNextPageParam의 콜백함수가 먼저 실행된다.
    getNextPageParam: (lastPage) => {
      //  pageParam이 누적이 된다.
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
  });

  // upcomingData를 찍어보면 pageParam과 pages가 반환되는데
  // pageParam은 처음에 undefined가 찍힐거고
  // pages에 배열로 객체정보가 뜬다. (Pages안에 result있음)
  console.log("upcomingData:", upcomingData);

  // 3개 중에 하나라도 참이면 isLoading은 참일 것임
  const isLoading = isLoadingNP || isLoadingTR || isLoadingUC;

  const fetchMore = async () => {
    if (hasNextPage) {
      await fetchNextPage();
    }
  };
  // queryClient 모든 캐쉬메모리에 직접 접근할 수 있다.(App.js의 최상위에 있음)
  // refecthQueries는 쿼리키를 가지고있는 쿼리가있으면 그 패쳐함수를 다시 리패칭시키라는 의미
  const onRefresh = async () => {
    console.log("리프레쉬가 일어나땅ㅎ,ㅎ");
    setIsRefreshing(true);
    // await Promise.all([refetchNP(), refetchTR(), refetchUC()]);
    await queryClient.refetchQueries(["Movies"]);
    setIsRefreshing(false);
  };

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator />
      </Loader>
    );
  }

  return (
    <View>
      <Text>Movies</Text>

      <FlatList
        // fetchMore 실행을 1(전체페이지)만큼 전에 실행
        // 0.5로 해놓으면 절반 전에 fetchMore 실행
        // onEndReached의 디폴트는 끝에 도달햇을때임
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <>
            <Swiper height="100%" showsPagination={false} autoplay loop>
              {nowPlayingData.results?.map((movie) => (
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
                data={topRatedData.results}
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
        // flat() : 2차원 배열 껍데기 벗겨주는거
        data={upcomingData.pages.map((page) => page.results).flat()}
        renderItem={({ item }) => <BottomSlide movie={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={<View style={{ height: 10 }} />}
      />
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
