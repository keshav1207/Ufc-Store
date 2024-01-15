import ReactModal from "react-modal";

const MyModal = ({ isOpen, closeModal, text }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Delete Confirmation"
    >
      <h2>{text}</h2>
      <button onClick={closeModal}>Close Modal</button>
    </ReactModal>
  );
};

export default MyModal;