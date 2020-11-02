# Apparels-API

This is the back end server for the Apparels (ecommerce application). It uses noSQL database (mongoDB) where interaction with 3 types of resources (users, items and cart) is performed using mongoose. Express Framework is used to build this application. This application is deployed on Heroku.

## Links

**Deployed Application:** < https://whispering-hollows-83607.herokuapp.com/ > + <URI_from_documenation>

**Front-End Repo:** <https://github.com/maharit108/apparel-client>

**Front End Deployed Site:** <https://maharit108.github.io/apparel-client/>

## Technologies Used
  - express.js
  - mongoose
  - MongoDB
  - node
  - Heroku
  - bycrypt
  - crypto
  - passport

## Planning Story
This application has 3 resources- users, items and cart. Users model is used to store account information (email, password, isOwner, token) of customers and owner. Item model is used to store information about items that are put up by owner for sale. Cart model is used to store items liked by customers. CRUD actions on these resources is what basically gives functionality to e-commerce website. Tokens are used to keep track of sign in user.
Routes are set up flexible, just checking ownership of items for edit, delete actions, so that this application can be used by client side as required. Front end put other rules as required.

## User Stories
  - As a client, I would like to be able to make user accounts and sign in (CREATE, GET requests)so that my personal operations can only be done by me.
  - As a client, I would like to make PATCH request to change password and DELETE request to sign out.
  - As a client, I would like to make GET request without having to sign in, so that everyone can see all items on sale
  - As a client, I would like to add items to cart with or without signing in.
  - As a client, I would like to be able to make (POST, PATCH, DELETE) add, delete items in my cart
  - As a client-owner, I would like to be able to add, edit and delete items for sale.
___
## Unsolved Problems/ Future Upgrades
This project along with the Front end application interacting with this API was build in the course of a week. Due to time constraints, some features couldn't be added. Some features I would add in the future are:
  - Make use of stock property in items model to keep track of number of items.
  - Add payment model to store and keep track of payment information of clients
___
## ERD
<img src='.\ERD.jpeg' />
