export interface Author {
  name: string;
  role: string;
  avatar: string;
  isAdmin?: boolean;
  reputation: string;
  reputationLevel: string;
}

export type PostContentType =
  | 'question'
  | 'knowledge'
  | 'discussion'
  | 'experience'
  | 'news'
  | 'resource'
  | 'announcement';

export interface AnnouncementPost {
  id: number;
  type: 'announcement';
  time: string;
  title: string;
  content: string;
  isAnnouncement: true;
}

export interface NormalPost {
  id: number;
  type: PostContentType;
  time: string;
  title: string;
  content: string;
  author: Author;
  votes: number;
  comments: number;
  views: number;
  tags: string[];
  saved: boolean;
  isAnnouncement?: false;
}
