import { body, param } from "express-validator";
import { handleErrors } from "./handle-errors.js";
import { validateFields } from "./validate-fields.js";
import { validateJWT } from "./validate-jwt.js";
import { enterpriseExist } from "../helpers/db-validators.js";

export const registerEnterpriseValidator = [
    validateJWT,
    body("name").custom(enterpriseExist).withMessage("The Enterprise is already registered"),
    validateFields,
    handleErrors
]

export const updateEnterpriseValidator = [
    validateJWT,
    param("id").isMongoId().withMessage("Invalid ID"),
    body("name").custom(enterpriseExist).withMessage("The Enterprise is already registered"),
    validateFields,
    handleErrors
]

export const getEnterpriseByCategoryValidator = [
    param("category").isString().withMessage("Category must be a string"),
    validateFields,
    handleErrors
]


