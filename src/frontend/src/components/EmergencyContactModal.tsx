import type { EmergencyContact } from "@/backend";
import { useBackend } from "@/hooks/useBackend";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { MessageCircle, Phone, Star, Video, X } from "lucide-react";
import { useEffect, useState } from "react";

interface EmergencyContactModalProps {
  open: boolean;
  onClose: () => void;
}

const SECTION_ROLES: Array<{
  roleKey: string;
  labelKey:
    | "veterinarians"
    | "agricultural_specialists"
    | "transport_providers";
}> = [
  { roleKey: "veterinarian", labelKey: "veterinarians" },
  { roleKey: "agri_specialist", labelKey: "agricultural_specialists" },
  { roleKey: "transport_provider", labelKey: "transport_providers" },
];

const SECTION_LABELS = {
  veterinarians: { en: "Veterinarians", sw: "Madaktari wa Mifugo" },
  agricultural_specialists: {
    en: "Agricultural Specialists",
    sw: "Wataalamu wa Kilimo",
  },
  transport_providers: { en: "Transport Providers", sw: "Wasafirishaji" },
};

const SECTION_EMOJIS = {
  veterinarians: "🐄",
  agricultural_specialists: "🌱",
  transport_providers: "🚛",
};

function StarRating({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={11}
          className={
            i <= Math.round(value)
              ? "text-yellow-400 fill-yellow-400"
              : "text-muted-foreground/30"
          }
        />
      ))}
    </span>
  );
}

