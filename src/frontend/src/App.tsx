import { Skeleton } from "@/components/ui/skeleton";
import DiagnosisPage from "@/pages/DiagnosisPage";
import LandingPage from "@/pages/LandingPage";
import MarketplacePage from "@/pages/MarketplacePage";
import { useAuthStore } from "@/store/authStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Pages - lazy loaded
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const FarmerDashboard = lazy(
  () => import("@/pages/dashboards/FarmerDashboard"),
);
const LivestockDashboard = lazy(
  () => import("@/pages/dashboards/LivestockDashboard"),
);
const AgriculturalSpecialistDashboard = lazy(
  () => import("@/pages/dashboards/AgriculturalSpecialistDashboard"),
);
const VeterinarianDashboard = lazy(
  () => import("@/pages/dashboards/VeterinarianDashboard"),
);
const InputSellerDashboard = lazy(
  () => import("@/pages/dashboards/InputSellerDashboard"),
);
const InputServiceDashboard = lazy(
  () => import("@/pages/dashboards/InputServiceDashboard"),
);
const WeatherSoilDashboard = lazy(
  () => import("@/pages/dashboards/WeatherSoilDashboard"),
);
const MarketAdvisorDashboard = lazy(
  () => import("@/pages/dashboards/MarketAdvisorDashboard"),
);
const TransportDashboard = lazy(
  () => import("@/pages/dashboards/TransportDashboard"),
);
const BuyerDashboard = lazy(() => import("@/pages/dashboards/BuyerDashboard"));
const MessagesPage = lazy(() => import("@/pages/MessagesPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const NotificationsPage = lazy(() => import("@/pages/NotificationsPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const TransportSearchPage = lazy(() => import("@/pages/TransportSearchPage"));
const SellerReviewsPage = lazy(() => import("@/pages/SellerReviewsPage"));
const MyOrdersPage = lazy(() => import("@/pages/MyOrdersPage"));
const PaymentHistoryPage = lazy(() => import("@/pages/PaymentHistoryPage"));

const ROLE_ROUTES: Record<string, string> = {
  farmer: "/dashboard/farmer",
  livestock_keeper: "/dashboard/livestock",
  agri_specialist: "/dashboard/agri-specialist",
  veterinarian: "/dashboard/veterinarian",
  input_seller: "/dashboard/input-seller",
  input_service_provider: "/dashboard/input-service",
  weather_soil_specialist: "/dashboard/weather-soil",
  market_advisor: "/dashboard/market-advisor",
  transport_provider: "/dashboard/transport",
  buyer: "/dashboard/buyer",
};

function PageLoader() {
  return (
    <div className="p-4 space-y-3 max-w-md mx-auto">
      <Skeleton className="h-16 w-full rounded-xl" />
      <Skeleton className="h-32 w-full rounded-xl" />
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
      </div>
      <Skeleton className="h-40 w-full rounded-xl" />
    </div>
  );
}

function AuthGuard() {
  const { isAuthenticated } = useAuthStore.getState();
  if (!isAuthenticated) throw redirect({ to: "/login" });
  return <Outlet />;
}

function RootLayout() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  );
}

// Route definitions
const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    const { isAuthenticated, user } = useAuthStore.getState();
    if (isAuthenticated && user) {
      throw redirect({ to: ROLE_ROUTES[user.role] ?? "/home" });
    }
    // Unauthenticated → show LandingPage (no redirect)
  },
  component: () => <LandingPage />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  beforeLoad: () => {
    const { isAuthenticated, user } = useAuthStore.getState();
    if (isAuthenticated && user) {
      throw redirect({ to: ROLE_ROUTES[user.role] ?? "/home" });
    }
  },
  component: () => <LoginPage />,
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: () => <SignupPage />,
});

const authGroupRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "auth",
  component: AuthGuard,
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
  },
});

const homeRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/home",
  component: () => <HomePage />,
});
const messagesRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/messages",
  validateSearch: (search: Record<string, unknown>) => ({
    recipientId:
      typeof search.recipientId === "string" ? search.recipientId : undefined,
  }),
  component: () => <MessagesPage />,
});
const notificationsRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/notifications",
  component: () => <NotificationsPage />,
});
const settingsRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/settings",
  component: () => <SettingsPage />,
});
const searchRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/search",
  component: () => <SearchPage />,
});
const farmerRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/dashboard/farmer",
  component: () => <FarmerDashboard />,
});
const livestockRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/dashboard/livestock",
  component: () => <LivestockDashboard />,
});
const agriSpecialistRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/dashboard/agri-specialist",
  component: () => <AgriculturalSpecialistDashboard />,
});
const veterinarianRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/dashboard/veterinarian",
  component: () => <VeterinarianDashboard />,
});
const inputSellerRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/dashboard/input-seller",
  component: () => <InputSellerDashboard />,
});
const inputServiceRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/dashboard/input-service",
  component: () => <InputServiceDashboard />,
});
const weatherSoilRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/dashboard/weather-soil",
  component: () => <WeatherSoilDashboard />,
});
const marketAdvisorRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/dashboard/market-advisor",
  component: () => <MarketAdvisorDashboard />,
});
const transportRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/dashboard/transport",
  component: () => <TransportDashboard />,
});
const buyerRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/dashboard/buyer",
  component: () => <BuyerDashboard />,
});

const diagnosisRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/diagnosis",
  component: () => <DiagnosisPage />,
});

const marketplaceRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/marketplace",
  component: () => <MarketplacePage />,
});

const checkoutRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/checkout",
  validateSearch: (search: Record<string, unknown>) => ({
    listingId:
      typeof search.listingId === "string" ? search.listingId : undefined,
    listingTitle:
      typeof search.listingTitle === "string" ? search.listingTitle : undefined,
    sellerId: typeof search.sellerId === "string" ? search.sellerId : undefined,
    sellerName:
      typeof search.sellerName === "string" ? search.sellerName : undefined,
    price:
      typeof search.price === "number"
        ? search.price
        : typeof search.price === "string"
          ? Number(search.price)
          : undefined,
    unit: typeof search.unit === "string" ? search.unit : undefined,
  }),
  component: () => <CheckoutPage />,
});

const transportSearchRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/transport-search",
  component: () => <TransportSearchPage />,
});

const sellerReviewsRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/seller/$sellerId/reviews",
  component: () => <SellerReviewsPage />,
});

const myOrdersRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/my-orders",
  component: () => <MyOrdersPage />,
});

const paymentHistoryRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/payment-history",
  component: () => <PaymentHistoryPage />,
});

const CalendarPage = lazy(() => import("@/pages/CalendarPage"));
const RecordsPage = lazy(() => import("@/pages/RecordsPage"));
const GroupsPage = lazy(() => import("@/pages/GroupsPage"));
const GroupDetailPage = lazy(() => import("@/pages/GroupDetailPage"));
const LoansPage = lazy(() => import("@/pages/LoansPage"));
const TraceabilityPage = lazy(() => import("@/pages/TraceabilityPage"));
const InventoryPage = lazy(() => import("@/pages/InventoryPage"));
const FarmMapPage = lazy(() => import("@/pages/FarmMapPage"));
const AnalyticsPage = lazy(() => import("@/pages/AnalyticsPage"));
const ContractsPage = lazy(() => import("@/pages/ContractsPage"));
const SustainabilityPage = lazy(() => import("@/pages/SustainabilityPage"));
const AnnouncementsPage = lazy(() => import("@/pages/AnnouncementsPage"));
const BusinessIntelligencePage = lazy(
  () => import("@/pages/BusinessIntelligencePage"),
);
const ForumPage = lazy(() => import("@/pages/ForumPage"));
const ForumCategoryPage = lazy(() => import("@/pages/ForumCategoryPage"));
const ForumTopicPage = lazy(() => import("@/pages/ForumTopicPage"));
const LeaderboardPage = lazy(() => import("@/pages/LeaderboardPage"));
const UserProfilePage = lazy(() => import("@/pages/UserProfilePage"));
const OutbreakMapPage = lazy(() => import("@/pages/OutbreakMapPage"));
const AuctionsPage = lazy(() => import("@/pages/AuctionsPage"));
const AuctionDetailPage = lazy(() => import("@/pages/AuctionDetailPage"));
const ForecastingPage = lazy(() => import("@/pages/ForecastingPage"));
const IrrigationPage = lazy(() => import("@/pages/IrrigationPage"));
const DroneAnalysisPage = lazy(() => import("@/pages/DroneAnalysisPage"));
const JobMarketplacePage = lazy(() => import("@/pages/JobMarketplacePage"));
const InsurancePage = lazy(() => import("@/pages/InsurancePage"));
const CarbonFarmingPage = lazy(() => import("@/pages/CarbonFarmingPage"));
const SuccessInsightsPage = lazy(() => import("@/pages/SuccessInsightsPage"));
const calendarRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/calendar",
  component: () => <CalendarPage />,
});

const recordsRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/records",
  component: () => <RecordsPage />,
});

const groupsRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/groups",
  component: () => <GroupsPage />,
});

const groupDetailRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/groups/$groupId",
  component: () => <GroupDetailPage />,
});

const loansRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/loans",
  component: () => <LoansPage />,
});

const traceabilityRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/traceability",
  component: () => <TraceabilityPage />,
});

const inventoryRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/inventory",
  component: () => <InventoryPage />,
});

const farmMapRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/farm-map",
  component: () => <FarmMapPage />,
});

const analyticsRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/analytics",
  component: () => <AnalyticsPage />,
});

const contractsRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/contracts",
  component: () => <ContractsPage />,
});

const sustainabilityRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/sustainability",
  component: () => <SustainabilityPage />,
});

const announcementsRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/announcements",
  component: () => <AnnouncementsPage />,
});

const businessIntelligenceRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/business-intelligence",
  component: () => <BusinessIntelligencePage />,
});

const forumRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/forum",
  component: () => <ForumPage />,
});

const forumCategoryRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/forum/category/$categoryId",
  component: () => <ForumCategoryPage />,
});

const forumTopicRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/forum/topic/$topicId",
  component: () => <ForumTopicPage />,
});

const leaderboardRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/leaderboard",
  component: () => <LeaderboardPage />,
});

const userProfileRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/user/$userId",
  component: () => <UserProfilePage />,
});

const outbreakMapRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/outbreak-map",
  component: () => <OutbreakMapPage />,
});

const auctionsRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/auctions",
  component: () => <AuctionsPage />,
});

const auctionDetailRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/auctions/$auctionId",
  component: () => <AuctionDetailPage />,
});

const forecastingRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/forecasting",
  component: () => <ForecastingPage />,
});

const irrigationRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/irrigation",
  component: () => <IrrigationPage />,
});

const droneAnalysisRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/drone-analysis",
  component: () => <DroneAnalysisPage />,
});

const jobsRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/jobs",
  component: () => <JobMarketplacePage />,
});

const insuranceRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/insurance",
  component: () => <InsurancePage />,
});

const carbonFarmingRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/carbon-farming",
  component: () => <CarbonFarmingPage />,
});

const successInsightsRoute = createRoute({
  getParentRoute: () => authGroupRoute,
  path: "/success-insights",
  component: () => <SuccessInsightsPage />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  signupRoute,
  authGroupRoute.addChildren([
    homeRoute,
    messagesRoute,
    notificationsRoute,
    settingsRoute,
    searchRoute,
    farmerRoute,
    livestockRoute,
    agriSpecialistRoute,
    veterinarianRoute,
    inputSellerRoute,
    inputServiceRoute,
    weatherSoilRoute,
    marketAdvisorRoute,
    transportRoute,
    buyerRoute,
    diagnosisRoute,
    marketplaceRoute,
    checkoutRoute,
    transportSearchRoute,
    sellerReviewsRoute,
    myOrdersRoute,
    paymentHistoryRoute,
    calendarRoute,
    recordsRoute,
    groupsRoute,
    groupDetailRoute,
    loansRoute,
    traceabilityRoute,
    inventoryRoute,
    farmMapRoute,
    analyticsRoute,
    contractsRoute,
    sustainabilityRoute,
    announcementsRoute,
    businessIntelligenceRoute,
    forumRoute,
    forumCategoryRoute,
    forumTopicRoute,
    leaderboardRoute,
    userProfileRoute,
    outbreakMapRoute,
    auctionsRoute,
    auctionDetailRoute,
    forecastingRoute,
    irrigationRoute,
    droneAnalysisRoute,
    jobsRoute,
    insuranceRoute,
    carbonFarmingRoute,
    successInsightsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30000, retry: 1 } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
