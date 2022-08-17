import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import NewPropertyForm from "../forms/NewPropertyForm";
import { useStoreContext } from "../../utils/GlobalState";
import { SELECTED_UPDATE_PROPERTY, SHOW_MODAL_UPDATE } from "../../utils/actions";
import { Link } from "react-router-dom";

function AdminAccordion({properties}){

  const [state, dispatch] = useStoreContext();

  function toggleModalUpdate(e) {
    const selectedProperty = state.propertyView.find(property => property._id === e.target.dataset.id)
    dispatch({type: SELECTED_UPDATE_PROPERTY, property: selectedProperty});
    dispatch({ type: SHOW_MODAL_UPDATE });
  }

    return (
        <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add New Property</Accordion.Header>
          <Accordion.Body>
                <NewPropertyForm/>
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
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map(property => (
                      <tr key={property._id}>
                        <td>{property.title}</td>
                        <td>{property.address}</td>
                        <td>{property.price}</td>
                        <td>{property.isAvailable ? "Yes" : "No"}</td>
                        <td><a data-id={property._id} onClick={toggleModalUpdate} href="#">Edit</a></td>
                        <td><Link target="_blank" to={`/property/${property._id}`}>View</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    )

}

export default AdminAccordion;