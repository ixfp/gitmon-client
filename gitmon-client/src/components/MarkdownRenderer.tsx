import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
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
        table: ({ children, ...props }) => (
          <table {...props} className="table-auto border-collapse border border-gray-400 w-full">
            {children}
          </table>
        ),
        th: ({ ...props }) => (
          <th {...props} className="border border-gray-400 bg-gray-200 px-4 py-2 text-left" />
        ),
        td: ({ ...props }) => (
          <td {...props} className="border border-gray-400 px-4 py-2" />
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
