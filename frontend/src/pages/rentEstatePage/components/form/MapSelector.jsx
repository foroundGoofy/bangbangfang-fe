
import React, { useState, useEffect } from 'react';
import { Button, Input, Spin, Typography, Space } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';

const { Text } = Typography;

const MapSelector = ({ onSelect }) => {
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [marker, setMarker] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);

  // 初始化地图
  useEffect(() => {
    // 加载高德地图脚本
    const script = document.createElement('script');
    script.src = 'https://webapi.amap.com/maps?v=2.0&key=e8489a0f6efe3ed2c2098e95f3a22a1c&plugin=AMap.PlaceSearch,AMap.Geocoder';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // 创建地图实例
      const mapInstance = new window.AMap.Map('map-container', {
        zoom: 13,
        center: [116.397428, 39.90923], // 北京市中心
        resizeEnable: true
      });

      // 创建标记和信息窗口
      const markerInstance = new window.AMap.Marker({
        map: mapInstance,
        visible: false
      });

      const infoWindowInstance = new window.AMap.InfoWindow({
        offset: new window.AMap.Pixel(0, -30),
        content: '<div>选择的位置</div>'
      });

      // 添加点击事件
      mapInstance.on('click', (e) => {
        const lnglat = [e.lnglat.getLng(), e.lnglat.getLat()];
        updateMarkerPosition(mapInstance, markerInstance, infoWindowInstance, lnglat);
        
        // 逆地理编码
        const geocoder = new window.AMap.Geocoder();
        geocoder.getAddress(lnglat, (status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            const address = result.regeocode.formattedAddress;
            const addressComponent = result.regeocode.addressComponent;
            
            setSelectedLocation({
              address,
              street: addressComponent.township + addressComponent.street,
              community: addressComponent.neighborhood || '未知小区',
              lnglat
            });
          }
        });
      });

      setMap(mapInstance);
      setMarker(markerInstance);
      setInfoWindow(infoWindowInstance);
      setLoading(false);
    };

    return () => {
      // 清理脚本
      const scriptElement = document.querySelector('script[src*="webapi.amap.com"]');
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
      
      // 销毁地图实例
      if (map) {
        map.destroy();
      }
    };
  }, []);

  // 更新标记位置
  const updateMarkerPosition = (mapInstance, markerInstance, infoWindowInstance, lnglat) => {
    if (!mapInstance || !markerInstance || !infoWindowInstance) return;
    
    markerInstance.setPosition(lnglat);
    markerInstance.show();
    infoWindowInstance.open(mapInstance, lnglat);
    setMarkerPosition(lnglat);
  };

  // 搜索地点
  const handleSearch = () => {
    if (!searchValue || !map) return;
    
    const placeSearch = new window.AMap.PlaceSearch({
      city: '全国',
      pageSize: 10,
      pageIndex: 1
    });
    
    placeSearch.search(searchValue, (status, result) => {
      if (status === 'complete' && result.info === 'OK') {
        setSearchResults(result.poiList.pois);
      } else {
        setSearchResults([]);
      }
    });
  };

  // 选择搜索结果
  const handleSelectSearchResult = (poi) => {
    if (!map || !marker || !infoWindow) return;
    
    const lnglat = [poi.location.lng, poi.location.lat];
    map.setCenter(lnglat);
    updateMarkerPosition(map, marker, infoWindow, lnglat);
    
    setSelectedLocation({
      address: poi.address,
      street: poi.address.split('区')[1]?.split('号')[0] || poi.address,
      community: poi.name,
      lnglat
    });
    
    setSearchValue('');
    setSearchResults([]);
  };

  // 确认选择
  const handleConfirmSelection = () => {
    if (selectedLocation) {
      onSelect({
        street: selectedLocation.street,
        community: selectedLocation.community,
        address: selectedLocation.address,
        lnglat: selectedLocation.lnglat
      });
    }
  };

  return (
    <div className="relative h-full">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Spin size="large" tip="地图加载中..." />
        </div>
      ) : (
        <>
          <div className="absolute top-4 left-4 right-4 z-10">
            <div className="bg-white rounded-md shadow-md p-3">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="搜索小区、地址"
                  value={searchValue}
                  onChange={setSearchValue}
                  onEnterPress={handleSearch}
                  prefix={<IconSearch />}
                  style={{ width: '100%' }}
                />
                <Button onClick={handleSearch}>搜索</Button>
              </div>
              
              {searchResults.length > 0 && (
                <div className="mt-2 bg-white rounded-md shadow-md max-h-60 overflow-y-auto">
                  {searchResults.map((poi, index) => (
                    <div 
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectSearchResult(poi)}
                    >
                      <Text strong>{poi.name}</Text>
                      <div className="text-xs text-gray-500">{poi.address}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div id="map-container" style={{ width: '100%', height: '100%' }}></div>
          
          {selectedLocation && (
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <div className="bg-white rounded-md shadow-md p-3">
                <Space vertical align="start" spacing="tight">
                  <Text strong>已选位置</Text>
                  <Text>{selectedLocation.address}</Text>
                  <div className="flex items-center justify-between w-full mt-2">
                    <div>
                      <Text type="secondary">街道: {selectedLocation.street}</Text>
                      <br />
                      <Text type="secondary">小区: {selectedLocation.community}</Text>
                    </div>
                    <Button type="primary" onClick={handleConfirmSelection}>确认选择</Button>
                  </div>
                </Space>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MapSelector;
