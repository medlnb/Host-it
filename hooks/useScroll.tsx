"use client";
import { useState, useEffect } from "react";

export function useScroll() {
  // storing this to get the scroll direction
  if (typeof window !== "undefined") {
    return {
      scrollDirection: undefined,
    };
  }
  const [lastScrollTop, setLastScrollTop] = useState(0);
  // the offset of the document.body
  const [bodyOffset, setBodyOffset] = useState(
    document.body.getBoundingClientRect()
  );
  // the vertical direction
  const [scrollY, setScrollY] = useState(bodyOffset.top);
  // the horizontal direction
  const [scrollX, setScrollX] = useState(bodyOffset.left);
  // scroll direction would be either up or down
  const [scrollDirection, setScrollDirection] = useState<
    "down" | "up" | undefined
  >();

  const listener = () => {
    setBodyOffset(document.body.getBoundingClientRect());
    setScrollY(-bodyOffset.top);
    setScrollX(bodyOffset.left);
    const direction = lastScrollTop > -bodyOffset.top ? "down" : "up";
    setScrollDirection(direction);
    setLastScrollTop(-bodyOffset.top);
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });

  return {
    scrollY,
    scrollX,
    scrollDirection,
  };
}
