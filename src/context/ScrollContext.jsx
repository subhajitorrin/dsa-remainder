import { createContext, useRef, useState } from "react";
export const ScrollContext = createContext();
export function ScrollProvidor({ children }) {
  const [scrollRef, setScrollRef] = useState(null);
  function handelScroll() {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <ScrollContext.Provider value={{ scrollRef, setScrollRef,handelScroll }}>
      {children}
    </ScrollContext.Provider>
  );
}
