import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { startOfWeek, addDays, format } from "date-fns";

interface Activity {
  startTime: string;
  distance: number;
}

interface ActivityChartProps {
  activities: Activity[];
}

export function ActivityChart({ activities }: ActivityChartProps) {
  const startDate = startOfWeek(new Date());
  const weekData = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startDate, i);
    const dayActivities = activities.filter(a => 
      format(new Date(a.startTime), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    const totalDistance = dayActivities.reduce((sum, a) => sum + Number(a.distance), 0);
    
    return {
      date: format(date, 'EEE'),
      distance: totalDistance
    };
  });

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={weekData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="distance" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={{ fill: "hsl(var(--primary))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
