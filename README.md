# Task Management Application

## Task Management

This is a Task Management application that allows users to manage their tasks efficiently. Users can sign up, sign in, and sign out. The application supports CRUD operations (Create, Read, Update, Delete) on tasks. It also differentiates between regular users and admin users.

### Features

- **User Authentication**: Users can sign up, sign in, and sign out.
- **Task Management**: Users can create, view, update, and delete tasks.
- **Search and Filter**: Users can search for tasks.

### User Authentication

- **Sign Up**: Users can create a new account.
- **Sign In**: Users can log in to their account.
- **Sign Out**: Users can log out of their account.

### Task CRUD Operations

- **Create Task**: Users can create a new task.
- **Read Tasks**: Users can view all their tasks.
- **Update Task**: Users can update an existing task.
- **Delete Task**: Users can delete a task.

## Backend Setup

1. Clone the GitHub repository:

   ```bash
   git clone https://github.com/suranjit123/task-management.git

2. Navigate to the backend directory:
- **cd backend**

3. Install the required dependencies:
- **npm install**

4. Check the .env file for environment variables and make changes if necessary:
```
PORT=3200
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
5. Start the backend server:
- **node server.js**

## Frontend Setup

1. Navigate to the frontend directory:
- **cd client**

2. Install the required dependencies:
- **npm install**

3. Match the REACT_APP_SERVER_URL environment variable with your backend server URL in the .env file:
```
REACT_APP_SERVER_URL=http://localhost:3200
```
4. Start the frontend application:
- **npm start**





