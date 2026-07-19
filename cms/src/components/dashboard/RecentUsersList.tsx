type RecentUser = {
  name: string;
  role: string;
  status: string;
};

type RecentUsersListProps = {
  users: RecentUser[];
};

const RecentUsersList = ({ users }: RecentUsersListProps) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Users</h2>
        <button className="text-sm font-medium text-slate-500 hover:text-slate-700">
          Manage
        </button>
      </div>
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.name}
            className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-3"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-slate-500">{user.role}</p>
            </div>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              {user.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentUsersList;
