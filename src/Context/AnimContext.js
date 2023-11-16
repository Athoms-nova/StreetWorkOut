import { createContext, useState } from "react";

export const AnimContext = createContext();

export const AnimProvider = ({ children }) => {
  const [onAnimation, setOnAnimation] = useState(false);


  return (
    <AnimContext.Provider
      value={{
        onAnimation,
        setOnAnimation
      }}
    >
      {children}
    </AnimContext.Provider>
  );
};
