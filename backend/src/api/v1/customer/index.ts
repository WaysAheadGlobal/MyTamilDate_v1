import { Router } from "express";
import profile from "./userprofile";
import { verifyUser } from "../../../middleware/verifyUser";
import setting from "./accountSetting";

const customer = Router();

// customer.use(verifyUser);
customer.use("/users", profile );
customer.use("/setting", setting)


export default customer;
