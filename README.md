# expressBookReviews

A RESTful API built with Node.js and Express.js that enables users to manage book reviews with secure authentication and modular design.

## Features

- CRUD operations for book reviews (Create, Read, Update, Delete)  
- User authentication and authorization using JWT and Express Session  
- Modular routing with Express Routers  
- Real-time server updates with Nodemon during development  
- External HTTP requests handled via Axios  
- API endpoint testing facilitated through Postman and cURL  
- Asynchronous code implemented with async/await for clean callbacks

## Tech Stack

- **Node.js** – JavaScript runtime environment  
- **Express.js** – Web framework for building RESTful APIs  
- **JWT & express-session** – User authentication and session management  
- **Axios** – For making HTTP requests  
- **Nodemon** – Tool for live-reloading during development  
- **Postman / cURL** – API testing tools  
- **JavaScript (ES6+)** – Language features including async/await  
- **Apache-2.0 License** – Open-source license :contentReference[oaicite:0]{index=0}

## Installation and Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Nekina/expressBookReviews.git
   cd expressBookReviews
2. Install dependencies
   ```bash
   npm install
3. Configure environment variables (e.g., JWT secret, session store) as needed.  
4. Start the server in development mode (with live-reloading)
   ```bash
   npm run dev
5. Use Postman or cURL to test API endpoints—available routes include review creation, retrieval, updates, and deletion.  
6. (Optional) Run the server without live reload
   ```bash
   npm start
