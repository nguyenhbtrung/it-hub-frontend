'use client';

import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

export default function Page() {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const markdown = `
# Demo React Markdown + Highlight.js

Inline code: \`console.log("Hello " + name);\`

Block code:

\`\`\`javascript
function greet(name) {
  console.log("Hello " + name);
}
greet("Next.js");
\`\`\`
`;

  return (
    <main style={{ padding: '2rem' }}>
      <ReactMarkdown
        components={{
          code({ className, children, ...props }) {
            // Nếu có className (ví dụ "language-js") thì coi là block code
            const isBlock = className && className.startsWith('language-');
            return isBlock ? (
              <pre>
                <code className={className ? className : 'hljs'} {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code>{children}</code>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </main>
  );
}
