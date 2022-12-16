import PaginationHeader from "@types/data/headerInterfaces";
import {
  CreateGroup,
  GroupData,
  UpdateGroup,
  Groups,
} from "../types/data/groupInterfaces";

const endPoint = "/api/groups";

async function getGroups(token: string, page: number): Promise<Groups> {
  const res = await fetch(
    process.env.NEXT_PUBLIC_HOST + endPoint + "?page=" + page,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  let paginationHeader = res.headers.get("Pagination");
  let count = 0;

  if (paginationHeader) {
    let pagination = JSON.parse(paginationHeader) as PaginationHeader;
    count = pagination.totalCount;
  }

  if (!res.ok) {
    return { groups: [], count: 0 };
  }
  const data: GroupData[] = await res.json();

  return {
    groups: data,
    count: count,
  };
}

async function getGroup(
  id: string,
  token: string
): Promise<GroupData | undefined> {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST + endPoint + "/" + id, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return undefined;
  }
  const data: GroupData = await res.json();

  return data;
}

async function createGroup(groupData: CreateGroup, token: string) {
  await fetch(process.env.NEXT_PUBLIC_HOST + endPoint, {
    method: "POST",
    body: JSON.stringify(groupData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

async function updateGroup(groupData: UpdateGroup, id: string, token: string) {
  await fetch(process.env.NEXT_PUBLIC_HOST + endPoint + "/" + id, {
    method: "PUT",
    body: JSON.stringify(groupData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

async function deleteGroup(id: string, token: string) {
  await fetch(process.env.NEXT_PUBLIC_HOST + endPoint + "/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export { getGroups, getGroup, createGroup, updateGroup, deleteGroup };
