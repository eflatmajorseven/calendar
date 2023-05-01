const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken")
const dbConfig = require("./config/db.config");
const config = require("./config/auth.config.js");
//const path = require('path');



const app = express();
const path = __dirname + '\\build\\';
app.use(express.static(path));

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
      })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    console.log(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`);
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
  res.json({ message: "hi" });
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// app.get('*', (req, res) => {
//       res.sendFile(path+'index.html');
// })

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}