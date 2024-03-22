# Photo Sharing App

### This Photo Sharing App is built using MERN Stack i.e React, Node.js, Express.js and MongoDB.

### This app is based on client-server architecture, which serves the apis from the server such as login, register, photo uploads

### It using important packages on server side such as file-upload package, cors to enable cross-origin-resource-sharing, uuid for creating unique names for images, bcrypt for hashing passwords before saving them to the database

``` javascript
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
