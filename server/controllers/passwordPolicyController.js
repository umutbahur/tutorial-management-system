import { passwordPolicy } from "../config/passwordPolicy.js";

export const getPasswordPolicy = (req, res) => {
  res.json(passwordPolicy);
};
