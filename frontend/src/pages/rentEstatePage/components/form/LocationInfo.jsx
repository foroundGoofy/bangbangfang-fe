
import React, { useState } from "react";
import { Button, Modal, Cascader } from "@douyinfe/semi-ui";
import { IconMapPin } from '@douyinfe/semi-icons';
import MapSelector from "./MapSelector";
import locationMockData from "./locationMockData";

const LocationInfo = ({ street, community, onStreetChange, onCommunityChange }) => {
  const [mapVisible, setMapVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState([]);

  const handleMapSelect = (location) => {
    if (location.street) {
      onStreetChange(location.street);
    }
    if (location.community) {
      onCommunityChange(location.community);
    }
    setMapVisible(false);
  };

  const handleLocationChange = (value) => {
    setSelectedLocation(value);
    const selectedStreet = value.join('-');
    console.log("=====handleLocationChange", value, selectedStreet)
    if (selectedStreet) {
      onStreetChange(selectedStreet);
    }
  };

  return (
    <>
      <div className="space-y-2">
        <label htmlFor="street" className="block text-sm font-medium text-gray-700">
          位置信息
        </label>
        <div className="flex items-center space-x-2">
          <Cascader
            mode="cascade"
            treeData={locationMockData}
            value={selectedLocation}
            onChange={handleLocationChange}
            placeholder="请选择城市、区、街道"
            className="w-full"
          />
          <Button 
            icon={<IconMapPin />} 
            theme="light" 
            onClick={() => setMapVisible(true)}
            className="flex-shrink-0"
          >
            地图选点
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="community" className="block text-sm font-medium text-gray-700">
          小区
        </label>
        <input
          type="text"
          id="community"
          className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 text-sm"
          value={community}
          onChange={(e) => onCommunityChange(e.target.value)}
        />
      </div>

      <Modal
        title="地图选点"
        visible={mapVisible}
        onCancel={() => setMapVisible(false)}
        footer={null}
        width={800}
        bodyStyle={{ padding: 0, height: '500px' }}
      >
        <MapSelector onSelect={handleMapSelect} />
      </Modal>
    </>
  );
};

export default LocationInfo;
