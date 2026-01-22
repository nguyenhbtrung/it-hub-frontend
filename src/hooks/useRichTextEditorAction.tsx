import { FigureInsertDialog } from '@/components/common/richText/components/figureInsertDialog';
import { VideoInsertDialog } from '@/components/common/richText/components/videoInsertDialog';
import { uploadFile } from '@/services/client/file.service';
import { getSession, signOut } from 'next-auth/react';
import { useCallback, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRichTextEditorActions(editor: any) {
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [openVideoDialog, setOpenVideoDialog] = useState(false);

  const addFigure = useCallback(() => {
    setOpenImageDialog(true);
  }, []);

  const addVideo = useCallback(() => {
    setOpenVideoDialog(true);
  }, []);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    try {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    } catch (e: any) {
      alert(e.message);
    }
  }, [editor]);

  const handleUploadImage = async (file: File) => {
    try {
      const session = await getSession();
      if (!session?.accessToken) {
        alert('');
        await signOut({ redirectTo: '/auth/login' });
        return { url: '', fileId: '' };
      }
      const res = await uploadFile(file, true, session?.accessToken);
      if (!res.success) {
        const err = res?.error;
        throw new Error(err?.message || 'Tải lên thất bại, vui lòng thử lại');
      }

      return {
        url: res?.data?.url || '',
        fileId: res?.data?.id || `${new Date().toISOString()}`,
        metadata: res?.data?.metadata,
      };
    } catch (error) {
      throw new Error('Tải lên thất bại, vui lòng thử lại');
    }
  };

  const FigureDialogComponent = (
    <FigureInsertDialog
      open={openImageDialog}
      onClose={() => setOpenImageDialog(false)}
      editor={editor}
      // uploadImage optional: (file) => upload to server and return URL
      uploadImage={handleUploadImage}
    />
  );

  const VideoDialogComponent = (
    <VideoInsertDialog
      open={openVideoDialog}
      onClose={() => setOpenVideoDialog(false)}
      editor={editor}
      uploadVideo={handleUploadImage}
    />
  );

  return { addFigure, setLink, FigureDialogComponent, addVideo, VideoDialogComponent };
}
