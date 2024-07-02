import { Router } from "express";
import profile from "./userprofile";
import { verifyUser } from "../../../middleware/verifyUser";
import setting from "./accountSetting";
import userFlowRouter from "./userflow";

const customer = Router();

// customer.use(verifyUser);
customer.use("/users", profile );
customer.use("/setting", setting);
customer.use("/user", userFlowRouter);


export default customer;
