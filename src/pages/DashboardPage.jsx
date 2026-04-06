import { useMemo, useState } from "react";
import PageShell from "../components/PageShell";
import SummaryCards from "../components/SummaryCards";
import Card from "../components/Card";
import BalanceLineChart from "../charts/BalanceLineChart";
import SpendingPieChart from "../charts/SpendingPieChart";
import TransactionsSection from "../components/TransactionsSection";
import InsightsSection from "../components/InsightsSection";
import AddTransactionModal from "../components/AddTransactionModal";
import { useApp } from "../context/AppContext";

export default function DashboardPage() {
  const { role, transactions } = useApp();
  const [addOpen, setAddOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const hasData = useMemo(() => transactions.length > 0, [transactions.length]);
  const modalOpen = addOpen || Boolean(selectedTransaction);

  function closeModal() {
    setAddOpen(false);
    setSelectedTransaction(null);
  }

  return (
    <PageShell
      title="Finance Dashboard"
      subtitle="Track balances, spending, and transactions in one place."
      onAddTransaction={role === "admin" ? () => setAddOpen(true) : null}
    >
      <div className="row g-4 g-lg-5">
        <div className="col-12">
          <SummaryCards />
        </div>

        <div className="col-12 col-lg-8">
          <Card title="Balance Trend" subtitle="Running balance over time">
            <div className="app-chart-box">
              <BalanceLineChart disabled={!hasData} />
            </div>
          </Card>
        </div>

        <div className="col-12 col-lg-4">
          <Card title="Spending Breakdown" subtitle="Expenses by category">
            <div className="app-chart-box">
              <SpendingPieChart disabled={!hasData} />
            </div>
          </Card>
        </div>

        <div className="col-12 col-lg-4">
          <InsightsSection />
        </div>

        <div className="col-12 col-lg-8">
          <TransactionsSection onEdit={setSelectedTransaction} />
        </div>
      </div>

      <AddTransactionModal
        open={modalOpen}
        onClose={closeModal}
        transaction={selectedTransaction}
      />
    </PageShell>
  );
}
