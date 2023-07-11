// import React from 'react';
// import { useState } from 'react';
// import Alert from 'react-bootstrap/Alert';
// import Button from 'react-bootstrap/Button';

// function PopUp(props:any){
  
  
//   if (props.show) {
//   console.log("I AM IN POP-UP")
//   return <>{
      
//       <Alert variant="danger" onClose={() => props.setShow(false)} dismissible>
//         <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
//         <p>
//           Change this and that and try again. Duis mollis, est non commodo
//           luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
//           Cras mattis consectetur purus sit amet fermentum.
//         </p>
//       </Alert>
//   };
//     </>
//   }
// }

// export default PopUp

// import React from 'react'
// import { Alert } from 'react-bootstrap'

// const PopUp = (props:any) => {
//   console.log(props);
//   console.log("This is a  alert—check it out!")
//   return (
//     <>
//     {props.show ? <Alert  variant={"success"}>
          
//         </Alert> : ""}
      
//     </>  
//   )
// }

// export default PopUp

import React from 'react'

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const PopUp = (props:any) => {
  const handleClose = () => props.setShow(false);
  const handleShow = () => props.setShow(true);
  



  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body >Successfully customer added</Modal.Body>
      </Modal>
    </>
  );
}

export default PopUp