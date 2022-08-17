import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { SHOW_MODAL_UPDATE } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import UpdatePropertyForm from "../forms/UpdatePropertyForm";

function ModalUpdateProperty() {

  const [state, dispatch] = useStoreContext();

  function toggleModal() {
    dispatch({ type: SHOW_MODAL_UPDATE });
  }

  return (
    <Modal show={state.setShowUpdateModal} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdatePropertyForm/>
      </Modal.Body>
    </Modal>
  );
}

export default ModalUpdateProperty;
