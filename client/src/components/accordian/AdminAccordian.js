import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import NewPropertyForm from "../forms/NewPropertyForm";

function AdminAccordian(){

    return (
        <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add New Property</Accordion.Header>
          <Accordion.Body>
                <NewPropertyForm/>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Add New Article</Accordion.Header>
          <Accordion.Body>
                CONTENT HERE
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    )

}

export default AdminAccordian;