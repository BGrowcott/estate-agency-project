import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useMutation } from "@apollo/client";
import { CREATE_PROPERTY } from "../../utils/mutations";
import { PROPERTY_VIEW } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

function NewPropertyForm() {
  const [createProperty, { error }] = useMutation(CREATE_PROPERTY);
  const [state, dispatch] = useStoreContext();
  const [validationMessage, setValidationMessage] = useState("");
  const [propertyFormState, setPropertyFormState] = useState({
    title: "",
    description: "",
    address: "",
    price: "",
    bedroom: "",
    bathroom: "",
  });

  function formSubmit(e) {
    e.preventDefault();
    try {
      for (const [key, value] of Object.entries(propertyFormState)) {
        if (value === "") {
          setValidationMessage(
            `* ${
              key.charAt(0).toUpperCase() + key.slice(1)
            } is a required field`
          );
          return;
        }
      }

      createProperty({
        variables: { ...propertyFormState },
      }).then((data) => {
        const newPropertyView = [...state.propertyView, data.data.createProperty];
        console.log(newPropertyView)
        dispatch({ type: PROPERTY_VIEW, propertyView: newPropertyView });
      });
      setPropertyFormState({
        title: "",
        description: "",
        address: "",
        price: "",
        bedroom: "",
        bathroom: "",
      });
      setValidationMessage("");
    } catch (error) {
      console.log(error);
    }
  }

  function checkState(e){
    e.preventDefault()
    console.log(state)
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
      case "address":
        setPropertyFormState({ ...propertyFormState, address: value });
        break;
      case "price":
        setPropertyFormState({ ...propertyFormState, price: Number(value) });
        break;
      case "bedroom":
        setPropertyFormState({ ...propertyFormState, bedroom: Number(value) });
        break;
      case "bathroom":
        setPropertyFormState({ ...propertyFormState, bathroom: Number(value) });
        break;
    }
  }

  return (
    <Form>
      <Form.Group>
        <Form.Label>
          Title <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control onChange={handleInput} type="text" name="title" value={propertyFormState.title}/>
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
        />
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
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>
          Price <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control onChange={handleInput} type="text" name="price" value={propertyFormState.price}/>
      </Form.Group>

      <Form.Group>
        <Form.Label>
          Number of Bedrooms <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control onChange={handleInput} type="text" name="bedroom" value={propertyFormState.bedroom}/>
      </Form.Group>

      <Form.Group>
        <Form.Label>
          Number of Bathrooms <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control onChange={handleInput} type="text" name="bathroom" value={propertyFormState.bathroom}/>
      </Form.Group>

      <Button
        className="mt-2 mb-2"
        onClick={formSubmit}
        variant="primary"
        type="submit"
      >
        Save
      </Button>
      <button onClick={checkState}>Check State</button>
      <div className="text-danger fst-italic">{validationMessage}</div>
    </Form>
  );
}

export default NewPropertyForm;
