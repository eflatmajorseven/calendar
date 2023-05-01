const db = require("../models");
const config = require("../config/auth.config");

const User = db.user;
const Role = db.role;
const Slot = db.slot;

var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
    const user = new User({
      username: req.body.username,
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });
  
    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      if (req.body.roles) {
        Role.find(
          {
            name: { $in: req.body.roles }
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
  
            user.roles = roles.map(role => role._id);
            user.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
  
              res.send({ message: "User was registered successfully!" });
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          user.roles = [role._id];
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
  
            res.send({ message: "User was registered successfully!" });
          });
        });
      }
    });
  };

exports.signin = (req, res) => {

    User.findOne({
      username: req.body.username
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });
  
        var authorities = [];
  
        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
  };

exports.getAllUsers = (req,res) => {
  User.find({ })
      .then((data) => {
        res.json(data);
      })
      .catch((error)=> {
        res.status(500).send({ message: err})
        console.log('error retrieving users:', error)
      })
};

exports.getUserById = (req,res) => {
  console.log(req.params.id)
  User.findById(req.params.id, function (err, data){
    if (!data){
      res.status(404).send({message: "User not found"})
    }
    else {
      res.json(data);
    }
  }
)};

exports.getAllSlots = (req,res) => {
  Slot.find({ })
        .then((data)=> {
          //console.log(data);
          res.json(data);
          })
        .catch((error)=>{
          console.log('error: ', error);
        })
};

exports.createSlotAdmin = (req,res) => {
  console.log("slotas: " + req.body.name)
  //res.send({message: req.body.name + req.body.lastname})
const slot = new Slot({
  name: req.body.name,
  lastname: req.body.lastname,
  date: req.body.date,
  startShift: null,
  endShift: null
})
slot.save((err) => {
  if (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.send({message: "padarem slota"})
})
};

exports.saveSlot = (req,res) => {
  console.log("saveslot api:" + req.body.id)
  Slot.findByIdAndUpdate(req.body.id, {
    startShift: req.body.startShift,
    endShift: req.body.endShift
  })
  .then(user => {
    if (!user){
      return res.status(404).send({
        message: "slot not found by id" + req.body.id
      })
    }
    res.send(user)
  })
  .catch(err => {
    return res.status(500).send({
      message: "error updating slot by id" + req.body.id
    })
  }) 
}

exports.removeUser = (req,res) => {
  console.log(req.params.id)
  User.findByIdAndDelete(req.params.id)
  .exec()
  .then(doc => {
    if (!doc) {return res.status(404).end();}
    return res.status(204).end;
  })
  .catch((error) => {
    console.log('error removing user: ', error);
});
}