import {
  CommentData,
  Comments,
  CreateComment,
  UpdateComment,
} from "types/data/commentInterfaces";
import PaginationHeader from "types/data/headerInterfaces";

const api = "/api/groups";

async function getComments(
  groupId: string,
  postId: string,
  token: string,
  page: number
): Promise<Comments> {
  const url = `${process.env.NEXT_PUBLIC_HOST}${api}/${groupId}/posts/${postId}/comments?page=${page}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  let paginationHeader = res.headers.get("Pagination");
  let count = 0;

  if (paginationHeader) {
    let pagination = JSON.parse(paginationHeader) as PaginationHeader;
    count = pagination.totalCount;
  }

  if (!res.ok) {
    return { comments: [], count: 0 };
  }
  const data: CommentData[] = await res.json();

  return {
    comments: data,
    count: count,
  };
}

async function getComment(
  groupId: string,
  postId: string,
  commentId: string,
  token: string
): Promise<CommentData | undefined> {
  const url = `${process.env.NEXT_PUBLIC_HOST}${api}/${groupId}/posts/${postId}/comments/${commentId}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return undefined;
  }
  const data: CommentData = await res.json();

  return data;
}

async function createComment(
  postData: CreateComment,
  groupId: string,
  postId: string,
  token: string
) {
  const url = `${process.env.NEXT_PUBLIC_HOST}${api}/${groupId}/posts/${postId}/comments`;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

async function updateComment(
  postData: UpdateComment,
  groupId: string,
  postId: string,
  commentId: string,
  token: string
) {
  const url = `${process.env.NEXT_PUBLIC_HOST}${api}/${groupId}/posts/${postId}/comments/${commentId}`;
  await fetch(url, {
    method: "PUT",
    body: JSON.stringify(postData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

async function deleteComment(
  groupId: string,
  postId: string,
  commentId: string,
  token: string
) {
  const url = `${process.env.NEXT_PUBLIC_HOST}${api}/${groupId}/posts/${postId}/comments/${commentId}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export { getComments, getComment, createComment, updateComment, deleteComment };
