export interface Post extends PostMeta {
  content: string;
}

export interface PostWithServerData extends Post {
  readingTime: number;
  likes?: number;
  comments?: Comment[];
}

export interface PostMeta {
  title: string;
  author: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  excerpt: string;
  pinned?: boolean;
  tags?: string[];
  coverImage: string;
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
