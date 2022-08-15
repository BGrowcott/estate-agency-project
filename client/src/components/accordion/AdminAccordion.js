import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import NewPropertyForm from "../forms/NewPropertyForm";

function AdminAccordion({properties}){

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
                      <th>¥/week</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map(property => (
                      <tr key={property._id}>
                        <td>{property.title}</td>
                        <td>{property.address}</td>
                        <td>{property.price}</td>
                        <td><button className="btn btn-primary btn-sm">Edit</button></td>
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