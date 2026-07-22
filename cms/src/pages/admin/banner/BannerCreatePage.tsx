import { BreadCrumbComponent } from "../page-settings/Breadcrumb";
import { PageTitle } from "../page-settings/PageTitle";
import { LabelComponent } from "../../../components/form/LabelComponent";
import { TextInputComponent } from "../../../components/form/InputComponent";
import { useForm } from "react-hook-form";
export default function BannerCreatePage(){
  //hook form
  const {control,formState:{errors}}=useForm({
    defaultValues:{
      title:"",
      link:"",
      status:"",
      image:""
    }
  })
  return(<>
  <BreadCrumbComponent
  links={[
    {title:"Banner Management",url:"/admin/banners"},
    {title:"Banner Create Page"}
  ]}/>

  <PageTitle title="Banner Create Page"
  />

  <div className="rounded-3xl border border-slate-200  p-4 shadow-sm  sm:p-5">
    <form action="" className="flex gap-5  my-20 flex-col">
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
                 name="url"
                 errorMessage={errors?.url?.message}
               />
             </div>
    </form>
  </div>
  </>)
}