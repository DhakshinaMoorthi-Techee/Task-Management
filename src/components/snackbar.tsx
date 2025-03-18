import { useEffect } from "react";

const Snackbar = ({ message, isOpen, onClose }: any) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    isOpen && (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300">
        <span>{message}</span>
      </div>
    )
  );
};

export default Snackbar;
