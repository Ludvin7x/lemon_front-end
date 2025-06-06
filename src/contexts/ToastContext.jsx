import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  WarningCircle,
  XCircle,
  Info,
} from "phosphor-react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const ICONS = {
  success: <CheckCircle size={20} weight="fill" className="mr-2 text-white" />,
  danger: <XCircle size={20} weight="fill" className="mr-2 text-white" />,
  warning: <WarningCircle size={20} weight="fill" className="mr-2 text-white" />,
  info: <Info size={20} weight="fill" className="mr-2 text-white" />,
};

const COLORS = {
  success: "bg-green-600",
  danger: "bg-red-600",
  warning: "bg-yellow-600",
  info: "bg-blue-600",
};

export const ToastProvider = ({ children }) => {
  const [show, setShow] = useState(false);
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

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`fixed top-5 left-1/2 transform -translate-x-1/2 flex items-center rounded shadow-lg px-4 py-3 max-w-md w-[90vw] z-50 ${COLORS[variant]}`}
            role="alert"
          >
            {ICONS[variant]}
            <div className="flex flex-col">
              <strong className="text-white font-semibold">
                {header || variant.charAt(0).toUpperCase() + variant.slice(1)}
              </strong>
              <span className="text-white">{message}</span>
            </div>
            <button
              onClick={hideToast}
              aria-label="Cerrar"
              className="ml-auto text-white hover:text-gray-200"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};