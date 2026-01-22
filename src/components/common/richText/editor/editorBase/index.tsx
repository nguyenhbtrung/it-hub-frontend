'use client';

import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Heading from '@tiptap/extension-heading';
import { Box } from '@mui/material';

import { useEffect } from 'react';

import type { JSONContent } from '@tiptap/react';
import Italic from '@tiptap/extension-italic';
import Bold from '@tiptap/extension-bold';
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list';
// import Image from '@tiptap/extension-image';
// import CustomComponent from './customComponent';

// import css from 'highlight.js/lib/languages/css';
// import js from 'highlight.js/lib/languages/javascript';
// import ts from 'highlight.js/lib/languages/typescript';
// import html from 'highlight.js/lib/languages/xml';

// load all languages with "all" or common languages with "common"
import { all, createLowlight } from 'lowlight';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Blockquote from '@tiptap/extension-blockquote';
import Link from '@tiptap/extension-link';
import CustomBubbleMenu from '../menus/bubbleMenu';
import CustomFloatingMenu from '../menus/floatingMenu';
import { Figure } from '../../extensions/figure';
import CodeBlockComponent from '../../components/codeBlockComponent';
import Toolbar from '../toolbar';
import { Placeholder } from '@tiptap/extensions';
import { Callout } from '../../extensions/callout';
import { Video } from '../../extensions/video';

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
  borderRadius?: string | number;
  height?: string | number;
  placeholder?: string;
}

export default function EditorBase({
  value,
  onChange,
  borderRadius = 1,
  height = 300,
  placeholder = 'Nhập nội dung',
}: RichTextEditorProps) {
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
      Video,
      Callout,
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
      Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
        placeholder,
        // showOnlyWhenEditable: true,
        // placeholder: ({ editor }) => {
        //   return editor.view.dom.classList.contains('menu-open') ? '' : 'Nhập nội dung...';
        // },
      }),
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
        // height: 500,
        // position: 'relative',
        border: 1,
        borderColor: 'divider',
        borderRadius,
        overflow: 'auto',
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
          // outline: 'none',
          // '& h1': { fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 600, mt: 0, mb: 2 },
          // '& h2': { fontSize: '1.5rem', fontWeight: 600, mt: 4, mb: 2 },
          // '& h3': { fontSize: '1.25rem', fontWeight: 500, mt: 4, mb: 1 },
          // '& ul, & ol': { pl: 4 },
          // '& li': { pl: 1, mb: 1 },
          // '& p': { color: 'text.secodary', mb: 2, lineHeight: 1.6, whiteSpace: 'pre-wrap' },
        },
      }}
    >
      <Toolbar editor={editor} />
      <Box px={8} sx={{ height, overflow: 'auto', position: 'relative' }}>
        {editor?.view && <CustomBubbleMenu editor={editor} />}
        {editor && !editor.isDestroyed && editor.view?.dom && <CustomFloatingMenu editor={editor} />}

        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
}
