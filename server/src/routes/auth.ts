import { Router } from "express";
import { handleUserLogin, handleUserSignup } from "../controllers/users";
import { handleAdminLogin, handleAdminSignup } from "../controllers/admins";
import { authenticateJWT } from "../middlewares/authJWT";
import { getUser } from "../controllers/tickets";
import { validateStats } from "../middlewares/authStats";
import updateProfile from "../controllers/update";

const AuthRouter = Router();

AuthRouter.post("/signup", (req, res) => {
 
  const { role } = req.query;
  

  if (role === "user") handleUserSignup(req, res);
  else if (role === "admin") handleAdminSignup(req, res);
  else res.status(404).json({ message: "Role is not defined" });
});

AuthRouter.post("/login", (req, res) => {
  const { role } = req.query;

  if (role === "user") handleUserLogin(req, res);
  else if (role === "admin") handleAdminLogin(req, res);
  else res.status(404).json({ message: "Role is not defined" });
});

AuthRouter.get("/me", authenticateJWT, getUser);

AuthRouter.post(
  "/profile-update",
  authenticateJWT,
  validateStats,
  updateProfile
);

export default AuthRouter;
