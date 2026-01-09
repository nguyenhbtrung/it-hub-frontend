'use client';

import { useState } from 'react';

interface Attachment {
  id: string;
  fileId: string;
  name: string;
  size: number;
  type: string;
  mimeType: string;
  url: string;
}

interface AttachmentsProps {
  attachments: Attachment[];
}

export function Attachments({ attachments }: AttachmentsProps) {
  const [attachments, setAttachments] = useState<Attachment[]>(() => {
    if (attachments) {
      return attachments.map((item: any) => ({
        id: item.id,
        fileId: item.file.id,
        name: item.file.name,
        size: Number(item.file.size),
        type: item.file.type,
        mimeType: item.file.mimeType,
        url: item.file.url,
      }));
    }
    return [];
  });
}
