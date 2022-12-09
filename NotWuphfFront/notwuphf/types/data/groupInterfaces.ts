export interface GroupData {
  id: Number;
  name: string;
  description: string;
  visibility: string;
  creationDate: Date;
}

export interface CreateGroup {
  name: string;
  description: string;
  visibility: string;
}

export interface UpdateGroup {
  name: string;
  description: string;
  visibility: string;
}
