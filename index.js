require("dotenv").config();
const connectDB = require("./config/db");
const authMiddleware = require("./middlewares/auth");
connectDB();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');

const express = require("express");

const app = express();

const cors = require("cors") 
app.use(cors()) 

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/question', questionRoutes);

app.get("/", (req, res)=>{
    res.status(200).send("welcome");
})



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`PORT : ${port}`));
