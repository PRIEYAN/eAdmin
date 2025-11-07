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
    <Sidebar data-testid="sidebar-main">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">E-Venue Admin</h2>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => setLocation(item.url)}
                    isActive={location === item.url}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button
          variant="outline"
          className="w-full justify-start"
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
