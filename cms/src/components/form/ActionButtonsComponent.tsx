import type { ReactNode } from "react"

export interface IActionButtonProps{
  isDisabled?:boolean,
  btnLabel?:ReactNode
}

export const CancelButton=({isDisabled,btnlabel='Cancel'}:Readonly<IActionButtonProps>)=>{
  return(<>
 
            <button
              type="reset"
              disabled={isDisabled}
              className="bg-red-900 w-1/2 p-2 rounded-xl cursor-pointer hover:scale-95 transition duration-400"
            >
              {btnlabel}
            </button>
  </>)
}


export const SubmitButton=({isDisabled,btnlabel='Submit'}:Readonly<IActionButtonProps>)=>{
  return(<>
  <button
              type="submit"
              disabled={isDisabled}
              className="bg-green-700 w-1/2 p-2 rounded-xl cursor-pointer hover:scale-95 transition duration-400"
            >
             {btnlabel}
            </button>
           
  </>)
}