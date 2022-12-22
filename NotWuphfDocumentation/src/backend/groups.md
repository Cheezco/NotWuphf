# Groups

## Get groups

Returns a list of groups.

### URL

---

<Get/> /api/groups

### Parameters

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
    description: "",
    visibility: "",
    creationDate: "",
  },
];
```

---

<br/>

---

<br/>

## Get group

Returns a group, specified by the groupId parameter.

### URL

---

<Get/> /api/groups/:groupId

### Parameters

---

groupId <Badge text="required" type="error"/>

### Response

```js
{
    id: 0,
    name: "",
    description: "",
    visibility: "",
    creationDate: "",
};
```

---

<br/>

---

<br/>

## Create group

Creates a new group.

### URL

---

<Post/> /api/groups/:groupId

### Response

```js
{
    id: 0,
    name: "",
    description: "",
    visibility: "",
    creationDate: "",
};
```

---

<br/>

---

<br/>

## Update group

Updates a group, specified by the groupId parameter.

### URL

---

<Put/> /api/groups/:groupId

### Parameters

---

groupId <Badge text="required" type="error"/>

### Response

```js
{
    id: 0,
    name: "",
    description: "",
    visibility: "",
    creationDate: "",
};
```

---

<br/>

---

<br/>

## Delete group

Deletes a group, specified by the groupId parameter.

### URL

---

<Delete/> /api/groups/:groupId

### Parameters

---

groupId <Badge text="required" type="error"/>

---
