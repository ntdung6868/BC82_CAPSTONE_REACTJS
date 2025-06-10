import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { PATH } from "@/routes/path";
import { SiteHeader } from "@/components/ui/site-header";
import { useRoleNavigation } from "@/hooks/useRoleNavigation";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const { user } = useRoleNavigation(); // Thêm hook bảo vệ admin routes

  const renderLabel = () => {
    switch (pathname) {
      case PATH.DASHBOARD:
        return "Dashboard Movie";
      case PATH.USER_MANAGEMENT:
        return "User Management";
      case PATH.MOVIE_MANAGEMENT:
        return "Movie Management";
      default:
        return "Dashboard Movie";
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
