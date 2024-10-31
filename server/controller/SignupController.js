import SignUpDb from "../model/SignupModel.js";
import{hashGenerate, hashValidator}  from"../helper/hashing.js"
import { tokenGenertor, tokenValidator } from "../helper/token.js";

export async function UserSignup(req, res, next) {
  try {
    const data = req.body;
    const hashpassword= await hashGenerate(data.password)
    const existUser = await SignUpDb.findOne({ email: data.email });
    const details = {
      Username: data.Username,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: hashpassword,
      confirmpassword:data.confirmpassword
  };
    if (existUser) {
      res.status(409).json({
        message: "user already exist",
        data: existUser,
      });
    } else {
      // if(existUser){
      const createUser = await SignUpDb.create(details);
      console.log("details", createUser);
      res.status(201).json({
        message: "User Created Successfully",
        data: createUser,
      });
    }
  } catch (err) {
    console.log(err);
    next();
  }
}

export async function UserLogin(req, res, next) {
  try {
    const data = req.body;
    const existUser = await SignUpDb.findOne({ email: data.email });
    if(!existUser){
      res.send("email is invalid")
    }else {
      const checkPassword = await hashValidator( data.password,existUser.password ) ;
      console.log("checkPassword", checkPassword);

      if (!checkPassword) {
        
       res.status(400).json({
          message: "password not matched",
        });
      
    } else {
      const token = await tokenGenertor(existUser.email);
      res.cookie("jwt",token);
      res.send(token);
    }
  }
  } catch (err) {
    console.log(err);
    next();
  }
}
export async function find(req, res) {
  if (req.query.id) {
    const id = req.query.id;

   SignUpDb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Erro retrieving user with id " + id });
      });
  } else {
   SignUpDb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error Occurred while retriving user information",
        });
      });
  }
}
export async function Logout(req,res,next){
  try{
    
      res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .send();
    }
    
    catch (err) {
      console.log(err);
      next();
    }
}
