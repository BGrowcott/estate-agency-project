import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SHOW_MODAL_LOGIN, SHOW_MODAL_SIGNUP } from "../../utils/actions";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { LOGIN_USER } from "../../utils/mutations";

function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);
  const [state, dispatch] = useStoreContext();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email.toLocaleLowerCase(), password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  function openSignup(){
    dispatch({type: SHOW_MODAL_LOGIN})
    dispatch({type: SHOW_MODAL_SIGNUP})
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="formEmailLogin">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPasswordLogin">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <a className="ms-2" onClick={openSignup} href='#'>Sign up</a>
      {error ? (
        <div>
          <p className="text-danger">The provided credentials are incorrect</p>
        </div>
      ) : null}
    </Form>
  );
}

export default Login;
