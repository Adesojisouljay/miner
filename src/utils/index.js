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
    