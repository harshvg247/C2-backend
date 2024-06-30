const { json } = require('express');
const User = require('../models/users');

exports.addQuestion = async (req, res) => {
    const { category, subCategory, title, link } = req.body;
    const user = await User.findById(req.user.user_id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // To select a subcategory with a given value from a user's categories in MongoDB, you can use the MongoDB query operators in combination with Mongoose methods to match the specific subcategory
    // Find the category
    let cat = user.categories.find(cat => cat.name.toLowerCase() === category.toLowerCase());
    if (!cat) {
        // If category doesn't exist, create it with the subcategory and question
        cat = {
            name: category,
            subCategories: [
                {
                    name: subCategory,
                    questions: [{ title: title, link: link }]
                }
            ]
        };
        user.categories.push(cat);
    } else {
        // If category exists, check for the subcategory

        let subCat = cat.subCategories.find(sub => sub.name.toLowerCase() === subCategory.toLowerCase());
        if (subCat) {
            // If subcategory exists, add the question to it
            let question = subCat.questions.find(question => question.title === title);
            if (question) {
                return res.status(409).json({ message: "Question with same title already exists" });
            } else {
                subCat.questions.push({ title: title, link: link });
            }
        } else {
            // If subcategory doesn't exist, create it with the question
            cat.subCategories.push({
                name: subCategory,
                questions: [{ title: title, link: link }]
            });
        }
    }
    // Save the updated user document
    await user.save();
    return res.status(200).json({ user: user });
}

exports.deleteQuestion = async (req, res) => {
    const { category, subCategory, title } = req.body;
    const user = await User.findById(req.user.user_id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    let cat = user.categories.find((cat) => cat.name == category);

    let subCat = cat.subCategories.find((subCat) => subCat.name == subCategory);
    subCat.questions.splice(subCat.questions.findIndex(question => question.title == title), 1);
    await user.save();
    return res.status(200).json({ user: user });
}

exports.toggleRevise = async (req, res) => {
    const { category, subCategory, question_title } = req.body;
    const user = await User.findById(req.user.user_id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // To select a subcategory with a given value from a user's categories in MongoDB, you can use the MongoDB query operators in combination with Mongoose methods to match the specific subcategory
    // Find the category
    let cat = user.categories.find(cat => cat.name === category);
    if (!cat) {
        return res.status(404).json({ error: 'Category not found' });
    } else {


        let subCat = cat.subCategories.find(sub => sub.name === subCategory);
        if (subCat) {
            let question = subCat.questions.find(question => question.title == question_title);
            if (!question) {
                return res.status(404).json({ error: 'Question not found' });
            }
            question.revise = !question.revise;
        } else {
            return res.status(404).json({ error: 'Subcategory not found' });

        }
    }

    // Save the updated user document
    await user.save();

    return res.status(200).json({ user: user });
}

exports.toggleCompleted = async (req, res) => {
    const { category, subCategory, question_title } = req.body;
    const user = await User.findById(req.user.user_id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // To select a subcategory with a given value from a user's categories in MongoDB, you can use the MongoDB query operators in combination with Mongoose methods to match the specific subcategory
    // Find the category
    let cat = user.categories.find(cat => cat.name === category);
    if (!cat) {
        return res.status(404).json({ error: 'Category not found' });
    } else {


        let subCat = cat.subCategories.find(sub => sub.name === subCategory);
        if (subCat) {
            let question = subCat.questions.find(question => question.title == question_title);
            if (!question) {
                return res.status(404).json({ error: 'Question not found' });
            }
            question.completed = !question.completed;
        } else {
            return res.status(404).json({ error: 'Subcategory not found' });

        }
    }

    // Save the updated user document
    await user.save();

    return res.status(200).json({ user: user });
}

exports.saveNotes = async (req, res) => {
    const { category, subCategory, question_title, notes } = req.body;
    const user = await User.findById(req.user.user_id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // To select a subcategory with a given value from a user's categories in MongoDB, you can use the MongoDB query operators in combination with Mongoose methods to match the specific subcategory
    // Find the category
    let cat = user.categories.find(cat => cat.name === category);
    if (!cat) {
        return res.status(404).json({ error: 'Category not found' });
    } else {


        let subCat = cat.subCategories.find(sub => sub.name === subCategory);
        if (subCat) {
            let question = subCat.questions.find(question => question.title == question_title);
            if (!question) {
                return res.status(404).json({ error: 'Question not found' });
            }
            question.notes = notes;
        } else {
            return res.status(404).json({ error: 'Subcategory not found' });

        }
    }

    // Save the updated user document
    await user.save();

    return res.status(200).json({ user: user });
}