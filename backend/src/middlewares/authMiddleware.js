const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret123"
    );

    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT Error:", error.message); // 👈 add this
    return res.status(401).json({
      message: "Not authorized, invalid token",
    });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Access denied, admin only",
    });
  }
  next();
};