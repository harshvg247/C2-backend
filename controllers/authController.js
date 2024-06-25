const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
        return res.status(400).send("Provide username and password");
    }
    const user = await User.findOne({ name });
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
            {
                user_id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '5h',
            }
        )
        user.token = token;
        return res.status(200).json({user:user});
    }
    return res.status(400).send("invalid username or password");
}

exports.register = async (req, res) => {
    const {name, password, email} = req.body;
    if (!name ||!password ||!email) {
        return res.status(400).send("Provide username, password and email");
    }
    const user = await User.findOne({ name });
    if(user){
        return res.status(400).send("User already exists");
    }

    hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        name: name, 
        password:  hashedPassword,
        email: email.toLowerCase()
    });

    const token = jwt.sign(
        {
            user_id: newUser._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '5h',
        }
    )
    newUser.token = token;
    return res.status(200).json({user:newUser});
}