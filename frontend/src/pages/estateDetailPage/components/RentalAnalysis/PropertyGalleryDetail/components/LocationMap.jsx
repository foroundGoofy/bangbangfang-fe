
import React, { useEffect, useRef } from "react";
import { Card, Typography } from "@douyinfe/semi-ui";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LocationMap = () => {
  const { Title, Text } = Typography;
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize map if the ref is available and no map has been created yet
    if (mapRef.current && !mapRef.current._leaflet_id) {
      const map = L.map(mapRef.current).setView([31.2304, 121.4737], 15);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      // Add a marker for the property location
      L.marker([31.2304, 121.4737]).addTo(map)
        .bindPopup('房屋位置')
        .openPopup();
    }
    
    // Cleanup function to avoid memory leaks
    return () => {
      if (mapRef.current && mapRef.current._leaflet_id) {
        mapRef.current._leaflet = null;
      }
    };
  }, []);

  return (
    <Card className="mb-6 shadow-sm">
      <Title heading={5} className="mb-4">位置及周边</Title>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <div ref={mapRef} className="h-64 rounded-md border"></div>
        </div>
        <div className="w-full md:w-1/3">
          <div className="bg-blue-50 p-4 rounded-md h-full">
            <Title heading={6} className="mb-2">交通位置</Title>
            <Text className="text-sm">
              位于市中心，交通便利，距离地铁站步行仅需5分钟，多条公交线路经过此处。
              周边有多个商场、超市和餐厅，生活非常便利。
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LocationMap;
