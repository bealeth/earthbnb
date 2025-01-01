const Modal: React.FC<{ onClose: () => void; children: React.ReactNode }> = ({
    onClose,
    children,
  }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          {children}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          >
            X
          </button>
        </div>
      </div>
    );
  };
  
  export default Modal;
  