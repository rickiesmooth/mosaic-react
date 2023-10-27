declare module "@uwdata/mosaic-core" {
  type MenuOptions = {
    filterBy: string;
    from: string;
    column: string;
    format?: string;
    options?: MenuItem[];
    as: Selection | ParamSelection;
    onUpdate: (data: {
      data: MenuItem[];
      format?: string;
      select: Selection | ParamSelection;
    }) => void;
  };

  class Menu {
    constructor(options: MenuOptions);
    reset(): void;
    publish(value: string): void;
    query(filter?: FilterExpression[]): Query;
    queryResult(data: MenuItem[]): this;
    update(): this;
  }

  class MosaicClient {
    constructor(filterBy: string);
    publish(value: string): void;
  }

  let MosaicClient = MosaicClient;
  let isParam = (param: any) => boolean;
  let isSelection = (selection: any) => boolean;
}
