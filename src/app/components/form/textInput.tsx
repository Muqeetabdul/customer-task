import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

export interface TextInputProps {
  type: "text" | "email" | "password" | undefined;
  name?: string;
  register: UseFormRegister<FieldValues> | any;
  errorMessage?: string | undefined | any;
  label?: string;
  placeholder?: string;
  className?: string;
}

const TextInput = ({ type, name, register, errorMessage, label, placeholder, className }: TextInputProps) => {
  return (
    <>
      <input placeholder={placeholder} type={type} className={className} {...register(name)} />
      {errorMessage && <div>{errorMessage}</div>}
    </>
  );
};

export default TextInput;
