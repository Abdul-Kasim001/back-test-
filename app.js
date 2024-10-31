import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express();
app.use(express.json())



app.use(cors());

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error())
    }
  }
}
app.use(cors({
  origin: '*'
}));

app.use(cookieParser());
app.use(
  json({
    limit: "25MB",
  })
);
//login logout control

import Usersignup from "./server/routes/SignupRouter.js";

import UserLogin from "./server/routes/SignupRouter.js";

import Logout  from "./server/routes/SignupRouter.js";

import {auth} from"./server/helper/authverify.js";
//login logout control

app.use("/", Usersignup);

app.use("/", UserLogin);

app.use("/",Logout)

//contact message control

app.use("/pro",auth,(req,res)=>{
  res.send(" it ok")
});

export default app;
