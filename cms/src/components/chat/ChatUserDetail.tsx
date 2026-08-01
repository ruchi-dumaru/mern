type ChatUserDetailProps = {
  name: string;
  status: string;
  image?: string | null;
  isOnline?: boolean;
  memberCount?: number;
  subtitle?: string;
};

const avatarUrl = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=ffffff&bold=true&size=96`;

const ChatUserDetail = ({
  name,
  status,
  image,
  isOnline = false,
  memberCount,
  subtitle,
}: ChatUserDetailProps) => {
  return (
    <header
      style={{
        height: 78,
        flexShrink: 0,
        padding: "0 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(255, 255, 255, 0.96)",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ position: "relative" }}>
          <img
            src={image || avatarUrl(name)}
            alt={name}
            style={{
              width: 48,
              height: 48,
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
              background: isOnline ? "#22c55e" : "#94a3b8",
            }}
          />
        </div>

        <div>
          <h3 style={{ margin: 0, fontSize: 18, color: "#0f172a" }}>{name}</h3>
          <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 13 }}>
            {memberCount ? `${memberCount} members` : status}
          </p>
          {subtitle ? (
            <p style={{ margin: "2px 0 0", color: "#94a3b8", fontSize: 12 }}>
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default ChatUserDetail;
