import { Router } from "express";
import User from "./UserRouter";
import Sub from "./SubRouter";
import Post from "./PostRouter";
import Auth from "../middleware/auth";


const router = Router();




router.use(Auth)
router.use("/user", User)
router.use("/sub", Sub)
router.use("/post", Post)


export default router;