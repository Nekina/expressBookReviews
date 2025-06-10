const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();
const registration = express.Router();

let users = []; //An array of objects containing username and password

const isValid = (username)=>{ //returns boolean
//write code to check if the username is already registered
    const usersWithSameName = users.filter(user => {
        return (user.username == username);
    });
    return (usersWithSameName.length > 0);
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    const filteredUser = users.filter(user => {
        return (user.username === username && user.password === password);
    });
    return (filteredUser.length > 0);
}

// Register users to enable login
registration.post("/", (req, res) => {
    const {username, password} = req.body;
    if (username && password) { //Check if username and password is provided
        if(!isValid(username)) { //Check if username is not yet registered
            users.push({
                "username": username,
                "password": password
            });
            return res.status(200).json({message: `User ${username} successfully registered`});
        }
        return res.status(400).json({message: `User ${username} already registered. Proceed to login.`});
    }
    return res.status(400).json({message: "Please provide a username and a password"});
});

//only registered users can login
regd_users.post("/login", (req,res) => {
    //Write your code here
    const {username, password} = req.body;
    const payload = {username};
    if (authenticatedUser(username, password)) {
        const token = jwt.sign(payload, "aVerySecretKey", {expiresIn: "1h"});
        req.session.jwt = token;
        req.session.user = username;
        return res.status(200).send(JSON.stringify({message: "Login successful! Showing token for demonstration purposes only", user: username, JWT: token}, null, 4));
    }
    return res.status(400).json({message: "Invalid username or password"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const isbn = parseInt(req.params.isbn);
    const review = req.query.review;
    const user = req.session.user;
    if (!books[isbn]) { //Check if ISBN is valid
        return res.status(400).send("Invalid ISBN");
    }
    if (!(review && review.length > 0 && review !== "")) { //Check if review is valid
        return res.status(400).send("Invalid review");
    }
    books[isbn].reviews[user] = review; //Assigns a new property with key=user and value=review
    return res.status(200).send(`Posted review. Full book details:\n${JSON.stringify(books[isbn], null, 4)}`);
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = parseInt(req.params.isbn);
    const user = req.session.user;
    if (!books[isbn]) { //Check if ISBN is valid
        return res.status(400).send("Invalid ISBN");
    }
    if (!books[isbn].reviews[user]) { //Check if review exists
        return res.status(200).send(`No review to delete. Full book details:\n${JSON.stringify(books[isbn], null, 4)}`)
    }
    delete books[isbn].reviews[user];
    return res.status(200).send(`Deleted review. Full book details:\n${JSON.stringify(books[isbn], null, 4)}`);
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.registration = registration;