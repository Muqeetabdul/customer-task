import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./CustomerModal.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomerModal(props: any) {
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
            New Customer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-style">
          <form className="form-group needs-validation" noValidate>
            <div className="form-container">
              <div className="grid-item was-validated">
                <label htmlFor="firstname">Enter First Name</label>
                <input
                  placeholder="First Name"
                  type="text"
                  className="form-control"
                  id="firstname"
                  required
                ></input>
                <div className="valid-feedback">
                    Firstname is required
                </div>
                <div className="invalid-feedback">
                    Firstname entered correct
                </div>
                {/* <p>
                  Please Enter <b>First Name</b>
                </p> */}
              </div>
              <div className="grid-item was-validated">
                <label>Enter Last Name</label>
                <input
                  placeholder="Last Name"
                  type="text"
                  className="form-control"
                  required
                ></input>
                <div className="valid-feedback">
                    Lastname is required
                </div>
                <div className="invalid-feedback">
                    Lastname entered correct
                </div>
                {/* <p>
                  Please Enter <b>Last Name</b>
                </p> */}
              </div>
              <div className="grid-item was-validated">
                <label>Enter Login</label>
                <input
                  placeholder="Login"
                  type="text"
                  className="form-control"
                  required
                ></input>
                <div className="valid-feedback">
                    Login is required
                </div>
                <div className="invalid-feedback">
                    Login is entered correct
                </div>
                {/* <p>
                  Please Enter <b>Login</b>
                </p> */}
              </div>
              <div className="grid-item was-validated">
                <label>Enter Email</label>
                <input
                  placeholder="Email"
                  type="text"
                  className="form-control"
                  required
                ></input>
                <div className="valid-feedback">
                    Email is required
                </div>
                <div className="invalid-feedback">
                    Email is entered correct
                </div>
                {/* <p>
                  Please Enter <b>Email</b>
                </p> */}
              </div>
              <div className="grid-item was-validated">
                <label>Date of Birth</label>
                <input type="text" className="form-control" required></input>
                <p>
                  Please Enter <b>Date of Birth</b> in 'mm/dd/yyyy' format
                </p>
              </div>
              <div className="grid-item was-validated">
                <label>Enter IP Address</label>
                <input
                  placeholder="IP Address"
                  type="text"
                  className="form-control"
                  required
                ></input>
                <p>We'ill never share customer IP Address with anyone else</p>
              </div>
              <div className="grid-item">
                <label>Select Gender</label>
                <select
                  className="form-select"
                  style={{ backgroundColor: "#f4f6f9" }}
                >
                  <option>Male</option>
                  <option selected>Female</option>
                </select>
                <p>
                  Please select <b>Gender</b>
                </p>
              </div>
              <div className="grid-item">
                <label>Select Type</label>
                <select
                  className="form-select"
                  style={{ backgroundColor: "#f4f6f9" }}
                >
                  <option selected>Indiviual</option>
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
            style={{
              backgroundColor: "#f4f6f9",
              color: "#83869c",
              border: "none",
              height: "50px",
              width: "70px",
              fontSize: "18px",
            }}
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: "#3699fe",
              border: "none",
              height: "50px",
              width: "70px",
              fontSize: "18px",
            }}
            type="submit"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CustomerModal;
