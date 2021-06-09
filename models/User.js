const mongoose = require('mongoose');
//const Schema = mongoose.Schema; 
//alternate way is as below with ES6 destructuring
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
});

mongoose.model('users', userSchema);