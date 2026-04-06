import { useMemo } from "react";
import Card from "./Card.jsx";
import TransactionsControls from "./TransactionsControls.jsx";
import TransactionsTable from "./TransactionsTable.jsx";
import EmptyState from "./EmptyState.jsx";
import { useApp } from "../context/AppContext.jsx";
import { filterTransactions } from "../utils/finance.js";

export default function TransactionsSection({ onEdit }) {
  const { transactions, filters, role } = useApp();

  const filtered = useMemo(
    () => filterTransactions(transactions, filters),
    [transactions, filters],
  );

  return (
    <Card
      title="Transactions"
      subtitle="Search, filter, and sort your activity"
      actions={<TransactionsControls />}
    >
      <div className="mt-2">
        {filtered.length ? (
          <TransactionsTable
            transactions={filtered}
            role={role}
            onEdit={role === "admin" ? onEdit : undefined}
          />
        ) : (
          <div style={{ height: 256 }}>
            <EmptyState
              title="No transactions found"
              hint="Try adjusting filters, or add a new transaction as Admin."
            />
          </div>
        )}
      </div>
    </Card>
  );
}
