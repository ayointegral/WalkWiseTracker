import { Card } from "@/components/ui/card";
import { Timer, MapPin, TrendingUp } from "lucide-react";

interface Activity {
  duration: number;
  distance: number;
}

interface StatsOverviewProps {
  activities: Activity[];
}

export function StatsOverview({ activities }: StatsOverviewProps) {
  const totalDistance = activities.reduce((sum, act) => sum + Number(act.distance), 0);
  const totalDuration = activities.reduce((sum, act) => sum + Number(act.duration), 0);
  const totalActivities = activities.length;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <MapPin className="w-8 h-8 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Total Distance</p>
            <p className="text-2xl font-bold">{totalDistance.toFixed(1)} km</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Timer className="w-8 h-8 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Total Time</p>
            <p className="text-2xl font-bold">{totalDuration} min</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <TrendingUp className="w-8 h-8 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Activities</p>
            <p className="text-2xl font-bold">{totalActivities}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
