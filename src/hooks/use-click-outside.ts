import { RefObject, useEffect } from "react";

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <
  ElementType extends HTMLElement = HTMLElement
>(
  elementRef: RefObject<ElementType>,
  callback: (event: Event) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const element = elementRef.current;
      const isOutside = element && !element.contains(event.target as Node);
      if (isOutside) {
        callback(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [elementRef, callback]);
};
