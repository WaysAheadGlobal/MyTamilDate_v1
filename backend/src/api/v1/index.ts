import { Router } from "express";

import admin from "./admin";

const v1 = Router();


v1.use('/admin', admin);
export default v1;