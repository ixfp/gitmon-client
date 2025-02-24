"use client";
import Markdown from "react-markdown";

import Loading from "@components/Loading";
import { useDummyData } from "@hooks/temp/useDummyData";

import type { Post as PostType } from "@components/Post/types";

export default function Post({ article_id }: { article_id: string }) {
  const { data, isLoading, error } = useDummyData("dummyList");

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading posts</div>;

  const { title, content } = data.find(
    (article: PostType) => article.id === Number(article_id)
  );

  return (
    <article className="prose dark:prose-invert">
      <h2 className="text-3xl font-bold">{title}</h2>
      <Markdown>{content}</Markdown>
    </article>
  );
}
