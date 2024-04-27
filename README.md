# ChatApp

Welcome to ChatApp! A modern chat application that lets you connect and communicate effortlessly. Built with [insert technologies used, e.g., Node.js, React], this app offers a seamless chatting experience.
<br>
<img width="500" alt="image" src="https://github.com/aarya1302/fastChat/assets/15513166/8850e9b4-0f0c-46c1-b3ed-952079c1d067">
<br>
## Features

- Real-time messaging
- User authentication
- Authentication

**Development**
Environment Setup
Ensure that MongoDB is running on your local machine or a server that is accessible to your application. If MongoDB is not installed, you can download and install it from MongoDB's official site.

**Connect to MongoDB**

**.env file**

1. Add local mongo database to the .env file
```bash
MONGO_URI: mongodb://mongo:27017/fast-chat
```
3. Add SESSION_SECRET with a random secret to the .env file
```bash
SESSION_SECRET=somethingsecret
```
```bash 
docker-compose up --build
```

This command rebuilds the services defined in your docker-compose.yml file and starts the updated application. Ensure that MongoDB-specific configurations are correctly set in your Docker configurations to avoid connection issues.



## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- [Docker](https://docs.docker.com/get-docker/) - Docker installation guide
- Docker Compose (optional, for multi-container setup)

### Installation

To deploy the ChatApp using Docker, follow these steps:

Clone the repository
   ```bash
  git clone https://github.com/aarya1302/fastchat
  cd fastchat
```
Build the Docker image
  ```bash
  docker build -t fastchat .

```
Run the application
Using Docker:
```bash
docker run -p 5000:5000 fastchat
```
Using Docker Compose:
```bash
docker-compose up
Replace 5000:5000 with the port configuration as per your setup.
```
Usage
After launching the app, visit http://localhost:5000 in your browser to start using ChatApp.


Authors
Aarya Bhorra 
License
This project is licensed under the MIT License - see the LICENSE.md file for details.
