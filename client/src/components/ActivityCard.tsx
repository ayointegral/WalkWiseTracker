import { Card } from "@/components/ui/card";
import { Timer, MapPin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ActivityCardProps {
  activity: {
    id: number;
    startTime: string;
    duration: number;
    distance: number;
  };
}

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Card className="p-4 hover:bg-accent/5 transition-colors">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(activity.startTime), { addSuffix: true })}
          </p>
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4" />
            <span>
              {Math.floor(activity.duration)} min{' '}
              {Math.round((activity.duration % 1) * 60)} sec
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{activity.distance} km</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
