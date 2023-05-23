const jwt = require("jsonwebtoken");
const { jwt_key } = require("../.env");

module.exports = app => {
  // route of the register and login
  app.post("/register", app.app.controllers.user.register);
  app.post("/auth", app.app.controllers.user.auth);

  // route inicial
  app.get("/", async function (req, res) {
    try {
      return res.send({ message: "Servidor rodando" });
    } catch (err) {
      console.log("error in running server : ", err);
      return res.status(400).send({ error: "Error in running server.", err });
    }
  });
};
