import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children, ...props }) => (
          <h1
            {...props}
            className="flex items-center text-lg font-bold px-4 py-2 rounded-md"
          >
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2
            {...props}
            className="flex items-center text-lg font-bold px-4 py-2 rounded-md"
          >
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3
            {...props}
            className="flex items-center text-lg font-bold px-4 py-2 rounded-md"
          >
            {children}
          </h3>
        ),
        p: ({ children, ...props }) => (
          <p {...props} className="p-2">
            {children}
          </p>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
