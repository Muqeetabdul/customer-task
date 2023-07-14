import { UseFormRegister, FieldValues } from "react-hook-form";

export interface SelectInputProps {
  name?: string;
  values?: string | any;
  register: UseFormRegister<FieldValues> | any;
  option?: string | any;
  index?: number;
  defaultValue?: any;
  options?: any[];
  style?: any;
  onChange?: any;
}

const SelectInput = ({
  name,
  register,
  options,
  style,
  onChange,
}: SelectInputProps) => {
  return (
    <>
      <select
        name={name}
        className="form-select"
        {...register(name)}
        onChange={onChange}
        style={style}
      >
        {options?.map((item: any, index: any) => {
          return (
            <option key={index} value={item?.value}>
              {item?.label}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default SelectInput;
