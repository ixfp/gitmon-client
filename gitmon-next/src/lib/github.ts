import matter from "gray-matter";
import { Post, PostMeta } from "./types";
import { cookies } from "next/headers";

export interface RepoInfo {
  id: string;
  repo: string;
  branch?: string;
}

export async function fetchPost(fileUrl: string): Promise<Post> {
  const res = await fetch(fileUrl);
  if (!res.ok) throw new Error(`Failed to fetch: ${fileUrl}`);

  const rawMarkdown = await res.text();
  const { data, content } = matter(rawMarkdown) as unknown as {
    data: PostMeta;
    content: string;
  };

  return { ...data, content };
}

export async function fetchPosts({ id, repo }: RepoInfo): Promise<Post[]> {
  const apiUrl = `https://api.github.com/repos/${id}/${repo}/contents`;

  const token = (await cookies()).get("github_token")?.value;
  const headers = token
    ? {
        Authorization: `token ${token}`,
      }
    : undefined;

  const res = await fetch(apiUrl, {
    headers,
  });

  if (!res.ok) {
    const error = await res.json();

    if (res.status === 404 && error?.message === "This repository is empty.") {
      console.warn("Repo is empty. Returning empty posts array.");
      return [];
    }
    throw new Error(`Failed to fetch post list: ${error?.message}`);
  }

  const files: { name: string; download_url: string }[] = await res.json();

  const markdownFiles = files.filter((file) => file.name.endsWith(".md"));

  const posts = await Promise.all(
    markdownFiles.map((file) =>
      fetchPost(file.download_url)
        .then((post) => {
          return post;
        })
        .catch((err) => {
          console.error(`Error fetching ${file.name}:`, err);
          return null; // 실패 시 해당 게시글 제외
        })
    )
  );

  return posts
    .filter((post): post is Post => post !== null) // 에러 처리된 게시글 제외
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
}
