# Photo Sharing App

## Overview

The Photo Sharing App is built using the MERN Stack, which includes React, Node.js, Express.js, and MongoDB. This app follows a client-server architecture and provides APIs from the server for functionalities like user authentication, photo uploads, and more.

## Features

- **User Authentication**: Secure login and registration functionality.
- **Photo Upload**: Allows users to upload and share photos.
  
## Backend Technologies

The server-side of this app utilizes important packages for various functionalities:

- **File Upload**: Utilizes `express-fileupload` package for handling file uploads.
- **Cross-Origin Resource Sharing**: Implements CORS using `cors` to enable cross-origin resource sharing.
- **Unique Image Names**: Uses `uuid` version 4 to generate unique names for uploaded images.
- **Password Hashing**: Utilizes `bcrypt` to hash passwords before saving them to the database.

### Example: Password Hashing Function

Here's an example of the function used to hash passwords before saving them in the database:

```javascript
// function to hash passwords before saving them in the database
userSchema.pre('save', async function (next) {
    try {
        const user = this;
        if (!user.isModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

```

## Installation

```bash
// Clone the repository
git clone https://github.com/atharvdange618/ReactJS-Practice.git

// Change the directory
cd Photo-Sharing-App

//Install the necessary dependencies
npm install

//Run the application
npm run dev
```

## Contribution

Your contributions and suggestions are welcome! Here's how you can contribute to this repository:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## Contact

If you have any questions or suggestions, please feel free to contact me:

- Email: [atharvdange.dev@gmail.com](mailto:atharvdange.dev@gmail.com)
- LinkedIn: [Atharv Dange](www.linkedin.com/in/atharvdange)
- Twitter: [@atharvdangedev](https://twitter.com/atharvdangedev)