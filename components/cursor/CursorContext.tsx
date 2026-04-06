"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

type CursorVariant = "default" | "hover" | "text" | "image";

interface CursorContextType {
  variant: CursorVariant;
  setVariant: (variant: CursorVariant) => void;
  text: string;
  setText: (text: string) => void;
  registerMagnetic: (el: HTMLElement | null) => void;
  magneticElements: Set<HTMLElement>;
}

const CursorContext = createContext<CursorContextType>({
  variant: "default",
  setVariant: () => {},
  text: "",
  setText: () => {},
  registerMagnetic: () => {},
  magneticElements: new Set(),
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [text, setText] = useState("");
  const [magneticElements] = useState<Set<HTMLElement>>(new Set());

  const registerMagnetic = useCallback(
    (el: HTMLElement | null) => {
      if (el) magneticElements.add(el);
    },
    [magneticElements]
  );

  return (
    <CursorContext.Provider
      value={{ variant, setVariant, text, setText, registerMagnetic, magneticElements }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export const useCursor = () => useContext(CursorContext);
