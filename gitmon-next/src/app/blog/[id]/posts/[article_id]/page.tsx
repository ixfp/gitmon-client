import Markdown from "react-markdown";

import { fetchPost } from "@hooks/temp/useDummyData";

export default async function Post({ article_id }: { article_id: string }) {
  const { title, content } = await fetchPost(article_id);

  return (
    <article className="prose dark:prose-invert">
      <h2 className="text-3xl font-bold">{title}</h2>
      <Markdown>{content}</Markdown>
    </article>
  );
}
