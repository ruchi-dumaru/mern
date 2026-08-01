import { useEffect, useMemo, useState } from "react";
import UserListComponent, {
  type ChatContact,
} from "../../components/chat/UserList";
import ChatDetail, {
  type ChatMessage,
  type ChatReaction,
} from "../../components/chat/ChatDetail";
import ChatUserDetail from "../../components/chat/ChatUserDetail";
import SendChat from "../../components/chat/SendChat";
import useAuth from "../../hooks/auth.hook";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { getAllUsers, setActiveUser } from "../../reducers/UserSlice";
import socket from "../../config/socket";
import { getRequest, postRequest } from "../../config/axios.config";
import type { IUserProfile } from "../../context/auth.context";

const groupContact: ChatContact = {
  id: "group-chat",
  name: "Team Chat",
  email: "Group conversation",
  image:
    "https://ui-avatars.com/api/?name=Team+Chat&background=0f172a&color=ffffff&bold=true&size=96",
  online: true,
  isGroup: true,
  members: 5,
};

const fallbackUsers: Array<IUserProfile> = [
  {
    _id: "demo-1",
    name: "User 1",
    email: "user1@example.com",
    role: "customer",
    status: "online",
    image: {
      id: "demo-1-img",
      optimizedUrl:
        "https://ui-avatars.com/api/?name=User+1&background=2563eb&color=ffffff&bold=true&size=96",
      originalUrl:
        "https://ui-avatars.com/api/?name=User+1&background=2563eb&color=ffffff&bold=true&size=96",
    },
  },
  {
    _id: "demo-2",
    name: "User 2",
    email: "user2@example.com",
    role: "customer",
    status: "offline",
    image: {
      id: "demo-2-img",
      optimizedUrl:
        "https://ui-avatars.com/api/?name=User+2&background=2563eb&color=ffffff&bold=true&size=96",
      originalUrl:
        "https://ui-avatars.com/api/?name=User+2&background=2563eb&color=ffffff&bold=true&size=96",
    },
  },
  {
    _id: "demo-3",
    name: "User 3",
    email: "user3@example.com",
    role: "customer",
    status: "offline",
    image: {
      id: "demo-3-img",
      optimizedUrl:
        "https://ui-avatars.com/api/?name=User+3&background=2563eb&color=ffffff&bold=true&size=96",
      originalUrl:
        "https://ui-avatars.com/api/?name=User+3&background=2563eb&color=ffffff&bold=true&size=96",
    },
  },
];

