const mongoose = require("mongoose") ;

const connectDB = async() =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/Movie-Project");
  console.log("MongoDB connected");
    }
    catch(err){
  console.log(err);
    }
}
module.exports = connectDB;