import express from "express";
import mongoose from "mongoose";
import { User } from "../models/User.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/login", async (req, res) => {
  console.log(`req received to login endpoint ${JSON.stringify(req.body)} \n`);

  const { username, password } = req.body;

  let userExists = await User.findOne({ username: username });

  if (userExists) {
    let password_ = userExists.password;

    bcrypt.compare(password, password_, function (err, response) {
      if (err) {
        res.status(401).json({ message: "wrong password" });
      } else {
        if (response) {
          console.log("user was successfully authenticated \n");
          req.session.isAuthenticated = true;
          req.session.username = userExists.username;

          res.status(200).json({
            message: "user was successfully authenticated",
            username: userExists.username,
          });
        } else {
          console.log(`passwords do not match --- \n`);
          res.status(401).json({ message: "incorrect password" });
        }
      }
    });
  } else {
    res.status(404).json({ message: "this user does not exist" });
  }
});

router.post("/register", (req, res) => {
  console.log(`req received to /register endpoint  --- ${req.body} \n`);

  const { password, username, email } = req.body;

  bcrypt.genSalt(10, async function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      let userExists = await User.findOne({ username: username });

      let passwordExists = await User.findOne({ password: hash });

      if (userExists) {
        res.status(409).json({ message: "user already exists" });
      } else if (passwordExists) {
        res.status(409).json({ message: "this password is already in use" });
      } else {
        try {
          const newUser = await User.create({
            username: username.trim(),
            password: hash,
            email: email,
          }).then((result) => {
            console.log(result, " --- newUser created");
            res.status(200).json({
              message: "User created successfully!",
            });
          });

          console.log("password hashed and stored successfully!");
        } catch (error) {
          res.status(404).json({ message: "error happened" });
        }
      }
    });
  });
});

router.post("/login-status", async (req, res) => {
  console.log(`req recieved to the login-status endpoint and session --- ${JSON.stringify(req.session)} \n`);

  const loginStatus = isAuthenticated(req.session);

  if (!loginStatus) {
    console.log(`req not authorized in /login-status endpoint`)
    res.status(401).json({
      message: "User not authorized to view the resource!!",
      user: req.session.username,
    });
  } else {
    res
      .status(200)
      .json({
        message: "user currently logged in",
        username: req.session.username,
      });
  }
});

router.post("/logout" , (req,res) => {

    console.log(`you have hit /logout route with a request`);

    req.session.destroy(function(err) {
        if (!err) {
            res.status(200).json({message: "logged out successfully!!!"})
        } else {
            res.status(401).json({ message: "error happened while logging out" });
        }
    })

})

router.get("/dummy-route", (req, res) => {
  console.log(`you have hit /dummy-route route with a request`);

  res.status(200).json({ message: "hello from /dummy-route"})
});

export { router as authRouter };
