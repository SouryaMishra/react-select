import { useEffect } from "react";

export const useOutsideClick = (
  nodeRef: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (nodeRef.current && !nodeRef.current.contains(e.target as HTMLElement))
        callback();
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [nodeRef, callback]);
};
