type ChatUserDetailProps = {
  name: string;
  status: string;
};

const ChatUserDetail = ({ name, status }: ChatUserDetailProps) => {
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
      <div>
        <h3 style={{ margin: 0, fontSize: 18, color: "#0f172a" }}>{name}</h3>
        <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 13 }}>
          {status}
        </p>
      </div>

      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f472b6, #fb7185)",
          display: "grid",
          placeItems: "center",
          color: "#fff",
          fontWeight: 700,
          boxShadow: "0 10px 24px rgba(244, 114, 182, 0.25)",
        }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    </header>
  );
};

export default ChatUserDetail;
