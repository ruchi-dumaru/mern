import * as Yup from "yup"


export interface IBannerType{
  title:string;
  link:string;
  status:string;
  image:string;
}

export  const BannerDataDTO= Yup.object({
  title:Yup.string().min(3).max(150),
  link:Yup.string().url().optional().nullable(),
  status:Yup.string().matches(/^(active|inactive)$/,"Must select any one").default('inactive'),
  image:Yup.mixed()
})

export const BannerDefaultData={
  title:"",
      link:"",
      status:"",
      image:""
}
