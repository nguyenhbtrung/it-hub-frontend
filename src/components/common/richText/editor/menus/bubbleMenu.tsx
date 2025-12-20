'use client';

import { useEditorState } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TitleIcon from '@mui/icons-material/Title';
import CodeIcon from '@mui/icons-material/Code';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import LinkIcon from '@mui/icons-material/Link';

import ButtonGroup from '@mui/material/ButtonGroup';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { useRichTextEditorActions } from '@/hooks/useRichTextEditorAction';

export default function CustomBubbleMenu({ editor }: { editor: any }) {
  if (!editor) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isUnderline: ctx.editor.isActive('underline') ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
        isLink: ctx.editor.isActive('link') ?? false,
      };
    },
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setLink } = useRichTextEditorActions(editor);

  return (
    <BubbleMenu editor={editor}>
      <Paper
        elevation={4}
        sx={{
          p: 1,
          borderRadius: 1,
          '& .MuiIconButton-root': {
            borderRadius: 0.5,
          },
        }}
      >
        <ButtonGroup size='small' sx={{ flexWrap: 'wrap', gap: 0.5 }}>
          <ToggleButtonGroup
            color='primary'
            size='small'
            exclusive
            value={editorState.isHeading1 ? 'h1' : editorState.isHeading2 ? 'h2' : editorState.isHeading3 ? 'h3' : null}
          >
            <ToggleButton
              value='h1'
              size='small'
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
              <TitleIcon fontSize='small' />
            </ToggleButton>
            <ToggleButton
              value='h2'
              size='small'
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              sx={{ color: editor.isActive('heading', { level: 2 }) ? 'primary.main' : 'text.default' }}
            >
              <TitleIcon fontSize='small' sx={{ fontSize: 14 }} />
            </ToggleButton>
            <ToggleButton
              value='h3'
              size='small'
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
              <TitleIcon fontSize='small' sx={{ fontSize: 12 }} />
            </ToggleButton>
          </ToggleButtonGroup>

          <IconButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editorState.canBold}
            color={editorState.isBold ? 'primary' : 'default'}
            sx={{ bgcolor: editorState.isBold ? 'hero.light' : 'transparent' }}
            size='small'
          >
            <FormatBoldIcon fontSize='small' />
          </IconButton>

          <IconButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editorState.canItalic}
            color={editorState.isItalic ? 'primary' : 'default'}
            sx={{ bgcolor: editorState.isItalic ? 'hero.light' : 'transparent' }}
            size='small'
          >
            <FormatItalicIcon fontSize='small' />
          </IconButton>

          <IconButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editorState.canUnderline}
            color={editorState.isUnderline ? 'primary' : 'default'}
            sx={{ bgcolor: editorState.isUnderline ? 'hero.light' : 'transparent' }}
            size='small'
          >
            <FormatUnderlinedIcon fontSize='small' />
          </IconButton>

          <IconButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            color={editorState.isBulletList ? 'primary' : 'default'}
            sx={{ bgcolor: editorState.isBulletList ? 'hero.light' : 'transparent' }}
            size='small'
          >
            <FormatListBulletedIcon fontSize='small' />
          </IconButton>

          <IconButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            color={editorState.isOrderedList ? 'primary' : 'default'}
            sx={{ bgcolor: editorState.isOrderedList ? 'hero.light' : 'transparent' }}
            size='small'
          >
            <FormatListNumberedIcon fontSize='small' />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            color={editorState.isBlockquote ? 'primary' : 'default'}
            sx={{ bgcolor: editorState.isBlockquote ? 'hero.light' : 'transparent' }}
            size='small'
          >
            <FormatQuoteIcon fontSize='small' />
          </IconButton>
          <Divider orientation='vertical' variant='middle' flexItem />
          <IconButton
            onClick={setLink}
            color={editorState.isLink ? 'primary' : 'default'}
            sx={{ bgcolor: editorState.isLink ? 'hero.light' : 'transparent' }}
            size='small'
          >
            <LinkIcon fontSize='small' />
          </IconButton>

          <IconButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            // disabled={!editorState.canCode}
            color={editorState.isCodeBlock ? 'primary' : 'default'}
            sx={{ bgcolor: editorState.isCodeBlock ? 'hero.light' : 'transparent' }}
            size='small'
          >
            <CodeIcon fontSize='small' />
          </IconButton>
        </ButtonGroup>
      </Paper>
    </BubbleMenu>
  );
}
