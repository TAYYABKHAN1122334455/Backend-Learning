import { body } from "express-validator";

export const userRegisterValidator=()=>{
    return [
        body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invaild"),

        body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLowercase()
        .withMessage("Username mus be in lovercase")
        .isLength({min:3})
        .withMessage("Username must be atleast 3 characters"),

        body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required"),

        body("fullName")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Full name cannot be empty if provided")
     ];
}
export const userLoginValidator = () =>{
    return[
        body("email")
        .optional()
        .isEmail()
        .withMessage("Email is inValid"),

        body("password")
        .notEmpty()
        .withMessage("Password is required")
    ]
}
