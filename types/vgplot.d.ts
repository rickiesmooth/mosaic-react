declare module "@uwdata/vgplot" {
  function coordinator(): any;
  function databaseConnector(wasm: any): void;
  function plot(...args: any[]): any;
  function lineY(...args: any[]): any;
  function from(...args: any[]): any;
  function grid(...args: any[]): any;
  
  function parseSpec(
    specs: Specification,
    options?: any
  ): Node & { remove: () => void };

  interface Meta {
    title: string;
    description: string;
  }

  interface DataDefinition {
    queryData?: string;
    csvData?: {
      file: string;
      delimiter: string;
    };
    jsonData?: {
      file: string;
      type: string;
    };
    parquetData?: {
      file: string;
      select: string[];
      where: string;
    };
    // Add more data types as needed
  }

  interface ParamDefinition {
    [paramName: string]: any;
  }

  interface SelectionDefinition {
    [selectionName: string]: {
      select: string;
    };
  }

  interface Element {
    input?: string;
    as?: string;
    min?: number;
    max?: number;
    step?: number;
    // Add more input options as needed
  }

  interface Mark {
    mark: string;
    data: {
      from: string;
      filterBy?: string;
    };
    [attributeName: string]: any;
  }

  interface Plot {
    plot: Mark[];
    yAxis?: string;
    width?: number;
    height?: number;
    // Add more plot options as needed
  }

  interface Legend {
    legend: string;
    for: string;
  }

  export interface Specification {
    meta?: Meta;
    data?: DataDefinition;
    params?: ParamDefinition;
    vconcat?: (Element | Plot | Legend)[];
    hconcat?: (Element | Plot | Legend)[];
    vspace?: string | number;
    hspace?: string | number;
    // Add more top-level element properties as needed
  }

  export {
    coordinator,
    databaseConnector,
    plot,
    lineY,
    from,
    grid,
    parseSpec,
  };
}
