# AWSC208.Assignment1
{{Insert Image}}

Our assignment is a Node.js, Express, and EJS project for Web Development: Advanced Web Scripting Concepts called Campus Connect.

Campus Connect is intended to help junior developers or graduate students to gain experience while tracking their skill’s progress needed to achieve their.

Hiring a new employee can be time consuming and costly for companies. Campus Connect's objective is to connect companies who are looking to hire - to students to develop projects.

# Video Walkthrough
{{Insert Video}}

# Assignment Requirements

> We have learned Authentication, Authorization, Secured API, and Role based authentication in class with EJS, Node, Express, and Auth0. In this assignment, we will be practicing all the topics we have covered in the class with React.

> The application should have all the functionalities, but you must have your own input as well. For instance, after logging, there should be an appropriate page presented to a user.

- Requirements
	- Authentication (Login / Logout)
		- message to user via pop / ajax
			- "You are logged in" / "You are logged out"
	- Protected Route
		- fetch data from secured server
	- Authorization (Role Based)
            - Company
            - Student
		- redirect after login based on role
		- 404 or error display if not authorized if not auth
	- Submission
		- Video
		- Git Repo
		- README.md with install instructions
		- screenshots

### Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

You will get these by creating an `Application` and an `API` at https://auth0.com/

Client `.env` variables can be found in the Auth0 Application Settings or Quick Start.

Server `.env` variables can be found in the Auth0 API Settings or Quick Start.

You will also see a `.env.example` file in each folder with some pre-filled variables that need not be changed.

**Client .env**

`SECRET=`

`BASE_URL=`

`CLIENT_ID=`

`ISSUER_BASE_URL=`

`CLIENT_SECRET=`

**Server API .env**

`JWKSURI=`

`AUDIENCE=`

`ISSUER=`


## Deployment

To deploy this project open two terminals.

### Terminal 1

- Navigate into `client`
```bash
  cd client
```
- Install dependencies
```bash
  npm install
```
- Run program
```bash
  npm start
```

### Terminal 2
- Navigate into `server`
```bash
  cd server
```
- Install dependencies
```bash
  npm install
```
- Run program
```bash
  npm start
```


## Authors

- [Patricia Fargetti](https://github.com/Patricia-Fargetti)
- [Russell Nizamov](https://github.com/neezzzy)
- [Michael Gartner](https://github.com/mdroidian)


