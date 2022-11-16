# AWSC208.Assignment1
![CampusConnect-HomeScreen](https://user-images.githubusercontent.com/3792666/200188379-d22337db-50d9-4a45-bd2e-32549387b853.png)

Our assignment is a Node.js, Express, and EJS project for Web Development: Advanced Web Scripting Concepts called Campus Connect.

Campus Connect is intended to help junior developers or graduate students to gain experience while tracking their skill’s progress needed to achieve their.

Hiring a new employee can be time consuming and costly for companies. Campus Connect's objective is to connect companies who are looking to hire - to students to develop projects.

# Screenshots

![Dashboard](https://user-images.githubusercontent.com/3792666/200189545-6a04b151-1382-4848-8cc8-8104ca7f3f2b.png)

![Projects-Desktop](https://user-images.githubusercontent.com/3792666/200189543-f4809d46-2edc-4b7d-8ecb-55d710beef4d.png)

![Dashboard-Mobile](https://user-images.githubusercontent.com/3792666/200189546-d0c9fc74-68aa-4e66-9b3b-9b4bb28255f9.png)
![Home-Mobile](https://user-images.githubusercontent.com/3792666/200189547-ff637324-3909-4fa6-84dc-b9902262806a.png)


# Video Walkthrough
[![CampusConnect-Assignment1-VideoWalkThru](https://user-images.githubusercontent.com/3792666/200188384-05a6ac98-a41e-44bb-88a8-cec249ccfbed.png)](https://youtu.be/DbnELhVnAU0)

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

To run this project, you will need to add the following environment variables to your `.env` files

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


