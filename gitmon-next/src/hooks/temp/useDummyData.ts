import { Post } from "@components/Post/types";
import { useQuery } from "@tanstack/react-query";

export const fetchPosts = async <T = Post>(
  fetchTarget: string
): Promise<T[]> => {
  try {
    const response = await fetch(`/data/${fetchTarget}.json`);
    const data: T[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchPost = async <T = Post>(id: string): Promise<T> => {
  try {
    const response = await fetch(`http://localhost:3000/data/dummyPost.json`);
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
};

export const useDummyData = (fetchTarget: string) => {
  return useQuery({
    queryKey: ["dummyData", fetchTarget],
    queryFn: () => fetchPosts(fetchTarget),
  });
};
