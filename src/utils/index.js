import { toast } from "react-toastify";
import { jwtDecode } from 'jwt-decode';

export const usdPrice = 1700; //should serve as placeholder

export const formatNumbers = (n)=> {
    if(n) return n?.toFixed(3)
    };

export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const formatString = (str) => {
  if (str.length <= 8) {
    return str;
  }

  const firstPart = str.slice(0, 4);
  const lastPart = str.slice(-4);

  return `${firstPart}...${lastPart}`;
}

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => toast.success("Copied to clipboard!", {
      style: {
        backgroundColor: 'rgba(229, 229, 229, 0.1)',
        color: '#fff',
        fontSize: '16px',
        marginTop: "60px"
      },
    }))
    .catch((error) => toast.error("Failed to copy text", {
      style: {
        backgroundColor: 'rgba(229, 229, 229, 0.1)',
        color: '#fff',
        fontSize: '16px',
        marginTop: "60px"
      },
    }));
};

export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

    