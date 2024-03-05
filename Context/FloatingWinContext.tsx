"use client";
import React, { createContext, useState } from "react";

export const floatingConext = createContext<{
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
  childrens: { title: string; content: React.ReactNode };
  HandleChangeChildren: any;
}>({
  toggle: true,
  setToggle: (toggle: boolean) => {},
  childrens: {
    title: "test",
    content: <p>test</p>,
  },
  HandleChangeChildren: null,
});

export const FloatingWinContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toggle, setToggle] = useState(false);
  const [childrens, setChildren] = useState({
    title: "test",
    content: <p>test</p>,
  });
  const HandleChangeChildren = (children: any) => {
    setChildren(children);
    setToggle(true);
  };
  return (
    <floatingConext.Provider
      value={{ toggle, setToggle, childrens, HandleChangeChildren }}
    >
      {children}
    </floatingConext.Provider>
  );
};
