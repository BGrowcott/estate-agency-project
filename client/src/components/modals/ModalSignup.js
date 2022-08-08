import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { SHOW_MODAL_SIGNUP } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

import Signup from "../../components/forms/SignUp";

function ModalSignup() {
  const [state, dispatch] = useStoreContext();

  function toggleModal() {
    dispatch({ type: SHOW_MODAL_SIGNUP });
  }

  return (
    <>
      <Modal show={state.setShowSignupModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Signup />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalSignup;
