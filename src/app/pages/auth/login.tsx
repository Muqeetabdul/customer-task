import { useForm } from "react-hook-form";
import * as authActions from "../../redux/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./login.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import TextInput from "../../components/form/textInput";
import ShowAlert from "../../components/shared/Alert";
//Form Fields validation
const validationSchema = Yup.object({
  password: Yup.string().required("Password is required"),
  email: Yup.string().email().required("E-mail is required"),
});
const LoginPage = () => {
  //getting value of error from store
  const { error } = useSelector((state: any) => state.auth);
  //destructuring useForm
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
        <div className="login-notify">
          {/* to show alert, use demo email and password on page load  */}
          {error === undefined && (
            <ShowAlert errorAlert={""} variant={"primary"} />
          )}
          {/* to show error alert */}
          {error && <ShowAlert errorAlert={error} variant={"danger"} />}
        </div>
        <div className="login-form">
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <TextInput
                name="email"
                type={"email"}
                register={register}
                placeholder="Enter E-mail"
                errors={errors}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <TextInput
                name="password"
                type={"password"}
                register={register}
                errors={errors}
              />
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
