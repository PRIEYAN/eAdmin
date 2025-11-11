import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Home, UserCheck, Clock, MapPin, Calendar, LogOut, Building2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Verified Teachers",
    url: "/verified-teachers",
    icon: UserCheck,
  },
  {
    title: "Pending Teachers",
    url: "/pending-teachers",
    icon: Clock,
  },
  {
    title: "Venues",
    url: "/venues",
    icon: MapPin,
  },
  {
    title: "Booked Venues",
    url: "/booked",
    icon: Calendar,
  },
];

export function AppSidebar() {
  const { logout } = useAuth();
  const [location, setLocation] = useLocation();

  return (
    <Sidebar data-testid="sidebar-main" className="supports-[backdrop-filter]:backdrop-blur">
      <SidebarHeader className="p-3 bg-transparent border-b border-sidebar-border/50">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-2 shadow-lg ring-2 ring-primary/30">
            <Building2 className="h-4 w-4 text-primary-foreground opacity-100" />
          </div>
          <div>
            <h2 className="text-base font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">E-Venue Admin</h2>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2.5 py-1 text-xs font-semibold">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => setLocation(item.url)}
                    isActive={location === item.url}
                    className="transition-all duration-200 data-[active=true]:bg-primary/20 data-[active=true]:text-primary data-[active=true]:shadow-sm data-[active=true]:ring-1 data-[active=true]:ring-primary/30 hover:bg-sidebar-accent/60 hover:translate-x-1 px-2.5 py-1.5"
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <item.icon className="h-3.5 w-3.5 opacity-90" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-3 border-t border-sidebar-border/50">
        <Button
          variant="outline"
          className="w-full justify-start border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all"
          onClick={() => {
            logout();
            setLocation('/login');
          }}
          data-testid="button-logout"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
