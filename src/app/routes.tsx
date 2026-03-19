import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/landing-page";
import { AuthPage } from "./pages/auth-page";
import { DashboardLayout } from "./pages/dashboard-layout";
import { DashboardHome } from "./pages/dashboard-home";
import { PlansPage } from "./pages/plans-page";
import { RiskInsightsPage } from "./pages/risk-insights-page";
import { ClaimsPage } from "./pages/claims-page";
import { HistoryPage } from "./pages/history-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/auth",
    Component: AuthPage,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardHome },
      { path: "plans", Component: PlansPage },
      { path: "risk", Component: RiskInsightsPage },
      { path: "claims", Component: ClaimsPage },
      { path: "history", Component: HistoryPage },
    ],
  },
]);
