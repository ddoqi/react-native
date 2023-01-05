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
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  //App.js 최상위에서도 QueryClientProvider로 전체 앱을 감쌌었음
  // useQueryClient : 캐쉬메모리에 등재되어잇는 모든 쿼리key에 접근가능
  const queryClient = useQueryClient();

  // useQuery 부분~~~~~~
  // api 통신부분들이 api.js에 빠져있고, getNowPlayings는 import를 해온거임
  // useQuery의 리턴값은 api의 성공여부, 실패여부, api return값을 포함한 객체
  // * api는 프로그램들이 서로 상호작용하는 것을 도와주는 매개체
  // useQuery가 뱉는 결과값에 data,isLoading,isRefetching 들이 있고
  // data에는 getNowPlayings가 뱉어낸 데이터가 담기고
  // isLoading 은 처음 국밥 갖다주는거고(수저세트도 갖다줘야됌) - 처음 데이터 갖다줄때
  // isfetching은 재주문할때 국밥만 갖다주는거 - 데이터를 다시 갖다줘야할때
  // ?? 그럼 isRefetching은 다시 fetching해줘야될때일듯??
  const {
    data: nowPlayingData,
    isLoading: isLoadingNP,
    isRefetching,
  } = useQuery(["Movies", "NowPlaying"], getNowPlayings);
  // useQuery(["Movies", "NowPlaying"],getNowPlayings)
  // NowPlaying이 쿼리key -> key는 배열로 써야한다.

  const { data: topRatedData, isLoading: isLoadingTR } = useQuery(
    ["Movies", "TopRated"],
    getTopRated
  );
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // useInfiniteQuery : 리액트쿼리는 리스트형 데이터를 요청하기 위해 useQuery의 유용한 버전인 인피니트쿼리를 지원한다.
  // fetchNextPage를 이용해 호출된 데이터는 배열의 가장 우측에 새롭게 담겨 전달받게 된다.
  // fetchNextPage를 한번 누를 경우 return 되는 데이터는 [ '5 data', '6 data' ]가 되는거
  // upcomingData를 찍어보면 알겠지
  const {
    data: upcomingData,
    isLoading: isLoadingUC,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(["Movies", "Upcoming"], getUpcoming, {
    // fetchNextPage 함수가 실행되면 getNextPageParam의 콜백함수가 먼저 실행된다.
    // lastPage : 서버에서 읽어온 데이터(페이지 정보)
    // 페이지정보에는 현재페이지, 마지막페이지정보가 담겨있다.
    // getNextPageParam는 불러올 데이터가 더 있는지 여부와 fetch할 정보를 결정할 때 사용할 수 있다.
    // getNextPageParam 함수가 undefined가 아닌 다른 값을 반환하면 hasNextPage는 true입니다.
    // ----------------------------------------
    // getNextPageParam : 다음 페이지에 있는 데이터를 조회해오는 함수
    // getNextPageParam가 실행되고, 얘가 값을 반환하면 hasNextPage가 true가 되면서
    // fetchNextPage함수가 실행된다.
    // lastPage는 useInfiniteQuery를 이용해 호출된 가장 마지막에 있는 페이지 데이터
    getNextPageParam: (lastPage) => {
      // pageParam이 누적이 된다.
      // pageParam은 useInfiniteQuery가 현재 어떤 페이지에 있는지를 확인할 수 있는 파라미터 값
      // pageParam의 기본 값은 undefined
      console.log("getNextPageParam 함수 실행(1)");
      console.log("lastPage:", lastPage);
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
  });

  // 🌼 useInfiniteQuery 의 원리 🌼
  // getNextPageParam가 실행되고 값이 있으면 hasNextPage가 true가 되는데
  // hasNextPage가 true가 되면 fetchNextPage() 함수가 실행되면서
  // hasNextPage를 통해 호출된 데이터는 배열의 가장 우측에 새롭게 담겨 전달된다.
  const fetchMore = async () => {
    if (hasNextPage) {
      console.log("fetchNextPage 함수 실행(2)");
      await fetchNextPage();
    }
  };
  // upcomingData를 찍어보면 pageParam과 pages가 반환되는데
  // pageParam은 처음에 undefined가 찍힐거고
  // pages에 배열로 객체정보가 뜬다. (Pages안에 result있음)
  console.log("upcomingData:", upcomingData);

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ?? setIsRefreshing는 굳이 왜하는거지??
  // ?? state안만들면, 인피니티스크롤 땡겨도 리액트가 못알아차려서 그런가??
  // queryClient 모든 캐쉬메모리에 직접 접근할 수 있다.(App.js의 최상위에 있음)
  // refecthQueries는 쿼리키를 가지고있는 쿼리가 있으면 그 패쳐함수를 다시 리패칭시키라는 의미
  const onRefresh = async () => {
    console.log("리프레쉬가 일어나땅ㅎ,ㅎ");
    setIsRefreshing(true);
    // await Promise.all([refetchNP(), refetchTR(), refetchUC()]);
    //refetchQuery는 useMutation의 옵션으로, 기존에 받아왔던 데이터가 변경 되었을 경우 최신 데이터로 다시 fetch 해주기 위해 사용한다.
    await queryClient.refetchQueries(["Movies"]);
    setIsRefreshing(false);
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // 로딩중이면 똥글뱅이 돌아감
  // Loader : 똥글뱅이 가운데배치시키려고
  // 3개 중에 하나라도 참이면 isLoading은 참일 것임
  // 머 하나라도 loading중이면 isLoading이 true가 되는 것
  const isLoading = isLoadingNP || isLoadingTR || isLoadingUC;
  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator />
      </Loader>
    );
  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  return (
    <View>
      <Text>Movies</Text>

      <FlatList
        // 인피니티스크롤
        // fetchMore 실행을 1(전체페이지)만큼 전에 실행
        // 0.5로 해놓으면 절반 전에 fetchMore 실행
        // onEndReached의 디폴트는 끝에 도달햇을때임
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        // ?? 이 state는 왜만들어준걸까?
        // ?? 리액트가 알아차릴수있도록 만들어줘야하는걸까??
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        // ListHeaderComponent : 데이터를 받아와 출력하는 곳 위에 보여줄 곳
        ListHeaderComponent={
          <>
            {/* ~~~~~~ Top부분 ~~~~~~~~~ */}
            <Swiper height="100%" showsPagination={false} autoplay loop>
              {nowPlayingData.results?.map((movie) => (
                <TopSlide movie={movie} key={movie.id} />
              ))}
            </Swiper>
            {/*~~~~~~~~~ Mid 부분~~~~~~~~~ */}
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
        // 왜 bottomslice만 renderItem로 빼준걸까??
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
