import { useLocation, Outlet } from "react-router";

type AuthUserLayoutPageProps = {
  role: string;
};

const AuthUserLayoutPage = ({ role }: AuthUserLayoutPageProps) => {
  const location = useLocation();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      {/* LEFT SIDE: Your Main Dashboard Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto p-6">
        <div className="mb-4">
          <h1 className="text-xl font-bold capitalize text-slate-800">
            {role} Portal
          </h1>
          <p className="text-sm text-slate-500">
            Current Route: {location.pathname}
          </p>
        </div>

        {/* This renders whatever page sub-route you are currently on */}
        <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Outlet context={{ role }} />
        </div>
      </main>

      {/* RIGHT SIDE: Dedicated Chat Bot Panel */}
      <aside className="w-96 border-l border-slate-200 bg-white flex flex-col shadow-lg">
        {/* Chat Bot Header */}
        <div className="border-b border-slate-100 p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <h2 className="font-semibold text-sm">AI Assistant</h2>
          </div>
        </div>

        {/* Chat Bot Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
          <div className="flex gap-2 max-w-[80%]">
            <div className="rounded-2xl bg-white border border-slate-200 p-3 text-sm text-slate-800 shadow-sm">
              Hello! How can I help you in the {role} dashboard today?
            </div>
          </div>
        </div>

        {/* Chat Bot Input Action Area */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Ask the bot something..." 
              className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400"
            />
            <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-800 transition">
              Send
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default AuthUserLayoutPage;
