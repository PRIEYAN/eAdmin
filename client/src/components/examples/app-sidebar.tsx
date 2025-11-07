import { AppSidebar } from '../app-sidebar';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider } from "@/lib/auth-context";

export default function AppSidebarExample() {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <AuthProvider>
      <SidebarProvider style={style as React.CSSProperties}>
        <div className="flex h-screen w-full">
          <AppSidebar />
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
}
