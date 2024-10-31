import { Router } from "express";
const router = Router();

import { UserLogin, UserSignup ,find, Logout} from "../Controller/signUpController.js";

router.route("/api/users").post(UserSignup);

router.route("/api/auth").post(UserLogin);


router.route("/find").get(find);

router.route("/logout").post(Logout);


export default router;
