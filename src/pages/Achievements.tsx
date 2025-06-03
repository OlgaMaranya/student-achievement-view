
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Download, RefreshCw, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const achievements = [
  {
    id: 1,
    title: "Участие в международной конференции по ИТ",
    category: "Научная деятельность",
    level: "Международный",
    type: "Участие",
    points: 15,
    date: "2024-11-15",
    status: "подтверждено",
    document: "certificate.pdf"
  },
  {
    id: 2,
    title: "Олимпиада по программированию",
    category: "Учебная деятельность", 
    level: "Всероссийский",
    type: "Призёр (2 место)",
    points: 25,
    date: "2024-10-20",
    status: "ожидает",
    document: "diploma.jpg"
  },
  {
    id: 3,
    title: "Соревнования по баскетболу",
    category: "Спортивная деятельность",
    level: "Внутривузовский",
    type: "Победитель",
    points: 10,
    date: "2024-09-10",
    status: "отклонено",
    document: "sports_cert.pdf"
  },
];

const Achievements = () => {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "подтверждено":
        return <Badge variant="default" className="bg-green-100 text-green-800">Подтверждено</Badge>;
      case "ожидает":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Ожидает</Badge>;
      case "отклонено":
        return <Badge variant="destructive">Отклонено</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredAchievements = achievements.filter(achievement => {
    if (categoryFilter !== "all" && achievement.category !== categoryFilter) return false;
    if (statusFilter !== "all" && achievement.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Мои достижения</h1>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Добавить достижение
        </Button>
      </div>

      {/* Фильтры */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Фильтры
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Категория</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Все категории" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  <SelectItem value="Учебная деятельность">Учебная деятельность</SelectItem>
                  <SelectItem value="Научная деятельность">Научная деятельность</SelectItem>
                  <SelectItem value="Спортивная деятельность">Спортивная деятельность</SelectItem>
                  <SelectItem value="Культурно-творческая деятельность">Культурно-творческая</SelectItem>
                  <SelectItem value="Общественная деятельность">Общественная деятельность</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Статус</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Все статусы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="подтверждено">Подтверждено</SelectItem>
                  <SelectItem value="ожидает">Ожидает подтверждения</SelectItem>
                  <SelectItem value="отклонено">Отклонено</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Список достижений */}
      <div className="space-y-4">
        {filteredAchievements.map((achievement) => (
          <Card key={achievement.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{achievement.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{achievement.category}</Badge>
                    <Badge variant="outline">{achievement.level}</Badge>
                    <Badge variant="outline">{achievement.type}</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{achievement.points} баллов</span> • 
                    <span className="ml-1">{new Date(achievement.date).toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(achievement.status)}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    {achievement.status === "отклонено" && (
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">Нет достижений, соответствующих выбранным фильтрам</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Achievements;
