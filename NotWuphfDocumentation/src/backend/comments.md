# Comments

## Get comments

Returns a list of comments.

### URL

---

<Get/> /api/groups/:groupId/posts/:postId/comments

### Parameters

---

groupId <Badge text="required" type="error"/>

---

postId <Badge text="required" type="error"/>

---

page <Badge text="optional" type="tip"/>

Default value: 1

### Response

```js
[
  {
    id: 0,
    content: "",
    creationDate: "",
  },
];
```

---

pageSize <Badge text="optional" type="tip"/>

Default value: 5

---

<br/>

---

<br/>

## Get comment

Returns a comment, specified by the commentId parameter.

### URL

---

<Get/> /api/groups/:groupId/posts/:postId/comments/:commentId

### Parameters

---

groupId <Badge text="required" type="error"/>

---

postId <Badge text="required" type="error"/>

---

commentId <Badge text="required" type="error"/>

### Response

```js
{
    id: 0,
    content: "",
    creationDate: "",
};
```

---

<br/>

---

<br/>

## Create comment

Creates a new comment.

### URL

---

<Post/> /api/groups/:groupId/posts/:postId/comments

### Parameters

---

groupId <Badge text="required" type="error"/>

---

postId <Badge text="required" type="error"/>

### Response

```js
{
    id: 0,
    content: "",
    creationDate: "",
};
```

---

<br/>

---

<br/>

## Update comment

Updates a comment, specified by the commentId parameter.

### URL

---

<Put/> /api/groups/:groupId/posts/:postId/comments/:commentId

### Parameters

---

groupId <Badge text="required" type="error"/>

---

postId <Badge text="required" type="error"/>

---

commentId <Badge text="required" type="error"/>

### Response

```js
{
    id: 0,
    content: "",
    creationDate: "",
};
```

---

<br/>

---

<br/>

## Delete comment

Deletes a comment, specified by the commentId parameter.

### URL

---

<Delete/> /api/groups/:groupId/posts/:postId/comments/:commentId

### Parameters

---

groupId <Badge text="required" type="error"/>

---

postId <Badge text="required" type="error"/>

---

commentId <Badge text="required" type="error"/>

---
