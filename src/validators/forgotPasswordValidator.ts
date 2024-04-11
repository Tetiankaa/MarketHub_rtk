import Joi from "joi";

const forgotPasswordValidator = Joi.object({
    email:Joi.string().pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/).required().messages({
        'string.pattern.base':'Email address must be in a valid format (Example: user@example.com)'
    })
})

export {
    forgotPasswordValidator
}
