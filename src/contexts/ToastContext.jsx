import { createContext, useContext, useState, useCallback } from "react";
import { Toast } from "react-bootstrap";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [bg, setBg] = useState("success"); // success, danger, info...

  const showToast = useCallback((msg, variant = "success") => {
    setMessage(msg);
    setBg(variant);
    setShow(true);
  }, []);

  const hideToast = () => setShow(false);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}

      <Toast
        onClose={hideToast}
        show={show}
        delay={3000}
        autohide
        bg={bg}
        className="position-fixed top-0 start-50 translate-middle-x mt-3"
        style={{ maxWidth: "90vw", width: "350px", zIndex: 1050 }}
      >
        <Toast.Header closeButton={false}>
          <strong className={`me-auto text-${bg === "danger" ? "danger" : "success"}`}>
            {bg.charAt(0).toUpperCase() + bg.slice(1)}
          </strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContext.Provider>
  );
};