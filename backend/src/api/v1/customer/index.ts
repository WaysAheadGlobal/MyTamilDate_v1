import { Router } from "express";
import profile from "./userprofile";
import { verifyUser } from "../../../middleware/verifyUser";
import setting from "./accountSetting";
import userFlowRouter from "./userflow";
import matches from "./matches";

const customer = Router();

// customer.use(verifyUser);
customer.use("/users", profile );
customer.use("/setting", setting);
customer.use("/user", userFlowRouter);
customer.use("/matches", matches);


export default customer;
