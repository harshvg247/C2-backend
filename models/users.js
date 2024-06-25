// user.js
const Mongoose = require("mongoose")

const questionSchema = new Mongoose.Schema({
    title: { type: String, required: true, unique: true },
    completed: { type: Boolean, default: false },
    revise: { type: Boolean, default: false },
    link: { type: String, required: true },
    notes: { type: String, required: false, default:""},
});

const subCategorySchema = new Mongoose.Schema({
    name: { type: String, required: true },
    questions: [questionSchema]
});

const categorySchema = new Mongoose.Schema({
    name: { type: String, required: true },
    subCategories: [subCategorySchema]
});

const UserSchema = new Mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    token: {
        type: String,
    },
    categories: [categorySchema]

})

const User = Mongoose.model("user", UserSchema);
module.exports = User
