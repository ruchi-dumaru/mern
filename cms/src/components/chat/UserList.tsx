export type ChatContact = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  online?: boolean;
  unreadCount?: number;
  lastMessage?: string;
  isGroup?: boolean;
  members?: number;
};

type UserListProps = {
  groupContact: ChatContact;
  contacts: ChatContact[];
  activeContactId: string | null;
  activeGroup: boolean;
  onSelectContact: (contact: ChatContact) => void;
  onSelectGroup: () => void;
};

const avatarUrl = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0f172a&color=ffffff&bold=true&size=96`;

const UserListComponent = ({
  groupContact,
  contacts,
  activeContactId,
  activeGroup,
  onSelectContact,
  onSelectGroup,
}: UserListProps) => {
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
      <div style={{ padding: 16, borderBottom: "1px solid #e2e8f0" }}>
        <h2 style={{ margin: 0, fontSize: 20 }}>Chats</h2>
        <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 13 }}>
          User list with profile details
        </p>
      </div>

      <div style={{ overflowY: "auto", padding: 12 }}>
        <button
          type="button"
          onClick={onSelectGroup}
          style={{
            width: "100%",
            display: "flex",
            gap: 12,
            alignItems: "center",
            padding: 14,
            borderRadius: 16,
            background: activeGroup ? "#dbeafe" : "#f8fafc",
            border: activeGroup ? "1px solid #93c5fd" : "1px solid #e2e8f0",
            marginBottom: 10,
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <img
            src={groupContact.image || avatarUrl(groupContact.name)}
            alt={groupContact.name}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontWeight: 700, color: "#0f172a" }}>
              {groupContact.name}
            </div>
            <div style={{ fontSize: 13, color: "#64748b" }}>
              {groupContact.members ?? 0} members
            </div>
          </div>
        </button>

        {contacts.map((user) => {
          const isActive = activeContactId === user.id;
          return (
            <button
              key={user.id}
              type="button"
              onClick={() => onSelectContact(user)}
              style={{
                width: "100%",
                display: "flex",
                gap: 12,
                alignItems: "center",
                padding: 14,
                borderRadius: 16,
                background: isActive ? "#dbeafe" : "#f8fafc",
                border: isActive ? "1px solid #93c5fd" : "1px solid #e2e8f0",
                marginBottom: 10,
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div style={{ position: "relative", flexShrink: 0 }}>
                <img
                  src={user.image || avatarUrl(user.name)}
                  alt={user.name}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    border: "2px solid #fff",
                    background: user.online ? "#22c55e" : "#94a3b8",
                  }}
                />
              </div>

              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontWeight: 700, color: "#0f172a" }}>
                  {user.name}
                </div>
                <div style={{ fontSize: 13, color: "#64748b" }}>
                  {user.email}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: user.online ? "#16a34a" : "#94a3b8",
                  }}
                >
                  {user.online ? "Online" : "Offline"}
                </div>
              </div>

              {user.unreadCount ? (
                <span
                  style={{
                    minWidth: 22,
                    height: 22,
                    borderRadius: 999,
                    background: "#2563eb",
                    color: "#fff",
                    fontSize: 12,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 6px",
                  }}
                >
                  {user.unreadCount}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default UserListComponent;
