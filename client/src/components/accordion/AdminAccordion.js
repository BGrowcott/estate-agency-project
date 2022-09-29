import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import NewPropertyForm from "../forms/NewPropertyForm";
import { useStoreContext } from "../../utils/GlobalState";
import {
  SELECTED_UPDATE_PROPERTY,
  SHOW_MODAL_UPDATE,
  SHOW_MODAL_DELETE,
  PROPERTY_VIEW,
} from "../../utils/actions";
import { Link } from "react-router-dom";
import ModalDeleteConfirm from "../modals/ModalDeleteConfirm";
import { useMutation } from "@apollo/client";
import { REMOVE_PROPERTY } from "../../utils/mutations";

function AdminAccordion({ properties }) {
  const [removeProperty, { error }] = useMutation(REMOVE_PROPERTY);
  const [state, dispatch] = useStoreContext();
  const [selectedProperty, setProperty] = useState();

  function toggleModalUpdate(e) {
    const selectedProperty = state.propertyView.find(
      (property) => property._id === e.target.dataset.id
    );
    dispatch({ type: SELECTED_UPDATE_PROPERTY, property: selectedProperty });
    dispatch({ type: SHOW_MODAL_UPDATE });
  }
  function toggleModalDelete(e) {
    setProperty(e.target.dataset.id);
    dispatch({ type: SHOW_MODAL_DELETE });
  }

  async function removePropertyHandler() {
    try {
      await removeProperty({
        variables: { propertyId: selectedProperty },
      });
      const remainingProperties = state.propertyView.filter(
        (property) => property._id !== selectedProperty
      );
      dispatch({ type: PROPERTY_VIEW, propertyView: remainingProperties });
      dispatch({type: SHOW_MODAL_DELETE})
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add New Property</Accordion.Header>
          <Accordion.Body>
            <NewPropertyForm />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Edit A Property</Accordion.Header>
          <Accordion.Body>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Address</th>
                  <th>£/week</th>
                  <th>Available</th>
                  <th>Edit</th>
                  <th>View</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property._id}>
                    <td>{property.title}</td>
                    <td>{property.address}</td>
                    <td>{property.price}</td>
                    <td>{property.isAvailable ? "Yes" : "No"}</td>
                    <td>
                      <a
                        data-id={property._id}
                        onClick={toggleModalUpdate}
                        href="#"
                      >
                        Edit
                      </a>
                    </td>
                    <td>
                      <Link target="_blank" to={`/property/${property._id}`}>
                        View
                      </Link>
                    </td>
                    <td>
                      <a
                        data-id={property._id}
                        onClick={toggleModalDelete}
                        href="#"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Find a User</Accordion.Header>
          <Accordion.Body>
            
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <ModalDeleteConfirm callback={removePropertyHandler} />
    </>
  );
}

export default AdminAccordion;
