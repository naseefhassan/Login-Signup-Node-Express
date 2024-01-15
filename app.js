const express = require("express");
const path = require("path");
const app = express();
const port = 4444;
const session = require("express-session");
const nocache=require("nocache")

app.use(express.urlencoded({ extended: true }));

app.use(nocache())

app.use(
    session({
        secret: "naseef@koloth",
        resave: false,
        saveUninitialized: true,
    })
    );
    
    const mainController = require("./controllers/mainController");

    app.set("view engine", "ejs");
    app.set("views", path.join(__dirname, "Views"));
    
    app.use("/", mainController);

    app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
