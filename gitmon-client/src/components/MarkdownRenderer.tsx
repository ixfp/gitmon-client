import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => (
          <h1
            {...props}
            className="flex items-center text-lg font-bold px-4 py-2 rounded-md"
          >
            {props.children}
          </h1>
        ),
        h2: ({ node, ...props }) => (
          <h2
            {...props}
            className="flex items-center text-lg font-bold px-4 py-2 rounded-md"
          >
            {props.children}
          </h2>
        ),
        h3: ({ node, ...props }) => (
          <h3
            {...props}
            className="flex items-center text-lg font-bold px-4 py-2 rounded-md"
          >
            {props.children}
          </h3>
        ),
        p: ({ node, ...props }) => (
          <p {...props} className="p-2">
            {props.children}
          </p>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
