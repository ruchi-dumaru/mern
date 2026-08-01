import { type FormEvent, useState } from "react";

type SendChatProps = {
  onSend: (message: string) => Promise<void> | void;
  disabled?: boolean;
  placeholder?: string;
};

const SendChat = ({
  onSend,
  disabled = false,
  placeholder = "Type your message...",
}: SendChatProps) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) {
      return;
    }

    await onSend(trimmedMessage);
    setMessage("");
  };

  return (
    <footer
      style={{
        flexShrink: 0,
        padding: 18,
        borderTop: "1px solid #e2e8f0",
        background: "rgba(255, 255, 255, 0.96)",
      }}
    >
      <form
        onSubmit={sendMessage}
        style={{ display: "flex", gap: 12, alignItems: "center" }}
      >
        <input
          type="text"
          value={message}
          placeholder={placeholder}
          onChange={(event) => setMessage(event.target.value)}
          disabled={disabled}
          style={{
            flex: 1,
            height: 48,
            borderRadius: 14,
            border: "1px solid #cbd5e1",
            background: "#f8fafc",
            color: "#0f172a",
            padding: "0 16px",
            outline: "none",
            opacity: disabled ? 0.7 : 1,
          }}
        />
        <button
          type="submit"
          disabled={disabled}
          style={{
            height: 48,
            padding: "0 20px",
            borderRadius: 14,
            border: "none",
            background: disabled
              ? "#94a3b8"
              : "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "#fff",
            fontWeight: 700,
            boxShadow: "0 10px 24px rgba(37, 99, 235, 0.18)",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          Send
        </button>
      </form>
    </footer>
  );
};

export default SendChat;
