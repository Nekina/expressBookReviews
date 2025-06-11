const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
// let isValid = require("./auth_users.js").isValid;
// let users = require("./auth_users.js").users;
const public_users = express.Router();
let registration = require("./auth_users.js").registration;



/*
public_users.post("/register", (req,res) => {
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
});
*/
public_users.use("/register", registration); //Registration endpoint written above login in auth_users.js




/**********************************
**                               **
**  Synchronous API endpoints    **
**                               **
**********************************/
//Starts here
/*
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
    const isbn = parseInt(req.params.isbn);
    if (books[isbn]) {
        return res.status(200).send(JSON.stringify(books[isbn], null, 4));
    }
    return res.status(404).send("Invalid ISBN");
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Write your code here
    const author = req.params.author;
    for (let isbn in books) { //Iterate through each book and return early if found
        if (books[isbn].author === author) {
            return res.status(200).send(JSON.stringify(books[isbn], null, 4));
        }
    }
    return res.status(404).send(`There is no available book with the author ${author}`);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    //Write your code here
    const title = req.params.title;
    for (let isbn in books) { //Iterate through each book and return early if found
        if (books[isbn].title === title) {
            return res.status(200).send(JSON.stringify(books[isbn], null, 4));
        }
    }
    return res.status(404).send(`There is no available book with the title ${title}`);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    //Write your code here
    const isbn = parseInt(req.params.isbn);
    if (books[isbn]) { //Check if ISBN is valid
        const reviews = books[isbn].reviews;
        if (reviews && Object.keys(reviews).length > 0) { //Check if there are any reviews
            return res.status(200).send(JSON.stringify(reviews, null, 4));
        }
        return res.status(200).send(`There are currently no reviews for the book with ISBN of ${isbn}`);
    }
    return res.status(404).send("Invalid ISBN");
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //Write your code here
    return res.status(200).send(JSON.stringify(books, null, 4));
});
*/
//Ends here




/**********************************
**                               **
**  Asynchronous API endpoints   **
**                               **
**********************************/
//Starts here

//Exposing books as an API endpoint to simulate Axios
public_users.get("/books", (req, res) => {
    return res.status(200).json(books);
})

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
    //Write your code here
    try {
        const isbn = parseInt(req.params.isbn);
        const response = await axios.get('http://localhost:5000/books');
        const booksData = response.data;
        if (booksData[isbn]) {
            return res.status(200).send(JSON.stringify(booksData[isbn], null, 4));
        }
        return res.status(404).send("Invalid ISBN");
    }
    catch (err) {
        console.error("Error fetching books:", err.message);
        return res.status(500).json({error: "Failed to fetch books"});
    }
});
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
    //Write your code here
    try {
        const author = req.params.author;
        const response = await axios.get('http://localhost:5000/books');
        const booksData = response.data;
        for (let isbn in booksData) { //Iterate through each book and return early if found
            if (booksData[isbn].author === author) {
                return res.status(200).send(JSON.stringify(booksData[isbn], null, 4));
            }
        }
        return res.status(404).send(`There is no available book with the author ${author}`);
    }
    catch (err) {
        console.error("Error fetching books:", err.message);
        return res.status(500).json({error: "Failed to fetch books"});
    }
});

// Get all books based on title
public_users.get('/title/:title', async function (req, res) {
    //Write your code here
    try {
        const title = req.params.title;
        const response = await axios.get('http://localhost:5000/books');
        const booksData = response.data;
        for (let isbn in booksData) { //Iterate through each book and return early if found
            if (booksData[isbn].title === title) {
                return res.status(200).send(JSON.stringify(booksData[isbn], null, 4));
            }
        }
        return res.status(404).send(`There is no available book with the title ${title}`);
    }
    catch (err) {
        console.error("Error fetching books:", err.message);
        return res.status(500).json({error: "Failed to fetch books"});
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    //Write your code here
    const isbn = parseInt(req.params.isbn);
    if (books[isbn]) { //Check if ISBN is valid
        const reviews = books[isbn].reviews;
        if (reviews && Object.keys(reviews).length > 0) { //Check if there are any reviews
            return res.status(200).send(JSON.stringify(reviews, null, 4));
        }
        return res.status(200).send(`There are currently no reviews for the book with ISBN of ${isbn}`);
    }
    return res.status(404).send("Invalid ISBN");
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
    //Write your code here
    //Exposed books at line 96 as a separate API endpoint for Axios demo
    try {
        const response = await axios.get('http://localhost:5000/books');
        const booksData = response.data;
        return res.status(200).send(JSON.stringify(booksData, null, 4));
    }
    catch (err) {
        console.error("Error fetching books:", err.message);
        return res.status(500).json({error: "Failed to fetch books"});
    }
});

//Ends here


module.exports.general = public_users;
