import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { SHOW_MODAL_CONTACTS } from "../../utils/actions";
import { useStoreContext } from "../../utils/GlobalState";

function ModalContacts() {
  const [state, dispatch] = useStoreContext();

  function toggleModal() {
    dispatch({ type: SHOW_MODAL_CONTACTS });
  }

  return (
    <Modal show={state.setShowContactsModal} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Get In Touch</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <a href="http://www.xiaohongshu.com/user/profile/5de932df0000000001002e54?xhsshare=CopyLink&appuid=55ee30ac58944615d6afcba2&apptime=1661087575">
          <img
            src="https://ci.xiaohongshu.com/49fd555a-b46b-49fd-b5a5-053fb4a536dc"
          />
        </a>
      </Modal.Body>
    </Modal>
  );
}

export default ModalContacts;
