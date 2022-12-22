# Posts

## Get posts

Returns a list of posts.

### URL

---

<Get/> /api/groups/:groupId/posts

### Parameters

---

groupId <Badge text="required" type="error"/>

---

page <Badge text="optional" type="tip"/>

Default value: 1

---

pageSize <Badge text="optional" type="tip"/>

Default value: 5

### Response

```js
[
  {
    id: 0,
    name: "",
    body: "",
    creationDate: "",
  },
];
```

---

<br/>

---

<br/>

## Get post

Returns a post, specified by the postId parameter.

### URL

---

<Get/> /api/groups/:groupId/posts/:postId

### Parameters

---

groupId <Badge text="required" type="error"/>

---

postId <Badge text="required" type="error"/>

### Response

```js
{
    id: 0,
    name: "",
    body: "",
    creationDate: "",
};
```

---

<br/>

---

<br/>

## Create post

Creates a new post.

### URL

---

<Post/> /api/groups/:groupId/posts

### Parameters

---

groupId <Badge text="required" type="error"/>

### Response

```js
{
    id: 0,
    name: "",
    body: "",
    creationDate: "",
};
```

---

<br/>

---

<br/>

## Update post

Updates a post, specified by the postId parameter.

### URL

---

<Put/> /api/groups/:groupId/posts/:postId

### Parameters

---

groupId <Badge text="required" type="error"/>

---

postId <Badge text="required" type="error"/>

### Response

```js
{
    id: 0,
    name: "",
    body: "",
    creationDate: "",
};
```

---

<br/>

---

<br/>

## Delete post

Deletes a post, specified by the postId parameter.

### URL

---

<Delete/> /api/groups/:groupId/posts/:postId

### Parameters

---

groupId <Badge text="required" type="error"/>

---

postId <Badge text="required" type="error"/>

---
