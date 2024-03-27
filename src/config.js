const mongoose = require ("mongoose");
const connect = mongoose.connect("mongodb+srv://zan4936:QQqGa57tqTH915OT@cluster0.bnlgi8y.mongodb.net/");

// check database connected or not
connect.then(() =>{
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database cannot be connected");
})

// Create a mongoose.Schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,

    }

});

// collection part
const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;














// QQqGa57tqTH915OT
// zan4936