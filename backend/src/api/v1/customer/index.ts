import { Router, json, raw } from "express";
import profile from "./userprofile";
import { verifyUser } from "../../../middleware/verifyUser";
import setting from "./accountSetting";
import userFlowRouter from "./userflow";
import updateprofile from "./profileUpdate";
import matches from "./matches";
import chat from "./chat";
import webhookRouter from "./webhook";
import payment from "./payment";

const customer = Router();

customer.use("/webhook", raw({ type: 'application/json' }), webhookRouter);

customer.use(json({ limit: '15mb' }));

/* customer.use(verifyUser); */
customer.use("/users", profile);
customer.use("/setting", setting);
customer.use("/user", userFlowRouter);
customer.use("/update", updateprofile)
customer.use("/matches", matches);
customer.use("/chat", chat);
customer.use("/payment", payment);

export default customer;
