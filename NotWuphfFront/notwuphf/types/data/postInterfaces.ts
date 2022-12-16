export interface PostData {
  id: number;
  name: string;
  body: string;
  creationDate: Date;
}

export interface Posts {
  posts: PostData[];
  count: number;
}

export interface CreatePost {
  name: string;
  body: string;
}

export interface UpdatePost {
  body: string;
}
