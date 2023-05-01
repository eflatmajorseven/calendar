const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
      );

    app.post("/api/auth/signin", controller.signin); 

    app.get("/api/auth/users",
            [authJwt.verifyToken, authJwt.isAdmin],
            controller.getAllUsers
      )
    app.get("/api/auth/user/:id",
          [authJwt.verifyToken],
          controller.getUserById
    )

      app.post(
        "/api/auth/slot", 
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.createSlotAdmin
      );
      
      app.get(
        "/api/auth/slots",
        [authJwt.verifyToken],
        controller.getAllSlots
      );
      app.post(
        "/api/auth/saveslot", 
        [authJwt.verifyToken],
        controller.saveSlot
      );
      app.delete(
        "/api/auth/removeuser/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.removeUser
      );
};