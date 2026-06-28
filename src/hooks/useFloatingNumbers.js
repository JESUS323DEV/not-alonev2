import { useState, useCallback, useRef } from "react";

export function useFloatingNumbers() {
  const [floats, setFloats] = useState([]);
  const [staminaAlert, setStaminaAlert] = useState(false);
  const staminaAlertTimeout = useRef(null);

  const addFloat = useCallback((value, type) => {
    if (value === 0) return;
    const id = Date.now() + Math.random();
    setFloats((prev) => [...prev, { id, value, type }]);
    setTimeout(() => {
      setFloats((prev) => prev.filter((f) => f.id !== id));
    }, 1200);
  }, []);

  const triggerStaminaAlert = useCallback(() => {
    clearTimeout(staminaAlertTimeout.current);
    setStaminaAlert(true);
    staminaAlertTimeout.current = setTimeout(() => setStaminaAlert(false), 600);
  }, []);

  return { floats, staminaAlert, addFloat, triggerStaminaAlert };
}
