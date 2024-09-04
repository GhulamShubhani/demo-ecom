import express, { json, urlencoded }  from "express";
import cookieParser from "cookie-parser"
import cors  from "cors";
import path from "path"
 const app = express();

// console.log("0-0-0-0-",path.join(__dirname,"..", 'public'));


app.use(cors())
app.use(json({limit:"250kb"}))
app.use(urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"..", 'public')))
app.use(cookieParser())




import userRoute from "./routes/user.routes"
import catogaryRoute from "./routes/catogary.routes"
import productRouter from "./routes/product.routes";

app.use('/api/v1/user',userRoute)
app.use('/api/v1/catogary',catogaryRoute)
app.use('/api/v1/product',productRouter)


// for Admin
app.use('/api/v1/admin',userRoute)



export default app
