import { useRef } from "react";
import { useEffect } from "react";

export default function usePrevious(value) {
    const ref = useRef();
    
    useEffect(() => {
      ref.current = value;
    });

    return ref.current;
  }