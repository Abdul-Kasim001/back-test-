import { tokenValidator } from "./token.js";
export   async function auth (req,res,next){
    try{
    const{jwt}=req.cookies;
    const valid =await tokenValidator(jwt);
    
    if(valid){
        next();
    }else{
        res.send("access Denied");
    }
}catch(error){
    return false;
}
}