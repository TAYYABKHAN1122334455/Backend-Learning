import express from 'express';
import cors from 'cors';
//import routes
import healthcheckRouter from './routes/healthcheck.routes.js';
import authRouter from './routes/auth.routes.js';
const app=express();
//Basic Configuration through middleware.
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"))

// cors configuration
app.use(
  cors({
    origin:process.env.CORS_ORIGN?.split(",") || "http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"]
  }))

app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/auth", authRouter);

app.get("/",(req,res)=>{
    res.send("Welcome to '/' page.");
});

export default app;