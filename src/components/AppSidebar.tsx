
import { Home, Calendar, Plus, Archive, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Главная",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Мои достижения",
    url: "/achievements",
    icon: Calendar,
  },
  {
    title: "Добавить достижение",
    url: "/add-achievement",
    icon: Plus,
  },
  {
    title: "Архив",
    url: "/archive",
    icon: Archive,
  },
  {
    title: "Рекомендации",
    url: "/recommendations",
    icon: Archive,
  },
  {
    title: "Настройки",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-200" style={{ backgroundColor: '#017870' }}>
      <SidebarHeader className="p-4">
        <div className="text-white font-bold text-lg">
          Цифровое портфолио
        </div>
        <div className="text-white/80 text-sm">
          ИрГУПС
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/70">Навигация</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="text-white hover:bg-white/10 data-[active=true]:bg-white/20"
                  >
                    <NavLink 
                      to={item.url}
                      className={({ isActive }) => 
                        `flex items-center gap-2 ${isActive ? 'font-medium' : ''}`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
