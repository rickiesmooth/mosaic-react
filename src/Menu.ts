import { MosaicClient, isParam, isSelection } from "@uwdata/mosaic-core";
import { Query, eq, literal } from "@uwdata/mosaic-sql";
import { input } from "./input";

const isObject = (v: unknown) => {
  return v && typeof v === "object" && !Array.isArray(v);
};

export type MenuOptions = {
  filterBy: string;
  from: string;
  column: string;
  format?: (value: unknown) => string;
  options?: unknown[];
  as: any;
  onUpdate: (data: unknown) => void;
};

export class Menu extends MosaicClient {
  from: string;
  column: string;
  selection: any;
  format?: (value: unknown) => string;
  onUpdate: (arg: any) => any;
  data: any[];
  constructor({
    filterBy,
    from,
    column,
    format,
    options,
    as,
    onUpdate,
  } = {} as MenuOptions) {
    super(filterBy);
    this.from = from;
    this.column = column;
    this.selection = as;
    this.format = format;
    this.onUpdate = onUpdate;

    this.data = options
      ? options.map((value) => (isObject(value) ? value : { value }))
      : [];
  }

  reset() {
    this.onUpdate({ target: { value: "" } });
  }

  publish(value: string) {
    const { selection, column } = this;
    if (isSelection(selection)) {
      selection.update({
        source: this,
        schema: { type: "point" },
        value,
        predicate: value ? eq(column, literal(value)) : null,
      });
    } else if (isParam(selection)) {
      selection.update(value);
    }
  }

  query(filter = []): typeof Query | null {
    const { from, column } = this;
    if (!from) return null;
    return Query.from(from)
      .select({ value: column })
      .distinct()
      .where(filter)
      .orderby(column);
  }

  queryResult(data: unknown[]) {
    this.data = [{ value: "", label: "All" }, ...data];
    return this;
  }

  update() {
    const { data, format } = this;
    this.onUpdate({ data, format });

    return this;
  }
}

export const menu = (options: any) => input(Menu, options);
