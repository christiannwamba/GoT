import React from "react";
import Modal from "react-modal";
import QuestionForm from "../question-form";

import "./modal.css";
import Close from "./cancel.svg";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    width: "450px",
    height: "400px",
    background: "#f7f8f9",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
  }
};

Modal.setAppElement("#root");

const QuestionModal = ({ isOpen, closeModal }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Question Modal"
    >
      <div className="modal-header">
        <p />
        <p>Add a question</p>
        <span onClick={closeModal} className="close">
          <img src={Close} alt="Press button to close modal" />
        </span>
      </div>
      <QuestionForm closeModal={closeModal} />
    </Modal>
  );
};

export default QuestionModal;
