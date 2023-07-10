import React from 'react';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function PopUp(props: any) {
    console.log(props)
  return (
    <>
      <Alert show={props.showPopUp} variant="success">
        <Alert.Heading>Customer Added Successfuly</Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => props.setshow(false)} variant="outline-success">
            Close me
          </Button>
        </div>
      </Alert>
    </>
  );
}

export default PopUp