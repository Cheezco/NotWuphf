export interface CommentData {
  id: Number;
  content: string;
  creationDate: Date;
  author: string;
}

export interface Comments {
  comments: CommentData[];
  count: number;
}

export interface CreateComment {
  content: string;
}

export interface UpdateComment {
  content: string;
}
