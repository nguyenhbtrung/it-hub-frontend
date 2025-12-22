import { Node, mergeAttributes, textblockTypeInputRule } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import CalloutComponent from '../components/calloutComponent';

export interface CalloutOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    callout: {
      setCallout: (attrs?: { type: string }) => ReturnType;
      toggleCallout: (attrs?: { type: string }) => ReturnType;
    };
  }
}

/**
 * :::note + space → callout
 */
export const calloutInputRegex = /^:::(note|tip|warning|important|caution)\s$/;

export const Callout = Node.create<CalloutOptions>({
  name: 'callout',

  group: 'block',

  content: 'text*',

  defining: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      type: {
        default: 'note',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="callout"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-type': 'callout' }, this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutComponent);
  },

  addCommands() {
    return {
      setCallout:
        (attrs) =>
        ({ commands }) => {
          return commands.setNode(this.name, attrs);
        },

      toggleCallout:
        (attrs) =>
        ({ commands }) => {
          return commands.toggleNode(this.name, 'paragraph', attrs);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      Backspace: ({ editor }) => {
        const { $from } = editor.state.selection;

        if ($from.parent.type.name !== this.name) {
          return false;
        }

        // nếu callout rỗng → quay về paragraph
        if ($from.parent.content.size === 0) {
          return editor.commands.clearNodes();
        }

        return false;
      },
    };
  },

  addInputRules() {
    return [
      textblockTypeInputRule({
        find: calloutInputRegex,
        type: this.type,
        getAttributes: (match) => ({
          type: match[1],
        }),
      }),
    ];
  },
});
