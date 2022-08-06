import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function NewPropertyForm(){
    return (
        <Form>
            <Form.Group>
                <Form.Label>
                    Title
                </Form.Label>
                <Form.Control
                    type="text"
                    name="propertyTitle"                    
                />
            </Form.Group>
            
            <Form.Group>
                <Form.Label>
                    Description
                </Form.Label>
                <Form.Control
                    type="text"
                    as="textarea"
                    name="propertyTitle"                    
                />
            </Form.Group>

        </Form>
    )
}

export default NewPropertyForm

