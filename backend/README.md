# My Books App

This is a Node.js application for managing books.

## Usage

This repository contains the backend for Books App project. It provides API endpoints to manage books, including uploading, downloading, and streaming.

## Getting Started

Follow these steps to set up and run the backend locally:

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [npm](https://www.npmjs.com/) (Node Package Manager) installed.

### Clone the Repository

```bash
git clone https://github.com/im3dabasia/books-app.git
cd backend
```

### Install Dependencies
npm install

### Set Up Environment Variables
Create a .env file in the root of your project and add the following environment variables:

# MongoDB connection string
````MONGODB_URI=mongodb://localhost:27017/your-database-name```

# SFTP Server credentials
```
SFTP_HOST=your-sftp-host
SFTP_USERNAME=your-sftp-username
SFTP_PASSWORD=your-sftp-password
```

### Start Application

```npm start```

### Routes

GET `/api/books`: Get a list of all books.

POST `/api/books`: Upload a new book. Use file field for the book file.

POST `/api/books/bulk-upload`: Bulk upload books. Use books field for an array of book objects.

GET `/api/books/:id`: Get details of a specific book.

DELETE `/api/books/:id`: Delete a book.

POST `/api/books/stream/:id`: Stream a book. (Streaming version)

POST `/api/books/no-stream/:id`: Download a book. (Non-streaming version)





