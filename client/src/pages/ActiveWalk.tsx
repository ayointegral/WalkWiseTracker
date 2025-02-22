import { useLocation } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { startActivity, endActivity } from "@/lib/api";
import { Timer, MapPin } from "lucide-react";
import { WalkingMap } from "@/components/WalkingMap";
import { useState, useEffect } from "react";
import { getLocationName } from "@/lib/utils";

export default function ActiveWalk() {
  const [, setLocation] = useLocation();
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);
  const [path, setPath] = useState<[number, number][]>([]);
  const [activityId, setActivityId] = useState<number | null>(null);
  
  const startMutation = useMutation({
    mutationFn: startActivity,
    onSuccess: (data) => setActivityId(data.id),
  });

  const endMutation = useMutation({
    mutationFn: ({ id, path, duration, distance, location }: { 
      id: number; 
      path: [number, number][]; 
      duration: number; 
      distance: number;
      location: string;
    }) => endActivity(id, JSON.stringify(path), duration, distance),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/activities'] });
      setLocation('/');
    },
  });

  useEffect(() => {
    if (navigator.geolocation) {
      startMutation.mutate();
      
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPath(prev => [...prev, [latitude, longitude]]);
          
          if (path.length > 0) {
            const lastPoint = path[path.length - 1];
            const newDistance = calculateDistance(
              lastPoint[0], lastPoint[1],
              latitude, longitude
            );
            if (newDistance > 0.001 && newDistance < 1) {
              setDistance(prev => prev + newDistance);
            }
          }
        },
        (error) => console.error(error),
        { enableHighAccuracy: true }
      );

      const timer = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);

      return () => {
        navigator.geolocation.clearWatch(watchId);
        clearInterval(timer);
      };
    }
  }, []);

  const handleEndWalk = async () => {
    if (activityId && path.length > 0) {
      const lastPoint = path[path.length - 1];
      const location = await getLocationName(lastPoint[0], lastPoint[1]);
      
      endMutation.mutate({
        id: activityId,
        path,
        duration: +(duration / 60).toFixed(2), // Convert to minutes with 2 decimal places
        distance: parseFloat(distance.toFixed(2)),
        location
      });
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <WalkingMap path={path} className="h-[300px]" />
      <Card className="p-6 max-w-md mx-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Timer className="w-6 h-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="text-2xl font-bold">
                {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="w-6 h-6 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Distance</p>
              <p className="text-2xl font-bold">{distance.toFixed(2)} km</p>
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={handleEndWalk}
            disabled={endMutation.isPending}
          >
            End Walk
          </Button>
        </div>
      </Card>
    </div>
  );
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI/180);
}
