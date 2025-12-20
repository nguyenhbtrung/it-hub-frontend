// 'use client';
// import { Node, mergeAttributes } from '@tiptap/core';
// import { NodeViewWrapper, ReactNodeViewProps, ReactNodeViewRenderer } from '@tiptap/react';

// const CustomComponent = Node.create({
//   name: 'reactComponent',

//   group: 'block',

//   atom: true,

//   addAttributes() {
//     return {
//       count: {
//         default: 0,
//       },
//     };
//   },

//   parseHTML() {
//     return [
//       {
//         tag: 'react-component',
//       },
//     ];
//   },

//   renderHTML({ HTMLAttributes }) {
//     return ['react-component', mergeAttributes(HTMLAttributes)];
//   },

//   addNodeView() {
//     return ReactNodeViewRenderer(Component);
//   },
// });

// export default CustomComponent;

// const Component = (props: ReactNodeViewProps<HTMLLabelElement>) => {
//   const increase = () => {
//     props.updateAttributes({
//       count: props.node.attrs.count + 1,
//     });
//   };

//   return (
//     <NodeViewWrapper className='react-component'>
//       <label ref={props.ref}>React Component</label>

//       <div className='content'>
//         <button onClick={increase}>This button has been clicked {props.node.attrs.count} times.</button>
//       </div>
//     </NodeViewWrapper>
//   );
// };
