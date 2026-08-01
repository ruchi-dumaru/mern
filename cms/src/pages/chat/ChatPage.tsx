import UserListComponent from "../../components/chat/UserList";
import ChatDetail from "../../components/chat/ChatDetail";
import ChatUserDetail from "../../components/chat/ChatUserDetail";
import SendChat from "../../components/chat/SendChat";

const users = [
  { id: 1, name: "User 1", email: "user1@example.com" },
  { id: 2, name: "User 2", email: "user2@example.com" },
  { id: 3, name: "User 3", email: "user3@example.com" },
];

const messages = [
  {
    id: 1,
    sender: "User 1",
    text: "Hi there! How can I help you today?",
    side: "left",
    time: "10:00 AM",
  },
  {
    id: 2,
    sender: "Me",
    text: "Hello! I have a question about my order.",
    side: "right",
    time: "10:01 AM",
  },
  {
    id: 3,
    sender: "User 1",
    text: "Of course, feel free to ask!",
    side: "left",
    time: "10:02 AM",
  },
] as const;

const ChatPage = () => {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 10rem)",
        display: "flex",
        overflow: "hidden",
        background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
        color: "#0f172a",
        borderRadius: 28,
        border: "1px solid #e2e8f0",
        boxShadow: "0 24px 80px rgba(15, 23, 42, 0.12)",
      }}
    >
      <UserListComponent users={users} />

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          background: "#f8fafc",
        }}
      >
        <ChatUserDetail name="User 1" status="Online" />
        <ChatDetail messages={[...messages]} />
        <SendChat />
      </main>
    </div>
  );
};

export default ChatPage;
