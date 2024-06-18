import { Router } from "express";

import admin from "./admin";
import auth from "./auth/auth";
import customer from "./customer";

const v1 = Router();


v1.use('/admin', admin);
v1.use('/user' , auth )
v1.use('/customer', customer)
export default v1;