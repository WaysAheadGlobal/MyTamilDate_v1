import { Router } from "express";

import users from "./users";
import dashboard from "./dashboard";
import adminAuth from "./auth";
import promotions from "./promotioncode";


const admin = Router();


admin.use("/users", users);
admin.use("/dashboard", dashboard)
admin.use("/adminlogin", adminAuth)
admin.use("/promotioncode", promotions)

export default admin;