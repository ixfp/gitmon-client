"use client"
import { useState } from 'react';

import MarkdownRenderer from '@components/MarkdownRenderer';
import { Textarea } from '@components/ui/textarea';

export default function PostForm() {
  const tempContent = `## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Strikethrough

~one~ or ~~two~~ tildes.

## Bold
**굵 다**

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |
| 1 | left | right | center |
| 2 | left | right | center |

## Tasklist

- [ ] to do
- [x] done

## Unordered List
- hi
- bye

## Ordered List
1. Coding
2. Sleep

## Seperator
brbr

---
---

## Code Block

\`\`\` javascript
const temp = 10

console.log(temp)
\`\`\`


\`temp.temp.temptemp\`

`;

  const [content, setContent] = useState<string>(tempContent);
  return (
    <div className='h-dvh flex'>
      <Textarea
        className="flex-1 rounded-none resize-none"
        placeholder="Write your Markdown here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className='flex-1 overflow-y-scroll p-2'>
        <MarkdownRenderer markdown={content} />
      </div>
    </div>
  );
}
