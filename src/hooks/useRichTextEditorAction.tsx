import { FigureInsertDialog } from '@/components/common/richText/components/figureInsertDialog';
import { LinkInsertDialog } from '@/components/common/richText/components/linkInsertDialog';
import { VideoInsertDialog } from '@/components/common/richText/components/videoInsertDialog';
import { uploadFile } from '@/services/client/file.service';
import { getSession, signOut } from 'next-auth/react';
import { useCallback, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRichTextEditorActions(editor: any) {
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [openVideoDialog, setOpenVideoDialog] = useState(false);
  const [openLinkDialog, setOpenLinkDialog] = useState(false);

  const addFigure = useCallback(() => {
    setOpenImageDialog(true);
  }, []);

  const addVideo = useCallback(() => {
    setOpenVideoDialog(true);
  }, []);

  const setLink = useCallback(() => {
    setOpenLinkDialog(true);
  }, []);

  const handleUploadFile = async (file: File) => {
    try {
      const session = await getSession();
      if (!session?.accessToken) {
        alert('Vui lòng đăng nhập trước khi thực hiện đăng tải');
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
      uploadImage={handleUploadFile}
    />
  );

  const VideoDialogComponent = (
    <VideoInsertDialog
      open={openVideoDialog}
      onClose={() => setOpenVideoDialog(false)}
      editor={editor}
      uploadVideo={handleUploadFile}
    />
  );

  const LinkDialogComponent = (
    <LinkInsertDialog open={openLinkDialog} onClose={() => setOpenLinkDialog(false)} editor={editor} />
  );

  return { addFigure, setLink, FigureDialogComponent, addVideo, VideoDialogComponent, LinkDialogComponent };
}
