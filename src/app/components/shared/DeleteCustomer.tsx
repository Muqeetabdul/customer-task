import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteCustomer(props: any) {
  return (
    <>
      <Modal {...props} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure, you want to <b>delete</b> that customer?</Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={props.onHide}
            style={{ backgroundColor: '#f4f6f9', border: 'none', color: '#7f8299' }}
          >
            Cancel
          </Button>
          <Button variant="danger" type="submit" onClick={props.onHide}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default DeleteCustomer;