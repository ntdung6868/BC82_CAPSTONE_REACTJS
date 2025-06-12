import * as React from "react";
import { Calendar, Clapperboard, LayoutDashboard, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/ui/nav-main";
import { NavUser } from "@/components/ui/nav-user";
import { PATH } from "@/routes/path";
import { useSelector } from "react-redux";

const navItems = [
  {
    name: "Dashboard",
    url: PATH.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    name: "Users Management",
    url: PATH.USER_MANAGEMENT,
    icon: Users,
  },
  {
    name: "Movies Management",
    url: PATH.MOVIE_MANAGEMENT,
    icon: Clapperboard,
  },
];

export function AppSidebar({ ...props }) {
  const user = useSelector((state) => state.user); // Lấy user từ store
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href={PATH.ADMIN} className="flex items-center justify-center w-full h-full">
                {/* <IconBrandSlack className="!size-5" /> */}
                <img src="/img/logo.png" alt="logo" className=" h-[60%] object-contain" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
