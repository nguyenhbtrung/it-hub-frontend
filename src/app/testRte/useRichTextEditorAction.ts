import { useCallback } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useRichTextEditorActions(editor: any) {
  const addFigure = useCallback(() => {
    const src = window.prompt('URL của hình ảnh:');
    const caption = window.prompt('Caption:');
    // const alt = window.prompt('Alt text (mô tả ảnh):');
    // const title = window.prompt('Tiêu đề ảnh:');
    // const width = window.prompt('Chiều rộng (px):');
    // const height = window.prompt('Chiều cao (px):');

    if (src) {
      editor
        .chain()
        .focus()
        .setFigure({
          src,
          caption,
        })
        .run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    try {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    } catch (e: any) {
      alert(e.message);
    }
  }, [editor]);

  return { addFigure, setLink };
}
