import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icons in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const defaultIcon = new Icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface WalkingMapProps {
  path: [number, number][];
  className?: string;
}

export function WalkingMap({ path, className = "" }: WalkingMapProps) {
  const currentPosition = path[path.length - 1];
  const initialPosition = path[0] || [0, 0];

  return (
    <div className={`${className} relative z-10`}>
      {currentPosition && (
        <MapContainer
          center={currentPosition}
          zoom={16}
          className="h-[300px] w-full rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Show the walking path */}
          {path.length > 1 && (
            <Polyline 
              positions={path}
              color="hsl(var(--primary))"
              weight={3}
            />
          )}
          {/* Show start marker */}
          <Marker position={initialPosition} icon={defaultIcon}>
          </Marker>
          {/* Show current position marker */}
          <Marker position={currentPosition} icon={defaultIcon}>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}
