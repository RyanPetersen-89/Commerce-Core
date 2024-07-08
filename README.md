# Commerce Core

## Table of Contents
- Introduction
- Features
- Technologies
- Installation
- Usage
- API Endpoints
- Contributing
- Contact
- Collaborations

## Introduction

Welcome to the Commerce Core project! This project provides the backend functionality for an e-commerce platform, handling product, category, and tag management. It is built using Node.js and Express, and leverages Sequelize ORM for database interactions.

## Features

- Product Management: Create, read, update, and delete products.
- Category Management: Manage categories for organizing products.
- Tag Management: Add and manage tags for products.
- Relationships: Associate products with categories and tags.
- Error Handling: Comprehensive error handling for all API endpoints.

## Technologies

- Node.js: JavaScript runtime environment.
- Express.js: Web framework for Node.js.
- Sequelize: Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite, and Microsoft SQL Server.
- PostgresSQL: Relational database management system.
- JavaScript: Programming language.

## Installation

To install Commerce Core:

- Clone the repository: https://github.com/RyanPetersen-89/Commerce-Core.git

- Navigate to the project directory

- Open the terminal and install the dependencies by running the command: `npm install`

- Set up the PostgreSQL database:

  - Enter `psql -U postgres` to open the PostgreSQL command line interface. If prompted, input your password.
  - To set up the database, type `\i db/schema.sql` and press Enter.
  Now your database is ready to use!

- Remove '.EXAMPLE' from the .env.EXAMPLE file renaming it to .env

- Configure that .env file with your database credentials


## API Endpoints

- Products
  - GET /products: Retrieve all products.
  - GET /products/: Retrieve a single product by ID.
  - POST /products: Create a new product.
  - PUT /products/: Update a product by ID.
  - DELETE /products/: Delete a product by ID.

- Categories
  - GET /categories: Retrieve all categories.
  - GET /categories/: Retrieve a single category by ID.
  - POST /categories: Create a new category.
  - PUT /categories/: Update a category by ID.
  - DELETE /categories/: Delete a category by ID.

- Tags
  - GET /tags: Retrieve all tags.
  - GET /tags/: Retrieve a single tag by ID.
  - POST /tags: Create a new tag.
  - PUT /tags/: Update a tag by ID.
  - DELETE /tags/: Delete a tag by ID.

- Error Handling
  - Errors are handled with appropriate HTTP status codes and messages.

## Contribution
  - Fork the repository.
  - Create a new branch (git checkout -b feature-branch).
  - Make your changes.
  - Commit your changes (git commit -m 'Add some feature').
  - Push to the branch (git push origin feature-branch).
  - Open a pull request.

## Contact
For any questions or concerns, please contact rp26898@gmail.com.

## Collaborators

### [Kaila Ronquillo](https://github.com/girlnotfound)

### [Adam Rosenberg](https://github.com/AcoderRose)



