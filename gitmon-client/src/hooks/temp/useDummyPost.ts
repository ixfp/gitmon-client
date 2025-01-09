import { useQuery } from "@tanstack/react-query";
import postList from "../data/dummyList.json";

const fetchPosts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5초 딜레이
  return postList;
};

// React Query 훅
export const useDummyPosts = () => {
  return useQuery({ queryKey: ["postList"], queryFn: fetchPosts });
};
