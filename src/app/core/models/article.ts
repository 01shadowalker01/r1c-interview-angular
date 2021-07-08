export interface Article {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  author?: {
    bio: string;
    following: boolean;
    image: string;
    username: string;
  };
  favorited?: boolean;
  favoritesCount?: number;
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
