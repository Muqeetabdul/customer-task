import { useEffect, useState } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";
import Select from "react-select";

export interface SelectInputProps {
  name?: string;
  values?: string | any;
  register: UseFormRegister<FieldValues> | any;
  option?: string | any;
  index?: number;
  defaultValue?: any;
  options?: any[];
  style?: any;
}

const SelectByValue = ({
  name,
  register,
  options,
  style,
}: SelectInputProps) => {
  return (
    <>
      <select
        name={name}
        className="form-select"
        {...register(name)}
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

export default SelectByValue;
