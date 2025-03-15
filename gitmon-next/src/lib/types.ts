export interface BlogPost {
  userId: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: number;
  coverImage: string;
  content: string[];
  likes?: number;
}

export interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    image: string;
  };
  createdAt: string;
  postSlug: string;
}
