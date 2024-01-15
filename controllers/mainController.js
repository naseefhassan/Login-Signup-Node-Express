
const express = require("express");
const middleware = require("../validation/validaton");
const router = express.Router();
const Data = [];


router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  if (req.session.secure) {
    res.render("index");
  } else {
    res.redirect("/signup");
  }
});

router.get("/signup", (req, res) => {
  if (req.session.secure) {
    res.redirect("/");
  } else {
    res.render("signup");
  }
});

router.get("/login", (req, res) => {
  if (req.session.secure) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("destroying session");
      res.status(500).send("intreernal server error");
    } else {
      res.redirect("/login");
      console.log("session ended");
    }
  });
});
  
router.post("/signup", middleware, (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = Data.find((user) => user.email === email);

  if (existingUser) {
    // res.render("index")
    return res.status(400).send("This email has already a account");
  }

  const userData = {
    name: name,
    email: email,
    password: password,
  };
  console.log(userData);

  Data.push(userData);
  req.session.secure = password;
  res.redirect("/");
});


router.post("/loginAction", middleware,(req, res,next) => {
  const { email, password } = req.body;
  console.log(req.body);
    // console.log(Data);
  const Check = Data.find((u) => {
    return u.email == email && u.password == password
  });
  console.log(Check);
  if (Check) {
    req.session.secure = password;
    res.redirect("/");
  } else {
    res.redirect("/signup");
  }
});
// console.log(Data.email);
module.exports = router;
