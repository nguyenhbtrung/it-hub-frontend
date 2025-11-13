export interface Contest {
  id: number;
  image: string;
  title: string;
  category: string;
  description: string;
  status: string;
  participants: number;
  startTime: Date;
  endTime: Date;
}

export interface ContestCardProps {
  contest: Omit<Contest, 'description'>;
}
