"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useDuckDBConnection,
  useDuckDB,
  useDuckDBConnectionDialer,
} from "@duckdb/react-duckdb";
import { AsyncDuckDB, AsyncDuckDBConnection } from "@duckdb/duckdb-wasm";
// @ts-ignore
import * as vg from "@uwdata/vgplot";
import { data } from "./data/stocks-csv";

export function wasmConnector(
  db: AsyncDuckDB | null,
  con: AsyncDuckDBConnection | null
) {
  return {
    db,
    con,
    query: async (query: { type: string; sql: string }) => {
      const { type, sql } = query;
      const result = (await con?.query(sql)) ?? [];
      return type === "exec"
        ? undefined
        : type === "arrow"
        ? result
        : Array.from(result);
    },
  };
}

export function useMosaic() {
  const [isConnected, setIsConnected] = useState(false);
  const connDialerCallback = useDuckDBConnectionDialer();
  const conn = useDuckDBConnection();
  const db = useDuckDB();
  const isInitializing = useRef(false);

  const setupConnection = useCallback(async () => {
    const wasm = wasmConnector(db?.value, conn);
    await vg.coordinator().databaseConnector(wasm);
    await db.value?.registerFileText(`stock-data.csv`, data);
    await vg.coordinator().exec(vg.loadCSV("stocks", "stock-data.csv"));

    setIsConnected(true);
  }, [db, conn]);

  useEffect(() => {
    if (isConnected || isInitializing.current === true) return;

    if ((conn as any)?._conn) {
      isInitializing.current = true;
      setupConnection();
      return;
    }
    connDialerCallback();
  }, [db, conn, connDialerCallback, isConnected, setupConnection]);

  return {
    isConnected,
    conn,
    db,
    vg,
  };
}