const fallbackImage = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=ffffff&bold=true&size=96`;

const formatTime = (date: Date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const mapUserToContact = (
  user: IUserProfile,
  onlineUserIds: string[],
): ChatContact => ({
  id: user._id,
  name: user.name,
  email: user.email,
  image:
    user.image?.optimizedUrl ||
    user.image?.originalUrl ||
    fallbackImage(user.name),
  online:
    onlineUserIds.includes(user._id) ||
    user.status?.toLowerCase?.() === "online",
});

const mapContactToUser = (contact: ChatContact): IUserProfile => ({
  _id: contact.id,
  name: contact.name,
  email: contact.email,
  role: "customer",
  status: contact.online ? "online" : "offline",
  image: {
    id: `${contact.id}-avatar`,
    optimizedUrl: contact.image || fallbackImage(contact.name),
    originalUrl: contact.image || fallbackImage(contact.name),
  },
});

const toChatMessage = (
  payload: any,
  loggedInUserId: string,
  fallbackThreadId: string,
): ChatMessage | null => {
  const senderId = String(
    payload?.sender?._id ?? payload?.senderId ?? payload?.sender ?? "",
  );
  const receiverId = String(
    payload?.receiver?._id ?? payload?.receiverId ?? payload?.receiver ?? "",
  );
  const text = String(payload?.message ?? payload?.text ?? "").trim();
  const messageId = String(
    payload?._id ?? payload?.id ?? `${fallbackThreadId}-${Date.now()}`,
  );

  if (!text) {
    return null;
  }

  return {
    id: messageId,
    senderId: senderId || loggedInUserId,
    senderName:
      payload?.sender?.name ??
      payload?.senderName ??
      (senderId === loggedInUserId ? "Me" : "User"),
    senderImage:
      payload?.sender?.image?.optimizedUrl ||
      payload?.senderImage ||
      fallbackImage(payload?.sender?.name ?? payload?.senderName ?? "User"),
    text,
    side: senderId === loggedInUserId ? "right" : "left",
    time: payload?.createdAt
      ? formatTime(new Date(payload.createdAt))
      : (payload?.time ?? formatTime(new Date())),
    reaction: payload?.reaction ?? null,
    threadId: (payload?.threadId ?? receiverId) || senderId || fallbackThreadId,
  };
};

const initialGroupMessages: ChatMessage[] = [
  {
    id: "group-1",
    senderId: "team-bot",
    senderName: "Team Chat",
    senderImage: groupContact.image,
    text: "Welcome to the group chat. Everyone in the portal can collaborate here.",
    side: "left",
    time: "09:30 AM",
    threadId: groupContact.id,
  },
];

const ChatPage = () => {
  const dispatch = useAppDispatch();
  const { loggedInUser } = useAuth();
  const allUsers = useAppSelector((root) => root.user.allUsers);
  const [activeThreadId, setActiveThreadId] = useState<string>(groupContact.id);
  const [onlineUserIds, setOnlineUserIds] = useState<string[]>([]);
  const [recentThreadOrder, setRecentThreadOrder] = useState<string[]>([
    groupContact.id,
  ]);
  const [messagesByThread, setMessagesByThread] = useState<
    Record<string, ChatMessage[]>
  >({
    [groupContact.id]: initialGroupMessages,
  });

  useEffect(() => {
    dispatch(getAllUsers({ page: 1, limit: 100 }));
  }, [dispatch]);

  useEffect(() => {
    socket.connect();

    if (loggedInUser?._id) {
      socket.emit("online", { userId: loggedInUser._id, user: loggedInUser });
    }

    const handlePresence = (payload: any) => {
      if (Array.isArray(payload)) {
        setOnlineUserIds(payload.map((userId) => String(userId)));
        return;
      }

      if (Array.isArray(payload?.onlineUserIds)) {
        setOnlineUserIds(
          payload.onlineUserIds.map((userId: string) => String(userId)),
        );
        return;
      }

      const userId = String(payload?.userId ?? payload?.id ?? payload ?? "");
      if (!userId) {
        return;
      }

      setOnlineUserIds((previous) =>
        previous.includes(userId) ? previous : [...previous, userId],
      );
    };

    const handleOffline = (payload: any) => {
      const userId = String(payload?.userId ?? payload?.id ?? payload ?? "");
      if (!userId) {
        return;
      }

      setOnlineUserIds((previous) =>
        previous.filter((currentUserId) => currentUserId !== userId),
      );
    };

    const handleIncomingMessage = (payload: any) => {
      const threadId = String(
        payload?.groupId ??
          payload?.threadId ??
          payload?.receiverId ??
          payload?.receiver ??
          payload?.senderId ??
          "",
      );
      const normalizedMessage = toChatMessage(
        payload,
        loggedInUser?._id ?? "",
        threadId || activeThreadId,
      );

      if (!normalizedMessage) {
        return;
      }

      if (normalizedMessage.senderId === loggedInUser?._id) {
        return;
      }

      const resolvedThreadId =
        normalizedMessage.threadId || threadId || activeThreadId;

      setMessagesByThread((previous) => {
        const threadMessages = previous[resolvedThreadId] ?? [];
        if (
          threadMessages.some((message) => message.id === normalizedMessage.id)
        ) {
          return previous;
        }

        return {
          ...previous,
          [resolvedThreadId]: [...threadMessages, normalizedMessage],
        };
      });

      setRecentThreadOrder((previous) => [
        resolvedThreadId,
        ...previous.filter((thread) => thread !== resolvedThreadId),
      ]);
    };

    socket.on("useOnline", handlePresence);
    socket.on("onlineUsers", handlePresence);
    socket.on("userOnline", handlePresence);
    socket.on("forYou", handleIncomingMessage);
    socket.on("messageReceived", handleIncomingMessage);
    socket.on("groupMessage", handleIncomingMessage);
    socket.on("userOffline", handleOffline);

    return () => {
      socket.off("useOnline", handlePresence);
      socket.off("onlineUsers", handlePresence);
      socket.off("userOnline", handlePresence);
      socket.off("forYou", handleIncomingMessage);
      socket.off("messageReceived", handleIncomingMessage);
      socket.off("groupMessage", handleIncomingMessage);
      socket.off("userOffline", handleOffline);

      if (loggedInUser?._id) {
        socket.emit("offline", { userId: loggedInUser._id });
      }
    };
  }, [activeThreadId, dispatch, loggedInUser]);

  const contacts = useMemo(() => {
    const sourceUsers = allUsers.length > 0 ? allUsers : fallbackUsers;
    const directContacts = sourceUsers
      .filter((user) => user._id !== loggedInUser?._id)
      .map((user) => mapUserToContact(user, onlineUserIds));

    const orderedContacts = [...directContacts].sort(
      (firstContact, secondContact) => {
        const firstIndex = recentThreadOrder.indexOf(firstContact.id);
        const secondIndex = recentThreadOrder.indexOf(secondContact.id);

        const firstScore =
          firstIndex === -1 ? Number.MAX_SAFE_INTEGER : firstIndex;
        const secondScore =
          secondIndex === -1 ? Number.MAX_SAFE_INTEGER : secondIndex;

        if (firstScore !== secondScore) {
          return firstScore - secondScore;
        }

        const firstIsOnline = firstContact.online ? 0 : 1;
        const secondIsOnline = secondContact.online ? 0 : 1;
        return firstIsOnline - secondIsOnline;
      },
    );

    return orderedContacts;
  }, [allUsers, loggedInUser?._id, onlineUserIds, recentThreadOrder]);

  useEffect(() => {
    if (activeThreadId === groupContact.id) {
      return;
    }

    const activeContact = contacts.find(
      (contact) => contact.id === activeThreadId,
    );
    if (!activeContact) {
      if (contacts.length > 0) {
        const firstContact = contacts[0];
        setActiveThreadId(firstContact.id);
        dispatch(setActiveUser(mapContactToUser(firstContact)));
      }
      return;
    }

    if (messagesByThread[activeContact.id]) {
      return;
    }

    const loadDirectMessages = async () => {
      try {
        const response = await getRequest(`/chat/${activeContact.id}`);
        const payload = response as any;
        const rawMessages = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : Array.isArray(payload?.messages)
              ? payload.messages
              : [];

        const normalizedMessages = rawMessages
          .map((item: any) =>
            toChatMessage(item, loggedInUser?._id ?? "", activeContact.id),
          )
          .filter(Boolean) as ChatMessage[];

        setMessagesByThread((previous) => ({
          ...previous,
          [activeContact.id]: normalizedMessages,
        }));
      } catch {
        setMessagesByThread((previous) => ({
          ...previous,
          [activeContact.id]: previous[activeContact.id] ?? [],
        }));
      }
    };

    void loadDirectMessages();
  }, [activeThreadId, contacts, dispatch, loggedInUser?._id, messagesByThread]);

  useEffect(() => {
    if (activeThreadId !== groupContact.id) {
      return;
    }

    setMessagesByThread((previous) => ({
      ...previous,
      [groupContact.id]: previous[groupContact.id] ?? initialGroupMessages,
    }));
  }, [activeThreadId]);

  useEffect(() => {
    if (contacts.length === 0 || activeThreadId !== groupContact.id) {
      return;
    }

    if (contacts[0]) {
      setActiveThreadId(contacts[0].id);
      dispatch(setActiveUser(mapContactToUser(contacts[0])));
    }
  }, [activeThreadId, contacts, dispatch]);

  const promoteThread = (threadId: string) => {
    setRecentThreadOrder((previous) => [
      threadId,
      ...previous.filter((currentThread) => currentThread !== threadId),
    ]);
  };

  const handleSelectContact = (contact: ChatContact) => {
    setActiveThreadId(contact.id);
    dispatch(setActiveUser(mapContactToUser(contact)));
    promoteThread(contact.id);
  };

  const handleSelectGroup = () => {
    setActiveThreadId(groupContact.id);
    dispatch(setActiveUser(null));
    promoteThread(groupContact.id);
  };

  const activeContact =
    contacts.find((contact) => contact.id === activeThreadId) ?? null;
  const isGroupActive = activeThreadId === groupContact.id || !activeContact;
  const activeMessages = messagesByThread[activeThreadId] ?? [];
  const activeName = isGroupActive
    ? groupContact.name
    : (activeContact?.name ?? "Select user");
  const activeImage = isGroupActive ? groupContact.image : activeContact?.image;
  const activeStatus = isGroupActive
    ? `${groupContact.members ?? 0} members`
    : activeContact?.online
      ? "Online"
      : "Offline";

  const handleReact = (messageId: string, reaction: ChatReaction) => {
    setMessagesByThread((previous) => ({
      ...previous,
      [activeThreadId]: (previous[activeThreadId] ?? []).map((message) =>
        message.id === messageId ? { ...message, reaction } : message,
      ),
    }));

    socket.emit("messageReaction", {
      threadId: activeThreadId,
      messageId,
      reaction,
      senderId: loggedInUser?._id,
    });
  };

  const handleSend = async (messageText: string) => {
    const now = new Date();
    const optimisticMessage: ChatMessage = {
      id: `${activeThreadId}-${now.getTime()}`,
      senderId: loggedInUser?._id ?? "me",
      senderName: loggedInUser?.name ?? "Me",
      senderImage:
        loggedInUser?.image?.optimizedUrl ||
        loggedInUser?.image?.originalUrl ||
        fallbackImage(loggedInUser?.name ?? "Me"),
      text: messageText,
      side: "right",
      time: formatTime(now),
      threadId: activeThreadId,
    };

    setMessagesByThread((previous) => ({
      ...previous,
      [activeThreadId]: [
        ...(previous[activeThreadId] ?? []),
        optimisticMessage,
      ],
    }));
    promoteThread(activeThreadId);

    if (activeThreadId === groupContact.id) {
      socket.emit("groupMessage", {
        groupId: groupContact.id,
        senderId: loggedInUser?._id,
        senderName: loggedInUser?.name,
        message: messageText,
        createdAt: now.toISOString(),
      });
      return;
    }

    try {
      await postRequest(
        "/chat",
        {
          message: messageText,
          receiver: activeThreadId,
        },
        { file: false },
      );

      socket.emit("newMessage", {
        receiver: activeThreadId,
        sender: loggedInUser?._id,
        message: messageText,
      });
    } catch (error) {
      console.error(error);
    }
  };

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
      <UserListComponent
        groupContact={groupContact}
        contacts={contacts}
        activeContactId={isGroupActive ? null : activeThreadId}
        activeGroup={isGroupActive}
        onSelectContact={handleSelectContact}
        onSelectGroup={handleSelectGroup}
      />

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          background: "#f8fafc",
        }}
      >
        <ChatUserDetail
          name={activeName}
          status={activeStatus}
          image={activeImage}
          isOnline={isGroupActive ? true : Boolean(activeContact?.online)}
          memberCount={isGroupActive ? groupContact.members : undefined}
          subtitle={isGroupActive ? "Group conversation" : undefined}
        />

        <ChatDetail messages={activeMessages} onReact={handleReact} />

        <SendChat
          disabled={!activeThreadId}
          placeholder={
            isGroupActive ? "Message the group..." : "Type your message..."
          }
          onSend={handleSend}
        />
      </main>
    </div>
  );
};

export default ChatPage;
