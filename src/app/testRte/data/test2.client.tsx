// 'use client';
import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
// import React from 'react';

export function MyCustomComponentWithoutContent() {
  //   const [count, setCount] = React.useState(200);

  return <div className='custom-component-without-content'>count This is a react component!</div>;
}

// export function MyCustomComponentWithoutContent() {
//   const [count, setCount] = React.useState(200);

//   return (
//     <div className='custom-component-without-content' onClick={() => setCount((a) => a + 1)}>
//       {count} This is a react component!
//     </div>
//   );
// }

export const CustomNodeExtensionWithoutContent = Node.create({
  name: 'customNodeExtensionWithoutContent',
  atom: true,
  renderHTML() {
    return ['div', { class: 'my-custom-component-without-content' }] as const;
  },
  //   addNodeView() {
  //     return ReactNodeViewRenderer(MyCustomComponentWithoutContent);
  //   },
});
