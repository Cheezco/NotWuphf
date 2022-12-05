# API

## Endpoints

### Groups

#### `GET` api/groups

Returns list of groups.

##### Parameters

| Name     | Required | Default value |
|----------|----------|---------------|
| page     | optional | 1             |
| pageSize | optional | 5             |

#### `GET` api/groups/{groupId}

Returns a single group, specified by the groupId parameter.

| Name    | Required | Default value |
|---------|----------|---------------|
| groupId | required |               |

##### Response

| Name | Type | Description |
|------|------|-------------|
| 

#### `POST` api/groups

Creates a new group.

#### `PUT` api/groups/{groupId}

Updates a single group, specified by the groupId parameter.

| Name    | Required | Default value |
|---------|----------|---------------|
| groupId | required |               |



#### `DELETE` api/groups/{groupId}

Deletes a single group, specified by the groupId parameter.

| Name    | Required | Default value |
|---------|----------|---------------|
| groupId | required |               |

---

### Posts

#### `GET` api/groups/{groupId}/posts

Returns list of posts.

##### Parameters

| Name     | Required | Default value |
|----------|----------|---------------|
| groupId  | required |               |
| page     | optional | 1             |
| pageSize | optional | 5             |

#### `GET` api/groups/{groupId}/posts/{postId}

Returns a single post, specified by the postId parameter.

| Name    | Required | Default value |
|---------|----------|---------------|
| groupId | required |               |
| postId  | required |               |

#### `POST` api/groups/{groupId}/posts

Creates a new post.

| Name    | Required | Default value |
|---------|----------|---------------|
| groupId | required |               |

#### `PUT` api/groups/{groupId}/posts/{postId}

Updates a single post, specified by the postId parameter.

| Name    | Required | Default value |
|---------|----------|---------------|
| groupId | required |               |
| postId  | required |               |

#### `DELETE` api/groups/{groupId}/posts/{postId}

Deletes a single post, specified by the postId parameter.

| Name    | Required | Default value |
|---------|----------|---------------|
| groupId | required |               |
| postId  | required |               |

---

### Comments

#### `GET` api/groups/{groupId}/posts/{postId}/comments

Returns list of comments.

##### Parameters

| Name     | Required | Default value |
|----------|----------|---------------|
| groupId  | required |               |
| postId   | required |               |
| page     | optional | 1             |
| pageSize | optional | 5             |

#### `GET` api/groups/{groupId}/posts/{postId}/comments/{commentId}

Returns a single comment, specified by the commentId parameter.

| Name      | Required | Default value |
|-----------|----------|---------------|
| groupId   | required |               |
| postId    | required |               |
| commentId | required |               |

#### `POST` api/groups/{groupId}/posts/{postId}/comments

Creates a new comment.

| Name    | Required | Default value |
|---------|----------|---------------|
| groupId | required |               |
| postId  | required |               |

#### `PUT` api/groups/{groupId}/posts/{postId}/comments/{commentId}

Updates a single comment, specified by the commentId parameter.

| Name      | Required | Default value |
|-----------|----------|---------------|
| groupId   | required |               |
| postId    | required |               |
| commentId | required |               |

#### `DELETE` api/groups/{groupId}/posts/{postid}/comments/{commentId}

Deletes a single comment, specified by the commentId parameter.

| Name      | Required | Default value |
|-----------|----------|---------------|
| groupId   | required |               |
| postId    | required |               |
| commentId | required |               |

---

### Auth

#### `POST` api/register

Registers new user

| Name     | Required | Default value |
|----------|----------|---------------|
| Username | required |               |
| Email    | required |               |
| Password | required |               |

#### `POST` api/login

Gets JWT

| Name     | Required | Default value |
|----------|----------|---------------|
| Username | required |               |
| Password | required |               |