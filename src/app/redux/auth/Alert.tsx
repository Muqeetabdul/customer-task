import React from 'react'
import Alert from 'react-bootstrap/Alert';

function ShowAlert(props: any) {
  return (
    <Alert style={{ height: '75px' }} variant={props.variant}>
      { props.errorAlert == "" && <p style={{ fontSize: '0.8rem', color: '#9c6bfd' }}>Use account <b>admin@demo.com</b> and <b>password</b> demo to continue</p> }
      { props.errorAlert !== "" && <p style={{ fontSize: '1rem', color: '#f55766' }}>{props.errorAlert}</p> }
    </Alert>
  )
}

export default ShowAlert;