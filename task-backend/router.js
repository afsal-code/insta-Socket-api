import { Router } from "express";
import * as rh from './reqhandler.js';
import Auth from "./middleware/Auth.js";

const router = Router();

router.route('/adduser').post(rh.addUser);
router.route('/login').post(rh.login);
router.route('/getdata').get(Auth, rh.getData);

export default router;
