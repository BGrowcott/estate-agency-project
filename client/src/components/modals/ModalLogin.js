import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SHOW_MODAL_LOGIN } from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';

import Login from '../../components/forms/Login';

function ModalLogin() {
  const [state, dispatch] = useStoreContext();

  function toggleModal(){
    dispatch({type: SHOW_MODAL_LOGIN})
  }

  return (
    <>
      {/* <Button variant="primary" onClick={toggleModal}>
        Launch demo modal
      </Button> */}

      <Modal show={state.setShowLoginModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body><Login/></Modal.Body>
      </Modal>
    </>
  );
}

export default ModalLogin