import { useMemo, useState } from "react";

export type ChatReaction = "like" | "love" | "laugh" | "wow" | "sad" | "angry";

export type ChatMessage = {
  id: string;
  senderId: string;
  senderName: string;
  senderImage?: string | null;
  text: string;
  side: "left" | "right";
  time: string;
  reaction?: ChatReaction | null;
  threadId?: string;
};

type ChatDetailProps = {
  messages: ChatMessage[];
  onReact: (messageId: string, reaction: ChatReaction) => void;
};

const reactionOptions: Array<{ value: ChatReaction; icon: string }> = [
  { value: "like", icon: "👍" },
  { value: "love", icon: "❤️" },
  { value: "laugh", icon: "😂" },
  { value: "wow", icon: "😮" },
  { value: "sad", icon: "😢" },
  { value: "angry", icon: "😡" },
];

const avatarUrl = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=ffffff&bold=true&size=96`;

const ChatDetail = ({ messages, onReact }: ChatDetailProps) => {
  const [openReactionFor, setOpenReactionFor] = useState<string | null>(null);

  const sortedMessages = useMemo(() => messages, [messages]);

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
        {sortedMessages.length === 0 ? (
          <div style={{ color: "#64748b", fontSize: 14 }}>
            No messages yet. Start the conversation.
          </div>
        ) : null}

        {sortedMessages.map((message) => {
          const isMine = message.side === "right";
          const isOpen = openReactionFor === message.id;

          return (
            <div
              key={message.id}
              style={{
                display: "flex",
                justifyContent: isMine ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 10,
                  flexDirection: isMine ? "row-reverse" : "row",
                  maxWidth: "78%",
                }}
              >
                <img
                  src={message.senderImage || avatarUrl(message.senderName)}
                  alt={message.senderName}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />

                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      maxWidth: "100%",
                      borderRadius: 18,
                      padding: "14px 16px",
                      background: isMine
                        ? "linear-gradient(135deg, #2563eb, #3b82f6)"
                        : "#ffffff",
                      color: isMine ? "#fff" : "#0f172a",
                      border: isMine ? "none" : "1px solid #e2e8f0",
                      boxShadow: isMine
                        ? "0 10px 24px rgba(37, 99, 235, 0.18)"
                        : "0 8px 24px rgba(15, 23, 42, 0.05)",
                    }}
                  >
                    <div
                      style={{ fontSize: 12, opacity: 0.75, marginBottom: 6 }}
                    >
                      {message.senderName} • {message.time}
                    </div>
                    <div>{message.text}</div>
                    {message.reaction ? (
                      <div
                        style={{
                          marginTop: 10,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "4px 10px",
                          borderRadius: 999,
                          background: isMine
                            ? "rgba(255,255,255,0.18)"
                            : "#eff6ff",
                          color: isMine ? "#fff" : "#1d4ed8",
                          fontSize: 12,
                        }}
                      >
                        <span>
                          {
                            reactionOptions.find(
                              (item) => item.value === message.reaction,
                            )?.icon
                          }
                        </span>
                        <span>Reacted</span>
                      </div>
                    ) : null}
                  </div>

                  <div
                    style={{
                      marginTop: 8,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      justifyContent: isMine ? "flex-end" : "flex-start",
                      position: "relative",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenReactionFor(isOpen ? null : message.id)
                      }
                      style={{
                        border: "1px solid #dbeafe",
                        background: "#fff",
                        color: "#1d4ed8",
                        borderRadius: 999,
                        padding: "4px 10px",
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      React
                    </button>

                    {isOpen ? (
                      <div
                        style={{
                          display: "flex",
                          gap: 6,
                          padding: 8,
                          borderRadius: 999,
                          background: "#fff",
                          border: "1px solid #e2e8f0",
                          boxShadow: "0 10px 24px rgba(15, 23, 42, 0.12)",
                          flexWrap: "wrap",
                        }}
                      >
                        {reactionOptions.map((reaction) => (
                          <button
                            key={reaction.value}
                            type="button"
                            onClick={() => {
                              onReact(message.id, reaction.value);
                              setOpenReactionFor(null);
                            }}
                            style={{
                              border: "none",
                              background: "transparent",
                              cursor: "pointer",
                              fontSize: 18,
                            }}
                          >
                            {reaction.icon}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ChatDetail;
