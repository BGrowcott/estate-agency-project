import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_USER } from "../../utils/mutations";
import { loadStripe } from "@stripe/stripe-js";
import { SHOW_MODAL_UPDATE_USER } from "../../utils/actions";

const stripePromise = loadStripe(
  "pk_test_51LcSvVF88IMmkTZ6rCEE7V9etlUQxgAOz2vngbEDt5UYE4duleq7uG9nVeEorf5RQTK7ERrqOD88lxAbffOA3Z0200c2fJkT9H"
);

function UpdateUserForm({ user: userDetails, reserving, property }) {
  const [updateUser, { error }] = useMutation(UPDATE_USER);
  const [user, setUser] = useState(userDetails);
  const [state, dispatch] = useStoreContext();

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT, {
    variables: { propertyId: property?._id },
  });
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  async function submitForm(e) {
    e.preventDefault();
    const updatedUser = { ...user, id: user._id };
    await updateUser({ variables: updatedUser });
    if (reserving) {
      getCheckout();
    } else {
      dispatch({ type: SHOW_MODAL_UPDATE_USER });
    }
  }

  function handleInput(e) {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setUser({ ...user, title: value });
        break;
      case "username":
        setUser({ ...user, username: value });
        break;
      case "email":
        setUser({ ...user, email: value });
        break;
      case "phone":
        setUser({ ...user, phone: value });
        break;
      case "weChat":
        setUser({ ...user, weChat: value });
        break;
      case "dob":
        setUser({ ...user, dob: value });
        break;
      case "passportNumber":
        setUser({ ...user, passportNumber: value });
        break;
      case "school":
        setUser({ ...user, school: value });
        break;
      case "specialty":
        setUser({ ...user, specialty: value });
        break;
      case "emergencyContactName":
        setUser({ ...user, emergencyContactName: value });
        break;
      case "emergencyContactNumber":
        setUser({ ...user, emergencyContactNumber: value });
        break;
      case "emergencyContactAddress":
        setUser({ ...user, emergencyContactAddress: value });
        break;
      case "otherInformation":
        setUser({ ...user, otherInformation: value });
        break;
    }
  }

  return (
    <Form onSubmit={submitForm}>
      {userDetails ? (
        <>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Title</Form.Label>
              <Form.Select
                aria-label="Select title"
                name="title"
                value={user.title}
                onChange={handleInput}
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Miss">Ms</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={user.username}
                onChange={handleInput}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleInput}
              />
            </Form.Group>
          </Row>
          <Form.Group>
            <Form.Label>Wechat</Form.Label>
            <Form.Control
              type="text"
              name="weChat"
              value={user.weChat}
              onChange={handleInput}
            />
          </Form.Group>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="text"
                name="dob"
                value={user.dob}
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Passport Number:</Form.Label>
              <Form.Control
                type="text"
                name="passportNumber"
                value={user.passportNumber}
                onChange={handleInput}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>School</Form.Label>
              <Form.Control
                type="text"
                name="school"
                value={user.school}
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Area of Study</Form.Label>
              <Form.Control
                type="text"
                name="specialty"
                value={user.specialty}
                onChange={handleInput}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col}>
              <Form.Label>Emergency Contact</Form.Label>
              <Form.Control
                type="text"
                name="emergencyContactName"
                value={user.emergencyContactName}
                onChange={handleInput}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Emergency Contact Phone</Form.Label>
              <Form.Control
                type="text"
                name="emergencyContactNumber"
                value={user.emergencyContactNumber}
                onChange={handleInput}
              />
            </Form.Group>
          </Row>
          <Form.Group>
            <Form.Label>Emergency Contact Address</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              name="emergencyContactAddress"
              value={user.emergencyContactAddress}
              onChange={handleInput}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Other Information</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              name="otherInformation"
              value={user.otherInformation}
              onChange={handleInput}
            />
          </Form.Group>
          <Button className="mt-1" variant="primary" type="submit" size="sm">
            {reserving ? "Confirm" : "Save"}
          </Button>
        </>
      ) : null}
    </Form>
  );
}

export default UpdateUserForm;
