type ModalProps = {
  modalMessage: string;
  modalTimer: number;
};

const Modal = ({ modalMessage, modalTimer }: ModalProps) => {
  return (
    <div className="w-full max-w-md flex flex-col gap-3 py-4 sm:py-20 items-center bg-yellow-300 shadow-md rounded-2xl">
      <div className="text-2xl sm:text-4xl font-bold">{modalMessage}</div>
      <div>{modalTimer}</div>
    </div>
  );
};

export default Modal;
