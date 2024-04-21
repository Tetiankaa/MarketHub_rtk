import Joi from "joi";

const formValidator = Joi.object({
    email:Joi.string().pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/).required().messages({
        'string.pattern.base':'Email address must be in a valid format (Example: user@example.com)'
    }),
    password:Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/).messages({
        'string.pattern.base':'Password must have minimum 8 characters, at least one lowercase  letter, one uppercase letter and at least one digit'
    }),
    re_password:Joi.string().equal(Joi.ref('password')).messages({
        'any.only':'Passwords don\'t match'
    })
})

export {
    formValidator
}
