import type { BaseSyntheticEvent } from "react";
import { Controller } from "react-hook-form";

interface ITextInputComponentProps {
  //eslint-disable-next-line
  control: any;
  name: string;
  errorMessage?: null | string;
  type?:"text"|"url"|"tel"|"number"|"email"
}

interface ISingleOptionType {
  label: string;
  value: string;
}

interface ISelectOptionComponentProps extends ITextInputComponentProps {
  options: Array<ISingleOptionType>;
}

export const TextInputComponent = ({
  control,
  name,
  errorMessage,
  type
}: Readonly<ITextInputComponentProps>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field }) => (
          <>
            <input
              type="text"
              className="  rounded p-2 w-full dark:border-gray-50 outline-none dark:bg-gray-300"
              {...field}
            />

            <span className="text-sm text-red-900 italic text-start">
              {errorMessage}
            </span>
          </>
        )}
      />
    </>
  );
};

export const EmailInputComponent = ({
  control,
  name,
  errorMessage,
}: Readonly<ITextInputComponentProps>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field }) => (
          <>
            <input
              type="email"
              className="  rounded p-2 w-full dark:border-gray-50 outline-none dark:bg-gray-300"
              {...field}
            />

            <span className="text-sm text-red-900 italic text-start">
              {errorMessage}
            </span>
          </>
        )}
      />
    </>
  );
};

export const PasswordInputComponent = ({
  control,
  name,
  errorMessage,
}: Readonly<ITextInputComponentProps>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field }) => (
          <>
            <input
              type="password"
              className="  rounded p-2 w-full dark:border-gray-50 outline-none dark:bg-gray-300"
              {...field}
            />

            <span className="text-sm text-red-900 italic text-start">
              {errorMessage}
            </span>
          </>
        )}
      />
    </>
  );
};

// export const SelectOptionComponent = ({
//   name,
//   control,
//   options,
//   errorMessage,
// }: Readonly<ISelectOptionComponentProps>) => {
//   return (
//     <>
//       <Controller
//         control={control}
//         name={name}
//         rules={{ required: true }}
//         render={({ field }) => (
//           <>
//             <select
//               className="  rounded p-2 w-full dark:border-gray-50 outline-none dark:bg-gray-300"
//               {...field}
//             >
//               <option value="">--Select Any One--</option>
//               {options?.map((option: ISingleOptionType) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             <span className="text-sm text-red-900 italic text-start">
//               {errorMessage}
//             </span>
//           </>
//         )}
//       />
//     </>
//   );
// };

export const MultipleOptionSingleSelectComponent = ({
  name,
  control,
  options,
  errorMessage,
}: Readonly<ISelectOptionComponentProps>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field }) => (
          <div className="space-y-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
              {options?.map((option: ISingleOptionType) => {
                const checked = field.value === option.value;

                return (
                  <label
                    key={option.value}
                    
                  >
                    <input
                      type="radio"
                      value={option.value}
                      checked={checked}
                      onChange={() => field.onChange(option.value)}
                      className="h-4 m-1 w-4 accent-slate-900"
                    />
                    <span>{option.label}</span>
                  </label>
                );
              })}
            </div>
            <span className="text-sm text-red-900 italic text-start">
              {errorMessage}
            </span>
          </div>
        )}
      />
    </>
  );
};



export const SingleFileInputComponent = ({
  control,
  name,
  errorMessage,
}: Readonly<ITextInputComponentProps>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field }) => (
          <>
            <input
            onChange={(e:BaseSyntheticEvent)=>{
              field.onChange(e.target.files[0])
            }}
              type="file"
              className="  rounded p-2 w-full dark:border-gray-50 outline-none dark:bg-gray-300"
           
            />

            <span className="text-sm text-red-900 italic text-start">
              {errorMessage}
            </span>
          </>
        )}
      />
    </>
  );
};