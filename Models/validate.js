const joi = require("@hapi/joi");
const PasswordComplexity = require("joi-password-complexity");

exports.loginSchema = (data) => {
  const schema = joi.object({
    email: joi.string().min(6).required().email(),
    password: PasswordComplexity(),
  });
  return schema.validate(data);
};
