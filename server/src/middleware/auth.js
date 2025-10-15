import jwt from "jsonwebtoken"
import userModel from "../../db/models/user.model.js"
import dotenv from "dotenv";

dotenv.config(); 

export const auth = () => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Missing or invalid token" });
      }

      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded?.id) {
        return res.status(401).json({ msg: "Invalid token payload" });
      }

      const user = await userModel.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ message: "Authentication error", error });
    }
  };
};
