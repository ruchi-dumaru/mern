import * as Yup from "yup";
import { passwordRegex,rolesRegex } from "../../config/constants/regex";


export interface ICredentials {
  email: string;
  password: string;
}

export const CredentialDTO = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string()
    .matches(passwordRegex)
    .required("Password is mandatory"),
});

export interface IRegisterData {
  name: null | string;
  email: null | string;
  password: null | string;
  confirmPassword: null | string;
  role: null | string;
  //eslint-disable-next-line
  image: null | any;
}

export const RegisterDTO = Yup.object({
  name: Yup.string().min(3).max(50).required(),
  email: Yup.string().email().required(),
  password: Yup.string().matches(passwordRegex).required(),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")]),
  role: Yup.string().matches(rolesRegex).default("customer"),
  //eslint-disable-next-line
  image: Yup.mixed().nullable(),
});
