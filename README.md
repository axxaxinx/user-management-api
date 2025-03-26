Project Overview:
    This API is a user management API that uses CRUD (Create, Read, Update, Delete). This is created using Node.js with Typescript and TypeOrm for the database connection. The API framework used is Express.js

Setup Instructions:

    Node.js and npm installed
    MySql database set up
    Have PostMan (for testing purposes)

    Installtion Process:
        1. Clone the repository:
            git clone https://github.com/your-username/user-management-api.git
            cd user-management-api

        2. Install dependencies:
            npm install

        3. Run the application:
            npm run dev

API Documentation:

    Create User:
    POST  http://localhost:3000/users
    Body: {
        "firstName": "Jane",
     "lastName": "Doe",
    "email": "Jane@example.com"
    }

     All Users:
     http://localhost:300/users

    Get a single user:
     http://localhost:3000/users/:id


    Delete a user:
    DELETE http://localhost:3000/users/:id

Testing:
Testing will be done in Postman while the server is active. 