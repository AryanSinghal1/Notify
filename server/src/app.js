const express = require("express");
const app = express();
const cors = require("cors");
const userSchema = require("./Models/userModel");
const noteSchema = require("./Models/notesModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieparser = require('cookie-parser');
require("./connection/Connection");
app.use(cookieparser())
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello");
});
app.post("/register", async (req, res) => {
  const user = new userSchema({
    name: req.body.Name,
    email: req.body.Email,
    password: req.body.Password,
  });
  await user
    .save()
    .then((e) => {
      res.send("Successfully Registered");
    })
    .catch((e) => console.log(e));
});
app.get("/authenticate", async (req, res) => {
  const token = req.cookies.jwtoken;
  if(token){
    const verify = jwt.verify(token,"HelloeveryonewelcometoNotifyAppp");
    const user = await userSchema.findOne({_id:verify._id});
    if(user){
      res.json({user,message:'Welcome'});
    }else{
      console.log("Token Invalid");
    }
  }else{
    console.log("Token not found");
  }
})
app.post("/login", async (req, res) => {
  const loginUser = await userSchema.findOne({ email: req.body.email });
  console.log(loginUser);
  console.log(req.body);
  if (loginUser) {
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      loginUser.password
    );
    if (passwordMatch) {
      const token = await loginUser.generateAuthToken();
      console.log("Logged In");
      res.cookie("jwtoken", token, {
        // expires: new Date(Date.now() + 25892000),
        httpOnly: true,
      });
      console.log(req.cookies);
      res.json({ loginUser, token });
    } else {
      console.log("Invalid Password");
    }
  } else {
    console.log("No Such User Found");
  }
});
app.post("/create", async (req, res) => {
  const noteFound = await noteSchema.findOne({ user: req.body.userId });
  console.log(noteFound);
  console.log(req.body);
  try {
    if (noteFound) {
      noteFound.notes.push({
        title: req.body.title,
        description: req.body.description,
      });
      console.log(noteFound);
      await noteFound
        .save()
        .then((e) => res.send("Successfully Added"))
        .catch((e) => console.log(e));
    } else {
      const note = new noteSchema({
        user: req.body.userId,
      });
      note.notes.push({
        title: req.body.title,
        description: req.body.description,
      });
      await note
        .save()
        .then((e) => res.send("Successfully Created"))
        .catch((e) => console.log(e));
    }
  } catch {
    (e) => console.log(e);
  }
});
app.post('/notes', async(req, res)=>{
  const note = await noteSchema.findOne({user:req.body.userId});
  if(note){
    res.send(note);
  }
})
app.put('/update', async(req, res)=>{
  console.log(req.body);
  await noteSchema.findOneAndUpdate(
    {user: req.body.user},
    {$set: {"notes.$[el].description": req.body.description ,
           "notes.$[el].title": req.body.title} },
    { 
      arrayFilters: [{ "el._id": req.body.id }],
      new: true
    }
  ).then(e=>res.send("Success")).catch(err=>console.log(err));
})
app.post('/delete',async(req, res)=>{
  const {id, user} = req.body;
  await noteSchema.updateOne(
    {user: user},
    { $pull: { notes: { _id: id } } }
  ).then(e=>res.send("Success")).catch(err=>console.log(err));
})
app.listen(8000, console.log("Listening on port 8000"));
