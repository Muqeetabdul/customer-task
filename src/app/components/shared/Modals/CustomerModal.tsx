import { Button, Modal } from "react-bootstrap";
import "./CustomerModal.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TextInput from "../../form/textInput";
import SelectInput from "../../form/Select";

//options value for gender
let genders = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];
//Options values for Type
let types = [
  { value: "Indiviual", label: "Indiviual" },
  { value: "Business", label: "Business" },
];
//Intial values for react-hook-form
const initialValues = {
  firstName: "",
  lastName: "",
  login: "",
  email: "",
  dateOfBirth: "",
  ipAddress: "",
  gender: "Female",
  type: "Indiviual",
};
//YUP Validation Schema
const schema = Yup.object({
  firstName: Yup.string()
    .required("Firstname is Required")
    .matches(/^[a-z ,.'-]+$/i, {
      message: "Invalid Firstname",
      excludeEmptyString: true,
    })
    .min(4, "Min Lenght required 4 chracters")
    .max(45, "Max Lenght allowed 45 chracters")
    .defined()
    .trim(),
  lastName: Yup.string()
    .required("Lastname is Required")
    .matches(/^[a-z ,.'-]+$/i, {
      message: "Invalid Lastname",
      excludeEmptyString: true,
    })
    .min(4, "Min Lenght required 4 chracters")
    .max(45, "Max Lenght allowed 45 chracters")
    .defined()
    .trim(),
  login: Yup.string()
    .matches(/^(\d{4})$/, { message: "Login must be 4 digits" })
    .trim(),
  email: Yup.string().email().required("Email is Required").trim(),
  dateOfBirth: Yup.string()
    .required("Date of Birth is required!")
    .matches(/^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/)
    .trim(),
  ipAddress: Yup.string()
    .required()
    .matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
      message: "Invalid IP address",
      excludeEmptyString: true,
    })
    .test("ip", "IP address value should be less or equal to 255", (value) => {
      if (value === undefined || value.trim() === "") return true;
      return value.split(".").find((i) => parseInt(i) > 255) === undefined;
    }),
});
//Component
function CustomerModal(props: any) {
  const { customerforupdate, handlecustomer } = props;
  //Destructuring useForm
  // ** Start
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  // ** END
  const onSubmit = (data: any) => {
    handlecustomer(data);
  };
  //Pre-fill input fields
  useEffect(() => {
    if (customerforupdate) {
      console.log(customerforupdate);
      reset({ ...customerforupdate });
    } else {
      reset({ ...initialValues });
    }
  }, [customerforupdate]);
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="modal-width"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {customerforupdate
              ? `Update Customer "${
                  customerforupdate.firstName + " " + customerforupdate.lastName
                }"`
              : "NEW Customer"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-style">
          <form className="form-group" autoComplete="on" noValidate>
            <div className="form-container">
              {/* Firstname START */}
              <div className="grid-item">
                <label>Enter First Name</label>
                <TextInput
                  type="text"
                  placeholder="First Name"
                  name={"firstName"}
                  register={register}
                  errors={errors}
                />
              </div>
              {/* --- END--- */}
              {/* Lastname START */}
              <div className="grid-item">
                <label>Enter Last Name</label>
                <TextInput
                  type="text"
                  name={"lastName"}
                  placeholder="Last Name"
                  register={register}
                  errors={errors}
                />
              </div>
              {/* --- END--- */}
              {/* Login START */}
              <div className="grid-item">
                <label>Enter Login</label>
                <TextInput
                  type="text"
                  placeholder="0000"
                  name={"login"}
                  register={register}
                  errors={errors}
                />
              </div>
              {/* --- END--- */}
              {/* Email START */}
              <div className="grid-item">
                <label>Enter Email</label>
                <TextInput
                  type="text"
                  placeholder="demo@demo.com"
                  name={"email"}
                  register={register}
                  errors={errors}
                />
              </div>
              {/* --- END--- */}
              {/* Date of Birth Start */}
              <div className="grid-item">
                <label>Date of Birth</label>
                <TextInput
                  type="text"
                  placeholder="12/19/2020"
                  name={"dateOfBirth"}
                  register={register}
                  errors={errors}
                />
                {!errors.dateOfBirth && (
                  <p>
                    Please Enter <b>Date of Birth</b> in 'mm/dd/yyyy' format
                  </p>
                )}
              </div>
              {/* --- END --- */}
              {/* IP Address START */}
              <div className="grid-item">
                <label>Enter IP Address</label>
                <TextInput
                  type="text"
                  placeholder="127.0.0.1"
                  name={"ipAddress"}
                  register={register}
                  errors={errors}
                />
                {!errors.ipAddress && (
                  <p>We'ill never share customer IP Address with anyone else</p>
                )}
              </div>
              {/* --- END --- */}
              {/* Gender Start */}
              <div className="grid-item">
                <label>Select Gender</label>
                <SelectInput
                  name="gender"
                  register={register}
                  options={genders}
                  style={{ backgroundColor: "#f4f6f9" }}
                />
                <p>
                  Please select <b>Gender</b>
                </p>
              </div>
              {/* --- END --- */}
              {/* Type START */}
              <div className="grid-item">
                <label>Select Type</label>
                <SelectInput
                  name="type"
                  register={register}
                  options={types}
                  style={{ backgroundColor: "#f4f6f9" }}
                />
                <p>
                  Please select <b>Type</b>
                </p>
              </div>
              {/* --- END --- */}
            </div>
            {/* ---- form-container END ---- */}
          </form>
          {/* ---- form END ---- */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={props.onHide}
            style={{
              backgroundColor: "#f4f6f9",
              border: "none",
              color: "#83869c",
            }}
          >
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#3699fe", border: "none" }}
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            {customerforupdate ? "UPDATE" : "CREATE"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomerModal;
