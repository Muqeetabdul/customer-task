import { UseFormRegister, FieldValues } from "react-hook-form";

export interface SelectInputProps {
  name?: string;
  value?: string | any;
  register: UseFormRegister<FieldValues> | any;
  option?: string | any;
  index?: number;
  defaultValue?: string | any;
  options?: any[];
  style?: any;
  onChange?: any;
  optionsStyle?: any;
}

const SelectInput = ({
  name,
  register,
  options,
  style,
  onChange,
  value,
  defaultValue,
  optionsStyle,
}: SelectInputProps) => {
  return (
    <>
      <select
        name={name}
        className="form-select"
        {...register(name)}
        onChange={onChange}
        style={style}
        value={value || defaultValue}
      >
        {options?.map((item: any, index: any) => {
          return (
            <option key={index} value={item?.value} style={optionsStyle}>
              {item?.label}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default SelectInput;
