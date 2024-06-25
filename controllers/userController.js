const { json } = require('express');
const User = require('../models/users');

exports.currentUser = async (req, res) => {
    console.log(req.user);
    const user = await User.findById(req.user.user_id);

    return res.status(200).json({user:user});
}