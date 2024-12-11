# WalkWise Tracker

A real-time walking activity tracker that helps you monitor and visualize your walking activities with interactive data visualizations.

![WalkWise Tracker](screenshot.png)

## Features

- **Real-time Activity Tracking**: Track your walks in real-time using GPS
- **Interactive Maps**: View your walking routes on interactive maps
- **Location Recording**: Automatically records street names and locations
- **Activity Dashboard**: 
  - Overview of total distance, time, and number of activities
  - Weekly progress visualization
  - Recent activities list with maps
- **Responsive Design**: Works seamlessly on mobile and desktop devices

## Tech Stack

- **Frontend**:
  - React with TypeScript
  - TailwindCSS + Shadcn UI for styling
  - React Query for data fetching
  - Recharts for data visualization
  - React Leaflet for maps
  - Wouter for routing

- **Backend**:
  - Express.js
  - PostgreSQL with Drizzle ORM
  - OpenStreetMap API for geocoding

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- PostgreSQL database
- NPM or Yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/walkwise-tracker.git
cd walkwise-tracker
```

2. Install dependencies
```bash
npm install
```

3. Set up the database
```bash
npm run db:push
```

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Usage Guide

### Starting a Walk
1. Click the "Start Walking" button on the dashboard
2. Allow location access when prompted
3. Your walk will be tracked automatically

### During a Walk
- View real-time stats including:
  - Duration
  - Distance
  - Current route on the map

### Ending a Walk
1. Click "End Walk" when finished
2. Your walk details will be saved with:
  - Total distance
  - Duration
  - Route map
  - Location name

### Viewing Activities
- Dashboard shows:
  - Total statistics
  - Weekly progress chart
  - Recent activities list
- Each activity displays:
  - Duration and distance
  - Location name
  - Route map
  - Time since activity

## API Endpoints

### Activities

```typescript
GET /api/activities
// Returns list of all activities

POST /api/activities/start
// Starts a new activity

POST /api/activities/:id/end
// Ends an activity with route and stats
```

## Development

### Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utilities and API clients
│   │   └── hooks/        # Custom React hooks
├── server/
│   ├── routes.ts         # API routes
│   └── index.ts          # Server setup
└── db/
    └── schema.ts         # Database schema
```

### Database Schema

```typescript
activities {
  id: serial
  startTime: timestamp
  endTime: timestamp
  duration: numeric
  distance: numeric
  path: text
  location: text
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
