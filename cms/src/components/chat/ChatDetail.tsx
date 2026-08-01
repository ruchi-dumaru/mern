type Message = {
  id: number;
  sender: string;
  text: string;
  side: "left" | "right";
  time: string;
};

type ChatDetailProps = {
  messages: Message[];
};

const ChatDetail = ({ messages }: ChatDetailProps) => {
  return (
    <section
      style={{
        flex: 1,
        overflowY: "auto",
        padding: 28,
        background:
          "radial-gradient(circle at top right, rgba(96, 165, 250, 0.12), transparent 28%), #f8fafc",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: "flex",
              justifyContent:
                message.side === "right" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                borderRadius: 18,
                padding: "14px 16px",
                background:
                  message.side === "right"
                    ? "linear-gradient(135deg, #2563eb, #3b82f6)"
                    : "#ffffff",
                color: message.side === "right" ? "#fff" : "#0f172a",
                border: message.side === "right" ? "none" : "1px solid #e2e8f0",
                boxShadow:
                  message.side === "right"
                    ? "0 10px 24px rgba(37, 99, 235, 0.18)"
                    : "0 8px 24px rgba(15, 23, 42, 0.05)",
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 6 }}>
                {message.sender} • {message.time}
              </div>
              <div>{message.text}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChatDetail;
