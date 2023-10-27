import { useEffect, useRef } from "react";
import { useMosaic } from "./useMosaic";
import { Specification } from "@uwdata/vgplot";

// https://github.com/uwdata/mosaic/discussions/179
export function useChart(specs: Specification, options?: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isConnected, vg } = useMosaic();

  useEffect(() => {
    if (!isConnected) return;
    const plot = vg.parseSpec(specs, options);
    if (containerRef.current?.childNodes.length === 0) {
        containerRef.current?.append(plot);
    }
    return () => plot?.remove();
  }, [isConnected, vg, containerRef]);

  return { containerRef };
}
