import { toast } from "sonner"
import { FaTriangleExclamation } from "react-icons/fa6";

export const notifyError=({title="",description=""}:{title?:string,description?:string})=>{
  toast.error(
    <span className="text-red-600 text-lg font-semibold">{title}</span>,{
        description:(
          <span className="text-red-600">
            {description}
          </span>
        ),
        icon:<FaTriangleExclamation className="text-red-700 size-5"/>
      });
  
}


export const notifySuccess=({title="",description="",action={label:'',onClick:()=>{}}}:{title?:string,description?:string,action?:{label:string,onClick:()=>void}})=>{
  toast.success(
     <span className="text-green-600 font-semibold">
             {title}
            </span>,{
              description:(
            <span className="text-green-600">
              {description}
            </span>
          ),
          action:action
            },
  )
}