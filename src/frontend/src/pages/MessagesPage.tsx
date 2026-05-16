import { Layout } from "@/components/Layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONVERSATIONS } from "@/lib/mockData";
import { MESSAGES } from "@/lib/mockData";
import { useLanguageStore } from "@/store/languageStore";
import { useSearch } from "@tanstack/react-router";
import { MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export default function MessagesPage() {
  const { t, language } = useLanguageStore();
  const { recipientId } = useSearch({ from: "/auth/messages" });
  const [selected, setSelected] = useState<string | null>(() => {
    if (!recipientId) return null;
    const match = CONVERSATIONS.find((c) =>
      c.participants?.includes(recipientId),
    );
    return match?.id ?? null;
  });
  const [newMsg, setNewMsg] = useState("");

  const activeConv = CONVERSATIONS.find((c) => c.id === selected);
  const convMessages = MESSAGES.filter((m) => m.conversationId === selected);

  if (selected && activeConv) {
    return (
      <Layout>
        <div className="flex flex-col h-[calc(100vh-130px)]">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="text-primary text-sm font-medium"
            >
              ← {t("messages")}
            </button>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground truncate">
                {activeConv.participantNames.find((n) => n !== "Juma Mwangi") ??
                  activeConv.participantNames[0]}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {activeConv.topic}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-background">
            {convMessages.map((msg) => {
              const isMe = msg.senderId === "u1";
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${isMe ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-card border border-border rounded-bl-sm text-foreground"}`}
                  >
                    {!isMe && (
                      <p className="text-[10px] font-medium mb-0.5 opacity-70">
                        {msg.senderName}
                      </p>
                    )}
                    <p className="leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="px-4 py-2 border-t border-border bg-card flex gap-2">
            <Input
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder={
                language === "sw" ? "Andika ujumbe..." : "Type a message..."
              }
              className="flex-1"
              data-ocid="messages.input"
            />
            <Button
              type="button"
              size="sm"
              onClick={() => setNewMsg("")}
              data-ocid="messages.send_button"
              disabled={!newMsg}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <div className="px-4 py-4 border-b border-border bg-card">
          <h1 className="text-lg font-display font-bold text-foreground">
            {t("messages")}
          </h1>
        </div>
        {CONVERSATIONS.length === 0 ? (
          <div
            data-ocid="messages.empty_state"
            className="flex flex-col items-center justify-center py-16"
          >
            <MessageCircle className="w-12 h-12 text-muted-foreground/30 mb-3" />
            <p className="text-sm text-muted-foreground">{t("noData")}</p>
          </div>
        ) : (
          <div data-ocid="messages.list" className="divide-y divide-border">
            {CONVERSATIONS.map((conv, i) => (
              <button
                type="button"
                key={conv.id}
                data-ocid={`messages.item.${i + 1}`}
                className="w-full flex items-start gap-3 px-4 py-3 hover:bg-muted/30 transition-smooth text-left"
                onClick={() => setSelected(conv.id)}
              >
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {(conv.participantNames[1] ?? conv.participantNames[0])[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm text-foreground truncate">
                      {conv.participantNames.find((n) => n !== "Juma Mwangi") ??
                        conv.participantNames[0]}
                    </span>
                    <span className="text-[10px] text-muted-foreground shrink-0">
                      {new Date(conv.lastMessageTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {conv.lastMessage}
                  </p>
                </div>
                {conv.unreadCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shrink-0">
                    {conv.unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
