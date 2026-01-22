import { mergeAttributes, Node, nodeInputRule } from '@tiptap/core';

export interface VideoOptions {
  HTMLAttributes: Record<string, any>;
  inline: boolean;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      /**
       * Add a video element
       */
      setVideo: (options: { src: string; title?: string; fileId?: string; poster?: string }) => ReturnType;
    };
  }
}

export const inputRegex = /!\[video]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

export const Video = Node.create<VideoOptions>({
  name: 'video',

  addOptions() {
    return {
      HTMLAttributes: {},
      inline: false,
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? 'inline' : 'block';
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },

      title: {
        default: null,
      },

      fileId: {
        default: null,
      },

      poster: {
        default: null,
      },

      controls: {
        default: true,
      },

      width: {
        default: '100%',
      },

      height: {
        default: 'auto',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'video',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { fileId, ...rest } = HTMLAttributes;
    return [
      'video',
      mergeAttributes(
        this.options.HTMLAttributes,
        {
          controls: true,
          style: 'max-width: 100%; height: auto; display: block; margin: 20px auto;',
        },
        rest,
        fileId ? { 'data-file-id': fileId } : {}
      ),
      ['source', { src: HTMLAttributes.src }],
    ];
  },

  addCommands() {
    return {
      setVideo:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          });
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, src, title] = match;

          return { src, title };
        },
      }),
    ];
  },
});
