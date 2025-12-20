'use client';

import { useState } from 'react';
import RichTextEditor from './rte';
import type { JSONContent } from '@tiptap/react';
import { Button } from '@mui/material';

const saveContent = async (content: JSONContent) => {
  await fetch('/testRte/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  });
};

export default function Editor() {
  const [content, setContent] = useState<JSONContent>({
    type: 'doc',
    content: [{ type: 'paragraph', content: [] }],
  }); // JSON mặc định

  return (
    <>
      <RichTextEditor value={content} onChange={setContent} />
      <pre>{JSON.stringify(content, null, 2)}</pre> {/* hiển thị JSON */}
      <Button onClick={() => saveContent(content)}>Save</Button>
    </>
  );
}
