const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require("./config");

const app = express();
// convert data into json format
app.use(express.json());

app.use(express.urlencoded({extended: false}));

// use ejs as the view engine
app.set('view engine', 'ejs');
// static file
app.use(express.static("public"));

// Set the views directory to "src/views"
app.set('views', path.join(__dirname, 'views'));


app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/home", (req, res) => {
    res.render("home");
});


// Register User
app.post("/signup", async (req, res) =>{
    console.log(req.body);

    const data = {
        name: req.body.username,
        password: req.body.password,
    }

    // check if the user already exists in the database
    const existinguser = await collection.findOne({name:data.name});
    if(existinguser) {
        res.send("User already exists. Please choose a different name");
    }else {
        // hash password using bcrypt
        const saltRounds = 10; //Num of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; //replace hashed password with original password


        const userdata = await collection.insertMany(data);
        console.log(userdata);

        
        // Redirect to signup page after successful registration
        res.redirect("/login");

    }

})

// Login User
app.post("/login", async (req, res) => {
    try{
        const check = await collection.findOne({name: req.body.username});
        if(!check) {
            res.send("User name not found");
        }

        // compare the hash password from the database with the plain text
        const passwordMatch = await bcrypt.compare(req.body.password, check.password);
        if(passwordMatch) {
            res.redirect("home");
        }else {
            req.send("Wrong password");

        }
    }catch{
        res.send("Wrong Details");
    }
})




const port = 3000;
app.listen(port, () => {
    console.log(`server running on port: ${port}`);

})