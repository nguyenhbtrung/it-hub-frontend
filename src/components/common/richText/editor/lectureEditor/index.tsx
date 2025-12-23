'use client';

import { useState } from 'react';
import type { JSONContent } from '@tiptap/react';
import EditorBase from '../editorBase';

export default function LectureEditor() {
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
        height={600}
        placeholder='Nhập nội dung bài viết'
      />
    </>
  );
}
