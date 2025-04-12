import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Typography } from "./ui/typography";

const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ ...props }) => (
          <Typography variant="h1" className="my-6" {...props} />
        ),
        h2: ({ ...props }) => (
          <Typography variant="h2" className="my-5" {...props} />
        ),
        h3: ({ ...props }) => (
          <Typography variant="h3" className="my-4" {...props} />
        ),
        p: ({ ...props }) => (
          <Typography variant="p" className="mt-4" {...props} />
        ),
        blockquote: ({ ...props }) => (
          <Typography variant="blockquote" {...props} />
        ),
        ul: ({ ...props }) => (
          <Typography variant="ul" className="my-3" {...props} />
        ),
        ol: ({ ...props }) => (
          <Typography variant="ol" className="my-3" {...props} />
        ),
        pre: ({ ...props }) => (
          <Typography variant="pre" className="my-4" {...props} />
        ),
        code: ({ ...props }) => <Typography variant="code" {...props} />,
        table: ({ ...props }) => (
          <Typography variant="table" className="my-4" {...props} />
        ),
        tr: ({ ...props }) => <Typography variant={"tr"} {...props} />,
        th: ({ ...props }) => <Typography variant={"th"} {...props} />,
        td: ({ ...props }) => <Typography variant={"td"} {...props} />,
        hr: ({ ...props }) => (
          <Typography variant="hr" className="my-6 opacity-50" {...props} />
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
