import { createContext, useContext, useState, useCallback } from "react";
import { Toast } from "react-bootstrap";
import {
  CheckCircle,
  WarningCircle,
  XCircle,
  Info,
} from "phosphor-react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const ICONS = {
  success: <CheckCircle size={20} weight="fill" className="me-2 text-white" />,
  danger: <XCircle size={20} weight="fill" className="me-2 text-white" />,
  warning: <WarningCircle size={20} weight="fill" className="me-2 text-white" />,
  info: <Info size={20} weight="fill" className="me-2 text-white" />,
};

export const ToastProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  // Siempre iniciar como string, no como objeto para evitar confusión
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");
  const [header, setHeader] = useState(null);

  const showToast = useCallback((msg, variant = "success", header = null) => {
    setMessage(msg);
    setVariant(variant);
    setHeader(header);
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
        bg={variant}
        className="position-fixed top-0 start-50 translate-middle-x mt-3 shadow-lg"
        style={{ maxWidth: "90vw", width: "350px", zIndex: 1080 }}
      >
        <Toast.Header closeButton={false}>
          {ICONS[variant] || null}
          <strong className="me-auto text-white">
            {header || variant.charAt(0).toUpperCase() + variant.slice(1)}
          </strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContext.Provider>
  );
};