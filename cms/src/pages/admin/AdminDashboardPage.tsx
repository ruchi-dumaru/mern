import {
  OfferIcon,
  OrderIcon,
  ProductIcon,
  TransactionIcon,
  UserIcon,
} from "../../assets/icons";
import LowStockList from "../../components/dashboard/LowStockList";
import MetricCard from "../../components/dashboard/MetricCard";
import OrdersTable from "../../components/dashboard/OrdersTable";
import RecentUsersList from "../../components/dashboard/RecentUsersList";

import type { ReactNode } from "react";

type MetricCardData = {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
};

const metrics: MetricCardData[] = [
  {
    title: "Total Users",
    value: "24.8K",
    change: "+12.4%",
    icon: <UserIcon />,
  },
  {
    title: "Total Products",
    value: "3.2K",
    change: "+8.1%",
    icon: <ProductIcon />,
  },
  {
    title: "Total Orders",
    value: "8.9K",
    change: "+6.2%",
    icon: <OrderIcon />,
  },
  {
    title: "Total Revenue",
    value: "$184K",
    change: "+14.8%",
    icon: <TransactionIcon />,
  },
  {
    title: "Pending Orders",
    value: "182",
    change: "-3.2%",
    icon: <OrderIcon />,
  },
  { title: "Active Offers", value: "47", change: "+5.0%", icon: <OfferIcon /> },
];

const recentOrders = [
  { id: "#1024", customer: "Ava Carter", total: "$340", status: "Shipped" },
  { id: "#1023", customer: "Liam Chen", total: "$125", status: "Pending" },
  { id: "#1022", customer: "Noah Silva", total: "$780", status: "Delivered" },
];

const lowStockProducts = [
  { name: "Wireless Headphones", stock: 4 },
  { name: "Smart Watch", stock: 7 },
  { name: "Portable Charger", stock: 6 },
];

const recentUsers = [
  { name: "Mina Ali", role: "Admin", status: "Online" },
  { name: "David Brooks", role: "Vendor", status: "Away" },
  { name: "Sofia Khan", role: "Customer", status: "Online" },
];

const AdminDashboardPage = () => {
  return (
    <div className="space-y-6">
     
        <h1 className="mt-2 text-2xl font-bold">Dashboard Overview</h1>
     

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <OrdersTable orders={recentOrders} />
        <LowStockList products={lowStockProducts} />
      </div>

      <RecentUsersList users={recentUsers} />
    </div>
  );
};

export default AdminDashboardPage;
