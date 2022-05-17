import joi from 'joi';

const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const signInSchema = joi.object({
    email: joi.string().required().pattern(validEmail),
    password: joi.string().required()
});
export const signOnSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().pattern(validEmail),
    password: joi.string().required(),
    repeatPassword: joi.string().required()
});
export const transactionPostSchema = joi.object({
    email: joi.string().pattern(validEmail).required(),
    date: joi.string().required(),
    tittle: joi.string().required(),
    value: joi.string().required(),
    type: joi.string().valid("in","out").required()
});
export const deleteSchema = joi.object({
    id: joi.string().required()
});
