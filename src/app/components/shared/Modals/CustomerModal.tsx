import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./CustomerModal.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
//YUP Validation Schema
const schema = Yup.object({
  firstname: Yup.string()
    .required("Firstname is Required")
    .matches(/^[a-z ,.'-]+$/i, {
      message: "Invalid Firstname",
      excludeEmptyString: true,
    })
    .defined()
    .trim(),
  lastname: Yup.string()
    .required("Lastname is Required")
    .matches(/^[a-z ,.'-]+$/i, {
      message: "Invalid Lastname",
      excludeEmptyString: true,
    })
    .defined()
    .trim(),
  login: Yup.string()
    .matches(/^(\d{4})$/, { message: "Login must be 4 digits" })
    .trim(),
  email: Yup.string().email().required("lastname is Required").trim(),
  dob: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/)
    .required()
    .trim(),
  ip: Yup.string()
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
    defaultValues: {
      firstname: "",
      lastname: "",
      login: "",
      email: "",
      dob: "",
      ip: "",
      gender: "",
      type: 0,
    },
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
        .then((response) => console.log(response))
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
      try {
        axios.post("api/customers", {
          firstName: data.firstname,
          lastName: data.lastname,
          email: data.email,
          dob: data.dob,
          ip: data.ip,
          gender: data.gender,
          type: data.type,
        });
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        
        props.onHide();
        props.setIsUpdate();
      }, 400);
    }
  };
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
            {props.modaltitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-style">
          <form className="form-group" noValidate>
            <div className="form-container">
              {/* Firstname START */}
              <div className="grid-item">
                <label>Enter First Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.firstname ? "is-invalid" : "form-control"
                  }`}
                  placeholder="First Name"
                  {...register("firstname", {
                    required: { value: true, message: "Firstname is required" },
                    minLength: 4,
                    maxLength: 45,
                  })}
                ></input>
                {!errors.firstname && (
                  <div className="valid-feedback">
                    Firstname entered correct
                  </div>
                )}
                {errors.firstname && (
                  <div className="invalid-feedback">
                    {errors.firstname.message}
                  </div>
                )}
                {errors.firstname?.type == "minLength" && (
                  <div className="invalid-feedback">
                    Min Lenght required 4 chracters
                  </div>
                )}
                {errors.firstname?.type == "maxLength" && (
                  <div className="invalid-feedback">
                    Max Lenght allowed 45 chracters
                  </div>
                )}
              </div>
              {/* --- END--- */}
              {/* Lastname START */}
              <div className="grid-item">
                <label>Enter Last Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.lastname ? "is-invalid" : "form-control"
                  }`}
                  placeholder="Last Name"
                  {...register("lastname", {
                    required: { value: true, message: "Lastname is required" },
                    minLength: 4,
                    maxLength: 45,
                  })}
                ></input>
                {!errors.lastname && (
                  <div className="valid-feedback">lastname entered correct</div>
                )}
                {errors.lastname && (
                  <div className="invalid-feedback">
                    {errors.lastname.message}
                  </div>
                )}
                {errors.lastname?.type == "minLength" && (
                  <div className="invalid-feedback">
                    Min Lenght required 4 chracters
                  </div>
                )}
                {errors.lastname?.type == "maxLength" && (
                  <div className="invalid-feedback">
                    Max Lenght allowed 45 chracters
                  </div>
                )}
              </div>
              {/* --- END--- */}
              {/* Login START */}
              <div className="grid-item">
                <label>Enter Login</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.login ? "is-invalid" : "form-control"
                  }`}
                  placeholder="Login"
                  {...register("login")}
                ></input>
                {!errors.login && (
                  <div className="valid-feedback">Login entered correct</div>
                )}
                {errors.login && (
                  <div className="invalid-feedback">{errors.login.message}</div>
                )}
              </div>
              {/* --- END--- */}
              {/* Email START */}
              <div className="grid-item">
                <label>Enter Email</label>
                <input
                  type="text"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Email"
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                  })}
                ></input>
                {!errors.email && (
                  <div className="valid-feedback">Email entered correct</div>
                )}
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
                <input
                  type="text"
                  className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                  {...register("dob", { required: true })}
                ></input>
                <p>
                  Please Enter <b>Date of Birth</b> in 'mm/dd/yyyy' format
                </p>
              </div>
              {/* --- END --- */}
              {/* IP Address START */}
              <div className="grid-item">
                <label>Enter IP Address</label>
                <input
                  type="text"
                  className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                  placeholder="IP Address"
                  {...register("ip")}
                ></input>
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
          </form>
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
            {props.modalbutton}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomerModal;