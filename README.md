# User registration server

## Description

A user registration server created using the Express framework in the Node.js environment, with MongoDB as the database.

Features:

- User registration.
- Sending an email to the specified email for user verification.
- User authentication and deauthentication.

## Endpoints

<p style='font-weight: bold; display:block; align-items: center;padding: 16px; border: 1px solid #099454;border-radius: 10px; margin-bottom: 20px'>Base URL: <span style='margin-left:30px'>https://user-reg-backend.onrender.com</span></p>

<div style="padding: 16px; border: 1px solid #8d910d;border-radius: 10px; margin-bottom: 20px">
<div style="display: flex; align-items: center; border-bottom: 1px solid #8d910d; margin-bottom: 10px">
<p style="display: flex; align-items: center; justify-content: center; width: 60px; height: 30px;background-color: 
#8d910d; border-radius: 5px; font-weight: bold">POST</p>
<p style='font-weight: bold; margin-left:30px'>/register</p>
<p style='margin-left:50px'>Create a new user</p>
</div>
<div style="display: flex; align-items: center;">
<p style='font-weight: bold'>Request body</p>
<p style='margin-left:30px; color: red'>[requaired]</p>
<p style='margin-left:50px'>(application/json)</p>
</div>
Example Value | Schema

```
{
  "name": "Adrian Cross",
  "email": "across@mail.com",
  "password": "examplepwd12345"
}
```

<p style='font-weight: bold'>Responses</p>

| Code | Description            |
| :--: | ---------------------- |
| 201  | Created                |
| 409  | Conflict. Email in use |
| 500  | Server error           |

</div>

<div style="padding: 16px; border: 1px solid #8d910d;border-radius: 10px; margin-bottom: 20px">
<div style="display: flex; align-items: center;border-bottom: 1px solid #8d910d; margin-bottom: 10px">
<p style="display: flex; align-items: center; justify-content: center; width: 60px; height: 30px;background-color: 
#8d910d; border-radius: 5px; font-weight: bold">POST</p>
<p style='font-weight: bold; margin-left:30px'>/login</p>
<p style='margin-left:50px'>Login user</p>
</div>
<div style="display: flex; align-items: center;">
<p style='font-weight: bold'>Request body</p>
<p style='margin-left:30px; color: red'>[requaired]</p>
<p style='margin-left:50px'>(application/json)</p>
</div>
Example Value | Schema

```
{
  "email": "across@mail.com",
  "password": "examplepwd12345"
}
```

<p style='font-weight: bold'>Responses</p>

| Code | Description                                   |
| :--: | --------------------------------------------- |
| 200  | Created                                       |
| 401  | Email not verify / Email or password is wrong |
| 500  | Server error                                  |

</div>

<div style="padding: 16px; border: 1px solid #8d910d;border-radius: 10px; margin-bottom: 20px">
<div style="display: flex; align-items: center;border-bottom: 1px solid #8d910d; margin-bottom: 10px">
<p style="display: flex; align-items: center; justify-content: center; width: 60px; height: 30px;background-color: 
#8d910d; border-radius: 5px; font-weight: bold">POST</p>
<p style='font-weight: bold; margin-left:30px'>/logout</p>
<p style='margin-left:50px'>Log out user</p>
</div>
<p style='font-weight: bold'>Parameters</p>
<div style="display: flex; align-items: center;">
<p style='font-weight: bold'>Authorization</p>
<p style='margin-left:10px'>type: string</p>
<p style='margin-left:30px; color: red'>[requaired]</p>
<p style='margin-left:50px'>(bearer token)</p>
</div>

The token issued to the current user.

<p style='font-weight: bold'>Responses</p>

| Code | Description    |
| :--: | -------------- |
| 204  | Logout sucsess |
| 401  | Not authorized |
| 500  | Server error   |

</div>

</div>

<div style="padding: 16px; border: 1px solid #099454;border-radius: 10px; margin-bottom: 20px">
<div style="display: flex; align-items: center;border-bottom: 1px solid #099454; margin-bottom: 10px">
<p style="display: flex; align-items: center; justify-content: center; width: 60px; height: 30px;background-color: 
#099454; border-radius: 5px; font-weight: bold">GET</p>
<p style='font-weight: bold; margin-left:30px'>/current</p>
<p style='margin-left:50px'>Get information about the current user</p>
</div>
<p style='font-weight: bold'>Parameters</p>
<div style="display: flex; align-items: center;">
<p style='font-weight: bold'>Authorization</p>
<p style='margin-left:10px'>type: string</p>
<p style='margin-left:30px; color: red'>[requaired]</p>
<p style='margin-left:50px'>(bearer token)</p>
</div>

The token issued to the current user.

<p style='font-weight: bold'>Responses</p>

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
