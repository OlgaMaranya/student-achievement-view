
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

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded"></div>
          <h1 className="text-xl font-semibold text-gray-800">
            Цифровое портфолио обучающегося ИрГУПС
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Уведомления */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
              >
                2
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-3 border-b">
              <h3 className="font-medium">Уведомления</h3>
            </div>
            <DropdownMenuItem className="p-3 hover:bg-gray-50">
              <div>
                <p className="text-sm font-medium">Нужно подтвердить достижения</p>
                <p className="text-xs text-gray-500">Вам нужно подтвердить 2 новых достижения</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 hover:bg-gray-50">
              <div>
                <p className="text-sm font-medium">До конца семестра</p>
                <p className="text-xs text-gray-500">До конца семестра осталось 30 дней</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Меню пользователя */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                ИИ
              </div>
              <span className="text-sm font-medium">Иван Иванов</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Профиль
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-4 w-4 mr-2" />
              Настройки
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="h-4 w-4 mr-2" />
              Помощь
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Выход
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
