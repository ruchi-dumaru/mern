import type { ReactNode } from "react";

type MetricCardProps = {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
};

const MetricCard = ({ title, value, change, icon }: MetricCardProps) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-semibold">{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
          {icon}
        </div>
      </div>
      <p className="mt-4 text-sm text-emerald-600">{change} from last month</p>
    </div>
  );
};

export default MetricCard;
