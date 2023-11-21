# User registration server

## Description

A user registration server created using the Express framework in the Node.js environment, with MongoDB as the database.

Features:

- User registration.
- Sending an email to the specified email for user verification.
- User authentication and deauthentication.

## Endpoints

**Base URL :** https://user-reg-backend.onrender.com</span>

* **POST** /register

_Create a new user_

**Request body** [requaired]; (application/json)

Example Value | Schema

```
{
  "name": "Adrian Cross",
  "email": "across@mail.com",
  "password": "examplepwd12345"
}
```

**Responses**

| Code | Description            |
| :--: | ---------------------- |
| 201  | Created                |
| 409  | Conflict. Email in use |
| 500  | Server error           |


* **POST** /login
  
_Login user_

**Request body** [requaired]; (application/json)


Example Value | Schema

```
{
  "email": "across@mail.com",
  "password": "examplepwd12345"
}
```

**Responses**

| Code | Description                                   |
| :--: | --------------------------------------------- |
| 200  | Created                                       |
| 401  | Email not verify / Email or password is wrong |
| 500  | Server error                                  |

* **POST** /logout

_Log out user_

**Parameters**

**Authorization** type: string; [requaired]; (bearer token)

The token issued to the current user.

**Responses**

| Code | Description    |
| :--: | -------------- |
| 204  | Logout sucsess |
| 401  | Not authorized |
| 500  | Server error   |

* **GET** /current
_Get information about the current user_

**Authorization** type: string; [requaired]; (bearer token)

The token issued to the current user.

**Responses**

| Code | Description                                              |
| :--: | -------------------------------------------------------- |
| 204  | Information found.                                       |
| 401  | Not authorized. Missing header with authorization token. |
| 500  | Server error                                             |

</div>

## Technologies Used:

- Node.js: The backend server is built with Node.js, enabling efficient server-side JavaScript execution.
- Express: The web application framework, Express, is utilized to streamline routing, middleware, and HTTP request handling.
- MongoDB: We use MongoDB as a NoSQL database to store and manage data.
- Mongoose: Mongoose is an ODM (Object Data Modeling) library for MongoDB that defines schema and interacts with the database.
