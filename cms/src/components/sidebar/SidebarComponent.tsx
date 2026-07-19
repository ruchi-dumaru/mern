import { type ReactNode } from "react";
import { Link, useLocation } from "react-router";
import {
  BannerIcon,
  BrandIcon,
  CategoryIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DashboardIcon,
  MessageIcon,
  OrderIcon,
  ProductIcon,
  TransactionIcon,
  UserIcon,
} from "../../assets/icons";

type NavItem = {
  label: string;
  icon: ReactNode;
  active?: boolean;
  to?: string;
};

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <DashboardIcon />, to: "/admin", active: false },
  { label: "Banner Management", icon: <BannerIcon />, to: "/admin/banners" },
  { label: "Brand Management", icon: <BrandIcon />, to: "/admin/brands" },
  {
    label: "Category Management",
    icon: <CategoryIcon />,
    to: "/admin/categories",
  },
  { label: "Product Management", icon: <ProductIcon />, to: "/admin/products" },
  { label: "Order Management", icon: <OrderIcon />, to: "/admin/orders" },
  { label: "User Management", icon: <UserIcon />, to: "/admin/users" },
  {
    label: "Transactions",
    icon: <TransactionIcon />,
    to: "/admin/transactions",
  },
  { label: "Chat", icon: <MessageIcon />, to: "/admin/chat" },
];

export const SidebarComponent = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  const isActive = (to?: string) => {
    if (!to) return false;
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };
  return (
    <aside
      className={`flex flex-col border-r border-slate-200 bg-white px-4 py-5 shadow-sm transition-all duration-300 ${collapsed ? "w-24" : "w-72"}`}
    >
      <div className="flex items-center justify-between">
        {!collapsed ? (
          <div>
            <h2 className="text-lg font-semibold">Admin Panel</h2>
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
            A
          </div>
        )}
        <button
          onClick={onToggle}
          className="rounded-full border border-slate-200 p-2 text-slate-600 hover:bg-slate-200"
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </button>
      </div>

      <nav className="mt-8 space-y-2">
        {navItems.map((item) => {
          const active = isActive(item.to) || item.active;

          return (
            <Link
              key={item.label}
              to={item.to || "/admin"}
              className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium transition ${active ? "bg-slate-200 text-slate-800" : "text-slate-600 hover:bg-slate-200"}`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${active ? "bg-white text-slate-800" : "bg-slate-200 text-slate-700"}`}
              >
                {item.icon}
              </span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SidebarComponent;
