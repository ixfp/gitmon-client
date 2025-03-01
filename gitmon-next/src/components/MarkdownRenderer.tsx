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
            className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
          >
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2
            {...props}
            className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
          >
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3
            {...props}
            className="scroll-m-20 text-2xl font-semibold tracking-tight"
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
        ol: ({ children, ...props }) => (
          <ol className="list-decimal list-inside" {...props}>
            {children}
          </ol>
        ),
        ul: ({ children, ...props }) => (
          <ul className="list-disc list-inside" {...props}>
            {children}
          </ul>
        ),
        pre: ({children, ...props}) => (
          <pre
            className="bg-zinc-100 relative rounded bg-muted px-[0.3rem] my-2 py-[0.2rem] font-mono text-sm font-semibold" {...props}
          >{children}</pre>
        ),
        code: ({children, ...props}) => (
          <code 
            className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
            {...props}
              >
            {children}
          </code>
        ),
        hr: (...props) =>  <hr className='mb-6' {...props}/>
        
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
