# Auth

## Login

Gets new JWT token.

### HTTP Request Type

POST

### Parameters

---

<font size="3">username <Badge text="required" type="error"/></font>

---

email <Badge text="required" type="error"/>

---

password <Badge text="required" type="error"/>

---

### Response

```js
{
  accessToken: "";
}
```

<br/>

---

<br/>

## Register

Registers new user

### URL

---

<Get/> /api/register

### Parameters

---

username <Badge text="required" type="error"/>

---

password <Badge text="required" type="error"/>

---

### Response

```js
{
  userId: 0,
  username: "",
  email: "";
}
```
