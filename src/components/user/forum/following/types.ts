export interface User {
  id: string;
  name: string;
  role: string;
  reputation: number;
  reputationLevel: string;
  posts?: number;
  status: 'online' | 'offline' | 'special';
  avatarUrl: string;
  isVerified?: boolean;
  isAdmin?: boolean;
}

export interface Tag {
  id: string;
  name: string;
  description: string;
  newPosts: number;
  hasNewPosts: boolean;
}

export interface FollowingData {
  users: User[];
  tags: Tag[];
  stats: {
    totalUsers: number;
    totalTags: number;
  };
}
