import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { SHOW_MODAL_DELETE } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

function ModalDeleteConfirm({ callback }) {
  const [state, dispatch] = useStoreContext();

  function toggleModal() {
    dispatch({ type: SHOW_MODAL_DELETE });
  }

  function executeDelete() {
    callback();
  }

  return (
    <Modal
      show={state.setShowDeleteModal}
      onHide={toggleModal}
      centered
      size="sm"
    >
      <Modal.Header closeButton>
        <Modal.Title>Are you sure</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-around">
        <button className="btn btn-danger" onClick={executeDelete}>
          Yes
        </button>
        <button className="btn btn-secondary" onClick={toggleModal}>
          Cancel
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default ModalDeleteConfirm;
