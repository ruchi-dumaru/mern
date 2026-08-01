const SendChat = () => {
  return (
    <footer
      style={{
        flexShrink: 0,
        padding: 18,
        borderTop: "1px solid #e2e8f0",
        background: "rgba(255, 255, 255, 0.96)",
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <input
          type="text"
          placeholder="Type your message..."
          style={{
            flex: 1,
            height: 48,
            borderRadius: 14,
            border: "1px solid #cbd5e1",
            background: "#f8fafc",
            color: "#0f172a",
            padding: "0 16px",
            outline: "none",
          }}
        />
        <button
          type="button"
          style={{
            height: 48,
            padding: "0 20px",
            borderRadius: 14,
            border: "none",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "#fff",
            fontWeight: 700,
            boxShadow: "0 10px 24px rgba(37, 99, 235, 0.18)",
          }}
        >
          Send
        </button>
      </div>
    </footer>
  );
};

export default SendChat;
