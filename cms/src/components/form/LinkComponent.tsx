import { NavLink } from "react-router";

interface LinkComponentProps {
  to: string;
  text: string;
}

export const RegisterLinkComponent = ({ to, text }: LinkComponentProps) => {
  return <>
  <NavLink
  to={to}
  className=" text-gray-700 hover:underline hover:text-gray-400 font-medium"
>
 {text}
</NavLink>
</>;
};


export const LoginLinkComponent = ({ to, text }: LinkComponentProps) => {
  return <>
  <NavLink
  to={to}
  className=" text-gray-700 hover:underline hover:text-gray-400 font-medium"
>
 {text}
</NavLink>
</>;
};


export const ForgetPasswordLinkComponent = ({ to, text }: LinkComponentProps) => {
  return <>
  <NavLink
  to={to}
  className=" text-gray-700 hover:underline hover:text-gray-400 font-medium"
>
 {text}
</NavLink>
</>;
};