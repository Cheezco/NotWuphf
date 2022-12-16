export interface GroupData {
  id: Number;
  name: string;
  description: string;
  visibility: Number;
  creationDate: string;
}

export interface Groups {
  groups: GroupData[];
  count: number;
}

export interface CreateGroup {
  name: string;
  description: string;
  visibility: number;
}

export interface UpdateGroup {
  name: string;
  description: string;
  visibility: number;
}
