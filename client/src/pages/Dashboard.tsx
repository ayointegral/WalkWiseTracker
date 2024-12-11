import { StatsOverview } from "@/components/StatsOverview";
import { ActivityChart } from "@/components/ActivityChart";
import { ActivityCard } from "@/components/ActivityCard";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapIcon } from "lucide-react";
import { getActivities } from "@/lib/api";

interface Activity {
  id: number;
  startTime: string;
  endTime: string;
  duration: number;
  distance: number;
  path: string;
}

export default function Dashboard() {
  const { data: activities = [] } = useQuery<Activity[]>({
    queryKey: ['/api/activities'],
    queryFn: getActivities,
  });

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Activity Dashboard</h1>
        <Link href="/walk">
          <Button className="gap-2">
            <MapIcon className="w-4 h-4" />
            Start Walking
          </Button>
        </Link>
      </div>
      
      <StatsOverview activities={activities || []} />
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
          <ActivityChart activities={activities || []} />
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {activities?.slice(0, 5).map((activity: any) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
