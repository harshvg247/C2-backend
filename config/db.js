// db.js
const Mongoose = require("mongoose")
const URI = process.env.MONGO_URI; 
const connectDB = async () => {
  await Mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("MongoDB Connected")
}
module.exports = connectDB