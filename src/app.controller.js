import dbConnection from "./Database/dbConnection.js"
import authRouter from "./modules/auth/auth.controller.js"
import userRouter from "./modules/user/user.controller.js"
import { globalErrorHandling } from "./utils/error/error.js"


const bootstrap = (app,express)=>{
    app.use(express.json())
    dbConnection()
  
  app.use('/auth' , authRouter)
  app.use('/user' , userRouter)
    app.use(globalErrorHandling)
    app.get('/', (req, res) => res.send('Hello World!'))
}

export default bootstrap