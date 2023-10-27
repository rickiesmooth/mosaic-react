declare module "@uwdata/mosaic-sql" {
  interface QueryInterface {
    select(
      ...expr: (string | Record<string, any> | [string, any] | Ref)[]
    ): QueryInterface;
    $select(
      ...expr: (string | Record<string, any> | [string, any] | Ref)[]
    ): QueryInterface;
    distinct(value?: boolean): QueryInterface;
    from(
      ...expr: (string | Record<string, any> | [string, any] | Ref)[]
    ): QueryInterface;
    $from(
      ...expr: (string | Record<string, any> | [string, any] | Ref)[]
    ): QueryInterface;
    sample(
      value?:
        | number
        | { rows?: number; perc?: number; method?: string; seed?: number }
    ): QueryInterface;
    where(...expr: any[]): QueryInterface;
    $where(...expr: any[]): QueryInterface;
    groupby(
      ...expr: (string | Record<string, any> | [string, any] | Ref)[]
    ): QueryInterface;
    $groupby(
      ...expr: (string | Record<string, any> | [string, any] | Ref)[]
    ): QueryInterface;
    having(...expr: any[]): QueryInterface;
    window(...expr: Record<string, any>[]): QueryInterface;
    qualify(...expr: any[]): QueryInterface;
    orderby(
      ...expr: (string | Record<string, any> | [string, any] | Ref)[]
    ): QueryInterface;
    limit(value: number): QueryInterface;
    offset(value: number): QueryInterface;
    subqueries: (QueryInterface | SetOperationInterface)[];
    toString(): string;
  }

  interface SetOperationInterface {
    orderby(
      ...expr: (string | Record<string, any> | [string, any] | Ref)[]
    ): SetOperationInterface;
    limit(value: number): SetOperationInterface;
    offset(value: number): SetOperationInterface;
    subqueries: (QueryInterface | SetOperationInterface)[];
    toString(): string;
  }

  interface Ref {
    table: string;
    column: string;
  }

  interface isQuery {
    (value: any): boolean;
  }

  function literal(value: boolean | string | number | Date | null): string;
  function eq(a: string, b: string): string;
  let Query: QueryInterface
  export { Query, isQuery, literal, eq };
}
