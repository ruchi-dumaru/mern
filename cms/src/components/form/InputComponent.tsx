import { Controller } from "react-hook-form";

interface ITextInputComponentProps {
  //eslint-disable-next-line
  control: any;
  name: string;
  errorMessage?: null | string;
}
export const TextInputComponent = ({
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
