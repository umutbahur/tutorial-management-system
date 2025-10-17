import { body } from "express-validator";
import { passwordPolicy } from "../config/passwordPolicy.js";

export const generatePasswordValidator = () => {
  const rules = [];

  const { minLength, minLowercase, minUppercase, minNumbers, minSymbols } = passwordPolicy;
  

  let regexParts = [];
  if (minLowercase > 0) regexParts.push(`(?=(.*[a-z]){${minLowercase},})`);
  if (minUppercase > 0) regexParts.push(`(?=(.*[A-Z]){${minUppercase},})`);
  if (minNumbers > 0) regexParts.push(`(?=(.*\\d){${minNumbers},})`);
  if (minSymbols > 0) regexParts.push(`(?=(.*[^A-Za-z0-9]){${minSymbols},})`);

  const regex = new RegExp(`^${regexParts.join("")}.{${minLength},}$`);

  rules.push(
    body("password")
      .matches(regex)
      .withMessage(
        `Password must be at least ${minLength} characters long and contain at least: ${minLowercase} lowercase, ${minUppercase} uppercase, ${minNumbers} number, ${minSymbols} symbol.`
      )
  );

  return rules;
};
