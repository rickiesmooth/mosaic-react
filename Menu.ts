// @ts-nocheck
import { MosaicClient, isParam, isSelection } from "@uwdata/mosaic-core";
import { Query, eq, literal } from "@uwdata/mosaic-sql";
import { input } from "./input";

const isObject = v => {
  return v && typeof v === 'object' && !Array.isArray(v);
};

export class Menu extends MosaicClient {
  constructor({ filterBy, from, column, format, options, as, onUpdate }) {
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
    handleSelectChange({ target: { value: "" } });
  }

  publish(value) {
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

  query(filter = []) {
    const { from, column } = this;
    if (!from) return null;
    return Query.from(from)
      .select({ value: column })
      .distinct()
      .where(filter)
      .orderby(column);
  }

  queryResult(data) {
    this.data = [{ value: "", label: "All" }, ...data];
    return this;
  }

  update() {
    const { data, format, select } = this;
    this.onUpdate({ data, format, select });

    return this;
  }
}

export const menu = (options) => input(Menu, options);
