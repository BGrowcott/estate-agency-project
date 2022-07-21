import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

function Signup() {
  const [formState, setFormState] = useState({ email: "", password: "", username: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.username,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="formUsernameLogin">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" name="username" placeholder="Enter Username" onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmailSignup">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPasswordSignup">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange}/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Signup
      </Button>
    </Form>
  );
}

export default Signup;
