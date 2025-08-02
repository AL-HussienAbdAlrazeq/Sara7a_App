import { Router } from "express";
import { getAllUsers } from "./service/user.service.js";




const userRouter = Router()

userRouter.get('' , getAllUsers)

export default userRouter