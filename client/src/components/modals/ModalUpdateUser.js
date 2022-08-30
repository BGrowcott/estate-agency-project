import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { SHOW_MODAL_UPDATE_USER } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";
import UpdateUserForm from "../forms/UpdateUserForm";

function ModalUpdateUser({user}) {

  const [state, dispatch] = useStoreContext();

  function toggleModal() {
    dispatch({ type: SHOW_MODAL_UPDATE_USER });
  }

  return (
    <Modal show={state.setShowUpdateUserModal} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Update Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdateUserForm user={user}/>
      </Modal.Body>
    </Modal>
  );
}

export default ModalUpdateUser;