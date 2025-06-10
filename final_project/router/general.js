const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
let registration = require("./auth_users.js").registration;


/*
public_users.post("/register", (req,res) => {
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
});
*/
public_users.use("/register", registration); //Registration endpoint written above login in auth_users

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

module.exports.general = public_users;
