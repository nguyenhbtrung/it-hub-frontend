// import './styles.scss';
// import 'highlight.js/styles/atom-one-dark.css';

// import { generateHTML } from '@tiptap/html';
// import Editor from './editor';
// import StarterKit from '@tiptap/starter-kit';
// import Underline from '@tiptap/extension-underline';
// import Italic from '@tiptap/extension-italic';
// import Bold from '@tiptap/extension-bold';
// import Heading from '@tiptap/extension-heading';
// import { renderToReactElement } from '@tiptap/static-renderer/pm/react';
// // import { renderToHTMLString } from '@tiptap/static-renderer/pm/html'
// import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list';
// import { Box } from '@mui/material';
// import Image from '@tiptap/extension-image';
// import { Figure } from './figure';
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
// import { all, createLowlight } from 'lowlight';
// import ClientCodeBlockConfig from './ClientCodeBlockConfig';
// import Blockquote from '@tiptap/extension-blockquote';
// import Link from '@tiptap/extension-link';
// import Test2 from './data/test2';
// import Test3 from './data/test3';

// // import CustomComponent from './customComponent';

// const lowlight = createLowlight(all);

// export default async function Page() {
//   const res = await fetch('http://localhost:3000/testRte/api', {
//     // cache: 'no-store', // tránh cache để luôn lấy dữ liệu mới
//   });
//   const content = await res.json();

//   const output = renderToReactElement({
//     content,
//     extensions: [
//       StarterKit,
//       Underline,
//       Italic,
//       Bold,
//       BulletList,
//       OrderedList,
//       ListItem,
//       Image,
//       Figure,
//       //   CustomComponent,
//       CodeBlockLowlight.configure({ lowlight }).extend({
//         renderHTML({ node, HTMLAttributes }) {
//           return [
//             'div',
//             { class: 'code-block-wrapper' },
//             ['button', { class: 'copy-button', 'data-code': node.textContent }, 'Copy'],
//             [
//               'pre',
//               {},
//               [
//                 'code',
//                 { ...HTMLAttributes, class: `language-${node.attrs.language || 'plaintext'}` },
//                 node.textContent,
//               ],
//             ],
//           ];
//         },
//       }),
//       Blockquote,
//       Link,
//       Heading.configure({
//         levels: [1, 2, 3],
//       }),
//     ],
//   });

//   // const outputString = generateHTML(content, [
//   //   StarterKit,
//   //   Underline,
//   //   Italic,
//   //   Bold,
//   //   BulletList,
//   //   OrderedList,
//   //   ListItem,
//   //   CodeBlockLowlight.configure({ lowlight }),
//   //   Heading.configure({
//   //     levels: [1, 2, 3],
//   //   }),
//   // ]);

//   return (
//     <>
//       <Editor />
//       <div>content: </div>
//       <pre>{JSON.stringify(content, null, 2)}</pre>
//       {/* <pre>
//         <code>{outputString}</code>
//       </pre> */}
//       <ClientCodeBlockConfig />
//       <Box className='tiptap' p={10} sx={{ border: '1px solid' }}>
//         {output}
//       </Box>
//       <Test2 />
//       <Test3 />
//     </>
//   );
// }

export default function Page() {
  return <div>Test RTE</div>;
}