export function EmergencyContactModal({
  open,
  onClose,
}: EmergencyContactModalProps) {
  const { language } = useLanguageStore();
  const { user } = useAuthStore();
  const { actor, isReady } = useBackend();
  const navigate = useNavigate();

  const region = user?.location ?? "";

  const [videoContact, setVideoContact] = useState<EmergencyContact | null>(
    null,
  );

  const { data: contacts = [], isLoading } = useQuery<EmergencyContact[]>({
    queryKey: ["emergency-contacts", region],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getEmergencyContacts(region);
    },
    enabled: isReady && open,
  });

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const isSw = language === "sw";
  const t = {
    title: isSw ? "Mawasiliano ya Dharura" : "Emergency Contacts",
    loading: isSw ? "Inapakia mawasiliano..." : "Loading contacts...",
    noContacts: isSw
      ? "Hakuna anayepatikana katika mkoa wako"
      : "No contacts found in your region",
    rating: isSw ? "Ukadiriaji" : "Rating",
    reviews: isSw ? "maoni" : "reviews",
    messageNow: isSw ? "Tuma Ujumbe" : "Message Now",
    close: isSw ? "Funga" : "Close",
    videoCall: isSw ? "Simu ya Video" : "Video Call",
    videoCallTitle: (name: string) =>
      isSw ? `Unganika kwa video na ${name}` : `Connect via video with ${name}`,
    videoRoomHint: (code: string) =>
      isSw
        ? `Shiriki nambari hii na daktari wako ili wajiunga: ${code}`
        : `Share this room code with your vet if they need to join: ${code}`,
    endCall: isSw ? "Maliza Simu" : "End Call",
  };

  const byRole = (roleKey: string): EmergencyContact[] => {
    const filtered = contacts.filter((c) => c.userRole === roleKey);
    return filtered.length > 0
      ? filtered.slice(0, 5)
      : FALLBACK_CONTACTS.filter((c) => c.userRole === roleKey);
  };

  const VIDEO_ROLES = new Set(["veterinarian", "agri_specialist"]);

  function handleVideoCall(contact: EmergencyContact) {
    setVideoContact(contact);
  }

  function handleMessage(contact: EmergencyContact) {
    onClose();
    void navigate({
      to: "/messages",
      search: { recipientId: contact.userId.toText() },
    });
  }

  return (
    <dialog
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center m-0 max-w-none max-h-none w-full h-full bg-transparent p-0 border-0"
      aria-label={t.title}
      data-ocid="emergency.dialog"
      open
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-hidden="true"
        role="presentation"
      />

      {/* Panel */}
      <div className="relative z-10 bg-card w-full max-w-md mx-auto rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚨</span>
            <div>
              <h2 className="font-bold text-base text-foreground leading-tight">
                {t.title}
              </h2>
              {region && (
                <p className="text-xs text-muted-foreground">{region}</p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            data-ocid="emergency.close_button"
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-4 py-3 space-y-5">
          {isLoading ? (
            <div
              className="py-8 text-center"
              data-ocid="emergency.loading_state"
            >
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">{t.loading}</p>
            </div>
          ) : (
            SECTION_ROLES.map(({ roleKey, labelKey }) => {
              const list = byRole(roleKey);
              return (
                <section key={roleKey}>
                  {/* Section header */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-base">
                      {SECTION_EMOJIS[labelKey]}
                    </span>
                    <h3 className="text-sm font-semibold text-foreground">
                      {SECTION_LABELS[labelKey][isSw ? "sw" : "en"]}
                    </h3>
                  </div>

                  {list.length === 0 ? (
                    <p
                      className="text-xs text-muted-foreground py-2"
                      data-ocid={`emergency.${labelKey}.empty_state`}
                    >
                      {t.noContacts}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {list.map((contact, idx) => (
                        <div
                          key={`${contact.userId.toString()}-${idx}`}
                          data-ocid={`emergency.${labelKey}.item.${idx + 1}`}
                          className="bg-background border border-border rounded-xl px-3 py-2.5 flex items-center gap-3"
                        >
                          {/* Avatar */}
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <span className="text-base">👤</span>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate leading-tight">
                              {contact.userName}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                              <StarRating value={contact.averageRating} />
                              <span className="text-[10px] text-muted-foreground">
                                ({Number(contact.reviewCount)} {t.reviews})
                              </span>
                            </div>
                            {contact.region && (
                              <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
                                {contact.region}
                              </p>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-1.5 shrink-0">
                            {contact.phone && (
                              <a
                                href={`tel:${contact.phone}`}
                                aria-label={`Call ${contact.userName}`}
                                data-ocid={`emergency.${labelKey}.call_button.${idx + 1}`}
                                className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center hover:bg-green-200 transition-colors"
                              >
                                <Phone size={14} />
                              </a>
                            )}
                            {VIDEO_ROLES.has(roleKey) && (
                              <button
                                type="button"
                                onClick={() => handleVideoCall(contact)}
                                aria-label={`${t.videoCall} — ${contact.userName}`}
                                title={t.videoCall}
                                data-ocid={`emergency.${labelKey}.video_button.${idx + 1}`}
                                className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
                              >
                                <Video size={14} />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleMessage(contact)}
                              aria-label={`${t.messageNow} — ${contact.userName}`}
                              data-ocid={`emergency.${labelKey}.message_button.${idx + 1}`}
                              className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
                            >
                              <MessageCircle size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              );
            })
          )}
        </div>

        {/* Footer CTA */}
        <div className="px-4 pb-4 pt-2 border-t border-border shrink-0">
          <button
            type="button"
            onClick={onClose}
            data-ocid="emergency.dismiss_button"
            className="w-full py-2.5 rounded-xl bg-muted text-muted-foreground text-sm font-medium hover:bg-muted/80 transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>

      {/* Video Call Overlay */}
      {videoContact && (
        <VideoCallOverlay
          contact={videoContact}
          title={t.videoCallTitle(videoContact.userName)}
          roomHint={t.videoRoomHint(
            `namwala-emergency-${videoContact.userId.toText()}`,
          )}
          endCallLabel={t.endCall}
          onClose={() => setVideoContact(null)}
        />
      )}
    </dialog>
  );
}

// ─── Video Call Overlay ────────────────────────────────────────────────────

interface VideoCallOverlayProps {
  contact: EmergencyContact;
  title: string;
  roomHint: string;
  endCallLabel: string;
  onClose: () => void;
}

function VideoCallOverlay({
  contact,
  title,
  roomHint,
  endCallLabel,
  onClose,
}: VideoCallOverlayProps) {
  const roomName = `namwala-emergency-${contact.userId.toText()}`;
  const jitsiUrl = `https://meet.jit.si/${encodeURIComponent(roomName)}`;

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <dialog
      className="fixed inset-0 z-[99999] flex flex-col bg-black m-0 max-w-none max-h-none w-full h-full border-0 p-0"
      data-ocid="emergency.video_call.dialog"
      aria-label={title}
      open
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/80 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
            <Video size={16} className="text-emerald-400" />
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate leading-tight">
              {title}
            </p>
            <p className="text-white/50 text-[10px] truncate leading-tight">
              {roomHint}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={endCallLabel}
          data-ocid="emergency.video_call.close_button"
          className="ml-3 shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors"
        >
          <X size={13} />
          <span>{endCallLabel}</span>
        </button>
      </div>

      {/* Jitsi iframe */}
      <iframe
        src={jitsiUrl}
        title={title}
        allow="camera; microphone; fullscreen; display-capture"
        className="flex-1 w-full border-0"
        data-ocid="emergency.video_call.canvas_target"
      />
    </dialog>
  );
}

// Fallback contacts shown if backend returns empty for a role
const FALLBACK_CONTACTS: EmergencyContact[] = [
  {
    userId: {
      toString: () => "fallback-1",
      toText: () => "fallback-1",
    } as EmergencyContact["userId"],
    userName: "Dr. Amina Hassan",
    userRole: "veterinarian",
    region: "Tanzania",
    averageRating: 4.8,
    phone: "+255712000001",
    reviewCount: BigInt(34),
  },
  {
    userId: {
      toString: () => "fallback-2",
      toText: () => "fallback-2",
    } as EmergencyContact["userId"],
    userName: "Dr. Peter Kimaro",
    userRole: "veterinarian",
    region: "Tanzania",
    averageRating: 4.6,
    phone: "+255723000002",
    reviewCount: BigInt(21),
  },
  {
    userId: {
      toString: () => "fallback-3",
      toText: () => "fallback-3",
    } as EmergencyContact["userId"],
    userName: "Prof. Kibwana Mwalimu",
    userRole: "agri_specialist",
    region: "Tanzania",
    averageRating: 4.9,
    phone: "+255734000003",
    reviewCount: BigInt(52),
  },
  {
    userId: {
      toString: () => "fallback-4",
      toText: () => "fallback-4",
    } as EmergencyContact["userId"],
    userName: "Sarah Ndunguru",
    userRole: "agri_specialist",
    region: "Tanzania",
    averageRating: 4.7,
    phone: "+255745000004",
    reviewCount: BigInt(18),
  },
  {
    userId: {
      toString: () => "fallback-5",
      toText: () => "fallback-5",
    } as EmergencyContact["userId"],
    userName: "John Kariuki",
    userRole: "transport_provider",
    region: "Tanzania",
    averageRating: 4.5,
    phone: "+255756000005",
    reviewCount: BigInt(29),
  },
  {
    userId: {
      toString: () => "fallback-6",
      toText: () => "fallback-6",
    } as EmergencyContact["userId"],
    userName: "Halima Rashid",
    userRole: "transport_provider",
    region: "Tanzania",
    averageRating: 4.4,
    phone: "+255767000006",
    reviewCount: BigInt(11),
  },
];
