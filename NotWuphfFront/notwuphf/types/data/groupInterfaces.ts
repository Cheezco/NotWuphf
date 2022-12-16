export interface GroupData {
  id: number;
  name: string;
  description: string;
  visibility: number;
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
