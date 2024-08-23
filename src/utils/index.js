export const formatNumbers = (n)=> {
    if(n) return n?.toFixed(3)
    };

export const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  