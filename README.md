

---

# REST API

This project is a simple REST API built with Node.js and Express, using PostgreSQL for data storage. It demonstrates the creation of RESTful routes to handle CRUD operations, and can be used as a base for more complex applications.

## Features

- RESTful API design
- Supports **Create**, **Read**, **Update**, and **Delete** (CRUD) operations
- PostgreSQL database integration using **pg** (PostgreSQL client for Node.js)
- Follows best practices for route structure
- Uses Express.js for routing and middleware
- JSON-based request and response handling

## Technologies Used

- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web framework for Node.js
- **PostgreSQL**: Relational database for persistent storage
- **pg**: PostgreSQL client for Node.js to interact with the database
- **Postman** or **Insomnia**: For testing the API (or use curl)
  
## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) and npm should be installed.
- PostgreSQL should be installed and running. You’ll need to create a database for this project.

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sortechintu310/REST-api.git
   cd REST-api
   ```

2. **Install dependencies:**

   Run the following command to install all the required npm packages:

   ```bash
   npm install
   ```

3. **Set up PostgreSQL:**

   Make sure PostgreSQL is installed and running. Create a database for your project:

   ```bash
   createdb mydatabase
   ```

4. **Set up environment variables:**

   Create a `.env` file in the root directory to store environment variables like database connection settings. Example:

   ```bash
   PORT=5000
   PGUSER=your_pg_username
   PGPASSWORD=your_pg_password
   PGHOST=localhost
   PGDATABASE=mydatabase
   PGPORT=5432
   ```

5. **Run the application:**

   Start the Node.js server with the following command:

   ```bash
   npm start
   ```

   The server should start on the port defined in the `.env` file or the default port (5000).

## API Endpoints

Here are some common API endpoints used for handling CRUD operations. All routes handle JSON request bodies.

### Example Routes (adjust based on your API structure)

| Method | Endpoint           | Description             | Request Body |
|--------|--------------------|-------------------------|--------------|
| GET    | `/api/resource`     | Get all resources       | None         |
| GET    | `/api/resource/:id` | Get a specific resource | None         |
| POST   | `/api/resource`     | Create a new resource   | `{ "name": "value" }` |
| PUT    | `/api/resource/:id` | Update a resource       | `{ "name": "newValue" }` |
| DELETE | `/api/resource/:id` | Delete a resource       | None         |

## Usage

1. Use Postman, Insomnia, or any API testing tool to interact with the API.
2. Perform GET, POST, PUT, DELETE requests to the provided endpoints.
3. You can also use `curl` for testing:

   ```bash
   curl -X GET http://localhost:5000/api/resource
   ```

## Example Requests

### Create a New Resource (POST)

```bash
POST /api/resource
Content-Type: application/json

{
  "name": "Example"
}
```

### Get All Resources (GET)

```bash
GET /api/resource
```

### Update a Resource (PUT)

```bash
PUT /api/resource/:id
Content-Type: application/json

{
  "name": "Updated Name"
}
```

### Delete a Resource (DELETE)

```bash
DELETE /api/resource/:id
```

## Contributing

Feel free to fork this repository and submit pull requests to improve or add new features. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

## Contact

- GitHub: [sortechintu310](https://github.com/sortechintu310)

---

