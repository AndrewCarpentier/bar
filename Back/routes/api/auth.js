const router = require("express").Router();
const User = require("../../schemas/userSchema");
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../key");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const { email, password, passwordConfirm } = req.body;
  User.createUser(email, password, (error, user) => {
    if (error) {
      return res.status(500).json(error);
    }
    res.json({ user });
  });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not exist" });
  }
  user.comparePassword(password, (passwordErr, isMatch) => {
    if (passwordErr) {
      return res.status(500).json(passwordErr);
    }
    if (!isMatch) {
      return res.status(401).json({ message: "Password not match" });
    }
    const token = jsonwebtoken.sign({}, key, {
      subject: user._id.toString(),
      expiresIn: 3600 * 24 * 31 * 12,
      algorithm: "RS256",
    });
    res.cookie("auth", token, {
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });
    res.json(user);
  });
});

router.get("/current", async (req, res) => {
  const { auth } = req.cookies;
  if (auth) {
    const decodedToken = jsonwebtoken.verify(auth, keyPub);
    console.log(decodedToken);
    const user = await User.findById(decodedToken.sub);
    if (user) {
      res.json(user);
    } else {
      res.json(null);
    }
    console.log(user);
  } else {
    res.json(null);
  }
});

router.delete("/signout", (req, res) => {
  res.clearCookie("auth", {
    sameSite: "none",
    httpOnly: true,
    secure: true,
  });
  res.end();
});

router.put("/updatePassword", async (req, res) => {
  const { password, email } = req.body;
  bcrypt.hash(password, 10, async (error, hash) => {
    if (error) {
      return cb(error);
    }
    let user = await User.find({ email });
    user[0].password = hash;
    await User.findByIdAndUpdate(user[0]._id, user[0]);
    res.json(true);
  });
});

module.exports = router;
