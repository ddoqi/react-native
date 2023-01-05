import React from "react";
import styled from "@emotion/native";
import Vote from "./Vote";
import { useNavigation } from "@react-navigation/native";

// review는 Detail에서 받아왔었음.
// review를 또 ReviewDetail에 보내주는것
export default function ReviewCard({ review }) {
  const { navigate } = useNavigation();
  const goToReview = () => {
    navigate("ReviewDetail", {
      review,
      from: "Detail",
    });
  };

  return (
    <Column onPress={goToReview}>
      <AbovePart>
        <ReviewDate>
          {new Date(review.createdAt).toLocaleDateString("kr")}
        </ReviewDate>
        <ReviewTitle>{review.title}</ReviewTitle>
        <ReviewContents numberOfLines={5}>{review.contents}</ReviewContents>
      </AbovePart>
      <Vote vote_average={review.rating} />
    </Column>
  );
}

const Reviews = styled.ScrollView``;
const Column = styled.TouchableOpacity`
  justify-content: space-between;
  border-width: 1px;
  width: 150px;
  border-radius: 10px;
  padding: 10px;
  height: 200px;
`;
const AbovePart = styled.View``;
const ReviewDate = styled.Text`
  margin-bottom: 10px;
`;
const ReviewTitle = styled.Text`
  margin-bottom: 10px;
`;
const ReviewContents = styled.Text`
  line-height: 18px;
`;
