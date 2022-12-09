export interface CommentData {
  id: Number;
  content: string;
  creationDate: Date;
  author: string;
}

export interface CreateComment {
  id: Number;
  content: string;
  creationDate: Date;
}

export interface UpdateComment {
  content: string;
}
