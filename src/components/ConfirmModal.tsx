import React from "react";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", backgroundColor: "white" }}>
      <p>{message}</p>
      <button onClick={onConfirm} style={{ marginRight: "10px" }}>Confirmar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default ConfirmModal;
