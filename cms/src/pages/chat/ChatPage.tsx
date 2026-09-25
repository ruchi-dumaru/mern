import { useEffect, useMemo, useRef, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { getRequest } from "../../config/axios.config";
import { AppConfig } from "../../config/config";
import { notifyError } from "../../utilities/helpers";
import useAuth from "../../hooks/auth.hook";

type ChatUser = {
  _id: string;
  name: string;
  email: string;
  image?: { optimizedUrl?: string; originalUrl?: string };
  role?: string;
};
type ChatMessage = {
  _id: string;
  sender: ChatUser | string;
  receiver: ChatUser | string;
  message: string;
  createdAt?: string;
};
type SocketAck = { ok: boolean; message?: string; data?: ChatMessage };
const socketUrl = AppConfig.apiUrl.replace(/\/api\/v1\/?$/, "");
const idOf = (value: ChatUser | string | undefined) =>
  typeof value === "string" ? value : value?._id;
const timeOf = (value?: string) =>
  value
    ? new Date(value).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

export default function ChatPage() {
  const { loggedInUser } = useAuth();
  const currentUserId = loggedInUser?._id;
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [connected, setConnected] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const socketRef = useRef<Socket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!currentUserId) return;
    let active = true;
    const loadUsers = async () => {
      try {
        const response = await getRequest("/user", { params: { limit: 100 } });
        if (active) {
          const loadedUsers = response?.data ?? [];
          setUsers(loadedUsers);
          setSelectedUser((current) => current || loadedUsers[0]);
        }
      } catch (exception) {
        if (active)
          setError(
            (exception as { message?: string })?.message ||
              "Unable to load users.",
          );
      } finally {
        if (active) setLoadingUsers(false);
      }
    };
    void loadUsers();
    return () => {
      active = false;
    };
  }, [currentUserId]);

  useEffect(() => {
    const disconnectOnLogout = () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
      setConnected(false);
    };
    window.addEventListener("chat:logout", disconnectOnLogout);
    return () => window.removeEventListener("chat:logout", disconnectOnLogout);
  }, []);
  useEffect(() => {
    if (!currentUserId) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    const socket = io(socketUrl, { auth: { token }, reconnection: true });
    socketRef.current = socket;
    socket.on("connect", () => {
      setConnected(true);
      socket.emit("online");
    });
    socket.on("disconnect", () => setConnected(false));
    socket.on("connect_error", () => {
      setConnected(false);
      notifyError({
        title: "Chat connection failed",
        description: "Realtime chat is unavailable.",
      });
    });
    socket.on("messageReceive", (message: ChatMessage) => {
      setMessages((current) =>
        current.some((item) => item._id === message._id)
          ? current
          : [...current, message],
      );
    });
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;
    };
  }, [currentUserId]);
  useEffect(() => {
    if (!selectedUser) return;
    let active = true;
    const loadMessages = async () => {
      try {
        setLoadingMessages(true);
        const response = await getRequest(`/chat/${selectedUser._id}`);
        if (active) setMessages(response?.data ?? []);
      } catch (exception) {
        if (active)
          notifyError({
            title: "Unable to load messages",
            description:
              (exception as { message?: string })?.message ||
              "Please try again.",
          });
      } finally {
        if (active) setLoadingMessages(false);
      }
    };
    void loadMessages();
    return () => {
      active = false;
    };
  }, [selectedUser]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const sendMessage = () => {
    const message = text.trim();
    if (!message || !selectedUser || !socketRef.current?.connected || sending)
      return;
    setSending(true);
    socketRef.current.emit(
      "newMessage",
      { receiver: selectedUser._id, message },
      (ack: SocketAck) => {
        setSending(false);
        if (!ack?.ok) {
          notifyError({
            title: "Message not sent",
            description: ack?.message || "Please try again.",
          });
          return;
        }
        setText("");
      },
    );
  };
  const selectedName = useMemo(
    () => selectedUser?.name || "Select a user",
    [selectedUser],
  );
  return (
    <div className="flex min-h-[calc(100vh-10rem)] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <aside className="w-80 shrink-0 border-r border-slate-200 bg-slate-50">
        <div className="border-b border-slate-200 p-5">
          <h1 className="text-xl font-bold text-slate-800">Chats</h1>
          <p className="mt-1 text-sm text-slate-500">{users.length} users</p>
        </div>
        <div className="max-h-[calc(100vh-16rem)] overflow-y-auto p-3">
          {loadingUsers && (
            <p className="p-3 text-sm text-slate-500">Loading users...</p>
          )}
          {!loadingUsers && error && (
            <p className="p-3 text-sm text-red-600">{error}</p>
          )}
          {!loadingUsers && !error && users.length === 0 && (
            <p className="p-3 text-sm text-slate-500">No users found.</p>
          )}
          {users.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex w-full items-center gap-3 rounded-2xl p-3 text-left ${selectedUser?._id === user._id ? "bg-slate-200" : "hover:bg-white"}`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-700 font-semibold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-semibold text-slate-800">
                  {user.name}
                </span>
                <span className="block truncate text-xs text-slate-500">
                  {user.email}
                </span>
              </span>
            </button>
          ))}
        </div>
      </aside>
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="font-semibold text-slate-800">{selectedName}</h2>
            <p
              className={`text-xs ${connected ? "text-emerald-600" : "text-slate-400"}`}
            >
              {connected ? "Connected" : "Offline"}
            </p>
          </div>
        </header>
        <section className="flex-1 overflow-y-auto bg-slate-50 p-5">
          <div className="mx-auto flex max-w-3xl flex-col gap-3">
            {loadingMessages && (
              <p className="text-center text-sm text-slate-500">
                Loading messages...
              </p>
            )}
            {!loadingMessages && selectedUser && messages.length === 0 && (
              <p className="text-center text-sm text-slate-500">
                No messages yet.
              </p>
            )}
            {messages.map((item) => {
              const mine = idOf(item.sender) === currentUserId;
              return (
                <div
                  key={item._id}
                  className={`flex ${mine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${mine ? "bg-slate-800 text-white" : "border border-slate-200 bg-white text-slate-800"}`}
                  >
                    <p>{item.message}</p>
                    <p
                      className={`mt-1 text-right text-xs ${mine ? "text-slate-300" : "text-slate-400"}`}
                    >
                      {timeOf(item.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        </section>
        <footer className="border-t border-slate-200 bg-white p-4">
          <div className="mx-auto flex max-w-3xl gap-3">
            <textarea
              value={text}
              disabled={!selectedUser || !connected || sending}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={selectedUser ? "Type a message..." : "Select a user"}
              rows={1}
              className="min-h-12 flex-1 resize-none rounded-2xl border border-slate-300 p-3 outline-none focus:border-slate-500"
            />
            <button
              type="button"
              disabled={!text.trim() || !selectedUser || !connected || sending}
              onClick={sendMessage}
              className="rounded-2xl bg-slate-800 px-5 font-semibold text-white disabled:opacity-50"
            >
              {sending ? "Sending..." : "Send"}
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}
