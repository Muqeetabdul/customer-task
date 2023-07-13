import { UseFormRegister, FieldValues } from "react-hook-form";

export interface TextInputProps {
  type: "text" | "email" | "password" | undefined;
  name?: string;
  register: UseFormRegister<FieldValues> | any;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  message?: string;
  errors?: any | undefined;
}

const TextInput = ({
  type,
  name,
  register,
  placeholder,
  errors,
}: TextInputProps) => {
  return (
    <>
      <input
        placeholder={placeholder}
        type={type}
        className={`form-control ${
          errors[`${name}`]
            ? "is-invalid"                  //border-red, if input value is INVALID
            : Object.keys(errors).length
            ? "is-valid"                        //border-green if input value is OK
            : ""
        }`}
        {...register(name)}
      />
      {/* To show error message under input field */}
      {errors[`${name}`] && (
        <div className="invalid-feedback">{errors[`${name}`]?.message}</div>
      )}
    </>
  );
};

export default TextInput;
