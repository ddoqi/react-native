import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from "react-native";
import styled from "@emotion/native";

export default function Movies({ navigation: { navigate } }) {
  return (
    <View>
      <Text>Movies</Text>
      <TouchableOpacity onPress={() => navigate("Stacks", { screen: "one" })}>
        <Text>Stack에 있는 one스크린으로 이동</Text>
      </TouchableOpacity>

      <KingScrollView>
        {/* Top 부분 */}
        <TopKingView>
          <TopBackImg
            source={require("../pictures/test1.png")}
            resizeMode="stretch"
          >
            <TopMidView>
              <TopMidImg source={require("../pictures/test1.png")} />
              <TopMidTextAreaView>
                <View>
                  <Text>Top 쿼카 : 햅삐</Text>
                  <Text>
                    영화 설명 주구장창 랄라라라라랄라라ㅏ라라랄라ㅏㄹ라{" "}
                  </Text>
                </View>
              </TopMidTextAreaView>
            </TopMidView>
          </TopBackImg>
        </TopKingView>
        {/* Mid 부분 */}
        <MidKingView>
          <MidTopTitle>
            <Text>Top Rated Movies</Text>
          </MidTopTitle>
          <MidScrollView horizontal={true}>
            <MidContentKingView>
              {/* 개별 영화 시작 */}
              <MidContentOneView>
                <MidOneImg source={require("../pictures/test1.png")} />
                <MidMovieContent>
                  <View>
                    <Text>⭐️ 8.7/10 </Text>
                    <Text>영화 이름</Text>
                  </View>
                </MidMovieContent>
              </MidContentOneView>
              {/* 개별영화 끝 */}
              {/* 개별 영화 시작 */}
              <MidContentOneView>
                <MidOneImg source={require("../pictures/test1.png")} />
                <MidMovieContent>
                  <View>
                    <Text>⭐️ 8.7/10 </Text>
                    <Text>영화 이름</Text>
                  </View>
                </MidMovieContent>
              </MidContentOneView>
              {/* 개별영화 끝 */}
              {/* 개별 영화 시작 */}
              <MidContentOneView>
                <MidOneImg source={require("../pictures/test1.png")} />
                <MidMovieContent>
                  <View>
                    <Text>⭐️ 8.7/10 </Text>
                    <Text>영화 이름</Text>
                  </View>
                </MidMovieContent>
              </MidContentOneView>
              {/* 개별영화 끝 */}
              {/* 개별 영화 시작 */}
              <MidContentOneView>
                <MidOneImg source={require("../pictures/test1.png")} />
                <MidMovieContent>
                  <View>
                    <Text>⭐️ 8.7/10 </Text>
                    <Text>영화 이름</Text>
                  </View>
                </MidMovieContent>
              </MidContentOneView>
              {/* 개별영화 끝 */}
              {/* 개별 영화 시작 */}
              <MidContentOneView>
                <MidOneImg source={require("../pictures/test1.png")} />
                <MidMovieContent>
                  <View>
                    <Text>⭐️ 8.7/10 </Text>
                    <Text>영화 이름</Text>
                  </View>
                </MidMovieContent>
              </MidContentOneView>
              {/* 개별영화 끝 */}
            </MidContentKingView>
          </MidScrollView>
        </MidKingView>
        {/* Bottom 부분 */}
        <View>
          <BottomScrollView>
            <BottomKingView>
              <BottomTopTitle>
                <Text>Upcoming Movies</Text>
              </BottomTopTitle>
              <BottomContentKingView>
                {/* Bottom 개별 영화 시작 */}
                <BottomContentOneView>
                  <BottomOneImg source={require("../pictures/test1.png")} />
                  <BottomOneContent>
                    <View>
                      <Text>영화 제목</Text>
                      <Text>영화 날짜</Text>
                      <Text>영화 Content</Text>
                    </View>
                  </BottomOneContent>
                </BottomContentOneView>
                {/* Bottom 개별 영화 끝 */}
                {/* Bottom 개별 영화 시작 */}
                <BottomContentOneView>
                  <BottomOneImg source={require("../pictures/test1.png")} />
                  <BottomOneContent>
                    <View>
                      <Text>영화 제목</Text>
                      <Text>영화 날짜</Text>
                      <Text>영화 Content</Text>
                    </View>
                  </BottomOneContent>
                </BottomContentOneView>
                {/* Bottom 개별 영화 끝 */}
                {/* Bottom 개별 영화 시작 */}
                <BottomContentOneView>
                  <BottomOneImg source={require("../pictures/test1.png")} />
                  <BottomOneContent>
                    <View>
                      <Text>영화 제목</Text>
                      <Text>영화 날짜</Text>
                      <Text>영화 Content</Text>
                    </View>
                  </BottomOneContent>
                </BottomContentOneView>
                {/* Bottom 개별 영화 끝 */}
                {/* Bottom 개별 영화 시작 */}
                <BottomContentOneView>
                  <BottomOneImg source={require("../pictures/test1.png")} />
                  <BottomOneContent>
                    <View>
                      <Text>영화 제목</Text>
                      <Text>영화 날짜</Text>
                      <Text>영화 Content</Text>
                    </View>
                  </BottomOneContent>
                </BottomContentOneView>
                {/* Bottom 개별 영화 끝 */}
                {/* Bottom 개별 영화 시작 */}
                <BottomContentOneView>
                  <BottomOneImg source={require("../pictures/test1.png")} />
                  <BottomOneContent>
                    <View>
                      <Text>영화 제목</Text>
                      <Text>영화 날짜</Text>
                      <Text>영화 Content</Text>
                    </View>
                  </BottomOneContent>
                </BottomContentOneView>
                {/* Bottom 개별 영화 끝 */}
              </BottomContentKingView>
            </BottomKingView>
          </BottomScrollView>
        </View>
      </KingScrollView>
    </View>
  );
}

const KingScrollView = styled.ScrollView``;

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
  background-color: green;
  margin-top: 150px;
  flex-direction: row;
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
`;

// mid 부분~~~~~~
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
const MidContentOneView = styled.View`
  border: 1px solid green;
  margin: 10px;
  height: 180px;
`;
const MidOneImg = styled.Image`
  width: 80px;
  height: 120px;
`;
const MidMovieContent = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

// bottom 부분~~~~~~

const BottomScrollView = styled.ScrollView``;

const BottomKingView = styled.View``;

const BottomTopTitle = styled.View``;

const BottomContentKingView = styled.View`
  border: 2px solid blue;
  flex-direction: column;
`;

const BottomContentOneView = styled.View`
  margin: 10px;
  border: 1px solid green;
  flex-direction: row;
`;

const BottomOneImg = styled.Image`
  width: 80px;
  height: 120px;
`;

const BottomOneContent = styled.View`
  border: 1px solid red;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;
