

import type { ChangeEvent, Dispatch, SetStateAction } from "react";

interface IPageSearchProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
  totalItems: number;
  placeholder?: string;
}

export const PageSearch = ({
  search,
  setSearch,
  setPage,
  totalItems,
  placeholder = "Search...",
}: Readonly<IPageSearchProps>) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="w-full sm:w-72">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-slate-400"
        />
      </div>

      <p className="text-sm text-slate-500">
        {totalItems} item{totalItems !== 1 ? "s" : ""} found
      </p>
    </div>
  );
};