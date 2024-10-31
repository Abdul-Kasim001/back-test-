
import Joi  from "joi";
import passwordComplexity from "joi-password-complexity";
export const validate = (data) => {
	const schema = Joi.object({
		UserName: Joi.string().required().label("UserName"),
		email: Joi.string().email().required().label("Email"),
		phoneNumber: Joi.string().required().label("phoneNumber"),
		password: passwordComplexity().required().label("Password"),
		confirmpassword: passwordComplexity().required().label("confirmpassword"),
	});
	return schema.validate(data);
};

