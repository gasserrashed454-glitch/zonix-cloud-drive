import { Cloud, File, FolderOpen, Share2, Star, Trash2, Clock, Settings, HelpCircle, Users } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import ZonixLogo from "./ZonixLogo";
import { Progress } from "./ui/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "My files", url: "/drive", icon: FolderOpen },
  { title: "Recent", url: "/drive/recent", icon: Clock },
  { title: "Starred", url: "/drive/starred", icon: Star },
  { title: "Shared", url: "/drive/shared", icon: Share2 },
  { title: "Shared with me", url: "/drive/shared-with-me", icon: Users },
  { title: "Trash", url: "/drive/trash", icon: Trash2 },
];

const DriveSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <div className="px-3 py-3">
            <ZonixLogo size="sm" showText={!collapsed} />
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="hover:bg-accent/50" activeClassName="bg-accent text-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>More</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/support" className="hover:bg-accent/50" activeClassName="bg-accent text-primary font-medium">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Support</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/settings" className="hover:bg-accent/50" activeClassName="bg-accent text-primary font-medium">
                    <Settings className="mr-2 h-4 w-4" />
                    {!collapsed && <span>Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!collapsed && (
        <SidebarFooter className="p-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1.2 GB of 5 GB used</span>
              <span>24%</span>
            </div>
            <Progress value={24} className="h-1.5" />
            <p className="text-xs text-primary cursor-pointer hover:underline">Upgrade storage</p>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
};

export default DriveSidebar;
