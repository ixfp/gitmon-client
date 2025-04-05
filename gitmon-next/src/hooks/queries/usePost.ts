import { useQuery } from "@tanstack/react-query";
import { fetchPost, fetchPosts, RepoInfo } from "@lib/github";
import { Post } from "@lib/types";

export function usePosts(repoInfo: RepoInfo) {
  return useQuery<Post[]>({
    queryKey: ["posts", repoInfo],
    queryFn: () => fetchPosts(repoInfo),
  });
}

export function usePost(fileUrl: string) {
  return useQuery<Post>({
    queryKey: ["post", fileUrl],
    queryFn: () => fetchPost(fileUrl),
    enabled: !!fileUrl, // URL이 없으면 fetch 하지 않도록
  });
}
