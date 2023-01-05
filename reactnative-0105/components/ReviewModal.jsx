import { useState } from "react";
import styled from "@emotion/native";
import { addDoc, collection } from "firebase/firestore";
import { Modal } from "react-native";
import { Rating } from "react-native-ratings";
import { authService, dbService } from "../firebase";
import { FlatList } from "react-native";

export default function ReviewModal({ isOpenModal, setIsOpenModal, movieId }) {
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [ratings, setRatings] = useState(0);

  //받아온 평점을  setRatings시키게 세팅해놈
  const getRatings = (rating) => {
    console.log("rating에는 뭐가 담겨?", rating);
    setRatings(rating);
  };

  const addReview = async () => {
    await addDoc(collection(dbService, "reviews"), {
      title: modalTitle,
      contents: modalContent,
      createdAt: Date.now(),
      rating: ratings,
      // userId를 authService.currentUser로 설정해놔야 나중에 내리뷰만 불러오기가 가능하것지
      userId: authService.currentUser?.uid,
      movieId,
    });
    setIsOpenModal(false);
    setModalTitle("");
    setModalContent("");
    setRatings(0);
  };
  return (
    // isOpenModal이 true 일때만 보이게 하는 것
    // isOpenModal을 true로 만들어주는 작업은 Details에서 add버튼 누를때 변경되었다.
    // transparent를 제거하면 backdrop부분이 하얗게 보여짐
    // animationType에는 다양한 효과가 있음 fade는 떠오르기 효과됌
    <Modal visible={isOpenModal} transparent animationType="slide">
      {/* 모달창 뒤의 배경부분 */}
      <Backdrop>
        {/* 모달창 */}
        <Dialog>
          <InputWrapper>
            <ModalTitle>평가</ModalTitle>
            <Rating
              startingValue={0}
              style={{
                alignItems: "flex-start",
              }}
              // onFinishRating을 하면 getRatings 함수가 실행됌
              // onFinishRating는 Gives you the final rating value as a whole number
              onFinishRating={getRatings}
              ratingCount={10}
              imageSize={20}
              tintColor="#d2dae2"
            />
            <ModalTitle>제목</ModalTitle>
            <TitleInput
              value={modalTitle}
              onChangeText={(text) => setModalTitle(text)}
            />
            <ModalTitle>내용</ModalTitle>
            <ContentInput
              textAlignVertical="top"
              value={modalContent}
              onChangeText={(text) => setModalContent(text)}
              multiline
              maxLength={300}
            />
          </InputWrapper>
          <Row style={{ justifyContent: "space-between" }}>
            <ModalBtn onPress={() => setIsOpenModal(false)} title="Cancel" />
            <ModalBtn
              // 모든 버튼이 false여야지, 버튼부분이 활성화가 되도록 세팅해놈
              disabled={!ratings || !modalTitle || !modalContent}
              onPress={addReview}
              title="Add Review"
            />
          </Row>
        </Dialog>
      </Backdrop>
    </Modal>
  );
}

const TitleInput = styled.TextInput`
  padding: 10px;
  background-color: white;
  border-radius: 5px;
`;
const ContentInput = styled(TitleInput)`
  min-height: 100px;
`;
const ModalBtn = styled.Button``;
const InputWrapper = styled.View``;
const AddButton = styled.Button``;

const Backdrop = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Dialog = styled.KeyboardAvoidingView`
  width: 80%;
  height: 70%;
  padding: 20px;
  justify-content: space-between;
  border-radius: 5px;
  background-color: green;
`;
const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: black;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const Row = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 10px;
`;
