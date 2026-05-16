import type { Language, UserProfile, UserRole } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<boolean>;
  register: (
    data: Partial<UserProfile> & { password: string },
  ) => Promise<boolean>;
  logout: () => void;
  setLanguage: (lang: Language) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

// Mock users for demo
const MOCK_USERS: UserProfile[] = [
  {
    id: "u1",
    name: "Juma Mwangi",
    email: "farmer@namwala.tz",
    role: "farmer",
    language: "sw",
    location: "Mbeya",
    phone: "+255712345678",
    farmSize: 5,
    cropTypes: ["Maize", "Sunflower", "Beans"],
    createdAt: "2024-01-15",
  },
  {
    id: "u2",
    name: "Amina Hassan",
    email: "livestock@namwala.tz",
    role: "livestock_keeper",
    language: "sw",
    location: "Arusha",
    phone: "+255723456789",
    animalTypes: ["Cattle", "Goats"],
    createdAt: "2024-02-10",
  },
  {
    id: "u3",
    name: "Dr. Peter Kimaro",
    email: "vet@namwala.tz",
    role: "veterinarian",
    language: "en",
    location: "Dodoma",
    phone: "+255734567890",
    specialization: "Cattle & Small Ruminants",
    createdAt: "2024-01-20",
  },
  {
    id: "u4",
    name: "Sarah Ndunguru",
    email: "agri@namwala.tz",
    role: "agri_specialist",
    language: "en",
    location: "Dar es Salaam",
    specialization: "Crop Disease & Soil Health",
    createdAt: "2024-01-25",
  },
  {
    id: "u5",
    name: "Mohamed Ally",
    email: "seller@namwala.tz",
    role: "input_seller",
    language: "sw",
    location: "Mwanza",
    businessName: "Ally Agro Supplies",
    createdAt: "2024-03-01",
  },
  {
    id: "u6",
    name: "Grace Msigwa",
    email: "service@namwala.tz",
    role: "input_service_provider",
    language: "sw",
    location: "Morogoro",
    businessName: "Msigwa Farm Services",
    createdAt: "2024-02-20",
  },
  {
    id: "u7",
    name: "Dr. Ibrahim Salum",
    email: "weather@namwala.tz",
    role: "weather_soil_specialist",
    language: "en",
    location: "Dodoma",
    specialization: "Agro-Meteorology",
    createdAt: "2024-01-30",
  },
  {
    id: "u8",
    name: "Fatuma Juma",
    email: "market@namwala.tz",
    role: "market_advisor",
    language: "en",
    location: "Dar es Salaam",
    specialization: "Agricultural Commodity Markets",
    createdAt: "2024-02-05",
  },
  {
    id: "u9",
    name: "John Kariuki",
    email: "transport@namwala.tz",
    role: "transport_provider",
    language: "en",
    location: "Arusha",
    vehicleType: "Truck 5T",
    serviceArea: ["Arusha", "Moshi", "Kilimanjaro"],
    createdAt: "2024-03-10",
  },
  {
    id: "u10",
    name: "Daudi Kipanga",
    email: "buyer@namwala.tz",
    role: "buyer",
    language: "en",
    location: "Dar es Salaam",
    businessName: "Kipanga Trading Co.",
    createdAt: "2024-01-10",
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async ({ email, password: _password }) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 800));
        const found = MOCK_USERS.find((u) => u.email === email);
        if (found) {
          set({ user: found, isAuthenticated: true, isLoading: false });
          return true;
        }
        set({ isLoading: false });
        return false;
      },

      register: async (data) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 1000));
        const newUser: UserProfile = {
          id: `u${Date.now()}`,
          name: data.name ?? "New User",
          email: data.email ?? "",
          role: data.role ?? "farmer",
          language: data.language ?? "en",
          location: data.location ?? "",
          phone: data.phone,
          farmSize: data.farmSize,
          cropTypes: data.cropTypes,
          animalTypes: data.animalTypes,
          createdAt: new Date().toISOString(),
        };
        set({ user: newUser, isAuthenticated: true, isLoading: false });
        return true;
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      setLanguage: (lang) => {
        const user = get().user;
        if (user) set({ user: { ...user, language: lang } });
      },

      updateProfile: (data) => {
        const user = get().user;
        if (user) set({ user: { ...user, ...data } });
      },
    }),
    {
      name: "namwala-auth",
      partialize: (s) => ({ user: s.user, isAuthenticated: s.isAuthenticated }),
    },
  ),
);
