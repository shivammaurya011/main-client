const Logger = {
    log: (...args) => {
      if (import.meta.env.VITE_DEBUG === "true") {
        console.log("[LOG]:", ...args);
      }
    },
    warn: (...args) => {
      if (import.meta.env.VITE_DEBUG === "true") {
        console.warn("[WARNING]:", ...args);
      }
    },
    error: (...args) => {
      console.error("[ERROR]:", ...args);
    },
    info: (...args) => {
      if (import.meta.env.VITE_DEBUG === "true") {
        console.info("[INFO]:", ...args);
      }
    },
  };
  
  export default Logger;
  