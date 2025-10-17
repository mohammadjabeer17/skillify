export interface Course {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  price: number;
  mrp?: number;
  rating: number;
  professor: string;
  createdAt: string;
  enrolledUsers?: number;
  enrolled?: boolean;
  videoUrl?: string;
  language?: string;
  details?: string;
  progress?: number;
  duration?: number;
  level?: string;
  completed?: boolean;
  completedAt?: string;
  quizScore?: number;
}
