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
    if (username && password) {// Check if username and password is provided
        if(!isValid(username)) {
            users.push({// Add new user details to users array
                "username": username,
                "password": password
            });
            return res.status(200).json({message: `User ${username} successfully registered`});
        }
        else {
            return res.status(400).json({message: `User ${username} already registered. Proceed to login.`});
        }
    }
    else {
        return res.status(400).json({message: "Please provide a username and a password"});
    }
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
        return res.status(200).json({message: "Login successful!"});
    }
    else {
        return res.status(400).json({message: "Invalid username or password"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
module.exports.registration = registration;