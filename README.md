# Project Specification

**“Power Lab”** is a web application for food additives web shop. 
The client side is a single page app, built with **Angular**. 
The server is built on **Express JS** and it is using **Mongo Db** for storing the data. 
**Redux** is used as a state management library. Redux is a predictable state container for JavaScript apps. 
It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. 
The application consists of users, food additives products and orders. 
Each user can register, login and logout. Users can also search for the food additives they are looking for, view each food additives details and make orders. 
Admins can add, edit and delete food additives entries and approve orders.

# Functionality 

##### •	User Login 
    - o Login in current application using email and password of already registered user. 
##### •	User Register 
    - o Register a new user by providing email, password and username. 
##### •	User Logout 
    - o Logouts from the application. 
##### •	Home 
    - o List top-six food additives by user likes
    - o Add comments  
    - o Add vote. Each user can only vote once (1 – 10 scale) 
    - o Add review. 
##### •	Menu
    - o List all . Nine per page ordered alphabetically.  
    - o Search food additives by their name
    - o Add food additives to the cart or view details
##### •	Power Details
    - o Show food additives details
    - o Add food additives review
    - o Each user can like/unlike the food additives
##### •	Cart
    - o Users add food additives to the cart
    - o Users select quantity of the chosen product
    - o Users have option to remove product from the cart or refresh the quantity to one
    - o Users have option to checkout or to continue shopping
##### •	My orders
    - o List user orders
    - o Navigate to order details
##### •	Order Details
    - o Shows full order details
##### •	Power add 
    - o Admin route only
    - o Create a new food additives entry and save it to the database
##### •	Power edit 
    - o Admin route only
    - o Edit existing food additives entry and save it to the database
##### •	Power delete
    - o Admin route only
    - o Remove food additives entry from the database
##### •	Pending orders 
    - o Admin route only
    - o View all pending orders
    - o Navigate to order details
    - o Approve order
##### •	Approved orders 
    - o Admin route only
    - o View all approved orders
    - o Navigate to order details
