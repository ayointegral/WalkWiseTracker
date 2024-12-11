import { Card } from "@/components/ui/card";
import { Timer, MapPin } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { WalkingMap } from "@/components/WalkingMap";

interface ActivityCardProps {
  activity: {
    id: number;
    startTime: string;
    duration: number;
    distance: number;
    path?: string;
    location?: string;
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
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{activity.distance} km</span>
            </div>
            {activity.location && (
              <p className="text-sm text-muted-foreground pl-6">
                at {activity.location}
              </p>
            )}
          </div>
        </div>
        {activity.path && (
          <WalkingMap 
            path={JSON.parse(activity.path)} 
            className="mt-4 h-[150px]" 
          />
        )}
      </div>
    </Card>
  );
}
