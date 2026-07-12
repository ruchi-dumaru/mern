export interface ILabelProps {
  htmlFor: string;
  value: string;
  className: string;
};

export const LabelComponent = ({ htmlFor, value, className }: Readonly<ILabelProps>) => {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className={` text-gray-950 font-medium dark:text-gray-100 ${className}`}
      >
        {value}
      </label>
    </>
  );
};
