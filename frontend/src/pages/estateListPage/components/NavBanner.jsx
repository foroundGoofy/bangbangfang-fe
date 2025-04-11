
import  React, { useState, useEffect } from "react";
import { Modal, Form, Select, Radio, Button, Cascader } from "@douyinfe/semi-ui";
import { IconMapPin } from "@douyinfe/semi-icons";
import { MdSubway } from "react-icons/md"; // Using react-icons for subway icon

const NavBanner = () => {
  const [visible, setVisible] = useState(false);
  const [rentalType, setRentalType] = useState("all");
  const [modalWidth, setModalWidth] = useState(600);

  // Location data for cascading select
  const locationOptions = [
    {
      label: '朝阳区',
      value: 'chaoyang',
      children: [
        { label: '望京', value: 'wangjing' },
        { label: '国贸', value: 'guomao' },
        { label: '三里屯', value: 'sanlitun' },
        { label: '大望路', value: 'dawanglu' }
      ]
    },
    {
      label: '海淀区',
      value: 'haidian',
      children: [
        { label: '五道口', value: 'wudaokou' },
        { label: '中关村', value: 'zhongguancun' },
        { label: '清华大学', value: 'tsinghua' },
        { label: '北京大学', value: 'peking' }
      ]
    },
    {
      label: '东城区',
      value: 'dongcheng',
      children: [
        { label: '东直门', value: 'dongzhimen' },
        { label: '王府井', value: 'wangfujing' },
        { label: '天安门', value: 'tiananmen' }
      ]
    },
    {
      label: '西城区',
      value: 'xicheng',
      children: [
        { label: '西单', value: 'xidan' },
        { label: '金融街', value: 'jinrongjie' },
        { label: '西直门', value: 'xizhimen' }
      ]
    },
    {
      label: '丰台区',
      value: 'fengtai',
      children: [
        { label: '方庄', value: 'fangzhuang' },
        { label: '六里桥', value: 'liuliqiao' }
      ]
    },
    {
      label: '石景山区',
      value: 'shijingshan',
      children: [
        { label: '八宝山', value: 'babaoshan' },
        { label: '苹果园', value: 'pingguoyuan' }
      ]
    },
    {
      label: '大兴区',
      value: 'daxing',
      children: [
        { label: '亦庄', value: 'yizhuang' },
        { label: '黄村', value: 'huangcun' }
      ]
    }
  ];

  // Subway data for cascading select
  const subwayOptions = [
    {
      label: '1号线',
      value: 'line1',
      children: [
        { label: '苹果园', value: 'pingguoyuan' },
        { label: '古城', value: 'gucheng' },
        { label: '八角游乐园', value: 'bajiaoyouleyuan' },
        { label: '八宝山', value: 'babaoshan' },
        { label: '玉泉路', value: 'yuquanlu' },
        { label: '五棵松', value: 'wukesong' },
        { label: '万寿路', value: 'wanshoulu' }
      ]
    },
    {
      label: '2号线',
      value: 'line2',
      children: [
        { label: '西直门', value: 'xizhimen' },
        { label: '车公庄', value: 'chegongzhuang' },
        { label: '阜成门', value: 'fuchengmen' },
        { label: '复兴门', value: 'fuxingmen' },
        { label: '长椿街', value: 'changchunjie' },
        { label: '宣武门', value: 'xuanwumen' }
      ]
    },
    {
      label: '4号线',
      value: 'line4',
      children: [
        { label: '安河桥北', value: 'anheqiaobei' },
        { label: '北宫门', value: 'beigongmen' },
        { label: '西苑', value: 'xiyuan' },
        { label: '圆明园', value: 'yuanmingyuan' },
        { label: '北京大学东门', value: 'beijingdaxuedongmen' },
        { label: '中关村', value: 'zhongguancun' },
        { label: '海淀黄庄', value: 'haidianhuangzhuang' }
      ]
    },
    {
      label: '5号线',
      value: 'line5',
      children: [
        { label: '天通苑北', value: 'tiantongyuanbei' },
        { label: '天通苑', value: 'tiantongyuan' },
        { label: '天通苑南', value: 'tiantongyuannan' },
        { label: '立水桥', value: 'lishuiqiao' },
        { label: '立水桥南', value: 'lishuiqiaonan' },
        { label: '北苑路北', value: 'beiyuanlubei' }
      ]
    },
    {
      label: '6号线',
      value: 'line6',
      children: [
        { label: '金安桥', value: 'jinanqiao' },
        { label: '苹果园', value: 'pingguoyuan' },
        { label: '杨庄', value: 'yangzhuang' },
        { label: '西黄村', value: 'xihuangcun' },
        { label: '廖公庄', value: 'liaogongzhuang' },
        { label: '田村', value: 'tiancun' }
      ]
    },
    {
      label: '10号线',
      value: 'line10',
      children: [
        { label: '巴沟', value: 'bagou' },
        { label: '苏州街', value: 'suzhoujie' },
        { label: '海淀黄庄', value: 'haidianhuangzhuang' },
        { label: '知春里', value: 'zhichunli' },
        { label: '知春路', value: 'zhichunlu' },
        { label: '西土城', value: 'xitucheng' }
      ]
    },
    {
      label: '13号线',
      value: 'line13',
      children: [
        { label: '西直门', value: 'xizhimen' },
        { label: '大钟寺', value: 'dazhongsi' },
        { label: '知春路', value: 'zhichunlu' },
        { label: '五道口', value: 'wudaokou' },
        { label: '上地', value: 'shangdi' },
        { label: '西二旗', value: 'xierqi' }
      ]
    }
  ];

  // Handle responsive modal width
  useEffect(() => {
    const handleResize = () => {
      // Set modal width based on screen size
      if (window.innerWidth < 768) {
        setModalWidth('95%');
      } else {
        setModalWidth(600);
      }
    };

    // Initial call
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleRentalTypeChange = (value) => {
    setRentalType(value);
  };

  // Custom location field with icon
  const LocationField = () => (
    <div className="relative w-full">
      <Cascader
        placeholder="选择区域和街道"
        style={{ width: '100%' }}
        treeData={locationOptions}
        multiple
        showClear
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-blue-500">
        <IconMapPin size="large" />
      </div>
    </div>
  );

  // Custom subway field with icon
  const SubwayField = () => (
    <div className="relative w-full">
      <Cascader
        placeholder="选择地铁线和站点"
        style={{ width: '100%' }}
        treeData={subwayOptions}
        multiple
        showClear
      />
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-blue-500">
        <MdSubway size={24} /> {/* Using react-icons MdSubway instead */}
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600 mr-8" onClick={()=>location.href="/"}>帮帮房</h1>
        </div>
        
        {/* <button 
          onClick={showModal}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
        >
          选择租房条件
        </button> */}
        
        <Modal
          title="选择租房条件"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={modalWidth}
          footer={
            <div className="flex justify-end space-x-3">
              <Button onClick={handleCancel}>取消</Button>
              <Button type="primary" onClick={handleOk}>确认</Button>
            </div>
          }
          style={{ maxHeight: '90vh', overflow: 'auto' }}
        >
          <Form labelPosition="top" labelAlign="left" className="responsive-form">
            <Form.Slot label="地理位置" field="location">
              <LocationField />
            </Form.Slot>
            
            <Form.Slot label="地铁位置" field="subway">
              <SubwayField />
            </Form.Slot>
            
            <Form.RadioGroup field="subway_distance" label="有无地铁" className="my-4">
              <div className="flex flex-wrap gap-4">
                <Radio value="all">不限</Radio>
                <Radio value="yes">近地铁</Radio>
                <Radio value="no">无地铁</Radio>
              </div>
            </Form.RadioGroup>
            
            <Form.RadioGroup field="layout" label="户型" className="my-4">
              <div className="flex flex-wrap gap-4">
                <Radio value="all">不限</Radio>
                <Radio value="1">一居室</Radio>
                <Radio value="2">二居室</Radio>
                <Radio value="3">三居室</Radio>
                <Radio value="4+">四居室及以上</Radio>
              </div>
            </Form.RadioGroup>
            
            <Form.RadioGroup 
              field="rentalType" 
              label="租赁方式" 
              onChange={handleRentalTypeChange}
              className="my-4"
            >
              <div className="flex flex-wrap gap-4">
                <Radio value="all">不限</Radio>
                <Radio value="entire">整租</Radio>
                <Radio value="shared">合租</Radio>
              </div>
            </Form.RadioGroup>
            
            {rentalType === "shared" && (
              <Form.Select 
                field="rooms" 
                label="居室数量" 
                placeholder="选择居室数量" 
                style={{ width: '100%' }}
              >
                <Select.Option value="all">不限</Select.Option>
                <Select.Option value="1">1室</Select.Option>
                <Select.Option value="2">2室</Select.Option>
                <Select.Option value="3">3室</Select.Option>
                <Select.Option value="4">4室</Select.Option>
                <Select.Option value="5+">5室及以上</Select.Option>
              </Form.Select>
            )}
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default NavBanner;
