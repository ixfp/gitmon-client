// lib/github.ts
import matter from "gray-matter";
import { Post, PostMeta } from "./types";

const GITHUB_REPO = "repo-md";
const BRANCH = "main";

export async function fetchPost(id: string, slug: string): Promise<Post> {
  // slug: "my-first-post" 형식으로 들어온다고 가정 (확장자 .md는 안 붙임)
  const fileName = `${slug}.md`;

  const fileUrl = `https://raw.githubusercontent.com/${id}/${GITHUB_REPO}/${BRANCH}/posts/${fileName}`;
  const res = await fetch(fileUrl);
  if (!res.ok) throw new Error(`Failed to fetch post: ${fileUrl}`);

  const rawMarkdown = await res.text();
  const { data, content } = matter(rawMarkdown) as unknown as {
    data: PostMeta;
    content: string;
  };

  return {
    content,
    ...data,
  };
}

async function parsePost(fileUrl: string): Promise<Post> {
  const res = await fetch(fileUrl);
  if (!res.ok) throw new Error(`Failed to fetch: ${fileUrl}`);

  const rawMarkdown = await res.text();
  const { data, content } = matter(rawMarkdown) as unknown as {
    data: PostMeta;
    content: string;
  };

  return { ...data, content };
}

export async function fetchPosts(id: string): Promise<Post[]> {
  const apiUrl = `https://api.github.com/repos/${id}/${GITHUB_REPO}/contents/posts`;
  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error("Failed to fetch post list.");

  const files: { name: string; download_url: string }[] = await res.json();

  const markdownFiles = files.filter((file) => file.name.endsWith(".md"));

  const posts = await Promise.all(
    markdownFiles.map((file) =>
      parsePost(file.download_url)
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
