
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Trophy, Users } from "lucide-react";
import { RatingChart } from "@/components/RatingChart";
import { CategoryChart } from "@/components/CategoryChart";

const Home = () => {
  const currentRating = 66;
  const previousRating = 62;
  const ratingChange = currentRating - previousRating;
  const topPercentage = 25;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Ваш рейтинг обучающегося</h1>
      </div>

      {/* Основные показатели */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Общий рейтинг</CardTitle>
            <Trophy className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentRating} баллов</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {ratingChange >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              {ratingChange >= 0 ? '+' : ''}{ratingChange} с прошлого месяца
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ваша позиция</CardTitle>
            <Users className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">TOP-{topPercentage}%</div>
            <p className="text-xs text-muted-foreground">
              среди всех студентов
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">До повышенной стипендии</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{70 - currentRating} баллов</div>
            <p className="text-xs text-muted-foreground">
              осталось набрать
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Графики */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Динамика рейтинга за 12 месяцев</CardTitle>
          </CardHeader>
          <CardContent>
            <RatingChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Распределение баллов по категориям</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryChart />
          </CardContent>
        </Card>
      </div>

      {/* Кнопка перехода к полному рейтингу */}
      <div className="flex justify-center">
        <Button 
          size="lg" 
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          Перейти к полному рейтингу студентов
        </Button>
      </div>
    </div>
  );
};

export default Home;
