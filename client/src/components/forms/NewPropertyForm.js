import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useMutation } from "@apollo/client";
import { CREATE_PROPERTY } from "../../utils/mutations";
import { PROPERTY_VIEW } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

function NewPropertyForm() {
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
  };

  const [createProperty, { error }] = useMutation(CREATE_PROPERTY);
  const [state, dispatch] = useStoreContext();
  const [validationMessage, setValidationMessage] = useState("");
  const [propertyFormState, setPropertyFormState] = useState(emptyForm);
  const [validated, setValidated] = useState(false);

  function formSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    try {
      // for (const [key, value] of Object.entries(propertyFormState)) {
      //   if (key === "vrUrl") {
      //     continue;
      //   }
      //   if (value === "") {
      //     setValidationMessage(
      //       `* ${
      //         key.charAt(0).toUpperCase() + key.slice(1)
      //       } is a required field`
      //     );
      //     return;
      //   }
      // }

      createProperty({
        variables: { ...propertyFormState },
      }).then((data) => {
        const newPropertyView = [
          ...state.propertyView,
          data.data.createProperty,
        ];
        dispatch({ type: PROPERTY_VIEW, propertyView: newPropertyView });
        setPropertyFormState(emptyForm);
        setValidationMessage("");
        window.location.assign(`/property/${data.data.createProperty._id}`);
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
    }
  }

  return (
    <Form noValidate validated={validated} onSubmit={formSubmit}>
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
            type="number"
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
            type="number"
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
            type="number"
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
            type="number"
            name="bathroom"
            value={propertyFormState.bathroom}
            required
          />
          <Form.Control.Feedback type="invalid">
            Bathrooms is required
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button className="mt-2 mb-2" variant="primary" type="submit">
        Save
      </Button>
      <div className="text-danger fst-italic">{validationMessage}</div>
    </Form>
  );
}

export default NewPropertyForm;
