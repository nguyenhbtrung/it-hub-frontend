export interface Discussion {
  id: number;
  topic: string;
  course: string;
  sender: {
    name: string;
    avatar: string;
  };
  time: string;
  status: 'answered' | 'unanswered';
  statusText: string;
}

export type DiscussionStatus = 'answered' | 'unanswered';
