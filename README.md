# Blogging Website

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://blogging-website-rbdk.onrender.com/)

## Overview

This is a blogging website where users can read, create, and manage blog posts. The website is built using Node.js, Express, MongoDB, and EJS, and is styled with Bootstrap. It is deployed on Render.com.

### Features

- User authentication and authorization
- Create, read, update, and delete (CRUD) blog posts
- Display a list of all blog posts on the homepage
- Responsive design

## Live Demo

Check out the live demo [here](https://blogging-website-rbdk.onrender.com/).

## Technologies Used

- **Frontend**: HTML, CSS, Bootstrap, EJS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Deployment**: Render.com

## Setup Instructions

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/KARANSINGH34951/blogging-website.git
    cd blogging-website
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Create a `.env` file** in the root directory with the following content:
    ```plaintext
    PORT=3000
    MONGO_URI=your_mongodb_connection_string
    ```

4. **Run the server**:
    ```sh
    npm start
    ```

5. Open your browser and go to `http://localhost:3000`.

## Folder Structure
blogging-website/
├── models
│   └── blog.js
│   └── user.js
├── routes
│   ├── blog.js
│   └── user.js
├── public
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   └── scripts.js
│   ├── images
│       └── logo.png
├── views
│   ├── partials
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   ├── home.ejs
│   ├── blog.ejs
│   ├── login.ejs
│   └── signup.ejs
├── middleware
│   └── authentication.js
├── .env
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md

markdown
Copy code

## Contributing

If you would like to contribute to this project, please fork the repository and create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [Bootstrap](https://getbootstrap.com/)
- [Render.com](https://render.com/)
