import { useQuery } from "@tanstack/react-query";

const fetchPosts = async (fetchTarget: string) => {
  try {
    const response = await fetch(`/data/${fetchTarget}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching intro text:", error);
  }
};

export const useDummyData = (fetchTarget: string) => {
  return useQuery({
    queryKey: ["duumyData", fetchTarget],
    queryFn: () => fetchPosts(fetchTarget),
  });
};
