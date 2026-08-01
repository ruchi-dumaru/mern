type User = {
  id: number;
  name: string;
  email: string;
};

type UserListProps = {
  users: User[];
};

const UserListComponent = ({ users }: UserListProps) => {
  return (
    <aside
      style={{
        width: 340,
        flexShrink: 0,
        borderRight: "1px solid #e2e8f0",
        background: "rgba(255, 255, 255, 0.92)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: 1, borderBottom: "1px solid #e2e8f0" }}>
        <h2 style={{ margin: 0, fontSize: 20 }}>Chats</h2>
        <p style={{ color: "#64748b", fontSize: 13 }}>
          User list with profile details
        </p>
      </div>

      <div style={{ overflowY: "auto", padding: 12 }}>
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              padding: 14,
              borderRadius: 16,
              background: "#f8fafc",
              border: "1px solid #e2e8f0",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                display: "grid",
                placeItems: "center",
                fontWeight: 700,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              {user.name.charAt(0)}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 700, color: "#0f172a" }}>
                {user.name}
              </div>
              <div style={{ fontSize: 13, color: "#64748b" }}>{user.email}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default UserListComponent;
