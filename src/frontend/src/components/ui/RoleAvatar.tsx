import type { UserRole } from "@/types";

interface RoleAvatarProps {
  name: string;
  role: UserRole;
  size?: "sm" | "md" | "lg";
  imageUrl?: string;
}

const ROLE_COLORS: Record<UserRole, string> = {
  farmer: "bg-green-100 text-green-700",
  livestock_keeper: "bg-amber-100 text-amber-700",
  agri_specialist: "bg-blue-100 text-blue-700",
  veterinarian: "bg-red-100 text-red-700",
  input_seller: "bg-orange-100 text-orange-700",
  input_service_provider: "bg-teal-100 text-teal-700",
  weather_soil_specialist: "bg-sky-100 text-sky-700",
  market_advisor: "bg-purple-100 text-purple-700",
  transport_provider: "bg-indigo-100 text-indigo-700",
  buyer: "bg-pink-100 text-pink-700",
};

const ROLE_ICONS: Record<UserRole, string> = {
  farmer: "🌾",
  livestock_keeper: "🐄",
  agri_specialist: "🔬",
  veterinarian: "💉",
  input_seller: "🛒",
  input_service_provider: "🚜",
  weather_soil_specialist: "🌦️",
  market_advisor: "📊",
  transport_provider: "🚛",
  buyer: "🏪",
};

const SIZES = {
  sm: "w-8 h-8 text-sm",
  md: "w-12 h-12 text-lg",
  lg: "w-16 h-16 text-2xl",
};
const BADGE_SIZES = {
  sm: "w-4 h-4 text-[8px]",
  md: "w-5 h-5 text-[9px]",
  lg: "w-7 h-7 text-sm",
};

export function RoleAvatar({
  name,
  role,
  size = "md",
  imageUrl,
}: RoleAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const colors = ROLE_COLORS[role];
  const icon = ROLE_ICONS[role];

  return (
    <div data-ocid="role.avatar" className="relative inline-flex">
      <div
        className={`${SIZES[size]} rounded-full flex items-center justify-center font-semibold ${colors} overflow-hidden`}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      <div
        className={`${BADGE_SIZES[size]} absolute -bottom-0.5 -right-0.5 bg-card border border-border rounded-full flex items-center justify-center`}
      >
        <span>{icon}</span>
      </div>
    </div>
  );
}
