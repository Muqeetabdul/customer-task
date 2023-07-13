import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-hot-toast";

function DeleteCustomer(props: any) {
  const { handleSubmit } = props;
  return (
    <>
      <Modal {...props} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure, you want to <b>delete</b> that customer?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={props.onHide}
            style={{
              backgroundColor: "#f4f6f9",
              border: "none",
              color: "#7f8299",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            type="submit"
            onClick={handleSubmit}
            className="btn btn-danger"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default DeleteCustomer;
