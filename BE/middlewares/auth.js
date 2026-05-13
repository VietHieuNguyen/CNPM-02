require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.auth = (req, res, next) => {
  const white_list = ["/", "/register", "/login"];

  if (white_list.find((item) => "/v1/api" + item === req.originalUrl)) {

    next();

  } else {

    if (req?.headers?.authorization?.split(" ")?.[1]) {

      const token = req.headers.authorization.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SCRET);
        req.user = {
          email: decoded.email,
          name: decoded.name,
          createdBy: "NguyenVietHieu",
        };
        next();
      } catch (error) {
        return res.status(401).json({
          message: "Token hết hạn/ hoặc không hợp lệ",
        });
      }
    }else{
      return res.status(401).json({
        message: "Bạn chưa truyền AccessToken ở header hoặc token hết hạn "
      })
    }
  }
};
