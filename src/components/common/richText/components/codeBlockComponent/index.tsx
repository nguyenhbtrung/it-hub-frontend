import './CodeBlockComponent.scss';

import React from 'react';
import { NodeViewContent, NodeViewWrapper, NodeViewProps } from '@tiptap/react';

const CodeBlockComponent: React.FC<NodeViewProps> = ({ node, updateAttributes, extension }) => {
  const defaultLanguage = node.attrs.language as string;

  return (
    <NodeViewWrapper className='code-block'>
      <select
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={(event) => updateAttributes({ language: event.target.value })}
      >
        <option value='null'>auto</option>
        <option disabled>—</option>
        {extension.options.lowlight.listLanguages().map((lang: string, index: number) => (
          <option key={index} value={lang}>
            {lang}
          </option>
        ))}
      </select>
      <pre>
        <NodeViewContent as={'code' as any} />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;
