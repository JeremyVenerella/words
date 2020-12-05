const express = require("express");
const session = require("express-session");
const router = express.Router();
const User = require("../model/user.model");
const Word = require("../model/words.model");
const Admin = require("../model/admin.model");
const gtts = require("@google-cloud/text-to-speech");
const fs = require('fs');

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findUser(email, password);
  if (user) {
    req.session.user = user._id;
    req.session.role = user.role;
    res.json({
      message: "Logged in",
      auth: true,
    });
  } else {
    res.json({
      message: "failed to login",
      auth: false,
    });
  }
  console.log(user);
});

router.post("/signup", (req, res) => {
  const user = new User(req.body);
  req.session.user = user._id;
  user
    .save()
    .then((result) => {
      res.json({
        message: "user created",
        auth: true,
      });
      console.log(result);
    })
    .catch((err) => {
      res.json({
        message: "failed to create user",
        auth: false,
      });
      console.log(err);
    });
});

router.get("/hassignedin", (req, res) => {
  if (req.session.user) {
    return res.json({
      auth: true,
      message: "signed in",
    });
  }
  return res.json({
    auth: false,
    message: "not loggedin",
  });
});

router.get("/signout", (req, res) => {
  req.session.destroy();
  res.json({
    auth: false,
  });
});

router.get("/api/getAllWords", async (req, res) => {
  const adminID = req.session.user;
  console.log("adminID", adminID);
  try {
    const admin = await Admin.findAdmin(adminID);
    console.log("admin", admin);
  } catch (error) {
    console.log("Er: ", error);
  }

  //const admin = await Admin.findAdmin(req.session.user);
  //console.log(req.session.user);

  //console.log(req.session.user);
  const words = await Word.find();
  res.json({
    word: words,
  });
});

router.post("/postWord", async (req, res) => {
  const adminID = req.session.user;
  const admin = await Admin.findAdmin(adminID);

  if (admin) {
    const word = new Word(req.body);
    word
      .save()
      .then((result) => {
        res.json({
          message: "word created",
        });
        console.log(result);
      })
      .catch((err) => {
        res.json({
          message: "failed to create word",
        });
        console.log(err);
      });
  }
  return;
});

router.post("/api/postAdmin", async (req, res) => {
  const admin = new Admin(req.body);
  admin
    .save()
    .then((result) => {
      res.json({
        message: "admin created",
      });
      console.log(result);
    })
    .catch((err) => {
      res.json({
        message: "failed to create admin",
      });
      console.log(err);
    });
});

router.get("/tts", async (req, res) => {
  try {
    const text = req.query.word;
    // Construct the request
    const request = {
      input: { text: text },
      // Select the language and SSML voice gender (optional)
      voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
      // select the type of audio encoding
      audioConfig: {
           audioEncoding: "MP3"
         },      
    };
    const client = new gtts.TextToSpeechClient();
    const [response] = await client.synthesizeSpeech(request);
    let buff = response.audioContent;
    console.log('here');
    let base64data = buff.toString('base64');
    console.log('b64', base64data);
    res.json({
        sound: base64data,
    })

  } catch (error) {
     res.json(req.body)
  }
});

module.exports = router;
