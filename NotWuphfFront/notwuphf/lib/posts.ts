import PaginationHeader from "../types/data/headerInterfaces";
import {
  CreatePost,
  PostData,
  Posts,
  UpdatePost,
} from "../types/data/postInterfaces";

const api = "/api/groups";

async function getPosts(
  groupId: string,
  token: string,
  page: number
): Promise<Posts> {
  const url = `${process.env.NEXT_PUBLIC_HOST}${api}/${groupId}/posts?page=${page}`;
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
    return { posts: [], count: 0 };
  }
  const data: PostData[] = await res.json();

  return {
    posts: data,
    count: count,
  };
}

async function getPost(
  groupId: string,
  postId: string,
  token: string
): Promise<PostData | undefined> {
  const url = `${process.env.NEXT_PUBLIC_HOST}${api}/${groupId}/posts/${postId}`;
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
  const data: PostData = await res.json();

  return data;
}

async function createPost(
  postData: CreatePost,
  groupId: string,
  token: string
) {
  const url = `${process.env.NEXT_PUBLIC_HOST}${api}/${groupId}/posts`;
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

async function updatePost(
  postData: UpdatePost,
  groupId: string,
  postId: string,
  token: string
) {
  const url = `${process.env.NEXT_PUBLIC_HOST}${api}/${groupId}/posts/${postId}`;
  await fetch(url, {
    method: "PUT",
    body: JSON.stringify(postData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

async function deletePost(groupId: string, postId: string, token: string) {
  const url = `${process.env.NEXT_PUBLIC_HOST}${api}/${groupId}/posts/${postId}`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}

export { getPosts, getPost, createPost, updatePost, deletePost };
