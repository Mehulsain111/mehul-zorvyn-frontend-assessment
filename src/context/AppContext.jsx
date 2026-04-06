import React, { createContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_TRANSACTIONS } from "../data/transactions.js";
import { loadJSON, saveJSON } from "../utils/storage.js";
import { sortTransactions } from "../utils/finance.js";

const AppContext = createContext(null);

const STORAGE_KEYS = {
  transactions: "finance_dashboard_transactions_v1",
  role: "finance_dashboard_role_v1",
  darkMode: "finance_dashboard_dark_mode_v1",
};

export function AppProvider({ children }) {
  const [role, setRole] = useState(() => loadJSON(STORAGE_KEYS.role, "viewer"));
  const [darkMode, setDarkMode] = useState(() =>
    loadJSON(STORAGE_KEYS.darkMode, false),
  );

  const [transactions, setTransactions] = useState(() => {
    const saved = loadJSON(STORAGE_KEYS.transactions, null);
    if (Array.isArray(saved) && saved.length) return saved;
    return DEFAULT_TRANSACTIONS;
  });

  const [filters, setFilters] = useState({
    search: "",
    type: "all", // all | income | expense
    sortBy: "date", // date | amount
    sortDir: "desc", // asc | desc
  });

  useEffect(() => {
    saveJSON(STORAGE_KEYS.transactions, transactions);
  }, [transactions]);

  useEffect(() => {
    saveJSON(STORAGE_KEYS.role, role);
  }, [role]);

  useEffect(() => {
    saveJSON(STORAGE_KEYS.darkMode, darkMode);
    const root = document.documentElement;
    if (darkMode) root.dataset.bsTheme = "dark";
    else delete root.dataset.bsTheme;
  }, [darkMode]);

  const sortedTransactions = useMemo(() => {
    return sortTransactions(transactions, filters.sortBy, filters.sortDir);
  }, [transactions, filters.sortBy, filters.sortDir]);

  const value = useMemo(
    () => ({
      role,
      setRole,
      darkMode,
      setDarkMode,
      transactions: sortedTransactions,
      rawTransactions: transactions,
      setTransactions,
      filters,
      setFilters,
    }),
    [
      role,
      darkMode,
      sortedTransactions,
      transactions,
      filters,
      setRole,
      setDarkMode,
      setTransactions,
      setFilters,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = React.useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
