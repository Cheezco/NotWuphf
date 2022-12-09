export interface PostData {
  id: Number;
  name: string;
  body: string;
  creationDate: Date;
}

export interface CreatePost {
  name: string;
  body: string;
}

export interface UpdatePost {
  body: string;
}
