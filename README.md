# User Management App

This web application is a powerful and user-friendly web-based tool designed for managing user data efficiently. This application provides a comprehensive set of features, including RESTful APIs, for creating, reading, updating, and deleting user information. With its intuitive design and seamless integration of frontend and backend components, it offers a seamless user experience for administrators and end-users alike.

There are two ways of running the Golang API:
1. Terminal
2. Docker

After running the API we will have to run the web application (React frontend) from the terminal.

## Running the Golang API via a terminal (first way)
### Prerequisites
Before running the Golang API, ensure you have the following installed on your system:

- [Go](https://golang.org/dl/): The Go programming language.

### Step-by-step guide to run the API

1. Download source code from the repositroy - https://github.com/Friendly-Neighborhood/FullstackAssignment
2. Extract **golang_api** project folder on you computer (anywhere you like)
3. Open **golang_api** folder in the terminal
4. Run `go run main.go` command in the terminal

![image](https://github.com/Friendly-Neighborhood/FullstackAssignment/assets/68468538/094ea9eb-ff3e-4d41-aad1-299e59235b1a)

5. Wait for the confirmation prompt of running the API

![image](https://github.com/Friendly-Neighborhood/FullstackAssignment/assets/68468538/d6146f20-c341-46cd-aefc-d97559dd2019)

## Running the Golang API in Docker (second way)
### Prerequisites
Before running the Golang API, ensure you have the following installed on your system:

- [Docker](https://www.docker.com/products/docker-desktop/): Platform for developing, shipping, and running applications.

### Step-by-step guide to run the API
1. Download code from the repositroy - https://github.com/Friendly-Neighborhood/FullstackAssignment
2. Extract **golang_api** project folders on you computer (anywhere you like)
3. Open **golang_api** folder in the terminal
4. Run `docker build -t user-management-app .` command in the terminal to build the Docker image (dockerfile will be used for this step)
5. Run `docker run --name user-management-app_c -p 8080:8080 user-management-app` command in the terminal to run Docker container from the builded image

## Running the web application (Frontend)
### Prerequisites
Before running the application, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download): JavaScript runtime environment.

### Step-by-step guide to run the application

1. Download code from the repositroy - https://github.com/Friendly-Neighborhood/FullstackAssignment
2. Extract **react_node_app** project folder on you computer (anywhere you like)
3. Open **react_node_app** folder in the terminal
4. Run `npm install` command in the terminal to download all the dependecies (**node_modules** folder will be added)
5. Run `npm start` command in the terminal to start the application

![image](https://github.com/Friendly-Neighborhood/FullstackAssignment/assets/68468538/85af17b1-ca06-4f91-a6ed-94510fbccde5)

6. Wait for the confirmation prompt of running the application

![image](https://github.com/Friendly-Neighborhood/FullstackAssignment/assets/68468538/7a83d753-5af7-47f1-a717-a33522a38828)

7. After previous step the web application will automatically open in a browser on `http://localhost:3000/`

**Notice: if visit `http://localhost:8080/users` we will be able to see all the users that are stored on our server as an array**
