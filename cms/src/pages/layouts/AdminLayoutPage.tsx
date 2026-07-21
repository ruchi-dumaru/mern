import { useState } from "react";
import { Outlet } from "react-router";
import { ChevronDownIcon, MenuIcon, SearchIcon, UserIcon } from "../../assets/icons";
import { SidebarComponent } from "../../components/sidebar/SidebarComponent";
import useAuth from "../../hooks/auth.hook";

const AdminLayoutPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  const {loggedInUser}=useAuth()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="flex min-h-screen">
        <SidebarComponent collapsed={collapsed} onToggle={toggleSidebar} />
        <main className="flex-1">
          <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleSidebar}
                  className="rounded-full border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                >
                  <MenuIcon />
                </button>
                <label className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-500">
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-32 bg-transparent outline-none sm:w-48"
                  />
                </label>
              </div>

              <div className="relative">
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-2"
                >
                 <UserIcon/>
                  <div className="hidden text-left sm:block">
                    <p className="text-sm font-semibold">{loggedInUser?.name}</p>
                  </div>
                  <ChevronDownIcon />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                    <button className="flex w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-slate-100">
                      My Profile
                    </button>
                    <button className="flex w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-slate-100">
                      Change Password
                    </button>
                    <button className="flex w-full rounded-xl px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayoutPage;
