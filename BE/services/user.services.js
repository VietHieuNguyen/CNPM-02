require("dotenv").config();
const repo = require("../repositories/user.repo");
const bcrypt = require("bcrypt");
const salt = 10;
const jwt = require("jsonwebtoken");
module.exports.createUserService = async (name, email, password) => {
  try {
    const user = await repo.findUserByEmail(email);
    console.log(user);
    if (user) {
      console.log("User exist");
      return null;
    }
    const passwordHash = await bcrypt.hash(password, salt);
    const userData = {
      name: name,
      email: email,
      password: passwordHash,
    };
    const newUser = await repo.createUser(userData);
    return {
      EC: 0,
      EM: "Tạo user thành công",
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    };
  } catch (error) {
    return null;
  }
};

module.exports.loginService = async (email, password) => {
  try {
    const user = await repo.findUserByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return {
          EC: 2,
          EM: "Email/Password không hợp lệ",
        };
      } else {
        const payload = {
          email: user.email,
          name: user.name,
        };
        const access_token = jwt.sign(payload, process.env.JWT_SCRET, {
          expiresIn: process.env.JWT_ACCESS_EI,
        });
        return {
          EC: 0,
          access_token,
          user: {
            email: user.email,
            name: user.name,
          },
        };
      }
    } else {
      return {
        EC: 1,
        EM: "Email/Password không hợp lệ",
      };
    }
  } catch (error) {
    return null;
  }
};
module.exports.getUserService = async () => {
  try {
    const result = await repo.getAllUser();
    return result;
  } catch (error) {
    return null;
  }
};
