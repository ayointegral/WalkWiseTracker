import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getLocationName(lat: number, lon: number): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18`,
      { headers: { 'User-Agent': 'WalkWiseTracker/1.0' } }
    );
    const data = await response.json();
    return data.address?.road || data.address?.suburb || data.display_name?.split(',')[0] || 'Unknown location';
  } catch (error) {
    console.error('Error fetching location name:', error);
    return 'Unknown location';
  }
}
