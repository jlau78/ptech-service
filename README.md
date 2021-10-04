# ptech-service

The ptech-service is an API service to the Catalog Database.

## Setup

### Setup MySQL 5.7 database

- Install MySQL 5.7
- Connect to the MySQL database 
- Create the ptech database
    + `create database ptech`
- In the MySQL Workbench run the following SQL scripts:
    + ./sql/createCatalog.sql
    + ./sql/insert_products.sql
### Setup NodeJS Application

- In the Terminal go to the root of this application
- Run: `npm init`
- Run: `npm install` 

## Run this API Service

To run this API service execute the command in a Terminal:

`node app.js`


