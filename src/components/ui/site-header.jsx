import { useLocation } from "react-router-dom";

import { Separator } from "./separator";
import { SidebarTrigger } from "./sidebar";
import { PATH } from "@/routes/path";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavUser } from "./nav-user";
import { useSelector } from "react-redux";

export function SiteHeader() {
  const { pathname } = useLocation();
  const user = useSelector((state) => state.user); // Lấy user từ store

  const renderLabel = () => {
    if (pathname.startsWith(PATH.SHOWTIME_MANAGEMENT)) {
      return "Showtime Management";
    }
    switch (pathname) {
      case PATH.DASHBOARD:
        return "Dashboard Movie";
      case PATH.USER_MANAGEMENT:
        return "User Management";
      case PATH.MOVIE_MANAGEMENT:
        return "Movie Management";
      case `PATH.SHOWTIME_MANAGEMENT`:
        return "Showtime Management";
      default:
        return "Dashboard Movie";
    }
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 py-2 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">{renderLabel()}</h1>
        <div className="ml-auto flex items-center gap-2">
          <NavUser user={user} />
        </div>
      </div>
    </header>
  );
}
