import React, { useState, useEffect } from 'react';
import { Steps, Button, Card, Alert } from 'antd';
import AMapLoader from '@amap/amap-jsapi-loader';

const scenarios = [
  {
    title: '通勤模拟',
    content: '正在分析到您公司的交通路线...',
    method: 'analyzeCommute',
    poiType: '公司'
  },
  {
    title: '教育医疗',
    content: '正在分析学校医院可达性...',
    method: 'analyzeEducationMedical',
    poiType: ['学校','医院']
  },
  {
    title: '生活休闲',
    content: '正在评估商业休闲设施...',
    method: 'analyzeLiving',
    poiType: ['商场','公园','超市']
  }
];

export default function ResidenceSimulator({ property }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [report, setReport] = useState(null);

  const runAnalysis = async () => {
    const results = await Promise.all(
      scenarios.map(async scenario => {
        // 获取高德路径规划数据
        const amapResults = await window.AMap.plugin('AMap.Driving', () => {
          const driving = new window.AMap.Driving({
            policy: window.AMap.DrivingPolicy.LEAST_TIME
          });
          
          // 获取不同时段的交通数据
          return Promise.all([
            getRouteData(driving, '08:00'),
            getRouteData(driving, '14:00'),
            getRouteData(driving, '20:00')
          ]);
        });
    
        // 调用Deepseek API生成分析报告
        const analysisReport = await fetch('/api/deepseek/generate-report', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            location: { lng: property.lng, lat: property.lat },
            scenario: scenario.poiType,
            trafficData: amapResults
          })
        }).then(res => res.json());
    
        return {
          ...scenario,
          analysis: analysisReport
        };
      })
    );
    setReport(results);
  };

  useEffect(() => {
    AMapLoader.load({
      key: '您的高德地图API密钥',
      plugins: ['AMap.Driving']
    }).then(() => runAnalysis());
  }, []);

  return (
    <Card>
      <Steps current={currentStep}>
        {scenarios.map(item => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
      
      {report && report.map((result, index) => (
        <div key={index} style={{ marginTop: 24 }}>
          <Collapse defaultActiveKey={['1']}>
            <Panel header="交通分析" key="1">
              <Timeline>
                {result.analysis.trafficDetails.map((detail, i) => (
                  <Timeline.Item key={i}>
                    <strong>{detail.timePeriod}:</strong> {detail.duration}分钟
                    ({detail.distance}公里)
                  </Timeline.Item>
                ))}
              </Timeline>
            </Panel>
            <Panel header="地段优势" key="2">
              <Alert message={result.analysis.advantages} type="info" />
            </Panel>
            <Panel header="注意事项" key="3">
              <ul>
                {result.analysis.notes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </Panel>
          </Collapse>
        </div>
      ))}
      <Alert message={scenarios[index].title} description={result.summary} type="info" />
      <div dangerouslySetInnerHTML={{ __html: result.details }} />
    </Card>
  );
}