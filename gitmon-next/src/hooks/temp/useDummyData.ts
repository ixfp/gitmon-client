import { Post } from "@components/Post/types";
import { useQuery } from "@tanstack/react-query";

export const fetchPosts = async (fetchTarget: string): Promise<Post[]> => {
  try {
    const response = await fetch(`/data/${fetchTarget}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchPost = async (id: string): Promise<Post> => {
  try {
    const response = await fetch(`http://localhost:3000/data/dummyPost.json`);
    const data = await response.json();
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
