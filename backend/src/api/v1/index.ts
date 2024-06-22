import { Router } from "express";

import admin from "./admin";
import auth from "./auth/auth";
import customer from "./customer";
import { Sendmail } from "../../sendgrip/mail";

const v1 = Router();


v1.use('/admin', admin);
v1.use('/user' , auth )
v1.use('/customer', customer)
v1.use('/sendmail', Sendmail)
export default v1;