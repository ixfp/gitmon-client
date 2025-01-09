interface PostProps {
  title: string;
  content: string;
}

export default function Post({ title, content }: PostProps) {
  return (
    <article className="prose dark:prose-invert">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p>{content}</p>
    </article>
  );
}
