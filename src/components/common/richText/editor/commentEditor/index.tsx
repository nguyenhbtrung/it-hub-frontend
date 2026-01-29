'use client';

import { Suspense, useState } from 'react';
import type { JSONContent } from '@tiptap/react';
import EditorBase from '../editorBase/minimal';

export default function CommentEditor() {
  const [content, setContent] = useState<JSONContent>({
    type: 'doc',
    content: [{ type: 'paragraph', content: [] }],
  });

  return (
    <Suspense>
      <EditorBase value={content} onChange={setContent} borderRadius={1} height={100} placeholder='Nhập bình luận...' />
    </Suspense>
  );
}
