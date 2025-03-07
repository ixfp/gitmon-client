import Markdown from "react-markdown";

import { fetchPost } from "@hooks/temp/useDummyData";

export default async function Post({
  params,
}: {
  params: Promise<{
    article_id: string;
  }>;
}) {
  const { article_id } = await params;
  const { title, content } = await fetchPost(article_id);

  return (
    <article className="prose dark:prose-invert">
      <h2 className="text-3xl font-bold">{title}</h2>
      <Markdown>{content}</Markdown>
    </article>
  );
}
