import { useEffect, useState } from "react";

export const useWindow = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (window) {
      setWidth(window?.innerWidth || 0);
      setHeight(window?.innerHeight || 0);
    }
  }, []);

  return { width, height };
};
