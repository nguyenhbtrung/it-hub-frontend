'use client';

import './styles.scss';
import 'highlight.js/styles/atom-one-dark.css';

import { useEditor, EditorContent, ReactNodeViewRenderer, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import { Box, ButtonGroup, IconButton, Paper, ToggleButtonGroup, ToggleButton, Divider } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ImageIcon from '@mui/icons-material/Image';
import TitleIcon from '@mui/icons-material/Title';
import CodeIcon from '@mui/icons-material/Code';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import LinkIcon from '@mui/icons-material/Link';

import { useCallback, useEffect } from 'react';

import type { JSONContent } from '@tiptap/react';
import Italic from '@tiptap/extension-italic';
import Bold from '@tiptap/extension-bold';
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list';
// import Image from '@tiptap/extension-image';
import { Figure } from './figure';
// import CustomComponent from './customComponent';

// import css from 'highlight.js/lib/languages/css';
// import js from 'highlight.js/lib/languages/javascript';
// import ts from 'highlight.js/lib/languages/typescript';
// import html from 'highlight.js/lib/languages/xml';

// load all languages with "all" or common languages with "common"
import { all, createLowlight } from 'lowlight';

import CodeBlockComponent from './CodeBlockComponent';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Blockquote from '@tiptap/extension-blockquote';
import Link from '@tiptap/extension-link';
import CustomBubbleMenu from './data/bubbleMenu';
import CustomFloatingMenu from './data/floatingMenu';
import { useRichTextEditorActions } from './useRichTextEditorAction';

// create a lowlight instance
const lowlight = createLowlight(all);

// you can also register individual languages
// lowlight.register('html', html);
// lowlight.register('css', css);
// lowlight.register('js', js);
// lowlight.register('ts', ts);

interface RichTextEditorProps {
  value: JSONContent;
  onChange: (value: JSONContent) => void;
}

function Toolbar({ editor }: { editor: any }) {
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

  // const addImage = () => {
  //   const src = window.prompt('URL của hình ảnh:');
  //   const alt = window.prompt('Alt text (mô tả ảnh):');
  //   const title = window.prompt('Tiêu đề ảnh:');
  //   const width = window.prompt('Chiều rộng (px):');
  //   const height = window.prompt('Chiều cao (px):');

  //   if (src) {
  //     editor
  //       .chain()
  //       .focus()
  //       .setImage({
  //         src,
  //         alt: alt || '',
  //         title: title || '',
  //         width: width ? parseInt(width, 10) : undefined,
  //         height: height ? parseInt(height, 10) : undefined,
  //       })
  //       .run();
  //   }
  // };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { addFigure, setLink } = useRichTextEditorActions(editor);

  return (
    <Paper
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        p: 1,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderRadius: 0,
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
        {/* <IconButton
          onClick={addImage}
          //   color={editor.isActive('orderedList') ? 'primary' : 'default'}
          size='small'
        >
          <ImageIcon fontSize='small' />
        </IconButton> */}
        <IconButton
          onClick={addFigure}
          //   color={editor.isActive('orderedList') ? 'primary' : 'default'}
          size='small'
        >
          <ImageIcon fontSize='small' />
        </IconButton>
        {/* <IconButton
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertContent({
                type: 'customComponent',
              })
              .run()
          }
          //   color={editor.isActive('orderedList') ? 'primary' : 'default'}
          size='small'
        >
          <ImageIcon fontSize='small' />
        </IconButton> */}
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
  );
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Italic,
      Bold,
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      //   Image,
      Figure,
      //   CustomComponent,
      Link.configure({
        openOnClick: true,
        enableClickSelection: false,
        linkOnPaste: true,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`);

            // use default validation
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }

            // disallowed protocols
            const disallowedProtocols = ['ftp', 'file', 'mailto'];
            const protocol = parsedUrl.protocol.replace(':', '');

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }

            // only allow protocols specified in ctx.protocols
            const allowedProtocols = ctx.protocols.map((p) => (typeof p === 'string' ? p : p.scheme));

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }

            // disallowed domains
            const disallowedDomains = ['example-phishing.com', 'malicious-site.net'];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }

            // all checks have passed
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            // construct URL
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`);

            // only auto-link if the domain is not in the disallowed list
            const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com'];
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight, enableTabIndentation: true, tabSize: 2 }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      // Placeholder.configure({
      //   placeholder: 'Nhập mô tả chi tiết...',
      // }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML());
      onChange(editor.getJSON());
    },
    onCreate: ({ editor }) => {
      // Set attributes on the editor's root DOM element
      editor.view.dom.setAttribute('spellcheck', 'false');
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm focus:outline-none min-h-[200px] p-3',
      },
    },
    immediatelyRender: false,
  });

  // Update nội dung khi value thay đổi từ bên ngoài
  useEffect(() => {
    if (editor && JSON.stringify(value) !== JSON.stringify(editor.getJSON())) {
      editor.commands.setContent(value); // value là JSON
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  return (
    <Box
      sx={{
        // position: 'relative',
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        // '& .tiptap': {
        //   minHeight: 200,
        //   padding: 2,
        //   outline: 'none',
        //   '& h1': { fontSize: '1.5rem', fontWeight: 600, mt: 2, mb: 1 },
        //   '& h2': { fontSize: '1.25rem', fontWeight: 600, mt: 2, mb: 1 },
        //   '& h3': { fontSize: '1.125rem', fontWeight: 600, mt: 2, mb: 1 },
        //   '& ul, & ol': { pl: 2 },
        //   '& p': { mb: 1 },
        // },
        '& .tiptap': {
          minHeight: 200,
          padding: 2,
          outline: 'none',
          '& h1': { fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 600, mt: 0, mb: 2 },
          '& h2': { fontSize: '1.5rem', fontWeight: 600, mt: 4, mb: 2 },
          '& h3': { fontSize: '1.25rem', fontWeight: 500, mt: 4, mb: 1 },
          '& ul, & ol': { pl: 4 },
          '& li': { pl: 1, mb: 1 },
          '& p': { color: 'text.secodary', mb: 2, lineHeight: 1.6, whiteSpace: 'pre-wrap' },
        },
        '& .tiptap p.is-empty:before': {
          color: 'text.disabled',
          content: 'attr(data-placeholder)',
          float: 'left',
          height: 0,
          pointerEvents: 'none',
        },
      }}
    >
      {editor && <CustomBubbleMenu editor={editor} />}
      {editor && <CustomFloatingMenu editor={editor} />}
      <Toolbar editor={editor} />
      <Box px={8}>
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
}
