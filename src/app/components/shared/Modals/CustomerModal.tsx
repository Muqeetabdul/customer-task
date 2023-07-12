import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./CustomerModal.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import TextInput from "../../form/textInput";

//YUP Validation Schema
const initialValues = {
  firstName: "",
  lastName: "",
  login: "",
  email: "",
  dateOfBbirth: "",
  ipAddress: "",
  gender: "",
  type: 0,
};
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
  dateOfBbirth: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/)
    .required("E-mail is required")
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
  const { customerForUpdate } = props;
  const [updateData, setUpdateData]: any = useState({});
  //to get values to update
  useEffect(() => {
    if (props.updateid > 0) {
      axios
        .get(`api/customers/${props.updateid}`)
        .then((response) => response.data)
        .then((data) => setUpdateData(data))
        .catch((error) => console.log(error));
    }
  }, []);
  //To SHOW pre-filled values
  useEffect(() => {
    if (updateData && updateData.id) {
      const checked_data = {
        firstname: updateData.firstName,
        lastname: updateData.lastName,
        login: updateData.login,
        email: updateData.email,
        dob: updateData.dateOfBbirth,
        ip: updateData.ipAddress,
        gender: updateData.gender,
        type: updateData.type,
      };
      if (checked_data) {
        reset(checked_data);
      }
    }
  }, [updateData, props.isUpdate]);
  //Destructuring useForm
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    // Update Customer
    if (updateData.id) {
      axios
        .put(`api/customers/${props.updateid}`, {
          ...updateData,
          firstName: data.firstname,
          lastName: data.lastname,
          email: data.email,
          dob: data.dob,
          ip: data.ip,
          gender: data.gender,
          type: data.type,
        })
        .then((response) => {
          console.log(response);
          toast.success("Customer Updated Successfuly");
        })
        .catch((error) => {
          if (error.response) {
            console.log(
              "Server responded with status code:",
              error.response.status
            );
            console.log("Response data:", error.response.data);
          } else if (error.request) {
            console.log("No response received:", error.request);
          } else {
            console.log("Error creating request:", error.message);
          }
        });
      setTimeout(() => {
        props.onHide();
        props.setIsUpdate(true);
      }, 500);
    } else {
      //adding new customer
      axios
        .post("api/customers", {
          firstName: data.firstname,
          lastName: data.lastname,
          email: data.email,
          dob: data.dob,
          ip: data.ip,
          gender: data.gender,
          type: data.type,
        })
        .then((response) => {
          console.log(response);
          toast.success("Customer Added Successfuly");
        })
        .catch((error) => {
          if (error.response) {
            console.log(
              "Server responded with status code:",
              error.response.status
            );
            console.log("Response data:", error.response.data);
          } else if (error.request) {
            console.log("No response received:", error.request);
          } else {
            console.log("Error creating request:", error.message);
          }
        });
      setTimeout(() => {
        props.onHide();
        props.setIsAdded();
      }, 400);
    }
  };

  useEffect(() => {
    if (customerForUpdate) {
      reset({ ...customerForUpdate });
      console.log("runningUpdate condition");
    } else {
      reset({ ...initialValues });
      console.log("new creating  condition");
    }
  }, [customerForUpdate]);
  console.log(customerForUpdate, "customerForUpdate");
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
            {customerForUpdate ? "EDIT" : "NEW"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-style">
          <form className="form-group" noValidate>
            <div className="form-container">
              {/* Firstname START */}
              <div className="grid-item">
                <label>Enter First Name</label>
                <TextInput
                  type="text"
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : Object.keys(errors).length ? "is-valid": ""
                  }`}
                  placeholder="First Name"
                  name={"firstName"}
                  register={register}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">
                    {errors.firstName?.message}
                  </div>
                )}
              </div>
              {/* --- END--- */}
              {/* Lastname START */}
              <div className="grid-item">
                <label>Enter Last Name</label>
                <TextInput
                  type="text"
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : "form-control"
                  }`}
                  placeholder="Last Name"
                  name={"lastName"}
                  register={register}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">
                    {errors.lastName?.message}
                  </div>
                )}
              </div>
              {/* --- END--- */}
              {/* Login START */}
              <div className="grid-item">
                <label>Enter Login</label>
                <TextInput
                  type="text"
                  className={`form-control ${
                    errors.login ? "is-invalid" : "form-control"
                  }`}
                  placeholder="0000"
                  name={"login"}
                  register={register}
                />
                {errors.login && (
                  <div className="invalid-feedback">
                    {errors.login?.message}
                  </div>
                )}
              </div>
              {/* --- END--- */}
              {/* Email START */}
              <div className="grid-item">
                <label>Enter Email</label>
                <TextInput
                  type="text"
                  className={`form-control ${
                    errors.email ? "is-invalid" : "form-control"
                  }`}
                  placeholder="demo@demo.com"
                  name={"email"}
                  register={register}
                />
                {errors.email && (
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                )}
              </div>
              {/* --- END--- */}
              {/* Date of Birth Start */}
              <div className="grid-item">
                <label>Date of Birth</label>
                <TextInput
                  type="text"
                  className={`form-control ${
                    errors.dateOfBbirth ? "is-invalid" : "form-control"
                  }`}
                  placeholder="12/19/2020"
                  name={"dateOfBbirth"}
                  register={register}
                />
                <p>
                  Please Enter <b>Date of Birth</b> in 'mm/dd/yyyy' format
                </p>
              </div>
              {/* --- END --- */}
              {/* IP Address START */}
              <div className="grid-item">
                <label>Enter IP Address</label>
                <TextInput
                  type="text"
                  className={`form-control ${
                    errors.ipAddress ? "is-invalid" : "form-control"
                  }`}
                  placeholder="127.0.0.1"
                  name={"ipAddress"}
                  register={register}
                />
                <p>We'ill never share customer IP Address with anyone else</p>
              </div>
              {/* --- END --- */}
              {/* Gender Start */}
              <div className="grid-item">
                <label>Select Gender</label>
                <select
                  defaultValue={"Female"}
                  {...register("gender")}
                  className="form-select"
                  style={{ backgroundColor: "#f4f6f9" }}
                >
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                </select>
                <p>
                  Please select <b>Gender</b>
                </p>
              </div>
              {/* --- END --- */}
              {/* Type START */}
              <div className="grid-item">
                <label>Select Type</label>
                <select
                  defaultValue={0}
                  {...register("type")}
                  className="form-select"
                  style={{ backgroundColor: "#f4f6f9" }}
                >
                  <option value={0}>Indiviual</option>
                  <option value={1}>Business</option>
                </select>
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
            {customerForUpdate ? "UPDATE" : "CREATE"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomerModal;
