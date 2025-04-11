import React, { useState, useEffect } from 'react';
import { Carousel, Tabs, Rate, List, Card, Row, Col, Button, Modal } from 'antd';
import ReactECharts from 'echarts-for-react';
import styles from './PropertyDetails.module.less';
import ContractPage from './ContractPage';
import ResidenceSimulator from './ResidenceSimulator';
import LandlordChatBot from './LandlordChatBot';

const { TabPane } = Tabs;

const PropertyDetails = ({ property }) => {
  const [facilities, setFacilities] = useState({});

  useEffect(() => {
    // 初始化高德地图
    const map = new window.AMap.Map('map-container', {
      zoom: 15,
      center: [property.lng, property.lat]
    });
    
    new window.AMap.Marker({
      position: new window.AMap.LngLat(property.lng, property.lat),
      map: map
    });

    // 获取周边设施
    fetch(`/api/properties/${property.id}/facilities`)
      .then(res => res.json())
      .then(setFacilities);
  }, [property]);

  const radarOption = {
    radar: {
      indicator: [
        { name: '交通', max: 100 },
        { name: '商业', max: 100 },
        { name: '医疗', max: 100 },
        { name: '教育', max: 100 },
        { name: '休闲', max: 100 }
      ]
    },
    series: [{
      type: 'radar',
      data: [{
        value: [property.transport, property.commerce, property.medical, property.education, property.leisure],
        name: '居住指数'
      }]
    }]
  };

  return (
    <div className={styles.container}>
      <Card className={styles.mileageAlert}>
        <Alert
          message={`不看房里程分：${property.distance}km（到您公司的直线距离）`}
          description="不看房签约可获里程分，可抵扣搬家费及平台服务费"
          type="info"
          showIcon
        />
      </Card>

      <Carousel autoplay className={styles.carousel}>
        {property.images.map(img => (
          <div key={img}>
            <img src={img} alt="房屋图片" className={styles.carouselImage} />
          </div>
        ))}
      </Carousel>

      <Tabs defaultActiveKey="1" className={styles.tabs}>
        <TabPane tab="位置信息" key="1">
          <div id="map-container" className={styles.mapContainer} />
          <Row gutter={16} className={styles.facilitySection}>
            <Col span={12}>
              <FacilityList title="周边商场" data={facilities.shopping} />
              <FacilityList title="医疗机构" data={facilities.medical} />
            </Col>
            <Col span={12}>
              <FacilityList title="教育机构" data={facilities.education} />
              <FacilityList title="休闲娱乐" data={facilities.entertainment} />
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="居住指数" key="2">
          <ReactECharts option={radarOption} className={styles.radarChart} />
        </TabPane>

        <TabPane tab="租客评价" key="3">
          <List
            dataSource={property.reviews}
            renderItem={review => (
              <List.Item>
                <ReviewItem review={review} />
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    <div className={styles.actionBar}>
      <Button type="primary" className={styles.simulateButton} onClick={() => setShowSimulator(true)}>
        模拟居住
      </Button>
      <Button className={styles.rentButton} onClick={() => setShowContract(true)}>
        我要租房
      </Button>
      <Button className={styles.askButton} onClick={() => setShowChatBot(true)}>
        问房东
      </Button>
    </div>

    <Modal
      title="居住模拟报告"
      visible={showSimulator}
      onCancel={() => setShowSimulator(false)}
      footer={null}
      width={1000}
    >
      <ResidenceSimulator property={property} />
    </Modal>

    <Modal
      title="电子合同签署"
      visible={showContract}
      onCancel={() => setShowContract(false)}
      footer={null}
      width={800}
    >
      <ContractPage property={property} />
    </Modal>

    <LandlordChatBot
      visible={showChatBot}
      onClose={() => setShowChatBot(false)}
      propertyId={property.id}
    />
  </div>
  );
};

const FacilityList = ({ title, data = [] }) => (
  <div className={styles.facilityList}>
    <h3>{title}</h3>
    <List
      dataSource={data.slice(0, 3)}
      renderItem={item => <div className={styles.facilityItem}>{item.name}</div>}
    />
  </div>
);

const ReviewItem = ({ review }) => (
  <Card className={styles.reviewCard}>
    <div className={styles.reviewHeader}>
      <span className={styles.reviewer}>{review.user}</span>
      <Rate disabled defaultValue={review.rating} />
    </div>
    <p className={styles.reviewContent}>{review.content}</p>
    <span className={styles.reviewDate}>{review.date}</span>
  </Card>
);

export default PropertyDetails;