const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwt_key } = require("../../.env");
const crypto = require("crypto");

module.exports = (app) => {
  const { User } = app.app.models.User;

  // generate token
  const generateToken = (params = {}) => {
    return jwt.sign(params, jwt_key, {
      expiresIn: 86400,
    });
  };

  // regsiter user
  const register = async (req, res) => {
    const { email, fullname, phone, password } = req.body;
    try {
      if (email == "" || fullname == "" || phone == "" || password == "") {
        return res
          .status(401)
          .send({ error: "Por favor preencha todos os campos!" });
      }

      const user = new User({
        email,
        fullname,
        phone,
        password,
      });

      await user.save();
      user.password = undefined;

      return res.status(201).send({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (error) {
      console.log("error in register a new user : ", error);
      return res
        .status(400)
        .send({ error: "error in register a new user", error });
    }
  };

  // authentication user
  const auth = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).send({ error: "User not found!" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: "Invalid password!" });
    }

    user.password = undefined;
    res.status(200).send({
      user,
      token: generateToken({ id: user.id }),
    });
  };

  return { register, auth };
};
