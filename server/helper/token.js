import jwt from"jsonwebtoken";
export const tokenGenertor =(email)=>{
    const token = jwt.sign(
        {email},
        process.env.JWT_KEY,
        {expiresIn:"3hours"}
    )
    return token;
}
export const tokenValidator =(token)=>{
    try{
    const data = jwt.verify(token,process.env.JWT_KEY);
    return(data)

}catch(error){
    return false;

}

}