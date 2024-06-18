import { Router } from "express";
import profile from "./userprofile";
import { verifyUser } from "../../../middleware/verifyUser";

const customer = Router();

// customer.use(verifyUser);
customer.use("/users", profile );


export default customer;
