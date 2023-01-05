import { useState, useEffect } from "react";
import styled from "@emotion/native";
import { Rating } from "react-native-ratings";
import { TouchableOpacity, useColorScheme } from "react-native";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { dbService } from "../firebase";
import { AntDesign } from "@expo/vector-icons";
import { Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useMutation } from "react-query";
import { deleteReview, editReview } from "../api";
import Loader from "../components/Loader";

export default function ReviewEdit({
  navigation,
  route: {
    params: { review, from },
  },
}) {
  const [ratings, setRatings] = useState(0);
  const [newTitle, setNewTitle] = useState("");
  const [newContents, setNewContents] = useState("");

  // ?? useMutation : 근데 왜 바로 deleteReview,editReview를 안쓰고 useMutation를 써야했던걸까??
  const { isLoading: isLoadingDeleting, mutate: removeReview } = useMutation(
    ["deleteReview", review.id],
    (body) => deleteReview(body),
    {
      onSuccess: () => {
        console.log("삭제성공");
      },
      onError: (err) => {
        console.log("err in delete:", err);
      },
    }
  );

  // useMutation훅의 mutate라는 함수를 임의로 reviseReview라는 별칭을 지어준 것
  //  useMutation는 총 3개의 인자를 받는다
  // 첫번째 인자로는 뮤테이션key를 받는다.
  // 두번째 인자로는 뮤테이션 함수를 받는다.
  // 세번째 인자는 옵션객체인데 뮤테이션이 성공적으로 이루어지면 onSuccess의 함수가 실행될거고
  // 실패하면 onError가 될거임
  const { isLoading: isLoadingEditing, mutate: reviseReview } = useMutation(
    ["editReview", review.id],
    // body : 데이터를 담아주는 애를 body라고 임의로 이름지으신듯
    // reviseReview가 실행될때  뮤테이션 함수가 실행되는것
    // reviseReview를 뮤테이션 함수라고 생각해도 됌(아래 함수)
    // reviseReview는 인자로 이 body값을 담아줘야하는 것
    (body) => editReview(body),
    {
      onSuccess: () => {
        console.log("수정성공");
      },
      onError: (err) => {
        console.log("err in edit:", err);
      },
    }
  );

  const onDelete = async () => {
    Alert.alert("리뷰 삭제", "정말 현재 리뷰를 삭제하시겠습니까?", [
      { text: "cancel", style: "destructive" },
      {
        text: "OK. Delete it.",
        onPress: async () => {
          try {
            // await deleteDoc(doc(dbService, "reviews", review.id));
            await removeReview(review.id);
            if (from === "Detail") {
              navigation.navigate("Detail", { movieId: review.movieId });
            } else if (from === "My") {
              // My에서 왔었으면, My로 다시 돌아가게 설정한 것
              navigation.navigate("Tabs", { screen: "My" });
            }
          } catch (err) {
            console.log("err:", err);
          }
        },
      },
    ]);
  };

  const onEditDone = () => {
    if (!ratings && !newTitle && !newContents) {
      // 입력값 3개 중 아무것도 입력없으면 그대로 원상복구
      alert("수정한 부분이 없습니다.");
      return;
    }

    // 입력값이 3개 중 하나라도 있으면 해당값만 patch할 수 있도록 객체 구성
    let editingObj = {};
    // Object.assign ?? 마치 배열에 push하듯이 담는 방식
    if (ratings) {
      Object.assign(editingObj, { rating: ratings });
    }
    if (newTitle) {
      Object.assign(editingObj, { title: newTitle });
    }
    if (newContents) {
      Object.assign(editingObj, { contents: newContents });
    }

    Alert.alert(
      "리뷰 수정",
      "이대로 리뷰 수정하시겠습니까? 입력한 부분만 수정됩니다.",
      [
        {
          text: "Cancel",
          style: "destructive",
        },
        {
          text: "OK. Edit it",
          onPress: async () => {
            try {
              // await updateDoc(doc(dbService, "reviews", review.id), editingObj);
              //reviseReview : 리뷰Id, editingOjb가 하나의 객체형태로 들어간다.
              // useMutation이라는 훅에서 뱉는 mutate함수이다.
              // useMutation ?? 리액트쿼리에 useMutation이 있는데
              // useQuery는 fetch db에 있는 데이터를 그대로 읽어오는 훅인데
              // db에 직접 뭔가 변경을 가하는것이 useMutation이다.
              // db에 있는 데이터를 추가,삭제,수정할때 사용하는 것
              //   이 reviseReview에 담겨가는 인자가 위에 설정한 곳의 'body'구나 라는 것을 알 수 있음
              await reviseReview({ reviewId: review.id, editingObj });
              setNewContents("");
              setNewTitle("");
              setRatings(0);
              // 수정해주는 작업이 모두 끝났으면, 왔던 곳으로 다시 돌아가게 해주려고 아래 if문을 넣어준 것
              // Detail에서부터 왔으면 ReviewDetail로 가고, 뒤로가기를 누르면 Detail이 나오도록
              if (from === "Detail") {
                navigation.reset({
                  index: 1,
                  routes: [
                    {
                      name: "Detail",
                      params: { movieId: review.movieId },
                    },
                    {
                      name: "ReviewDetail",
                      params: { review: { ...review, ...editingObj }, from },
                    },
                  ],
                });
              } else if (from === "My") {
                navigation.reset({
                  routes: [
                    {
                      name: "Tabs",
                      params: { screen: "My" },
                    },
                  ],
                });
              }
            } catch (err) {
              console.log("err:", err);
            }
          },
        },
      ]
    );
  };
  const getRatings = (rating) => {
    setRatings(rating);
  };

  const onChangeTitle = (text) => {
    setNewTitle(text);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return null;
      },
    });
  }, []);

  if (isLoadingDeleting || isLoadingEditing) {
    return <Loader />;
  }

  return (
    <Container>
      <EditButton
        disabled={!newContents && !newTitle && !ratings}
        onPress={onEditDone}
      >
        <BtnTitle disabled={!newContents && !newTitle && !ratings}>
          수정하기
        </BtnTitle>
      </EditButton>
      <EditButton onPress={onDelete}>
        <BtnTitle>삭제하기</BtnTitle>
      </EditButton>
      <SectionTitle>평점</SectionTitle>

      <Rating
        startingValue={review.rating}
        style={{
          alignItems: "flex-start",
          marginBottom: 20,
        }}
        onFinishRating={getRatings}
        ratingCount={10}
        imageSize={20}
      />

      <SectionTitle>제목</SectionTitle>

      <TitleEdit
        value={newTitle}
        placeholderTextColor="#d2dae2"
        onChangeText={onChangeTitle}
        placeholder={review.title}
        maxLength={30}
      />

      <SectionTitle>내용</SectionTitle>

      <ContentEdit
        textAlignVertical="top"
        value={newContents}
        onChangeText={(text) => setNewContents(text)}
        multiline
        maxLength={300}
        placeholderTextColor="#d2dae2"
        placeholder={review.contents}
      />
    </Container>
  );
}

const TitleEdit = styled.TextInput`
  width: 100%;
  background-color: white;
  margin-bottom: 20px;
  padding: 10px 15px;
`;
const ContentEdit = styled(TitleEdit)`
  min-height: 150px;
  margin-bottom: 50px;
`;

const Container = styled.ScrollView`
  padding: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const EditButton = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 15px;
  justify-content: center;
  align-items: center;
  border-width: 1px;

  border-radius: 10px;
  margin-bottom: 20px;
`;

const BtnTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
`;
