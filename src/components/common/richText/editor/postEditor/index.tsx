'use client';

import { useState } from 'react';
import type { JSONContent } from '@tiptap/react';
import EditorBase from '../editorBase';

export default function PostEditor() {
  const [content, setContent] = useState<JSONContent>({
    type: 'doc',
    content: [{ type: 'paragraph', content: [] }],
  });

  return (
    <>
      <EditorBase
        value={content}
        onChange={setContent}
        borderRadius={0}
        height={500}
        placeholder='Nhập nội dung bài viết'
      />
      {/* <pre>{JSON.stringify(content, null, 2)}</pre> */}
    </>
  );
}
