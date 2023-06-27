import React from "react";
import TextInput from "../../components/form/textInput";
import { useForm } from "react-hook-form";
import * as authActions from "../../redux/auth/authActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import './login.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const validationSchema = Yup.object({
  password: Yup.string().required(),
  email: Yup.string().email().required(),
});
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "admin@demo.com", password: "demo" },
    resolver: yupResolver(validationSchema),
  });
  const dispatch: AppDispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    dispatch(authActions.logIn(data.email, data.password));
  });

  return (
    <>
    <div className="assignment">
      <p>Assignment</p>
    </div>
    <div className="login-form-header">
    <h3>Login Account</h3>
      <p>Enter your username and password</p>
    </div>
    <div className="login-form-container">
      <div className="login-notify"></div>
      <div className="login-form">
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control 
              style={{backgroundColor: '#f4f6f9'}}
              name="email"
              type={"email"}
              // register={register} 
              // errorMessage={errors["email"]?.message} 
              placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control 
              style={{backgroundColor: '#f4f6f9'}} 
              type={"password"}
              // register={register}
              // errorMessage={errors["password"]?.message}
              placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </Form>
      </div>
    </div>
    </>
  );
};
export default LoginPage;
