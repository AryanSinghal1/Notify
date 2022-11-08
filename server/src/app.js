const express = require("express");
const app = express();
const cors = require("cors");
const userSchema = require("./Models/userModel");
const noteSchema = require("./Models/notesModel");
const bcrypt = require("bcryptjs");
require("./connection/Connection");
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
      console.log("Successfully Registered");
    })
    .catch((e) => console.log(e));
});
app.post("/login", async (req, res) => {
  const loginUser = await userSchema.findOne({ email: req.body.email });
  if (loginUser) {
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      loginUser.password
    );
    if (passwordMatch) {
      const token = await loginUser.generateAuthToken();
      console.log("Logged In");
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000),
        httpOnly: true,
      });
      res.json({ loginUser, token });
    } else {
      console.log("Invalid Password");
    }
  } else {
    console.log("No Such User Found");
  }
  // await loginUser.save().then((e)=>{console.log("Successfully Registered")}).catch(e=>console.log(e));
});
app.post("/create", async (req, res) => {
  const noteFound = await noteSchema.findOne({ user: req.body.userId });
  try {
    if (noteFound) {
      noteFound.notes.push({
        title: req.body.title,
        description: req.body.description,
      });
      await noteFound
        .save()
        .then((e) => console.log("Successfully Added"))
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
        .then((e) => console.log("Successfully Created"))
        .catch((e) => console.log(e));
    }
  } catch {
    (e) => console.log(e);
  }
});
app.listen(8000, console.log("Listening on port 8000"));
