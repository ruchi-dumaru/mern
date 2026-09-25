import * as Yup from "yup";

export interface IBrandForm {
  name: string;
  status: "active" | "inactive";
  isFeatured: boolean;
  logo?: File | string;
}

export const BrandDataDTO = Yup.object({
  name: Yup.string().trim().min(2).max(100).required("Brand name is required"),
  status: Yup.string().oneOf(["active", "inactive"]).required(),
  isFeatured: Yup.boolean().required(),
  logo: Yup.mixed().optional(),
});

export const BrandDefaultData: IBrandForm = {
  name: "",
  status: "inactive",
  isFeatured: false,
};
