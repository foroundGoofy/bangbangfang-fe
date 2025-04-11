
import React from "react";
import { Card, Typography, Table } from "@douyinfe/semi-ui";

const NearbyAmenities = () => {
  const { Title } = Typography;

  const commercialFacilities = [
    { name: "万达广场", distance: "800米" },
    { name: "永辉超市", distance: "300米" },
    { name: "金茂商业街", distance: "100米" }
  ];

  const medicalResources = [
    { name: "协和医院", distance: "1.5公里" },
    { name: "社区医院", distance: "500米" },
    { name: "妇幼保健院", distance: "2公里" }
  ];

  const educationalResources = [
    { name: "实验小学", distance: "800米" },
    { name: "第一中学", distance: "1公里" },
    { name: "阳光幼儿园", distance: "600米" }
  ];

  const entertainmentFacilities = [
    { name: "星巴克", distance: "400米" },
    { name: "万达影城", distance: "800米" },
    { name: "中央公园", distance: "1公里" }
  ];

  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "距离",
      dataIndex: "distance",
      key: "distance",
    }
  ];

  return (
    <Card className="mb-6 shadow-sm">
      <Title heading={5} className="mb-4">周边配套</Title>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Title heading={6} className="mb-2">商业设施</Title>
          <Table
            columns={columns}
            dataSource={commercialFacilities}
            pagination={false}
            size="small"
          />
        </div>
        <div>
          <Title heading={6} className="mb-2">医疗资源</Title>
          <Table
            columns={columns}
            dataSource={medicalResources}
            pagination={false}
            size="small"
          />
        </div>
        <div>
          <Title heading={6} className="mb-2">教育资源</Title>
          <Table
            columns={columns}
            dataSource={educationalResources}
            pagination={false}
            size="small"
          />
        </div>
        <div>
          <Title heading={6} className="mb-2">休闲娱乐</Title>
          <Table
            columns={columns}
            dataSource={entertainmentFacilities}
            pagination={false}
            size="small"
          />
        </div>
      </div>
    </Card>
  );
};

export default NearbyAmenities;
