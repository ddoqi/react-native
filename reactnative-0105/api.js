// * api는 프로그램들이 서로 상호작용하는 것을 도와주는 매개체

import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { dbService } from "./firebase";

const BASE_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = "968fea3df66896d51a8ee0068c075085";

export const getNowPlayings = () =>
  fetch(
    `${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1`
  ).then((res) => res.json());

export const getTopRated = () =>
  fetch(`${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`).then(
    (res) => res.json()
  );

// 처음에 pageParam을 1로 바꿔줘야 한다.
export const getUpcoming = ({ pageParam = 1 }) =>
  fetch(
    `${BASE_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=${pageParam}`
  ).then((res) => res.json());

export const getDetail = (params) => {
  console.log("params", params);
  const [_, movieId] = params.queryKey;
  return fetch(
    `${BASE_URL}/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
  ).then((res) => res.json());
};

export const deleteReview = async (reviewId) => {
  await deleteDoc(doc(dbService, "reviews", reviewId));
};

export const editReview = async ({ reviewId, editingObj }) => {
  await updateDoc(doc(dbService, "reviews", reviewId), editingObj);
};
