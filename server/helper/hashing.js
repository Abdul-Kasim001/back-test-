import bcrypt from"bcrypt";
const saltRounds=10;
export const hashGenerate =async(plainPassword)=>{
const salt = await bcrypt.genSalt(saltRounds);
const hash  = await bcrypt.hash(plainPassword,salt)
return hash;
}
export const hashValidator = async(plainPassword,hashpassword)=>{
    const result = await bcrypt.compare(plainPassword,hashpassword);
    return result; 

 }
