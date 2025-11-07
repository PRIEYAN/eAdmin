import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import LoginPage from "@/pages/login";
import DashboardHome from "@/pages/dashboard-home";
import VerifiedTeachersPage from "@/pages/verified-teachers";
import PendingTeachersPage from "@/pages/pending-teachers";
import VenuesPage from "@/pages/venues";
import BookedVenuesPage from "@/pages/booked";

function ProtectedRoute({ component: Component }: { component: () => JSX.Element }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  
  return <Component />;
}

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { admin } = useAuth();
  
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, <span className="font-medium text-foreground">{admin?.name}</span>
              </span>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function Router() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Switch>
      <Route path="/login">
        {isAuthenticated ? <Redirect to="/" /> : <LoginPage />}
      </Route>
      <Route path="/">
        <ProtectedRoute component={() => (
          <DashboardLayout>
            <DashboardHome />
          </DashboardLayout>
        )} />
      </Route>
      <Route path="/verified-teachers">
        <ProtectedRoute component={() => (
          <DashboardLayout>
            <VerifiedTeachersPage />
          </DashboardLayout>
        )} />
      </Route>
      <Route path="/pending-teachers">
        <ProtectedRoute component={() => (
          <DashboardLayout>
            <PendingTeachersPage />
          </DashboardLayout>
        )} />
      </Route>
      <Route path="/venues">
        <ProtectedRoute component={() => (
          <DashboardLayout>
            <VenuesPage />
          </DashboardLayout>
        )} />
      </Route>
      <Route path="/booked">
        <ProtectedRoute component={() => (
          <DashboardLayout>
            <BookedVenuesPage />
          </DashboardLayout>
        )} />
      </Route>
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
