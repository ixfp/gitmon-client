import { Post } from "@lib/types";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_API_PATH;

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch(`${API_URL}/data/dummyList.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchPost = async (id: string): Promise<Post> => {
  try {
    const response = await fetch(`${API_URL}/data/dummyPost.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
};

export const fetchIntro = async (): Promise<{ intro: string }> => {
  try {
    const response = await fetch(`${API_URL}/data/dummyIntro.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching intro:", error);
    throw error;
  }
};
