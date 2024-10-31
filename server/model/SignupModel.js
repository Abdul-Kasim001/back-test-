import mongoose from "mongoose";

const { Schema, model } = mongoose;

const signupSchema = new Schema({
  UserName: { type: String, required: true },
	email: { type: String, required: true },
	phoneNumber: { type: Number, required: true },
	password: { type: String, required: true },
	confirmpassword: { type: String, required: true },
});

signupSchema.set("autoIndex", true);

const SignUpDb = model("sign", signupSchema);
SignUpDb.createIndexes();

export default SignUpDb;
