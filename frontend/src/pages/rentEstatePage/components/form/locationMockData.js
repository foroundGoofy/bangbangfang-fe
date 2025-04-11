const locationMockData = [
  {
    label: '北京市',
    value: '北京市',
    children: [
      {
        label: '东城区',
        value: '东城区',
        children: [
          { label: '东华门街道', value: '东华门街道' },
          { label: '景山街道', value: '景山街道' },
          // 可以继续添加更多街道
        ],
      },
      {
        label: '西城区',
        value: '西城区',
        children: [
          { label: '金融街街道', value: '金融街街道' },
          { label: '德胜街道', value: '德胜街道' },
          // 可以继续添加更多街道
        ],
      },
      // 可以继续添加更多区
    ],
  },
  // 可以继续添加更多城市
];

export default locationMockData;