import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";
import { LabelComponent } from "../../../components/form/LabelComponent";
import { MultipleOptionSingleSelectComponent, SingleFileInputComponent, TextInputComponent } from "../../../components/form/InputComponent";
import { useForm } from "react-hook-form";
import { CancelButton, SubmitButton } from "../../../components/form/ActionButtonsComponent";

import { yupResolver } from "@hookform/resolvers/yup";
import  { postRequest } from "../../../config/axios.config";
import { notifySuccess } from "../../../utilities/helpers";
import {  useNavigate } from "react-router";
import { BannerDataDTO,type IBannerType ,BannerDefaultData} from "./Banner.contract";



export default function BannerCreatePage(){
  
  const {control,formState:{errors,isSubmitting},handleSubmit}=useForm({
    defaultValues:BannerDefaultData,
    //eslint-disable-next-line
    resolver:yupResolver(BannerDataDTO) as any

  })

  //hook form
  const navigate=useNavigate()
  const submitEvent=async (data:IBannerType)=>{
    // console.log(data);
    try{
await  postRequest("/banner",data,{file:true,auth:false})
notifySuccess({title:"Banner Created Succesfully"})
navigate('/admin/banners')
    }
catch(exception){
console.log(exception)
}
  }
  return(<>
  <BreadCrumbComponent
  links={[
    {title:"Banner Management",url:"/admin/banners"},
    {title:"Banner Create Page"}
  ]}/>

  <PageTitle title="Banner Create Page"
  />

  <div className="rounded-3xl border border-slate-200  p-4 shadow-sm  sm:p-5">
    <form onSubmit={handleSubmit(submitEvent)} action="" className="flex gap-5  my-20 flex-col">
   <div className="space-y-1 ">
               <LabelComponent
                 htmlFor="title"
                 value="Title"
                 className="font-semibold "
               />
               <TextInputComponent
                 control={control}
                 name="title"
                 errorMessage={errors?.title?.message}
               />
             </div>


             <div className="space-y-2">
               <LabelComponent
                 htmlFor="url"
                 value="Url:"
                 className="font-semibold text-slate-900"
               />
               <TextInputComponent
                 control={control}
                 name="link"
                 type="url"
                 errorMessage={errors?.link?.message}
               />
             </div>

              <div className="space-y-2">
               <LabelComponent
                 htmlFor="Status"
                 value="Status:"
                 className="font-semibold text-slate-900"
               />
               <MultipleOptionSingleSelectComponent
                 control={control}
                 name="status"
                 errorMessage={errors?.status?.message}
                 options={[
                  {label:"Publish",value:"active"},
                   {label:"Un-Publish",value:"inactive"},
                 ]}
               />
             </div>


             <div className="space-y-2">
               <LabelComponent
                 htmlFor="Image"
                 value="Image:"
                 className="font-semibold text-slate-900"
               />
               <SingleFileInputComponent
                 control={control}
                 name="image"
                 errorMessage={errors?.image?.message}
                 
               />
             </div>

             <div className="space-y-2">
              <div className="w-1/3"></div>
              <div className="w-2/3 flex  gap-5">
              <CancelButton  isDisabled={isSubmitting}/>
              <SubmitButton  isDisabled={isSubmitting}/>
              </div>
              
             </div>


    </form>
  </div>
  </>)
}