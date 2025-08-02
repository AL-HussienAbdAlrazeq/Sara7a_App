import { Router } from "express";
import { login, signup } from "./service/auth.service.js";



const authRouter = Router()

authRouter.post('/signup' ,signup)
authRouter.post('/login' , login)



export default authRouter



