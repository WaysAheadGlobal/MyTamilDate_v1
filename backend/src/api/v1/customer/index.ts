import { Router } from "express";
import profile from "./userprofile";
import { verifyUser } from "../../../middleware/verifyUser";
import setting from "./accountSetting";
import userFlowRouter from "./userflow";
import updateprofile from "./profileUpdate";
import matches from "./matches";
import chat from "./chat";

const customer = Router();

// customer.use(verifyUser);
customer.use("/users", profile );
customer.use("/setting", setting);
customer.use("/user", userFlowRouter);
customer.use("/update",updateprofile )
customer.use("/matches", matches);
customer.use("/chat", chat);


export default customer;
