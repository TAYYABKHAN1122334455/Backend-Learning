import express from 'express';
import cors from 'cors';

const app=express();
//Basic Configration through middleware.
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"))

// cors configration
app.use(
  cors({
    origin:process.env.CORS_ORIGN?.split(",") || "http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"]
  }))
// import the routes

import healthcheckRouter from './routes/healthcheck.routes.js';

app.use("/api/v1/healthcheck", healthcheckRouter)
app.get("/",(req,res)=>{
    res.send("Welcome to '/' page.");
});

export default app;