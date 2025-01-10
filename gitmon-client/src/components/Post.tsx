import { useDummyData } from "@hooks/temp/useDummyData";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import type { Post } from "./types";

export default function Post() {
  const { article_id } = useParams();
  const { data, isLoading, error } = useDummyData("dummyList");

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading posts</div>;

  const { title, content } = data.find(
    (article: Post) => article.id === Number(article_id)
  );

  return (
    <article className="prose dark:prose-invert">
      <h2 className="text-3xl font-bold">{title}</h2>
      <Markdown>{content}</Markdown>
    </article>
  );
}
