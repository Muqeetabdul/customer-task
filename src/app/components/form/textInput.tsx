import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

export interface TextInputProps {
  type: "email" | "password" | undefined;
  name: string;
  register: UseFormRegister<FieldValues> | any;
  errorMessage?: string | undefined | any;
  label?: string;
  placeholder?: string;
}

const TextInput = ({ type, name, register, errorMessage, label, placeholder }: TextInputProps) => {
  return (
    <>
      <input placeholder={placeholder} type={type} {...register(name)} />
      {errorMessage && <div>{errorMessage}</div>}
    </>
  );
};

export default TextInput;
