"use client";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { menu as createMenu } from "./Menu";
import { useMosaic } from "./useMosaic";
// @ts-ignore
import { MosaicClient } from "@uwdata/mosaic-core";

type Option = { value: string }

export function useMenu(options: any) {
  const menu = useRef<MosaicClient>(null);
  const [selectedValue, setSelectedValue] = useState(
    options.value || (options && options[0] && options[0].value) || ""
  );
  const { isConnected } = useMosaic();
  const [selectOptions, setSelectOptions] = useState<Option[]>(
    options.options ?? []
  );

  const opts = useMemo(() => ({ ...options }), [options]);

  useEffect(() => {
    const selection = opts.as;
    if (isConnected && !menu.current) {
      menu.current = createMenu({
        ...opts,
        onUpdate: ({ data }: { data: Option[] }) => {
          setSelectOptions(
            data.map((d: Option | any) => (d.value !== undefined ? d : d.toJSON()))
          );
        },
      });

      selection.addEventListener("value", (value: Option) => {
        if (value !== selectedValue) {
          setSelectedValue(value);
        }
      });
    }
    return () => selection.removeEventListener();
  }, [isConnected, opts, selectedValue]);

  return {
    onValueChange: (e: ChangeEvent<HTMLSelectElement>) => {
      const val = e.target.value;
      menu.current?.publish(val);
    },
    value: selectedValue,
    options: selectOptions,
  };
}
