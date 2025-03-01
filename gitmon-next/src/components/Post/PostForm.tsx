"use client"
import { useState } from 'react';

import MarkdownRenderer from '@components/MarkdownRenderer';
import { Textarea } from '@components/ui/textarea';

export default function PostForm() {
  const tempContent = `## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |
| 1 | left | right | center |
| 2 | left | right | center |

## Tasklist

- [ ] to do
- [x] done

1. 

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
      <div className='flex-1 overflow-y-scroll'>
        <MarkdownRenderer markdown={content} />
      </div>
    </div>
  );
}
