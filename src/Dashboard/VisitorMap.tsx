import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface VisitorMapProps {
  visitors: {
    id: number;
    latitude: number;
    longitude: number;
    city: string;
    country: string;
    isp: string;
  }[];
}

const VisitorMap: React.FC<VisitorMapProps> = ({ visitors }) => {
  const defaultPosition: LatLngExpression = [20, 0];  // Default center

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={defaultPosition}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {visitors.map((visitor) => {
          const position: LatLngExpression = [visitor.latitude || 0, visitor.longitude || 0];

          return (
            visitor.latitude && visitor.longitude && (
              <Marker key={visitor.id} position={position}>
                <Popup>
                  <strong>{`${visitor.city}, ${visitor.country}`}</strong><br />
                  <p>{visitor.isp}</p>
                </Popup>
              </Marker>
            )
          );
        })}
      </MapContainer>
    </div>
  );
};

export default VisitorMap;
