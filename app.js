// express and app so the connection to the server is good and working
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt=require("bcryptjs");

const jwt=require("jsonwebtoken");
const JWT_SECRET = "alsdkjawlkdjawldkj2312323()akjhsbd198237"

const mongoUrl="mongodb+srv://ramandbytes:ramandbytes123@ramandbytesdb.szuzc6t.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
})
.then(()=>{console.log("Connected to database");
}).catch((e) => console.log(e));

// If everything works and there is a connection the console will display the message below
app.listen(5000, () =>{
    console.log("A connection to the server was established on localhost 3000")
});

require ("./financialData")
const UserFinancial = mongoose.model("FinancialData")

require("./userSchema")

const User=mongoose.model("UserInfo")

app.post("/register" , async(req, res) => {
    const {fname,lname,email,uname, password} = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        const oldUser= await User.findOne({email});
        const oldUser2 = await User.findOne({uname});

        if (oldUser) {
            return res.send({ Error: "User already exists"});
        }
        if (oldUser2) {
            return res.send({ Error: "User Already exists"})
        } 

        await User.create({
            fname,
            lname,
            email,
            uname,
            password:encryptedPassword,
        });
        res.send({ status: "Successful"});

    } catch (error) {
        res.send({ status: "Unsuccessful"});
    }
} );

app.post("/login", async (req, res) => {
    const {password, uname} = req.body;

    const user = await User.findOne({uname});

    if (!user) {
        return res.json({ error: "User Not Found"});
    }
    if(await bcrypt.compare(password,user.password)){
        const token=jwt.sign({uname:user.uname}, JWT_SECRET);

        if(res.status(201)){
            return res.json({status:"ok", data: token});
        } else {
            return res.json({ error: "error"});
        }
    }
    res.json({status:"error", error: "Invalid Password"});

});

app.post("/financialdata" , async(req, res) => {
    const {clamount, clterm, cirate, cbcost, ccbal, ccapr, damt, dapy, dterm, mlamount, mlterm, mirate, mbcost} = req.body;
    
    await UserFinancial.create({
        clamount, clterm, cirate, cbcost, ccbal, ccapr, damt, dapy, dterm, mlamount, mlterm, mirate, mbcost
    });
})

app.post("/userData",async(req,res) => {
    const {token} = req.body;
    try {
        const user=jwt.verify(token,JWT_SECRET);
        const username = user.uname;
        User.findOne({uname: username}).then((data)=>{
            res.send({ status: "valid", data: data});
        }).catch((error) => {
            res.send({ status: "error", data: error});
        });
    } catch (error) {}
} )