import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { SHOW_MODAL_UPDATE, PROPERTY_VIEW } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PROPERTY } from "../../utils/mutations";

function UpdatePropertyForm() {
  const emptyForm = {
    title: "",
    description: "",
    shortDescription: "",
    address: "",
    price: "",
    deposit: "",
    bedroom: "",
    bathroom: "",
    vrUrl: "",
    isAvailable: "",
  };
  const [validated, setValidated] = useState(false);
  const [state, dispatch] = useStoreContext();
  const [propertyFormState, setPropertyFormState] = useState({
    ...emptyForm,
    ...state.selectedUpdateProperty,
  });
  const [updateProperty, { error }] = useMutation(UPDATE_PROPERTY);

  function cancelUpdate() {
    dispatch({ type: SHOW_MODAL_UPDATE });
  }

  function formSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    try {
      propertyFormState.id = propertyFormState._id;
      propertyFormState.isAvailable =
        propertyFormState.isAvailable === "true" ||
        propertyFormState.isAvailable === true;
      updateProperty({
        variables: { ...propertyFormState },
      }).then((data) => {
        const index = state.propertyView.indexOf(state.selectedUpdateProperty);
        state.propertyView.splice(index, 1, data.data.updateProperty);
        dispatch({ type: PROPERTY_VIEW, propertyView: state.propertyView });
        dispatch({ type: SHOW_MODAL_UPDATE });
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleInput(e) {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setPropertyFormState({ ...propertyFormState, title: value });
        break;
      case "description":
        setPropertyFormState({ ...propertyFormState, description: value });
        break;
      case "shortDescription":
        setPropertyFormState({ ...propertyFormState, shortDescription: value });
        break;
      case "address":
        setPropertyFormState({ ...propertyFormState, address: value });
        break;
      case "price":
        setPropertyFormState({ ...propertyFormState, price: Number(value) });
        break;
      case "deposit":
        setPropertyFormState({ ...propertyFormState, deposit: Number(value) });
        break;
      case "bedroom":
        setPropertyFormState({ ...propertyFormState, bedroom: Number(value) });
        break;
      case "bathroom":
        setPropertyFormState({ ...propertyFormState, bathroom: Number(value) });
        break;
      case "vrUrl":
        setPropertyFormState({ ...propertyFormState, vrUrl: value });
        break;
      case "isAvailable":
        console.log(value);
        setPropertyFormState({
          ...propertyFormState,
          isAvailable: value,
        });
        break;
    }
  }

  return (
    <Form onSubmit={formSubmit}>
      <Form.Group>
        <Form.Label>
          Title <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          onChange={handleInput}
          type="text"
          name="title"
          value={propertyFormState.title}
          required
        />
        <Form.Control.Feedback type="invalid">
          Title is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>
          Description <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          onChange={handleInput}
          type="text"
          as="textarea"
          name="description"
          value={propertyFormState.description}
          required
        />
        <Form.Control.Feedback type="invalid">
          Description is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>
          Short Description <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          onChange={handleInput}
          type="text"
          as="textarea"
          name="shortDescription"
          value={propertyFormState.shortDescription}
          required
        />
        <Form.Control.Feedback type="invalid">
          Short description is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>
          Address <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          onChange={handleInput}
          type="text"
          as="textarea"
          name="address"
          value={propertyFormState.address}
          required
        />
        <Form.Control.Feedback type="invalid">
          Address is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>VR URL</Form.Label>
        <Form.Control
          onChange={handleInput}
          type="text"
          name="vrUrl"
          value={propertyFormState.vrUrl}
        />
      </Form.Group>

      <Row>
        <Form.Group as={Col}>
          <Form.Label>
            Price/week <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            onChange={handleInput}
            type="text"
            name="price"
            value={propertyFormState.price}
            required
          />
          <Form.Control.Feedback type="invalid">
            Price is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>
            Deposit <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            onChange={handleInput}
            type="text"
            name="deposit"
            value={propertyFormState.deposit}
            required
          />
          <Form.Control.Feedback type="invalid">
            Deposit is required
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col}>
          <Form.Label>
            Number of Bedrooms <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            onChange={handleInput}
            type="text"
            name="bedroom"
            value={propertyFormState.bedroom}
            required
          />
          <Form.Control.Feedback type="invalid">
            Bedrooms is required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>
            Number of Bathrooms <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            onChange={handleInput}
            type="text"
            name="bathroom"
            value={propertyFormState.bathroom}
            required
          />
          <Form.Control.Feedback type="invalid">
            Bathrooms is required
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Check
        inline
        onChange={handleInput}
        type="radio"
        label="Property Available"
        name="isAvailable"
        id="isAvailableTrue"
        value={true}
        checked={
          propertyFormState.isAvailable === "true" ||
          propertyFormState.isAvailable === true
        }
      />
      <Form.Check
        inline
        onChange={handleInput}
        type="radio"
        label="Property not Available"
        name="isAvailable"
        id="isAvailableFalse"
        value={false}
        checked={
          propertyFormState.isAvailable === "false" ||
          propertyFormState.isAvailable === false
        }
      />
      <Button
        className="mt-2 mb-2"
        variant="primary"
        type="submit"
      >
        Save
      </Button>
      <Button className="ms-2" variant="secondary" onClick={cancelUpdate}>
        Cancel
      </Button>
    </Form>
  );
}

export default UpdatePropertyForm;
