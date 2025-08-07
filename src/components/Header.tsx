
import { Bell, User, ChevronDown, HelpCircle, LogOut, Settings } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { user, logout } = useAuth();

  const getUserInitials = (firstName?: string, lastName?: string, displayName?: string) => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    if (displayName) {
      const names = displayName.split(' ');
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return displayName.substring(0, 2).toUpperCase();
    }
    return 'ПП'; // По умолчанию
  };

  const getUserDisplayName = () => {
    if (user?.display_name) return user.display_name;
    if (user?.first_name && user?.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    return user?.email || 'Пользователь';
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-gray-700 hover:text-[#017870] hover:bg-gray-100" />
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-gradient-to-r from-[#017870] to-[#015d56] rounded"></div>
          <h1 className="text-xl font-semibold text-gray-800">
            Цифровое портфолио обучающегося ИрГУПС
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Уведомления */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-gray-700 hover:text-[#017870] hover:bg-gray-100">
              <Bell className="h-5 w-5" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-[#C42E6F] hover:bg-[#A02558]"
              >
                2
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-3 border-b">
              <h3 className="font-medium text-gray-800">Уведомления</h3>
            </div>
            <DropdownMenuItem className="p-3 hover:bg-gray-50">
              <div>
                <p className="text-sm font-medium text-gray-800">Нужно подтвердить достижения</p>
                <p className="text-xs text-gray-500">Вам нужно подтвердить 2 новых достижения</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 hover:bg-gray-50">
              <div>
                <p className="text-sm font-medium text-gray-800">До конца семестра</p>
                <p className="text-xs text-gray-500">До конца семестра осталось 30 дней</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Меню пользователя */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 text-gray-700 hover:text-[#017870] hover:bg-gray-100">
              <div className="h-8 w-8 bg-gradient-to-r from-[#C42E6F] to-[#A02558] rounded-full flex items-center justify-center text-white text-sm font-medium">
                {getUserInitials(user?.first_name, user?.last_name, user?.display_name)}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{getUserDisplayName()}</span>
                {user?.job_title && (
                  <span className="text-xs text-gray-500">{user.job_title}</span>
                )}
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <div className="p-3 border-b">
              <p className="font-medium text-gray-800">{getUserDisplayName()}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
              {user?.department && (
                <p className="text-xs text-gray-400">{user.department}</p>
              )}
            </div>
            <DropdownMenuItem className="text-gray-700 hover:text-[#017870]">
              <User className="h-4 w-4 mr-2" />
              Профиль
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-700 hover:text-[#017870]">
              <Settings className="h-4 w-4 mr-2" />
              Настройки
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-700 hover:text-[#017870]">
              <HelpCircle className="h-4 w-4 mr-2" />
              Помощь
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Выход из системы
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
