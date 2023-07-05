import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./CustomerModal.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";

function CustomerModal(props: any) {
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      login: "",
      email: "",
      dob: '',
      ip: '',
      gender: '',
      type: ''
    }
  });
  const onSubmit = (data: any) => {
     console.log(data)
     axios.post("api/customers", {
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.email,
     })
  }
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
            { props.modaltitle }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-style">
          <form className="form-group" noValidate>
            <div className="form-container">
              <div className="grid-item">
                <label>Enter First Name</label>
                <input
                  type="text"
                  className={ `form-control ${errors.firstname ? "is-invalid" : "is-valid"}` }
                  placeholder="First Name"
                  {...register("firstname", { required: { value: true, message: "Firstname is required"}, minLength: 4, maxLength: 45 })}
                ></input>
                { !errors.firstname && <div className="valid-feedback">Firstname entered correct</div> }
                { errors.firstname && <div className="invalid-feedback">{errors.firstname.message}</div> }
                { errors.firstname?.type == "minLength" && <div className="invalid-feedback">Min Lenght required 4 chracters</div> }
                { errors.firstname?.type == "maxLength" && <div className="invalid-feedback">Max Lenght allowed 45 chracters</div> }
                {/* <p>
                  Please Enter <b>Last Name</b>
                </p> */}
              </div>
              <div className="grid-item">
                <label>Enter Last Name</label>
                <input
                  type="text"
                  className={ `form-control ${errors.firstname ? "is-invalid" : "is-valid"}` }
                  placeholder="Last Name"
                  {...register("lastname", { required: { value: true, message: "Lastname is required"}, minLength: 4, maxLength: 45 })}
                ></input>
                { !errors.lastname && <div className="valid-feedback">lastname entered correct</div> }
                { errors.lastname && <div className="invalid-feedback">{errors.lastname.message}</div> }
                { errors.lastname?.type == "minLength" && <div className="invalid-feedback">Min Lenght required 4 chracters</div> }
                { errors.lastname?.type == "maxLength" && <div className="invalid-feedback">Max Lenght allowed 45 chracters</div> }
                {/* <p>
                  Please Enter <b>Last Name</b>
                </p> */}
              </div>
              <div className="grid-item">
                <label>Enter Login</label>
                <input
                  type="text"
                  className={ `form-control ${errors.login ? "is-invalid" : "is-valid"}` }
                  placeholder="Login"
                  {...register("login", { required: { value: true, message: "Login is required"} })}
                ></input>
                { !errors.login && <div className="valid-feedback">Login entered correct</div> }
                { errors.login && <div className="invalid-feedback">{errors.login.message}</div> }
                {/* <p>
                  Please Enter <b>Login</b>
                </p> */}
              </div>
              <div className="grid-item">
                <label>Enter Email</label>
                <input
                  type="text"
                  className={ `form-control ${errors.email ? "is-invalid" : "is-valid"}` }
                  placeholder="Email"
                  {...register("email", { required: { value: true, message: "Email is required"} })}
                ></input>
                 { !errors.email && <div className="valid-feedback">Email entered correct</div> }
                { errors.email && <div className="invalid-feedback">{errors.email?.message}</div> }
                {/* <p>
                  Please Enter <b>Email</b>
                </p> */}
              </div>
              <div className="grid-item">
                <label>Date of Birth</label>
                <input 
                  type="text" 
                  className={ `form-control ${errors.dob ? "is-invalid" : "is-valid"}` } 
                  {...register("dob")}
                >
                </input>
                <p>
                  Please Enter <b>Date of Birth</b> in 'mm/dd/yyyy' format
                </p>
              </div>
              <div className="grid-item">
                <label>Enter IP Address</label>
                <input
                  type="text"
                  className={ `form-control ${errors.dob ? "is-invalid" : "is-valid"}` }
                  placeholder="IP Address"
                  {...register("ip")}
                ></input>
                <p>We'ill never share customer IP Address with anyone else</p>
              </div>
              <div className="grid-item">
                <label>Select Gender</label>
                <select
                  value={"Female"}
                  {...register('gender')}
                  className="form-select"
                  style={{ backgroundColor: "#f4f6f9" }}
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <p>
                  Please select <b>Gender</b>
                </p>
              </div>
              <div className="grid-item">
                <label>Select Type</label>
                <select
                  value={"Indiviual"}
                  {...register('type')}
                  className="form-select"
                  style={{ backgroundColor: "#f4f6f9" }}
                >
                  <option>Indiviual</option>
                  <option>Business</option>
                </select>
                <p>
                  Please select <b>Type</b>
                </p>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={props.onHide}
            style={{ backgroundColor: "#f4f6f9", color: "#83869c" }}
          >
            Cancel
          </Button>
          <Button style={{ backgroundColor: "#3699fe" }} type="submit" onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomerModal;
