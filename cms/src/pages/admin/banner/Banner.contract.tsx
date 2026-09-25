import * as Yup from "yup";

export interface IBannerType {
  title: string;
  link: string;
  status: string;
  image: File | string;
}

export const BannerDataDTO = Yup.object({
  title: Yup.string().trim().min(3).max(150).required("Title is required"),
  link: Yup.string().url("Enter a valid URL").required("URL is required"),
  status: Yup.string()
    .matches(/^(active|inactive)$/, "Must select any one")
    .required(),
  image: Yup.mixed().required("Image is required"),
});

export const BannerDefaultData = {
  title: "",
  link: "",
  status: "",
  image: "",
};
