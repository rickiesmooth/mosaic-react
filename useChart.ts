import { useEffect, useRef } from "react";
import { useMosaic } from "./useMosaic";

// @TODO translate plot to json
export function useChart({ as }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isConnected, vg } = useMosaic();

  useEffect(() => {
    if (!isConnected) return;

    const plot = vg.plot(
      vg.lineY(vg.from("stocks", { filterBy: as }), {
        x: "Date",
        y: "Open",
        stroke: "steelblue",
        tip: true,
      }),
      vg.grid(true)
    );
    if (containerRef.current?.childNodes.length === 0) {
        containerRef.current?.append(plot);
    }
    return () => plot.remove();
  }, [isConnected, vg, containerRef, as]);

  return { containerRef };
}
