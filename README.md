# mosaic-react

## example

```typescript

  const { containerRef } = useChart({
    plot: [
      {
        innerHeight: 288,
        mark: "lineY",
        data: {
          from: "kpis",
          // filterBy: "as",
        },
        x: "date",
        y: "visits",
        stroke: "steelblue",
        tip: true,
      },
      // {
      //   mark: "grid",
      //   value: true,
      // },
    ],
  });
  <div ref={containerRef} className="h-72 mt-4 p-6" />

```
