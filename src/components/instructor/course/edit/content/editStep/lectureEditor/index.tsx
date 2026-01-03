'use client';

import { useState } from 'react';
import type { JSONContent } from '@tiptap/react';
import EditorBase from '@/components/common/richText/editor/editorBase';
import EditStepHeader from '../header';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { updateStep } from '@/services/step.service';
import { useNotification } from '@/contexts/notificationContext';

interface LectureEditorProps {
  step: any;
}

export default function LectureEditor({ step }: LectureEditorProps) {
  const [content, setContent] = useState<JSONContent>(step.content || {});
  const { notify } = useNotification();

  const handleSaveContent = async () => {
    if (!step?.id) {
      notify('error', 'Nội dung không tồn tại', { vertical: 'top', horizontal: 'right' });
      return;
    }
    const payload = {
      content: JSON.stringify(content),
    };
    const res = await updateStep(step.id, payload);
    if (res?.success) {
      notify('success', 'Lưu nội dung thành công', { vertical: 'top', horizontal: 'right' });
    } else {
      notify('error', 'Lưu nội dung thất bại, vui lòng thử lại.', { vertical: 'top', horizontal: 'right' });
    }
  };

  return (
    <>
      <EditStepHeader title={step?.title || 'Không có tiêu đề'} onSave={handleSaveContent} />

      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 6 }}>
        <Container maxWidth='lg'>
          <EditorBase
            value={content}
            onChange={setContent}
            borderRadius={0}
            height={600}
            placeholder='Nhập nội dung bài giảng'
          />
        </Container>
      </Box>
    </>
  );
}
