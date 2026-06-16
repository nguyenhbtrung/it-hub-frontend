import { JSONContent } from '@tiptap/react';

export interface UpdateStepPayload {
  title?: string;
  content?: string | JSONContent;
}
