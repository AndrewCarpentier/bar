const router = require("express").Router();
const apiRouter = require("./api");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const User = require("../schemas/userSchema");

router.use("/api", apiRouter);

router.get("/", (req, res) => {
  res.json("api work 🥳");
});

router.post("/contact", (req, res) => {
  const { email, fullname, message, phone } = req.body;
  console.log(email);
  const transporter = nodemailer.createTransport({
    //host: "smtp.gmail.com",
    //port: 465,
    service: "gmail",
    auth: {
      user: "andr3wcarpentier@gmail.com",
      pass: "lmebtehgfblqhvxb",
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve("./views/"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views/"),
  };

  transporter.use("compile", hbs(handlebarOptions));

  const mailOptions = {
    from: "andr3wcarpentier@gmail.com",
    to: "andr3wcarpentier@gmail.com",
    subject: "Contact",
    template: "email",

    context: {
      email,
      fullname,
      message,
      phone,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.send(JSON.stringify(true));
});

router.post("/passwordLost", async (req, res) => {
  const { email } = req.body;
  const users = await User.find({ email });
  if (users.length === 0) {
    res.json(false);
  }

  const transporter = nodemailer.createTransport({
    //host: "smtp.gmail.com",
    //port: 465,
    service: "gmail",
    auth: {
      user: "andr3wcarpentier@gmail.com",
      pass: "lmebtehgfblqhvxb",
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve("./views/"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views/"),
  };

  transporter.use("compile", hbs(handlebarOptions));
  const mailOptions = {
    from: "andr3wcarpentier@gmail.com",
    to: email,
    subject: "Change password",
    template: "passwordLost",

    context: {
      name: email,
      email,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.json(false);
    } else {
      res.json(true);
    }
  });
});

module.exports = router;
