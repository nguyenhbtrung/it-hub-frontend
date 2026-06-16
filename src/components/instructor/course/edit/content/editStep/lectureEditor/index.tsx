'use client';

import { Suspense, useState } from 'react';
import type { JSONContent } from '@tiptap/react';
import EditorBase from '@/components/common/richText/editor/editorBase';
import EditStepHeader from '../header';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNotification } from '@/contexts/notificationContext';
import { updateCourseTotalDurationAction } from '@/features/course';
import { getStepErrorMessage, updateStepAction } from '@/features/step';
import { getErrorMessage } from '@/lib/errors';

interface LectureEditorProps {
  step: any;
  courseId: string;
}

export default function LectureEditor({ step, courseId }: LectureEditorProps) {
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
    const res = await updateStepAction(step.id, payload);
    if (res.success) {
      notify('success', 'Lưu nội dung thành công', { vertical: 'top', horizontal: 'right' });
    } else {
      notify('error', getErrorMessage(res, getStepErrorMessage), { vertical: 'top', horizontal: 'right' });
    }
    await updateCourseTotalDurationAction(courseId);
  };

  return (
    <>
      <EditStepHeader title={step?.title || 'Không có tiêu đề'} onSave={handleSaveContent} />

      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 6 }}>
        <Container maxWidth='lg'>
          <Suspense>
            <EditorBase
              value={content}
              onChange={setContent}
              borderRadius={0}
              height={600}
              placeholder='Nhập nội dung bài giảng'
            />
          </Suspense>
        </Container>
      </Box>
    </>
  );
}
